import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  created_at: string;
}

export default function News() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetch('/api/articles')
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(data => { setArticles(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-surface min-h-screen font-body text-on-surface pb-20">
      {/* Hero */}
      <section className="relative h-auto pt-28 pb-10 md:pt-36 md:pb-14 overflow-hidden flex flex-col justify-end">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#041c80] to-secondary" />
        <div className="absolute top-16 right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 relative z-10 pb-14">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-[11px] font-extrabold tracking-[0.25em] text-secondary uppercase mb-4">DATA Maktabi</span>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tighter">{t.news.title}</h1>
            <p className="mt-3 text-white/80 text-lg max-w-xl">{t.news.desc}</p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          {loading ? (
            <div className="flex justify-center py-12 md:py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#062bad]" />
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12 md:py-16 text-on-surface-muted font-semibold text-lg">{t.news.empty}</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, idx) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group flex flex-col"
                >
                  <Link to={`/blog/${article.id}`} className="block h-52 bg-slate-100 overflow-hidden relative">
                    {article.image_url ? (
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary/30 text-6xl">article</span>
                      </div>
                    )}
                  </Link>
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-on-surface-muted text-xs font-semibold mb-4">
                      <Calendar size={13} />
                      {new Date(article.created_at).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <h2 className="font-headline font-extrabold text-xl text-primary mb-3 leading-snug line-clamp-2 flex-1">
                      {article.title}
                    </h2>
                    <p className="text-on-surface-muted text-sm leading-relaxed mb-6 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <Link
                      to={`/blog/${article.id}`}
                      className="inline-flex items-center gap-2 font-headline font-bold text-sm text-[#062bad] hover:text-secondary transition-colors group/link"
                    >
                      {t.news.read_more}
                      <ArrowRight size={15} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
