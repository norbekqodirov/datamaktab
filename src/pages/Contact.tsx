import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-surface min-h-screen font-body text-on-surface pb-20">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover grayscale-[20%]" 
            src="https://picsum.photos/seed/contact-hero/1920/1080" 
            alt="Biz bilan bog'laning" 
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
                Aloqa
              </span>
              <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-tight mb-6">
                Biz bilan bog'laning
              </h1>
              <p className="text-white/80 text-lg md:text-xl font-body leading-relaxed">
                Savollaringiz bormi? Biz sizga yordam berishdan xursandmiz.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-screen-2xl mx-auto px-4 md:px-12 -mt-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Info */}
          <div className="bg-surface p-10 md:p-14 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-slate-100">
            <h2 className="font-headline text-3xl font-extrabold text-primary mb-10">Aloqa ma'lumotlari</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="font-headline font-extrabold text-primary text-xl mb-2">Manzil</h3>
                  <p className="text-on-surface-muted leading-relaxed">Xorazm viloyati, Urganch tumani, Oyoqbog' MFY, Xiva shox ko'cha</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                  <Phone size={28} />
                </div>
                <div>
                  <h3 className="font-headline font-extrabold text-primary text-xl mb-2">Telefon</h3>
                  <a href="tel:+998556020055" className="text-on-surface-muted hover:text-secondary transition-colors font-medium">55 602 00 55</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="font-headline font-extrabold text-primary text-xl mb-2">Email</h3>
                  <a href="mailto:info@datamaktab.uz" className="text-on-surface-muted hover:text-secondary transition-colors font-medium">info@datamaktab.uz</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                  <Clock size={28} />
                </div>
                <div>
                  <h3 className="font-headline font-extrabold text-primary text-xl mb-2">Ish vaqti</h3>
                  <p className="text-on-surface-muted mb-1">Dushanba - Juma: 09:00 - 18:00</p>
                  <p className="text-on-surface-muted">Shanba: 09:00 - 15:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-primary text-white p-10 md:p-14 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.04)] relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[200px]">mail</span>
            </div>
            <h2 className="font-headline text-3xl font-extrabold mb-10 relative z-10">Xabar yuborish</h2>
            <form className="space-y-6 relative z-10" onSubmit={async (e) => { 
              e.preventDefault(); 
              const formData = new FormData(e.currentTarget);
              const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                message: formData.get('message')
              };
              try {
                const res = await fetch('/api/messages', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data)
                });
                if (res.ok) {
                  alert("Xabaringiz yuborildi!");
                  (e.target as HTMLFormElement).reset();
                } else {
                  alert("Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
                }
              } catch (err) {
                console.error(err);
                alert("Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
              }
            }}>
              <div>
                <label className="block text-sm font-bold text-white/80 mb-2 uppercase tracking-wider">Ismingiz</label>
                <input type="text" name="name" required className="w-full px-5 py-4 rounded-2xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all backdrop-blur-sm" placeholder="Ismingizni kiriting" />
              </div>
              <div>
                <label className="block text-sm font-bold text-white/80 mb-2 uppercase tracking-wider">Telefon raqam</label>
                <input type="tel" name="phone" required className="w-full px-5 py-4 rounded-2xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all backdrop-blur-sm" placeholder="+998 90 123 45 67" />
              </div>
              <div>
                <label className="block text-sm font-bold text-white/80 mb-2 uppercase tracking-wider">Xabar</label>
                <textarea name="message" required rows={4} className="w-full px-5 py-4 rounded-2xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all resize-none backdrop-blur-sm" placeholder="Xabaringizni yozing..."></textarea>
              </div>
              <button type="submit" className="w-full editorial-gradient text-white py-4 rounded-2xl font-manrope font-bold uppercase tracking-wider text-sm transition-all hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] mt-4">
                Yuborish
              </button>
            </form>
            
            <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
              <p className="text-white/80 mb-6 font-bold text-sm uppercase tracking-wider">Ijtimoiy tarmoqlar</p>
              <div className="flex gap-4">
                <a href="https://instagram.com/data_maktab" target="_blank" rel="noreferrer" className="bg-white/10 p-4 rounded-2xl hover:bg-secondary hover:-translate-y-1 transition-all duration-300">
                  <Instagram size={24} />
                </a>
                <a href="#" className="bg-white/10 p-4 rounded-2xl hover:bg-secondary hover:-translate-y-1 transition-all duration-300">
                  <Facebook size={24} />
                </a>
                <a href="#" className="bg-white/10 p-4 rounded-2xl hover:bg-secondary hover:-translate-y-1 transition-all duration-300">
                  <Youtube size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-slate-100 h-[500px]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.498424074211!2d60.6215!3d41.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDMzJzAwLjAiTiA2MMKwMzcnMTcuNCJF!5e0!3m2!1sen!2s!4v1630000000000!5m2!1sen!2s" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy"
            title="DATA Maktabi Xaritada"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
