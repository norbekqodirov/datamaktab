import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LogOut, Plus, Edit, Trash2, FileText, Settings as SettingsIcon,
  LayoutDashboard, Users, MessageSquare, CheckCircle, XCircle,
  Home as HomeIcon, BookOpen, School, ClipboardList, Upload, Image, Save,
  ChevronRight, Bell, Menu, X, Pencil
} from 'lucide-react';
import { useEditMode } from '../context/EditModeContext';
import Home from './Home';
import About from './About';
import Education from './Education';
import Admission from './Admission';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// ────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────
function ImageUploader({ value, onChange, label }: { value: string; onChange: (url: string) => void; label: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      onChange(data.url);
    } catch (err) {
      alert("Yuklashda xatolik yuz berdi");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
      <div className="flex gap-3 items-start">
        {value && (
          <img
            src={value}
            alt="preview"
            className="w-20 h-20 object-cover rounded-xl border-2 border-slate-200 flex-shrink-0"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        )}
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="URL yoki pastdagi tugma orqali yuklang"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="button"
            onClick={() => ref.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
          >
            <Upload size={13} />
            {uploading ? 'Yuklanmoqda...' : 'Fayl yuklash'}
          </button>
          <input ref={ref} type="file" accept="image/*" hidden onChange={handleUpload} />
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, multiline = false }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      )}
    </div>
  );
}

function SaveBar({ onSave, saving, saved }: { onSave: () => void; saving: boolean; saved: boolean }) {
  return (
    <div className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-slate-100 py-4 px-8 flex justify-end gap-3 z-20">
      {saved && <span className="flex items-center gap-2 text-green-600 text-sm font-semibold"><CheckCircle size={16} /> Saqlandi!</span>}
      <button
        onClick={onSave}
        disabled={saving}
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#062bad] hover:bg-[#051fa0] text-white rounded-xl font-bold text-sm transition-colors shadow-md shadow-blue-900/20"
      >
        <Save size={16} /> {saving ? 'Saqlanmoqda...' : 'Saqlash'}
      </button>
    </div>
  );
}

// ────────────────────────────────────────────────
// Admin Root
// ────────────────────────────────────────────────
export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) setIsAuthenticated(true);
  }, []);

  const handleLogin = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        setError('');
      } else {
        setError("Noto'g'ri login yoki parol");
      }
    } catch (err: any) {
      setError('Xatolik: ' + (err.message || 'Server bilan muammo'));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    navigate('/maktabpanel');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#062bad] via-[#041c80] to-[#03caff]">
        <div className="w-full max-w-md mx-4">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
            <div className="text-center mb-8">
              <img src="/logo.svg" alt="DATA" className="h-12 mx-auto mb-4 brightness-0 invert" />
              <h1 className="text-2xl font-extrabold text-white">Admin Panelga Kirish</h1>
              <p className="text-white/60 text-sm mt-1">Saytni boshqarish uchun kiring</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-semibold mb-1.5">Login</label>
                <input
                  type="text" required value={username} onChange={e => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#03caff]/50"
                  placeholder="admin"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm font-semibold mb-1.5">Parol</label>
                <input
                  type="password" required value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#03caff]/50"
                  placeholder="••••••••"
                />
              </div>
              {error && <p className="text-red-300 text-sm bg-red-500/10 rounded-lg px-3 py-2">{error}</p>}
              <button
                type="submit"
                className="w-full py-3 bg-[#03caff] hover:bg-[#02b5e6] text-[#062bad] font-extrabold rounded-xl transition-colors shadow-lg shadow-[#03caff]/30"
              >
                Kirish
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const navLinks = [
    { path: '/maktabpanel', icon: <LayoutDashboard size={18} />, label: 'Dashboard', exact: true },
    { path: '/maktabpanel/content/home', icon: <HomeIcon size={18} />, label: 'Bosh sahifa' },
    { path: '/maktabpanel/content/about', icon: <School size={18} />, label: 'Maktab haqida' },
    { path: '/maktabpanel/content/education', icon: <BookOpen size={18} />, label: "Ta'lim" },
    { path: '/maktabpanel/content/admission', icon: <ClipboardList size={18} />, label: 'Qabul' },
    { path: '/maktabpanel/articles', icon: <FileText size={18} />, label: 'Yangiliklar' },
    { path: '/maktabpanel/settings', icon: <SettingsIcon size={18} />, label: 'Sozlamalar' },
  ];

  const isActive = (link: { path: string; exact?: boolean }) =>
    link.exact
      ? location.pathname === link.path
      : location.pathname.startsWith(link.path) && link.path !== '/maktabpanel';

  return (
    <div className="min-h-screen bg-slate-50 flex font-body">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'} flex-shrink-0 bg-[#062bad] text-white flex flex-col fixed h-full z-30 transition-all duration-300`}>
        <div className="p-5 border-b border-white/10 flex items-center gap-3">
          <img src="/logo.svg" alt="DATA" className="h-8 brightness-0 invert" />
          <span className="font-extrabold text-sm tracking-tight leading-tight">Admin Panel</span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive(link) || (link.exact && location.pathname === link.path)
                  ? 'bg-white/20 text-white shadow-inner'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-2 w-full px-3 py-2 text-red-300 hover:text-white hover:bg-red-500/20 rounded-xl text-sm font-semibold transition-colors">
            <LogOut size={16} /> Chiqish
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-100 px-6 py-3 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(o => !o)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            {location.pathname.split('/').filter(Boolean).map((seg, i, arr) => (
              <React.Fragment key={i}>
                <span className={i === arr.length - 1 ? 'text-[#062bad] font-bold capitalize' : 'capitalize'}>{seg.replace('maktabpanel', 'Admin')}</span>
                {i < arr.length - 1 && <ChevronRight size={14} />}
              </React.Fragment>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/" target="_blank" className="text-xs font-semibold text-slate-500 hover:text-[#062bad] transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100">
              Saytni ko'rish →
            </Link>
          </div>
        </header>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/content/home" element={<AdminPagePreview page="home" />} />
            <Route path="/content/about" element={<AdminPagePreview page="about" />} />
            <Route path="/content/education" element={<AdminPagePreview page="education" />} />
            <Route path="/content/admission" element={<AdminPagePreview page="admission" />} />

            <Route path="/articles" element={<ArticleList />} />
            <Route path="/article/new" element={<ArticleForm />} />
            <Route path="/article/edit/:id" element={<ArticleForm />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// Dashboard
// ────────────────────────────────────────────────
function Dashboard() {
  const [stats, setStats] = useState({ articles: 0 });

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(setStats).catch(console.error);
  }, []);

  const cards = [
    { icon: <FileText size={24} />, label: 'Yangiliklar', value: stats.articles, color: 'bg-purple-50 text-purple-700', link: '/maktabpanel/articles' },
  ];

  const contentPages = [
    { label: 'Bosh sahifa matnlari', icon: <HomeIcon size={18} />, link: '/maktabpanel/content/home' },
    { label: 'Maktab haqida', icon: <School size={18} />, link: '/maktabpanel/content/about' },
    { label: "Ta'lim tizimi", icon: <BookOpen size={18} />, link: '/maktabpanel/content/education' },
    { label: 'Qabul & Narxlar', icon: <ClipboardList size={18} />, link: '/maktabpanel/content/admission' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Xush kelibsiz, Admin! 👋</h1>
      <p className="text-slate-400 text-sm mb-8">Quyidagi paneldan saytni boshqaring.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {cards.map(c => (
          <Link to={c.link} key={c.label} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all group flex items-center gap-4">
            <div className={`${c.color} p-3 rounded-xl`}>{c.icon}</div>
            <div>
              <p className="text-3xl font-extrabold text-slate-900">{c.value}</p>
              <p className="text-sm text-slate-500 font-medium">{c.label}</p>
            </div>
            <ChevronRight size={16} className="text-slate-300 ml-auto group-hover:text-[#062bad] transition-colors" />
          </Link>
        ))}
      </div>

      <div>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Sahifa Mazmunini Tahrirlash</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contentPages.map(p => (
            <Link to={p.link} key={p.label} className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all group flex items-center gap-4">
              <div className="bg-[#062bad]/5 p-3 rounded-xl text-[#062bad]">{p.icon}</div>
              <span className="font-semibold text-slate-800 flex-1">{p.label}</span>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-[#062bad] transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// WYSIWYG Live Page Preview Editor
// ────────────────────────────────────────────────
function AdminPagePreview({ page }: { page: 'home' | 'about' | 'education' | 'admission' }) {
  const { setIsEditMode } = useEditMode();

  useEffect(() => {
    setIsEditMode(true);
    return () => setIsEditMode(false);
  }, [setIsEditMode]);

  return (
    <div className="bg-slate-200 min-h-screen relative overflow-hidden flex flex-col">
      <div className="sticky top-0 z-50 bg-[#03caff] text-white text-center py-2 px-4 shadow-md flex items-center justify-center gap-3">
        <Pencil size={18} className="animate-pulse" />
        <span className="font-extrabold text-sm uppercase tracking-widest">
          JONLI TAHRIRLASH REJIMI
        </span>
        <span className="text-white/80 text-xs ml-4 border-l border-white/20 pl-4">
          Matn yoki rasm ustiga bosing va o'zgartiring! Saqlangan ma'lumotlar to'g'ridan-to'g'ri bazaga yoziladi.
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Simulate a desktop window */}
        <div className="max-w-[1440px] mx-auto bg-white min-h-[1080px] shadow-2xl relative transition-all">
          {page === 'home' && <Home />}
          {page === 'about' && <About />}
          {page === 'education' && <Education />}
          {page === 'admission' && <Admission />}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// Settings
// ────────────────────────────────────────────────
function Settings() {
  const [settings, setSettings] = useState({ phone: '', email: '', address: '', instagram: '', facebook: '', telegram: '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(data => setSettings(prev => ({ ...prev, ...data }))).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch { alert('Xatolik yuz berdi'); }
    finally { setSaving(false); }
  };

  const fields = [
    { key: 'phone', label: 'Telefon raqam' },
    { key: 'email', label: 'Email' },
    { key: 'address', label: 'Manzil' },
    { key: 'instagram', label: 'Instagram URL' },
    { key: 'telegram', label: 'Telegram URL' },
    { key: 'facebook', label: 'Facebook URL' },
  ] as const;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-extrabold text-slate-900 mb-6">Sayt Sozlamalari</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          {fields.map(f => (
            <div key={f.key} className={f.key === 'address' ? 'md:col-span-2' : ''}>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{f.label}</label>
              <input
                type="text" value={(settings as any)[f.key]}
                onChange={e => setSettings({ ...settings, [f.key]: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#062bad] outline-none"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-3 pt-2">
          {saved && <span className="text-green-600 text-sm font-semibold flex items-center gap-1"><CheckCircle size={14}/> Saqlandi!</span>}
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-[#062bad] hover:bg-[#051fa0] text-white rounded-xl font-bold text-sm transition-colors">
            <Save size={16} /> {saving ? 'Saqlanmoqda...' : 'Saqlash'}
          </button>
        </div>
      </form>
    </div>
  );
}

// Enrollments & Messages removed — all leads sent directly to Durbin CRM

// ────────────────────────────────────────────────
// Articles
// ────────────────────────────────────────────────
function ArticleList() {
  const [articles, setArticles] = useState<any[]>([]);
  const navigate = useNavigate();
  const fetch_ = () => fetch('/api/articles').then(r => r.json()).then(setArticles).catch(console.error);
  useEffect(() => { fetch_(); }, []);
  const del = async (id: number) => {
    if (!confirm("O'chirilsinmi?")) return;
    await fetch(`/api/articles/${id}`, { method: 'DELETE' });
    fetch_();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Yangiliklar</h1>
        <Link to="/maktabpanel/article/new" className="flex items-center gap-2 px-4 py-2.5 bg-[#03caff] hover:bg-[#02b5e6] text-white rounded-xl text-sm font-bold transition-colors">
          <Plus size={16}/> Yangi qo'shish
        </Link>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3 text-left">Sarlavha</th>
              <th className="px-5 py-3 text-left">Sana</th>
              <th className="px-5 py-3 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {articles.map(article => (
              <tr key={article.id} className="hover:bg-slate-50/50 text-sm">
                <td className="px-5 py-3 font-semibold text-slate-800">{article.title}</td>
                <td className="px-5 py-3 text-slate-400 text-xs">{new Date(article.created_at).toLocaleDateString('uz-UZ')}</td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={() => navigate(`/maktabpanel/article/edit/${article.id}`)} className="text-[#062bad] hover:text-[#051fa0]"><Edit size={16}/></button>
                    <button onClick={() => del(article.id)} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
            {!articles.length && <tr><td colSpan={3} className="px-5 py-10 text-center text-slate-400">Hozircha yangiliklar yo'q</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ArticleForm() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const isEdit = window.location.pathname.includes('/edit/');
  const id = isEdit ? window.location.pathname.split('/').pop() : null;

  useEffect(() => {
    if (isEdit && id) {
      fetch(`/api/articles/${id}`).then(r => r.json()).then(d => {
        setTitle(d.title); setExcerpt(d.excerpt); setContent(d.content); setImageUrl(d.image_url || '');
      }).catch(console.error);
    }
  }, [isEdit, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = isEdit ? `/api/articles/${id}` : '/api/articles';
    const method = isEdit ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, excerpt, content, image_url: imageUrl }) });
      if (!res.ok) throw new Error();
      navigate('/maktabpanel/articles');
    } catch { alert('Xatolik yuz berdi'); }
    finally { setSaving(false); }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/maktabpanel/articles')} className="text-slate-400 hover:text-slate-700 transition-colors"><X size={20}/></button>
        <h1 className="text-2xl font-extrabold text-slate-900">{isEdit ? 'Yangilikni Tahrirlash' : "Yangi Yangilik"}</h1>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Sarlavha</label>
          <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#062bad] outline-none" />
        </div>
        <ImageUploader label="Muqova rasmi" value={imageUrl} onChange={setImageUrl} />
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Qisqacha mazmun</label>
          <textarea required rows={3} value={excerpt} onChange={e => setExcerpt(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#062bad] outline-none resize-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">To'liq matn</label>
          <div className="bg-white rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-[#062bad] focus-within:border-[#062bad] overflow-hidden">
            <ReactQuill theme="snow" value={content} onChange={setContent} className="custom-quill" />
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-[#062bad] hover:bg-[#051fa0] text-white rounded-xl font-bold text-sm transition-colors">
            <Save size={16}/> {saving ? 'Yuklanmoqda...' : (isEdit ? 'Saqlash' : "Qo'shish")}
          </button>
        </div>
      </form>
    </div>
  );
}
