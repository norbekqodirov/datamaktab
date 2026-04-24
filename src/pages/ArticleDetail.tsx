import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  created_at: string;
}

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetch(`/api/articles/${id}`)
      .then(res => { if (!res.ok) throw new Error('Not found'); return res.json(); })
      .then(data => { setArticle(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-surface">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-surface">
        <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-primary/30 text-4xl">article</span>
        </div>
        <h2 className="font-headline text-3xl font-extrabold text-primary mb-4">Maqola topilmadi</h2>
        <Link to="/blog" className="inline-flex items-center gap-2 text-secondary hover:text-primary font-bold transition-colors">
          <ArrowLeft size={18} /> {t.news.title}
        </Link>
      </div>
    );
  }

  const readTimeMin = Math.max(1, Math.ceil(article.content.split(' ').length / 200));

  return (
    <div className="bg-white min-h-screen font-body pb-24">
      {/* Top Nav / Back */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 pt-32 pb-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-semibold text-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          {t.news.title}
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Header Section */}
        <header className="mb-10 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
            <span className="inline-flex items-center gap-1.5 text-primary text-sm font-extrabold uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-md">
              <Calendar size={14} />
              {new Date(article.created_at).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-400 text-sm font-bold uppercase tracking-widest">
              <Clock size={14} />
              {readTimeMin} min
            </span>
          </div>

          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed mb-8">
              {article.excerpt}
            </p>
          )}
        </header>
      </article>

      {/* Hero Image */}
      {article.image_url && (
        <div className="max-w-5xl mx-auto px-4 md:px-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full aspect-video md:aspect-[21/9] rounded-2xl md:rounded-[2rem] overflow-hidden bg-slate-100 shadow-2xl shadow-slate-200/50"
          >
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      )}

      {/* Content Section */}
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <div 
          className="prose prose-slate prose-lg md:prose-xl max-w-none text-slate-800 leading-relaxed 
                     prose-headings:font-headline prose-headings:font-bold prose-headings:tracking-tight 
                     prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                     prose-a:text-[#062bad] prose-a:underline-offset-4 hover:prose-a:text-blue-700
                     prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-10 prose-img:mx-auto
                     prose-strong:text-slate-900 prose-ul:list-disc prose-ul:marker:text-[#062bad]
                     prose-li:my-2 prose-p:my-6"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Footer CTA */}
        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col sm:flex-row gap-6 items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {t.news.title}
          </Link>
          <button
            onClick={() => window.dispatchEvent(new Event('open-enroll-modal'))}
            className="btn-primary px-10 py-4 rounded-full text-sm font-extrabold uppercase tracking-widest shadow-xl shadow-[#03caff]/20"
          >
            {t.nav.enroll}
          </button>
        </div>
      </div>
    </div>
  );
}
