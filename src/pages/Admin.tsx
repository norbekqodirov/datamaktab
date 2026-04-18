import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Plus, Edit, Trash2, FileText, Settings as SettingsIcon, LayoutDashboard, Users, MessageSquare, CheckCircle, XCircle } from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
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
        navigate('/maktabpanel');
      } else {
        setError("Noto'g'ri login yoki parol");
      }
    } catch (err: any) {
      setError('Xatolik yuz berdi: ' + (err.message || 'Noma\'lum xato'));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    navigate('/maktabpanel');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
            Admin Panelga Kirish
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Login</label>
                <div className="mt-1">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Parol</label>
                <div className="mt-1">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                  />
                </div>
              </div>

              {error && <div className="text-red-600 text-sm">{error}</div>}

              <div>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Kirish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const navLinks = [
    { path: '/maktabpanel', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/maktabpanel/enrollments', icon: <Users size={20} />, label: 'Arizalar' },
    { path: '/maktabpanel/messages', icon: <MessageSquare size={20} />, label: 'Xabarlar' },
    { path: '/maktabpanel/articles', icon: <FileText size={20} />, label: 'Yangiliklar' },
    { path: '/maktabpanel/settings', icon: <SettingsIcon size={20} />, label: 'Sozlamalar' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-primary text-white flex flex-col fixed h-full">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold">DATA Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/maktabpanel' && location.pathname.startsWith(link.path));
            return (
              <Link 
                key={link.path}
                to={link.path} 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'}`}
              >
                {link.icon} {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 w-full text-left text-red-300 hover:text-red-100 hover:bg-white/5 rounded-lg transition-colors"
          >
            <LogOut size={20} /> Chiqish
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 overflow-auto min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/enrollments" element={<EnrollmentsList />} />
          <Route path="/messages" element={<MessagesList />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/article/new" element={<ArticleForm />} />
          <Route path="/article/edit/:id" element={<ArticleForm />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState({ articles: 0, enrollments: 0, messages: 0 });

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-full text-primary">
            <Users size={32} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Jami Arizalar</p>
            <p className="text-3xl font-bold text-gray-900">{stats.enrollments}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="bg-green-100 p-4 rounded-full text-green-600">
            <MessageSquare size={32} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Yangi Xabarlar</p>
            <p className="text-3xl font-bold text-gray-900">{stats.messages}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="bg-purple-100 p-4 rounded-full text-purple-600">
            <FileText size={32} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Jami Yangiliklar</p>
            <p className="text-3xl font-bold text-gray-900">{stats.articles}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnrollmentsList() {
  const [enrollments, setEnrollments] = useState<any[]>([]);

  const fetchEnrollments = () => {
    fetch('/api/enrollments')
      .then(res => res.json())
      .then(data => setEnrollments(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/enrollments/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchEnrollments();
    } catch (err) {
      console.error(err);
      alert("Xatolik yuz berdi");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Rostdan ham o'chirmoqchimisiz?")) {
      await fetch(`/api/enrollments/${id}`, { method: 'DELETE' });
      fetchEnrollments();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Arizalar</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">O'quvchi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sinf / Til</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ota-ona / Tel</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manba</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Sana</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amallar</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {enrollments.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.child_name}</div>
                  <div className="text-xs text-gray-500">{item.birth_date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.grade}</div>
                  <div className="text-xs text-gray-500">{item.language}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.parent_name}</div>
                  <div className="text-xs text-gray-500">{item.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.source}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'QABUL_QILINDI' ? 'bg-green-100 text-green-800' : 
                    item.status === 'RAD_ETILDI' ? 'bg-red-100 text-red-800' : 
                    item.status === 'KORIB_CHIQILMOQDA' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  {new Date(item.created_at).toLocaleDateString('uz-UZ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {item.status === 'YANGI' && (
                    <>
                      <button onClick={() => updateStatus(item.id, 'KORIB_CHIQILMOQDA')} className="text-blue-600 hover:text-blue-900 mr-3" title="Ko'rib chiqish">
                        <CheckCircle size={18} />
                      </button>
                    </>
                  )}
                  {item.status === 'KORIB_CHIQILMOQDA' && (
                    <>
                      <button onClick={() => updateStatus(item.id, 'QABUL_QILINDI')} className="text-green-600 hover:text-green-900 mr-3" title="Qabul qilish">
                        <CheckCircle size={18} />
                      </button>
                      <button onClick={() => updateStatus(item.id, 'RAD_ETILDI')} className="text-red-600 hover:text-red-900 mr-3" title="Rad etish">
                        <XCircle size={18} />
                      </button>
                    </>
                  )}
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900" title="O'chirish">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {enrollments.length === 0 && (
              <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-500">Hozircha arizalar yo'q</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MessagesList() {
  const [messages, setMessages] = useState<any[]>([]);

  const fetchMessages = () => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Rostdan ham o'chirmoqchimisiz?")) {
      await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      fetchMessages();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Xabarlar</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ism</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefon</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Xabar</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Sana</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amallar</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {messages.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{item.message}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  {new Date(item.created_at).toLocaleDateString('uz-UZ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Hozircha xabarlar yo'q</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Settings() {
  const [settings, setSettings] = useState({
    phone: '',
    email: '',
    address: '',
    instagram: '',
    facebook: '',
    telegram: ''
  });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(prev => ({ ...prev, ...data }));
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        alert("Sozlamalar saqlandi!");
      }
    } catch (err) {
      console.error(err);
      alert("Xatolik yuz berdi");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Sayt Sozlamalari</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon raqam</label>
            <input type="text" value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary outline-none" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Manzil</label>
            <input type="text" value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
            <input type="text" value={settings.instagram} onChange={e => setSettings({...settings, instagram: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telegram URL</label>
            <input type="text" value={settings.telegram} onChange={e => setSettings({...settings, telegram: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
            <input type="text" value={settings.facebook} onChange={e => setSettings({...settings, facebook: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary outline-none" />
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold transition-colors">
            Saqlash
          </button>
        </div>
      </form>
    </div>
  );
}

function ArticleList() {
  const [articles, setArticles] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchArticles = () => {
    fetch('/api/articles')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setArticles(data))
      .catch(err => console.error("Error fetching articles:", err));
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Rostdan ham o'chirmoqchimisiz?")) {
      await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      fetchArticles();
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Yangiliklar</h1>
        <Link 
          to="/maktabpanel/article/new" 
          className="bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={20} /> Yangi qo'shish
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sarlavha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sana</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amallar</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{article.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{new Date(article.created_at).toLocaleDateString('uz-UZ')}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => navigate(`/maktabpanel/article/edit/${article.id}`)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(article.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  Hozircha yangiliklar yo'q
                </td>
              </tr>
            )}
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
  const navigate = useNavigate();
  const isEdit = window.location.pathname.includes('/edit/');
  const id = isEdit ? window.location.pathname.split('/').pop() : null;

  useEffect(() => {
    if (isEdit && id) {
      fetch(`/api/articles/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.json();
        })
        .then(data => {
          setTitle(data.title);
          setExcerpt(data.excerpt);
          setContent(data.content);
          setImageUrl(data.image_url || '');
        })
        .catch(err => console.error("Error fetching article:", err));
    }
  }, [isEdit, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEdit ? `/api/articles/${id}` : '/api/articles';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, excerpt, content, image_url: imageUrl })
      });
      if (!res.ok) throw new Error('Network response was not ok');
      navigate('/maktabpanel/articles');
    } catch (err) {
      console.error("Error saving article:", err);
      alert("Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{isEdit ? 'Yangilikni Tahrirlash' : "Yangi Yangilik Qo'shish"}</h1>
        <button 
          onClick={() => navigate('/maktabpanel/articles')}
          className="text-gray-600 hover:text-gray-900"
        >
          Orqaga
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sarlavha</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rasm URL (ixtiyoriy)</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Qisqacha mazmun (Excerpt)</label>
          <textarea
            required
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To'liq matn</label>
          <textarea
            required
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold transition-colors"
          >
            {isEdit ? 'Saqlash' : "Qo'shish"}
          </button>
        </div>
      </form>
    </div>
  );
}
