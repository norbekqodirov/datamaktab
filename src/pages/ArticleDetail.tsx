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
    <div className="bg-surface pt-28 pb-24 min-h-screen font-body">
      {/* Hero */}
      {article.image_url && (
        <div className="relative h-[50vh] min-h-[380px] overflow-hidden mb-0">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-primary/80" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-on-surface-muted hover:text-primary transition-colors font-semibold text-sm py-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          {t.news.title}
        </Link>

        {/* Article Card */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
        >
          <div className="p-8 md:p-12">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-full text-xs font-extrabold uppercase tracking-widest">
                <Calendar size={13} />
                {new Date(article.created_at).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-xs font-extrabold uppercase tracking-widest">
                <Clock size={13} />
                {readTimeMin} min
              </span>
            </div>

            {/* Title */}
            <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-primary leading-tight mb-6">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-on-surface-muted text-lg leading-relaxed mb-10 border-l-4 border-secondary pl-6 italic">
                {article.excerpt}
              </p>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none text-on-surface leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>
          </div>
        </motion.article>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-bold group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {t.news.title}
          </Link>
          <button
            onClick={() => window.dispatchEvent(new Event('open-enroll-modal'))}
            className="btn-primary px-8 py-3.5 rounded-full text-xs font-extrabold uppercase tracking-widest"
          >
            {t.nav.enroll}
          </button>
        </div>
      </div>
    </div>
  );
}
