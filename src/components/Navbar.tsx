import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { useLanguage, type Lang } from '../context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.about, path: '/maktab-haqida' },
    { name: t.nav.education, path: '/talim' },
    { name: t.nav.admission, path: '/qabul' },
    { name: t.nav.blog, path: '/blog' },
    { name: t.nav.contact, path: '/aloqa' },
  ];

  const isHome = location.pathname === '/';
  const isLight = scrolled || !isHome;

  const langs: { code: Lang; label: string }[] = [
    { code: 'uz', label: 'UZ' },
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${isLight ? 'glass-panel py-3 shadow-[0_4px_30px_rgba(0,0,0,0.05)] bg-white/80' : 'bg-transparent py-6'}`}
      >
        <div className="flex justify-between items-center px-6 md:px-16 w-full max-w-[1440px] mx-auto gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src="/logo.svg"
              alt="DATA Maktabi"
              className={`h-[1.75rem] md:h-[2.25rem] w-auto transition-all duration-300 ${!isLight ? 'brightness-0 invert drop-shadow-md' : 'drop-shadow-sm'}`}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 font-body font-semibold text-[12px] tracking-wide uppercase transition-all duration-300 rounded-full whitespace-nowrap ${
                    isActive
                      ? (isLight ? 'bg-primary/5 text-primary' : 'bg-white/20 text-white')
                      : (isLight ? 'text-on-surface-muted hover:bg-slate-100 hover:text-primary' : 'text-white/80 hover:bg-white/10 hover:text-white')
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right: Lang + Phone + CTA */}
          <div className="hidden lg:flex items-center gap-5 lg:gap-6 flex-shrink-0">
            {/* Language Switcher */}
            <div className="relative group">
              <button className={`flex items-center gap-1 py-2 text-[12px] font-extrabold tracking-widest transition-all hover:opacity-70 ${isLight ? 'text-[#062bad]' : 'text-white'}`}>
                {langs.find(l => l.code === lang)?.label}
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              <div className="absolute top-full right-0 mt-2 min-w-[80px] flex flex-col bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                {langs.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    className={`px-4 py-2.5 text-left text-[11px] font-extrabold tracking-widest transition-colors ${lang === code ? 'text-white bg-[#062bad]' : 'text-slate-500 hover:bg-slate-50 hover:text-[#062bad]'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <a
              href="tel:+998556020055"
              className={`flex items-center gap-2 font-headline font-bold text-sm tracking-widest transition-colors ${isLight ? 'text-primary hover:text-secondary' : 'text-white hover:text-secondary-light'}`}
            >
              <Phone size={16} strokeWidth={2.5} />
            </a>
            <button
              onClick={() => window.dispatchEvent(new Event('open-enroll-modal'))}
              className="btn-primary px-6 py-3 text-[11px] tracking-[0.15em] uppercase hover:scale-105"
            >
              {t.nav.enroll}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile language switcher */}
            <div className="relative group">
              <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold transition-all ${isLight ? 'border-slate-200 text-[#062bad] bg-slate-50' : 'border-white/20 text-white bg-white/5'}`}>
                {langs.find(l => l.code === lang)?.label}
                <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              <div className="absolute top-full left-0 mt-1.5 min-w-[70px] flex flex-col bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-[60]">
                {langs.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    className={`px-3 py-2 text-center text-[10px] font-bold transition-colors border-b last:border-b-0 border-slate-100 ${lang === code ? 'text-white bg-[#062bad]' : 'text-slate-600 hover:bg-slate-50 hover:text-[#062bad]'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors p-2 ${isLight ? 'text-primary' : 'text-white'}`}
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full glass-panel shadow-xl max-h-[85vh] overflow-y-auto anim-slide-up">
            <div className="px-6 pt-4 pb-10 space-y-3">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-6 py-4 rounded-2xl font-headline font-bold uppercase text-sm tracking-widest transition-all ${
                      isActive ? 'editorial-gradient text-white shadow-lg' : 'text-on-surface-muted bg-surface/50 hover:bg-surface hover:text-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-8 mt-6 border-t border-slate-200/50 flex flex-col gap-4">
                <a href="tel:+998556020055" className="flex items-center justify-center gap-3 text-primary font-headline font-bold text-sm tracking-widest bg-primary/5 py-4 rounded-2xl">
                  <Phone size={20} />
                  <span>+998 55 602 00 55</span>
                </a>
                <button
                  onClick={() => { setIsOpen(false); window.dispatchEvent(new Event('open-enroll-modal')); }}
                  className="w-full btn-primary px-6 py-5 rounded-2xl text-sm tracking-widest uppercase"
                >
                  {t.nav.enroll}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
