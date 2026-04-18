import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Asosiy', path: '/' },
    { name: 'Maktab haqida', path: '/maktab-haqida' },
    { name: 'Ta\'lim', path: '/talim' },
    { name: 'Qabul', path: '/qabul' },
    { name: 'Blog', path: '/blog' },
    { name: 'Aloqa', path: '/aloqa' },
  ];

  const isHome = location.pathname === '/';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || !isHome ? 'glass-panel py-3 shadow-[0_4px_30px_rgba(0,0,0,0.05)] bg-white/80' : 'bg-transparent py-6'}`}>
      <div className="flex justify-between items-center px-6 md:px-16 w-full max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.svg" 
            alt="DATA Maktabi" 
            className={`h-[1.75rem] md:h-[2.25rem] w-auto transition-all duration-300 ${!scrolled && isHome ? 'brightness-0 invert drop-shadow-md' : 'drop-shadow-sm'}`} 
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-2 font-body font-semibold text-[13px] tracking-wide uppercase transition-all duration-300 rounded-full ${
                  isActive 
                    ? (scrolled || !isHome ? 'bg-primary/5 text-primary' : 'bg-white/20 text-white')
                    : (scrolled || !isHome ? 'text-on-surface-muted hover:bg-slate-100 hover:text-primary' : 'text-white/80 hover:bg-white/10 hover:text-white')
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <a href="tel:+998556020055" className={`flex items-center gap-2 font-headline font-bold text-sm tracking-widest transition-colors ${scrolled || !isHome ? 'text-primary hover:text-secondary' : 'text-white hover:text-secondary-light'}`}>
            <Phone size={18} strokeWidth={2.5} />
            <span>+998 55 602 00 55</span>
          </a>
          <button 
            onClick={() => window.dispatchEvent(new Event('open-enroll-modal'))}
            className="btn-primary px-8 py-3.5 text-xs tracking-[0.15em] uppercase hover:scale-105"
          >
            Ariza qoldirish
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`transition-colors p-2 ${scrolled || !isHome ? 'text-primary' : 'text-white'}`}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
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
                  key={link.name}
                  to={link.path}
                  className={`block px-6 py-4 rounded-2xl font-headline font-bold uppercase text-sm tracking-widest transition-all ${
                    isActive 
                      ? 'editorial-gradient text-white shadow-lg' 
                      : 'text-on-surface-muted bg-surface/50 hover:bg-surface hover:text-primary'
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
                onClick={() => {
                  setIsOpen(false);
                  window.dispatchEvent(new Event('open-enroll-modal'));
                }}
                className="w-full btn-primary px-6 py-5 rounded-2xl text-sm tracking-widest uppercase"
              >
                Ariza qoldirish
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
