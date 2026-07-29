import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    const { action = 'add', id, password, name, website, review, rating, category, imageBase64, imageName } = req.body;

    // 1. Verify Password
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin1923';
    if (!adminPassword) {
      return res.status(500).json({ error: 'Server misconfiguration: ADMIN_PASSWORD is not set.' });
    }

    if (password !== adminPassword) {
      return res.status(401).json({ error: 'Invalid admin password.' });
    }

    // 2. Setup GitHub API Config
    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO || 'Manishraj019/AURORA_portfolio-';
    const branch = 'main';

    if (!token) {
      return res.status(500).json({ error: 'Server misconfiguration: GITHUB_TOKEN is not set in Vercel Environment Variables.' });
    }
    if (!repo) {
      return res.status(500).json({ error: 'Server misconfiguration: GITHUB_REPO is not set.' });
    }

    const githubHeaders = {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    };

    // 3. Fetch existing clients.json
    const clientsFilePath = 'src/data/clients.json';
    const getClientsRes = await fetch(`https://api.github.com/repos/${repo}/contents/${clientsFilePath}?ref=${branch}`, {
      headers: githubHeaders,
    });

    if (!getClientsRes.ok) {
      return res.status(500).json({ error: 'Failed to fetch existing clients.json' });
    }

    const getClientsData = await getClientsRes.json();
    const currentClientsSha = getClientsData.sha;
    const decodedClientsJson = Buffer.from(getClientsData.content, 'base64').toString('utf-8');
    let clientsList: any[] = JSON.parse(decodedClientsJson);

    let finalClient = null;

    if (action === 'delete') {
      if (!id) return res.status(400).json({ error: 'ID required for delete' });
      clientsList = clientsList.filter((c: any) => c.id !== id);
    } else if (action === 'add' || action === 'edit') {
      let imageUrl = req.body.existingImage || '';

      // Upload new image if provided
      if (imageBase64 && imageName) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = imageName.split('.').pop() || 'png';
        const uniqueImageName = `client-${uniqueSuffix}.${fileExtension}`;
        const imagePathInRepo = `public/clients/${uniqueImageName}`;
        imageUrl = `/clients/${uniqueImageName}`;

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
          return res.status(500).json({ error: 'Failed to upload image', details: errorData });
        }
      }

      if (action === 'add') {
        finalClient = {
          id: `client-${Date.now()}`,
          name,
          image: imageUrl,
          website: website || '',
          review,
          rating: parseFloat(rating) || 5,
          category: category || ''
        };
        clientsList.push(finalClient);
      } else if (action === 'edit') {
        const index = clientsList.findIndex((c: any) => c.id === id);
        if (index === -1) return res.status(404).json({ error: 'Client not found' });
        
        finalClient = {
          ...clientsList[index],
          name: name || clientsList[index].name,
          image: imageUrl || clientsList[index].image,
          website: website !== undefined ? website : clientsList[index].website,
          review: review || clientsList[index].review,
          rating: rating ? parseFloat(rating) : clientsList[index].rating,
          category: category !== undefined ? category : clientsList[index].category,
        };
        clientsList[index] = finalClient;
      }
    }

    // 4. Commit updated clients.json
    const updatedClientsJsonStr = JSON.stringify(clientsList, null, 2);
    const updatedClientsBase64 = Buffer.from(updatedClientsJsonStr).toString('base64');

    const updateClientsRes = await fetch(`https://api.github.com/repos/${repo}/contents/${clientsFilePath}`, {
      method: 'PUT',
      headers: githubHeaders,
      body: JSON.stringify({
        message: `Admin Panel: ${action} client ${name || id}`,
        content: updatedClientsBase64,
        sha: currentClientsSha,
        branch,
      }),
    });

    if (!updateClientsRes.ok) {
      const errorData = await updateClientsRes.json();
      return res.status(500).json({ error: 'Failed to update clients.json', details: errorData });
    }

    return res.status(200).json({ 
      success: true, 
      client: finalClient, 
      message: `Successfully ${action}ed client. Vercel is now deploying.` 
    });

  } catch (error: any) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
