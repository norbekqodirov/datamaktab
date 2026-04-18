import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Instagram, Send, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white border-t border-primary-light relative overflow-hidden mt-20">
      <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="w-full max-w-[1440px] px-6 md:px-16 mx-auto pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-4 max-w-sm">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="/logo.svg" 
                alt="DATA Maktabi" 
                className="h-10 md:h-12 w-auto brightness-0 invert drop-shadow" 
              />
            </Link>
            <p className="text-white/70 font-body text-sm leading-relaxed mb-8">
              "Bilimga to'ldiramiz!" Xorazmdagi eng innovatsion xalqaro maktab. "DATA Ta'lim Stansiyasi" MChJ tarkibida yuridik maqomda faoliyat yuritadi. CIS va Cambridge xalqaro maktab tarmog'i nomzodi.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition-colors">
                <Send size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-headline font-bold uppercase tracking-widest text-xs mb-6 text-secondary-light">Menyu</h4>
            <ul className="space-y-4">
              <li><Link to="/maktab-haqida" className="text-white/70 hover:text-white transition-colors text-sm font-semibold">Maktab haqida</Link></li>
              <li><Link to="/talim" className="text-white/70 hover:text-white transition-colors text-sm font-semibold">Ta'lim</Link></li>
              <li><Link to="/qabul" className="text-white/70 hover:text-white transition-colors text-sm font-semibold">Qabul</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-headline font-bold uppercase tracking-widest text-xs mb-6 text-secondary-light">Bog'lanish</h4>
            <ul className="space-y-5 text-sm text-white/70 font-semibold">
              <li className="flex items-start gap-4 hover:text-white transition-colors">
                <MapPin className="text-secondary shrink-0 mt-0.5" size={18} />
                <span>Xorazm viloyati, Urganch tumani. Oyoqbog' MFY, Xiva shox ko'cha</span>
              </li>
              <li className="flex items-center gap-4 hover:text-white transition-colors">
                <Phone className="text-secondary shrink-0" size={18} />
                <a href="tel:+998556020055">+998 55 602 00 55</a>
              </li>
              <li className="flex items-center gap-4 hover:text-white transition-colors">
                <Mail className="text-secondary shrink-0" size={18} />
                <a href="mailto:info@datamaktab.uz">info@datamaktab.uz</a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
               <h4 className="font-headline font-bold uppercase tracking-widest text-xs mb-4 text-white">Yangi 2026-2027 O'quv yili</h4>
               <p className="text-sm text-white/70 mb-6 font-semibold">Qabul jarayoni 10% gacha chegirmani taqdim etmoqda.</p>
               <button onClick={() => window.dispatchEvent(new Event('open-enroll-modal'))} className="w-full bg-secondary hover:bg-secondary-light text-primary py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors">
                 Ariza qoldirish
               </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold tracking-widest uppercase text-white/50">
          <p>&copy; {new Date().getFullYear()} DATA Xalqaro Maktabi. Barcha huquqlar himoyalangan.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Maxfiylik siyosati</a>
            <a href="#" className="hover:text-white transition-colors">Foydalanish shartlari</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
