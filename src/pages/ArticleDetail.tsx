import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, ArrowLeft } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/articles/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-slate-50">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Maqola topilmadi</h2>
        <Link to="/news" className="text-secondary hover:text-primary font-bold flex items-center gap-2 transition-colors">
          <ArrowLeft size={20} /> Yangiliklarga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 pt-32 pb-20 min-h-screen font-sans">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-12">
        <Link to="/news" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 font-semibold">
          <ArrowLeft size={20} /> Barcha maqolalar
        </Link>
        
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
        >
          <header className="mb-10">
            <div className="inline-flex items-center gap-2 text-primary font-semibold mb-6 bg-blue-50 px-4 py-2 rounded-lg text-sm">
              <Calendar size={16} />
              {new Date(article.created_at).toLocaleDateString('uz-UZ', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
              {article.title}
            </h1>
          </header>

          {article.image_url && (
            <div className="mb-12 rounded-2xl overflow-hidden border border-slate-100">
              <img 
                src={article.image_url} 
                alt={article.title} 
                className="w-full h-auto max-h-[500px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
            {article.content}
          </div>
        </motion.article>
      </div>
    </div>
  );
}
