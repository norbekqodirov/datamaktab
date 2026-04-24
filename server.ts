import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

const app = express();
const PORT = 3000;

app.use(express.json());

// Setup Multer for file uploads
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'file-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

// Database setup
const dbPath = path.join(process.cwd(), 'database.sqlite');
const db = new Database(dbPath);

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS site_content (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS enrollments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    child_name TEXT NOT NULL,
    birth_date TEXT,
    grade TEXT NOT NULL,
    language TEXT,
    parent_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    source TEXT,
    message TEXT,
    status TEXT DEFAULT 'YANGI',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// API Routes

// --- Uploads ---
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Fayl yuklanmadi' });
  }
  res.json({ url: `/uploads/${req.file.filename}` });
});

// --- CRM Proxy (avoids browser CORS) ---
app.post('/api/crm/lead', async (req, res) => {
  try {
    const crmRes = await fetch('https://durbin.uz/api/v1/external/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'Gengohghei0bo9iGu9UMahchai4ohye5Joo4Tei1oVii8ohw5geesouNoh4aph4u',
      },
      body: JSON.stringify(req.body),
    });
    const text = await crmRes.text();
    res.status(crmRes.status).send(text);
  } catch (err: any) {
    console.error('CRM proxy error:', err);
    res.status(502).json({ error: 'CRM ulanishida xatolik', details: err.message });
  }
});

// --- Stats ---
app.get('/api/stats', (req, res) => {
  const articlesCount = db.prepare('SELECT COUNT(*) as count FROM articles').get() as { count: number };
  res.json({
    articles: articlesCount.count,
  });
});

// --- Articles ---
app.get('/api/articles', (req, res) => {
  const articles = db.prepare('SELECT * FROM articles ORDER BY created_at DESC').all();
  res.json(articles);
});

app.get('/api/articles/:id', (req, res) => {
  const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ error: 'Article not found' });
  }
});

app.post('/api/articles', (req, res) => {
  const { title, excerpt, content, image_url } = req.body;
  const stmt = db.prepare('INSERT INTO articles (title, excerpt, content, image_url) VALUES (?, ?, ?, ?)');
  const info = stmt.run(title, excerpt, content, image_url);
  res.json({ id: info.lastInsertRowid, title, excerpt, content, image_url });
});

app.put('/api/articles/:id', (req, res) => {
  const { title, excerpt, content, image_url } = req.body;
  const stmt = db.prepare('UPDATE articles SET title = ?, excerpt = ?, content = ?, image_url = ? WHERE id = ?');
  stmt.run(title, excerpt, content, image_url, req.params.id);
  res.json({ success: true });
});

app.delete('/api/articles/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM articles WHERE id = ?');
  stmt.run(req.params.id);
  res.json({ success: true });
});

// --- Enrollments ---
app.get('/api/enrollments', (req, res) => {
  const enrollments = db.prepare('SELECT * FROM enrollments ORDER BY created_at DESC').all();
  res.json(enrollments);
});

app.post('/api/enrollments', (req, res) => {
  const { child_name, birth_date, grade, language, parent_name, phone, email, source, message } = req.body;
  const stmt = db.prepare('INSERT INTO enrollments (child_name, birth_date, grade, language, parent_name, phone, email, source, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
  const info = stmt.run(child_name, birth_date, grade, language, parent_name, phone, email, source, message);
  res.json({ id: info.lastInsertRowid, success: true });
});

app.put('/api/enrollments/:id/status', (req, res) => {
  const { status } = req.body;
  const stmt = db.prepare('UPDATE enrollments SET status = ? WHERE id = ?');
  stmt.run(status, req.params.id);
  res.json({ success: true });
});

app.delete('/api/enrollments/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM enrollments WHERE id = ?');
  stmt.run(req.params.id);
  res.json({ success: true });
});

// --- Messages ---
app.get('/api/messages', (req, res) => {
  const messages = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  const { name, phone, message } = req.body;
  const stmt = db.prepare('INSERT INTO messages (name, phone, message) VALUES (?, ?, ?)');
  const info = stmt.run(name, phone, message);
  res.json({ id: info.lastInsertRowid, success: true });
});

app.delete('/api/messages/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM messages WHERE id = ?');
  stmt.run(req.params.id);
  res.json({ success: true });
});

// --- Settings ---
app.get('/api/settings', (req, res) => {
  const settings = db.prepare('SELECT * FROM site_content').all();
  const settingsObj = settings.reduce((acc: any, curr: any) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});
  res.json(settingsObj);
});

app.put('/api/settings', (req, res) => {
  const settings = req.body;
  const stmt = db.prepare('INSERT OR REPLACE INTO site_content (key, value) VALUES (?, ?)');
  const insertMany = db.transaction((settingsObj) => {
    for (const [key, value] of Object.entries(settingsObj)) {
      stmt.run(key, String(value));
    }
  });
  insertMany(settings);
  res.json({ success: true });
});

// Simple Auth for Admin
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'datamaktab2025') {
    res.json({ token: 'fake-jwt-token-admin' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

async function startServer() {
  // Serve uploaded files from public/uploads
  app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
