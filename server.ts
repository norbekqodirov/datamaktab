import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import sharp from 'sharp';
import compression from 'compression';

const app = express();
const PORT = process.env.PORT || 3000;


// Gzip compression — critical for production
app.use(compression());
app.use(express.json({ limit: '10mb' }));

// Redirect www → non-www (301 permanent)
app.use((req: any, res: any, next: any) => {
  if (req.hostname && req.hostname.startsWith('www.')) {
    return res.redirect(301, `https://${req.hostname.slice(4)}${req.url}`);
  }
  next();
});

// Setup Multer with memory storage so sharp can intercept before writing to disk
const uploadMemory = multer({ storage: multer.memoryStorage() });

// Database setup
const dbPath = path.join(process.cwd(), 'database.sqlite');
const db = new Database(dbPath);

// --- Article meta injection (for Telegram/Facebook/Twitter link previews) ---
const SITE_NAME = 'DATA Xalqaro Maktabi';
const SITE_DOMAIN = 'https://datamaktab.uz';
const DEFAULT_OG_IMAGE = `${SITE_DOMAIN}/og-image.png`;

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function absoluteUrl(maybeRelative: string | null | undefined): string {
  if (!maybeRelative) return DEFAULT_OG_IMAGE;
  return maybeRelative.startsWith('http') ? maybeRelative : `${SITE_DOMAIN}${maybeRelative}`;
}

const MONTHS_UZ = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'];

function formatDateUz(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return `${d.getDate()} ${MONTHS_UZ[d.getMonth()]} ${d.getFullYear()}`;
}

function renderArticleBodyHtml(article: { title: string; excerpt: string; content: string; image_url: string | null; created_at: string }): string {
  const title = escapeHtml(article.title);
  const excerpt = escapeHtml(article.excerpt || '');
  const dateStr = formatDateUz(article.created_at);
  const readTime = Math.max(1, Math.ceil((article.content || '').split(' ').length / 200));
  const image = article.image_url ? absoluteUrl(article.image_url) : '';

  return `<div class="ssr-article"><div class="ssr-article-inner">` +
    `<header>` +
    `<div class="ssr-meta"><span class="ssr-date">${dateStr}</span> <span class="ssr-readtime">${readTime} daqiqa</span></div>` +
    `<h1>${title}</h1>` +
    (excerpt ? `<p class="ssr-excerpt">${excerpt}</p>` : '') +
    `</header>` +
    (image ? `<div class="ssr-hero"><img src="${escapeHtml(image)}" alt="${title}"></div>` : '') +
    `<div class="prose">${article.content || ''}</div>` +
    `</div></div>`;
}

function injectArticleMeta(html: string, article: { id: number | string; title: string; excerpt: string; content: string; image_url: string | null; created_at: string }): string {
  const fullTitle = escapeHtml(`${article.title} | ${SITE_NAME}`);
  const desc = escapeHtml((article.excerpt || '').slice(0, 160));
  const url = `${SITE_DOMAIN}/blog/${article.id}`;
  const image = escapeHtml(absoluteUrl(article.image_url));

  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${fullTitle}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${desc}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${fullTitle}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${desc}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${image}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${fullTitle}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${desc}$2`)
    .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${image}$2`)
    .replace('<div id="root"></div>', `<div id="root">${renderArticleBodyHtml(article)}</div>`);
}

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

// --- Uploads (with WebP auto-conversion) ---
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

app.post('/api/upload', uploadMemory.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Fayl yuklanmadi' });

  try {
    const uniqueName = `img-${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
    const outPath = path.join(uploadDir, uniqueName);
    
    const beforeSize = req.file.buffer.length;
    await sharp(req.file.buffer)
      .rotate()
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 78, effort: 4 })
      .toFile(outPath);
      
    const afterSize = fs.statSync(outPath).size;
    const reduction = (((beforeSize - afterSize) / beforeSize) * 100).toFixed(1);
    
    console.log(`\n📦 YUKLASH: ${req.file.originalname}`);
    console.log(`✅ WebP Siqildi: ${(beforeSize/1024).toFixed(0)}KB -> ${(afterSize/1024).toFixed(0)}KB (Tejaldi: -${reduction}%)`);
    console.log(`📂 Saqlandi: /uploads/${uniqueName}`);
    
    res.json({ url: `/uploads/${uniqueName}` });
  } catch (err: any) {
    console.error('Image conversion error:', err);
    res.status(500).json({ error: 'Rasm siqishda xatolik', details: err.message });
  }
});

// --- One-time existing image WebP optimizer ---
app.get('/api/optimize-existing', async (_req, res) => {
  const publicDir = path.join(process.cwd(), 'public');
  const dirs = [publicDir, uploadDir];
  const results: string[] = [];

  for (const dir of dirs) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

      const inPath = path.join(dir, file);
      const outName = path.basename(file, ext) + '.webp';
      const outPath = path.join(dir, outName);

      if (fs.existsSync(outPath)) { results.push(`Skipped (exists): ${outName}`); continue; }

      try {
        const stat = fs.statSync(inPath);
        await sharp(inPath).webp({ quality: 85, effort: 4 }).toFile(outPath);
        const newStat = fs.statSync(outPath);
        results.push(`✅ ${file} (${(stat.size/1024).toFixed(0)}KB) → ${outName} (${(newStat.size/1024).toFixed(0)}KB)`);
      } catch (e: any) {
        results.push(`❌ ${file}: ${e.message}`);
      }
    }
  }

  res.json({ converted: results.length, results });
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

// --- Sitemap ---
app.get('/sitemap.xml', (req, res) => {
  const base = 'https://datamaktab.uz';
  const staticPages = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/maktab-haqida', priority: '0.8', changefreq: 'monthly' },
    { loc: '/maktab-haqida/jamoa', priority: '0.7', changefreq: 'monthly' },
    { loc: '/talim', priority: '0.8', changefreq: 'monthly' },
    { loc: '/qabul', priority: '0.8', changefreq: 'monthly' },
    { loc: '/blog', priority: '0.9', changefreq: 'weekly' },
    { loc: '/aloqa', priority: '0.6', changefreq: 'monthly' },
    { loc: '/mos-maktab', priority: '0.8', changefreq: 'monthly' },
  ];
  const articles = db.prepare('SELECT id, created_at FROM articles ORDER BY created_at DESC').all() as { id: number; created_at: string }[];
  const articleEntries = articles.map(a => ({
    loc: `/blog/${a.id}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: a.created_at ? a.created_at.slice(0, 10) : '',
  }));
  const allPages = [...staticPages, ...articleEntries];
  const urls = allPages.map(p => {
    const lastmod = (p as any).lastmod ? `<lastmod>${(p as any).lastmod}</lastmod>` : '';
    return `  <url><loc>${base}${p.loc}</loc>${lastmod}<changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`;
  }).join('\n');
  res.setHeader('Content-Type', 'application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`);
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
    app.use(express.static(process.cwd() + '/dist'));
    // Valid SPA routes — serve index.html with 200
    const SPA_ROUTES = /^(\/?|\/maktab-haqida(\/jamoa)?|\/talim|\/qabul|\/blog(\/[^/]+)?|\/aloqa|\/mos-maktab|\/maktabpanel(\/.*)?)\/?$/;
    const BLOG_ARTICLE_ROUTE = /^\/blog\/([^/]+)\/?$/;
    const indexHtmlPath = path.resolve(process.cwd(), 'dist', 'index.html');
    const indexHtmlTemplate = fs.readFileSync(indexHtmlPath, 'utf-8');

    app.get('*', (req, res) => {
      const status = SPA_ROUTES.test(req.path) ? 200 : 404;

      if (status === 200) {
        const blogMatch = req.path.match(BLOG_ARTICLE_ROUTE);
        if (blogMatch) {
          const article = db.prepare('SELECT id, title, excerpt, content, image_url, created_at FROM articles WHERE id = ?').get(blogMatch[1]) as any;
          if (article) {
            const html = injectArticleMeta(indexHtmlTemplate, article);
            res.status(200).set('Content-Type', 'text/html; charset=utf-8').send(html);
            return;
          }
        }
      }

      res.status(status).sendFile(indexHtmlPath);
    });
  }

  const port = Number(PORT);
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
