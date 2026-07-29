import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'public', 'clients');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (err: any) {
      cb(err, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    // Generate a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const CLIENTS_FILE_PATH = path.join(__dirname, 'src', 'data', 'clients.json');

app.post('/api/clients', upload.single('image'), async (req, res) => {
  try {
    const { name, website, review, rating, category } = req.body;
    let imageUrl = '';

    if (req.file) {
      imageUrl = `/clients/${req.file.filename}`;
    } else if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl;
    }

    if (!name || !review) {
      res.status(400).json({ error: 'Name and review are required.' });
      return;
    }

    const newClient = {
      id: `client-${Date.now()}`,
      name,
      image: imageUrl,
      website: website || '',
      review,
      rating: parseFloat(rating) || 5,
      category: category || ''
    };

    const data = await fs.readFile(CLIENTS_FILE_PATH, 'utf-8');
    const clients = JSON.parse(data);
    clients.push(newClient);

    await fs.writeFile(CLIENTS_FILE_PATH, JSON.stringify(clients, null, 2), 'utf-8');

    res.json({ success: true, client: newClient });
  } catch (error) {
    console.error('Error adding client:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Local Admin API running on http://localhost:${port}`);
});
