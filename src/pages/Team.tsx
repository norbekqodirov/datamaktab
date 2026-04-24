import { motion } from 'motion/react';
import { Users, UserCheck, GraduationCap, Award, Globe } from 'lucide-react';
import SEO from '../components/SEO';

export default function Team() {
  const management = [
    { name: "Nilufar Kalandarova", role: "O'quv va akademik ishlar bo'yicha direktorning birinchi o'rinbosari" },
    { name: "Quvondiq Hakimov", role: "Yoshlar va ma'naviy-ma'rifiy ishlar bo'yicha o'rinbosar" },
    { name: "Zafarbek Ro'zmetov", role: "HR direktor" },
    { name: "Abror Rajabboyev", role: "Xo'jalik ishlari bo'lim rahbari" },
    { name: "Jasur Atadjanov", role: "Marketing bo'limi rahbari" },
    { name: "Asal Qalandarova", role: "Qabul bo'limi rahbari" }
  ];

  const englishTeachers = [
    { name: "Durbiboyev Malik", score: "IELTS 8.0" },
    { name: "Nodira Abdullayeva", score: "IELTS 8.0" },
    { name: "Hikmatjon Raxmonov", score: "IELTS 7.5" },
    { name: "Maftuna Zokirboeva", score: "IELTS 7.5" },
    { name: "Rohila Solayeva", score: "IELTS 7.5" },
    { name: "Sanjar Madraximov", score: "IELTS 8.5, CELTA" }
  ];

  return (
    <div className="bg-surface font-body text-on-surface pb-20">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden flex items-center">
        <SEO url="/maktab-haqida/jamoa" title="Jamoa" description="DATA Xalqaro Maktabi rahbariyati va o'qituvchilar jamoasi. Tajribali pedagoglar, rahbariyat va qo'llab-quvvatlash xodimlari haqida batafsil ma'lumot." />
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover grayscale-[20%]" 
            src="https://picsum.photos/seed/team-hero/1920/1080" 
            alt="Bizning Jamoa" 
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
                Ustozlar va Rahbariyat
              </span>
              <h1 className="font-headline text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tighter leading-tight mb-6">
                Bizning Jamoa
              </h1>
              <p className="text-white/80 text-lg md:text-xl font-body leading-relaxed">
                O'z ishining ustalari, tajribali va fidoyi ustozlar jamoasi.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-screen-2xl mx-auto px-4 md:px-12 space-y-12 -mt-10 relative z-10">
        
        {/* Management */}
        <div className="bg-surface p-10 md:p-14 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-slate-100">
          <div className="flex items-center gap-6 mb-10">
            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
              <Users size={32} />
            </div>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary">Menejment Jamoasi</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {management.map((person, idx) => (
              <div key={idx} className="bg-surface-muted p-8 rounded-2xl border border-slate-100 hover:border-secondary/30 hover:shadow-md transition-all">
                <h3 className="font-headline font-extrabold text-primary text-xl mb-2">{person.name}</h3>
                <p className="text-on-surface-muted leading-relaxed">{person.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* English Teachers */}
        <div className="bg-surface p-10 md:p-14 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-slate-100">
          <div className="flex items-center gap-6 mb-10">
            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
              <Globe size={32} />
            </div>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary">Ingliz Tili Ustozlari</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {englishTeachers.map((teacher, idx) => (
              <div key={idx} className="bg-primary/5 p-8 rounded-2xl border border-primary/10 flex flex-col justify-between items-start gap-4 hover:bg-primary/10 transition-colors">
                <h3 className="font-headline font-extrabold text-primary text-xl">{teacher.name}</h3>
                <span className="editorial-gradient text-white text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">{teacher.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hiring Process */}
        <div className="bg-primary p-10 md:p-14 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.04)] text-white relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[200px]">how_to_reg</span>
          </div>
          <div className="flex items-center gap-6 mb-12 relative z-10">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-secondary">
              <UserCheck size={32} />
            </div>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold">Ustoz Tanlash Jarayoni</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            <div className="relative">
              <div className="font-headline text-7xl font-extrabold text-white/10 absolute -top-8 -left-4">1</div>
              <h3 className="font-headline font-extrabold text-secondary text-xl mb-4 relative z-10">HR O'rganishi</h3>
              <p className="text-white/80 leading-relaxed relative z-10">Nomzodning ma'lumoti, toifasi, sertifikatlari va ish tajribasini o'rganish.</p>
            </div>
            <div className="relative">
              <div className="font-headline text-7xl font-extrabold text-white/10 absolute -top-8 -left-4">2</div>
              <h3 className="font-headline font-extrabold text-secondary text-xl mb-4 relative z-10">Suhbat</h3>
              <p className="text-white/80 leading-relaxed relative z-10">Maktab direktori va akademik bo'lim rahbarlari bilan kasbiy yondashuvni baholash.</p>
            </div>
            <div className="relative">
              <div className="font-headline text-7xl font-extrabold text-white/10 absolute -top-8 -left-4">3</div>
              <h3 className="font-headline font-extrabold text-secondary text-xl mb-4 relative z-10">Sinov Darsi</h3>
              <p className="text-white/80 leading-relaxed relative z-10">Nomzod bitta dars o'tib, pedagogik mahoratini amalda ko'rsatadi.</p>
            </div>
            <div className="relative">
              <div className="font-headline text-7xl font-extrabold text-white/10 absolute -top-8 -left-4">4</div>
              <h3 className="font-headline font-extrabold text-secondary text-xl mb-4 relative z-10">Sinov Muddati</h3>
              <p className="text-white/80 leading-relaxed relative z-10">Bir oylik sinov: dars sifati, muloqot, intizom va jamoaga moslashuv baholanadi.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}