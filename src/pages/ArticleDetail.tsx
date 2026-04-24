import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

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
    <>
    <SEO
      title={article.title}
      description={article.excerpt.slice(0, 160)}
      url={`/news/${article.id}`}
      image={article.image_url || undefined}
    />
    <div className="bg-white min-h-screen font-body pb-24">
      <div className="max-w-[800px] mx-auto px-6 pt-32">
        {/* Top Nav / Back */}
        <div className="pb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-semibold text-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {t.news.title}
          </Link>
        </div>

        {/* Header Section */}
        <header className="mb-8 text-left">
          <div className="flex flex-wrap items-center justify-start gap-4 mb-6">
            <span className="inline-flex items-center gap-1.5 text-primary text-xs font-extrabold uppercase tracking-widest bg-primary/5 px-3 py-1.5 rounded-full">
              <Calendar size={14} />
              {new Date(article.created_at).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <Clock size={14} />
              {readTimeMin} daqiqa
            </span>
          </div>

          <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-slate-900 leading-[1.2] mb-6 tracking-tight">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed mb-8 border-l-4 border-primary/20 pl-5 py-1">
              {article.excerpt}
            </p>
          )}
        </header>

        {/* Hero Image */}
        {article.image_url && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full aspect-[16/9] mb-12 rounded-2xl overflow-hidden bg-slate-100 shadow-xl"
          >
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Content Section */}
        <div 
          className="prose prose-slate prose-lg md:prose-lg max-w-none text-slate-800 leading-loose
                     prose-headings:font-headline prose-headings:font-bold prose-headings:tracking-tight 
                     prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-slate-900
                     prose-a:text-[#062bad] prose-a:underline-offset-4 hover:prose-a:text-blue-700
                     prose-img:rounded-xl prose-img:shadow-md prose-img:my-8 prose-img:w-full
                     prose-strong:text-slate-900 prose-ul:list-disc prose-ul:marker:text-[#062bad]
                     prose-li:my-2 prose-p:my-5 text-justify md:text-left"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Footer CTA */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-6 items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {t.news.title}
          </Link>
          <button
            onClick={() => window.dispatchEvent(new Event('open-enroll-modal'))}
            className="btn-primary px-8 py-3.5 rounded-full text-xs font-extrabold uppercase tracking-widest shadow-xl shadow-primary/20"
          >
            {t.nav.enroll}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
