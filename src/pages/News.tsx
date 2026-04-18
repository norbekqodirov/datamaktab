import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  useEffect(() => {
    fetch('/api/articles')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching articles:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-surface min-h-screen font-body text-on-surface pb-20">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover grayscale-[20%]" 
            src="https://picsum.photos/seed/news-hero/1920/1080" 
            alt="Yangiliklar va Maqolalar" 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm"></div>
        </div>
        <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-12 relative z-10">
          <div className="max-w-3xl mt-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 mb-6 text-[10px] tracking-[0.3em] font-bold text-white uppercase bg-secondary/20 backdrop-blur-md rounded-full">
                Blog
              </span>
              <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-tight mb-6">
                Yangiliklar va Maqolalar
              </h1>
              <p className="text-white/80 text-lg md:text-xl font-body leading-relaxed">
                Maktabimiz hayotidagi eng so'nggi yangiliklar, tadbirlar va ta'limga oid tahliliy maqolalar.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-screen-2xl mx-auto px-4 md:px-12 -mt-10 relative z-10">
        {loading ? (
          <div className="flex justify-center items-center h-64 bg-surface rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-slate-100">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center text-on-surface-muted py-32 bg-surface rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-slate-100">
            <h3 className="font-headline text-3xl font-extrabold text-primary mb-4">Hozircha yangiliklar yo'q</h3>
            <p>Tez orada yangi ma'lumotlar qo'shiladi.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, idx) => (
              <motion.div 
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-surface rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-slate-100 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-300 group flex flex-col"
              >
                <Link to={`/news/${article.id}`} className="block h-64 bg-slate-200 overflow-hidden relative">
                  {article.image_url ? (
                    <img 
                      src={article.image_url} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 bg-surface-muted">
                      Rasm yo'q
                    </div>
                  )}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-primary flex items-center gap-2 shadow-sm uppercase tracking-wider">
                    <Calendar size={14} />
                    {new Date(article.created_at).toLocaleDateString('uz-UZ')}
                  </div>
                </Link>
                
                <div className="p-8 flex flex-col flex-grow">
                  <Link to={`/news/${article.id}`}>
                    <h3 className="font-headline text-2xl font-extrabold text-primary mb-4 line-clamp-2 group-hover:text-secondary transition-colors leading-snug">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-on-surface-muted mb-8 line-clamp-3 flex-grow leading-relaxed">
                    {article.excerpt}
                  </p>
                  <Link 
                    to={`/news/${article.id}`} 
                    className="inline-flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-wider hover:text-primary transition-colors mt-auto"
                  >
                    Batafsil o'qish <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
