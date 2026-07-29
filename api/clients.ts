import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { password, name, website, review, rating, category, imageBase64, imageName } = req.body;

    // 1. Verify Password
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return res.status(500).json({ error: 'Server misconfiguration: ADMIN_PASSWORD is not set.' });
    }

    if (password !== adminPassword) {
      return res.status(401).json({ error: 'Invalid admin password.' });
    }

    // 2. Setup GitHub API Config
    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO; // e.g., "Manishraj019/AURORA_portfolio-"
    const branch = 'main'; // default branch to push to

    if (!token || !repo) {
      return res.status(500).json({ error: 'Server misconfiguration: GITHUB_TOKEN or GITHUB_REPO is not set.' });
    }

    const githubHeaders = {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    };

    // 3. Upload Image to public/clients/
    // Generate a unique name for the image
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = imageName.split('.').pop() || 'png';
    const uniqueImageName = `client-${uniqueSuffix}.${fileExtension}`;
    const imagePathInRepo = `public/clients/${uniqueImageName}`;
    const imageUrl = `/clients/${uniqueImageName}`;

    // Upload Image
    const uploadImageRes = await fetch(`https://api.github.com/repos/${repo}/contents/${imagePathInRepo}`, {
      method: 'PUT',
      headers: githubHeaders,
      body: JSON.stringify({
        message: `Admin Panel: Add image for ${name}`,
        content: imageBase64,
        branch,
      }),
    });

    if (!uploadImageRes.ok) {
      const errorData = await uploadImageRes.json();
      console.error('GitHub Image Upload Error:', errorData);
      return res.status(500).json({ error: 'Failed to upload image to GitHub', details: errorData });
    }

    // 4. Update src/data/clients.json
    const clientsFilePath = 'src/data/clients.json';
    
    // First, fetch the current clients.json to get its sha (required for updates) and content
    const getClientsRes = await fetch(`https://api.github.com/repos/${repo}/contents/${clientsFilePath}?ref=${branch}`, {
      headers: githubHeaders,
    });

    if (!getClientsRes.ok) {
      return res.status(500).json({ error: 'Failed to fetch existing clients.json' });
    }

    const getClientsData = await getClientsRes.json();
    const currentClientsSha = getClientsData.sha;
    
    // GitHub contents are base64 encoded
    const decodedClientsJson = Buffer.from(getClientsData.content, 'base64').toString('utf-8');
    const clientsList = JSON.parse(decodedClientsJson);

    // Append new client
    const newClient = {
      id: `client-${Date.now()}`,
      name,
      image: imageUrl,
      website: website || '',
      review,
      rating: parseFloat(rating) || 5,
      category: category || ''
    };

    clientsList.push(newClient);

    const updatedClientsJsonStr = JSON.stringify(clientsList, null, 2);
    const updatedClientsBase64 = Buffer.from(updatedClientsJsonStr).toString('base64');

    // Commit updated clients.json
    const updateClientsRes = await fetch(`https://api.github.com/repos/${repo}/contents/${clientsFilePath}`, {
      method: 'PUT',
      headers: githubHeaders,
      body: JSON.stringify({
        message: `Admin Panel: Add client ${name}`,
        content: updatedClientsBase64,
        sha: currentClientsSha,
        branch,
      }),
    });

    if (!updateClientsRes.ok) {
      const errorData = await updateClientsRes.json();
      console.error('GitHub Clients Update Error:', errorData);
      return res.status(500).json({ error: 'Failed to update clients.json in GitHub', details: errorData });
    }

    return res.status(200).json({ success: true, client: newClient, message: 'Successfully updated live site. Vercel is now deploying the changes.' });

  } catch (error: any) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
