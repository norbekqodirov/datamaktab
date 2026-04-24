import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';
import SEO from '../components/SEO';

export default function Education() {
  const { t } = useLanguage();
  const { get, saveKey } = useSiteSettings();
  const e = t.education;

  const roadmap = [
    { sinf: '1-2-sinf', yosh: '7–8', title: 'Maktab hayotiga kirish', desc: "Maktab muhitiga moslashish, o'qish va hisoblash ko'nikmalarini shakllantirish. Ingliz tili bilan tanishuv (150–250+ so'z)." },
    { sinf: '3-4-sinf', yosh: '9–10', title: 'Tizimli bilim va birinchi olimpiada', desc: "Kuchli fanlarda chuqurlashuv va birinchi portfolio. A1 darajani yakunlash, ingliz tilida muloqot boshlanishi." },
    { sinf: '5-6-sinf', yosh: '11–12', title: 'Akademik jiddiylik va darajaga bo\'linish', desc: "Algebra, kasrlar, tenglamalar boshlanadi. Ingliz tili A2 dan B1 ga o'tadi. TILDA, Scratch, Python asoslari." },
    { sinf: '7-8-sinf', yosh: '12–14', title: 'IELTS va IT\'ga jiddiy kirish', desc: "Portfolio shakllantirish. B1 dan B2 darajaga chiqadi. IELTS tayyorgarligi boshlanadi. AI vositalari, Telegram botlar." },
    { sinf: '9-10-sinf', yosh: '14–16', title: 'Xalqaro sertifikat va universitetga kirish', desc: "IELTS 6.0–7.5+ darajaga chiqadi. Xorijiy oliygohlarga hujjat topshirish va amaliy tajriba." },
    { sinf: '11-sinf', yosh: '16–17', title: 'Final bosqich — natija va kelajak', desc: "Trigonometriya, analiz, SAT va OTM darajasidagi masalalar. Full-stack ilovalar, AI media, GitHub portfolio." },
  ];

  const competitions = [
    { name: 'TASIMO', subject: 'Matematika', stages: '3 bosqich', scope: "O'zbekiston" },
    { name: 'Al-Khorazmiy', subject: 'Matematika', stages: '2 bosqich', scope: 'Markaziy Osiyo' },
    { name: 'SASMO', subject: 'Matematika', stages: '2 bosqich', scope: '42 ta davlat' },
    { name: 'HIPPO', subject: 'Ingliz tili', stages: '4 bosqich', scope: 'Final — Italiyada' },
    { name: 'Copernicus', subject: 'Matematika', stages: '3 bosqich', scope: 'Final — AQSH' },
    { name: 'KHISO', subject: 'Ingliz, rus, informatika, fizika', stages: '3 bosqich', scope: "O'zbekiston" },
    { name: 'KENGURU', subject: 'Matematika', stages: '1 bosqich', scope: 'Xalqaro' },
    { name: 'BOND', subject: 'Ingliz, matematika, IT', stages: '1 bosqich', scope: "O'zbekiston" },
  ];

  const clubs = [
    { icon: 'chess', name: 'Shahmat', type: 'Akademik' },
    { icon: 'code', name: 'Dasturlash', type: 'IT' },
    { icon: 'calculate', name: 'Mental Arifmetika', type: 'Akademik' },
    { icon: 'precision_manufacturing', name: 'Robototexnika', type: 'IT' },
    { icon: 'sports_martial_arts', name: 'Karate', type: 'Sport' },
    { icon: 'sports_gymnastics', name: 'Gimnastika', type: 'Sport' },
    { icon: 'language', name: 'Koreys/Xitoy/Rus tili', type: 'Til' },
    { icon: 'photo_camera', name: 'Mobilografiya', type: 'Ijodiy' },
    { icon: 'psychology', name: 'Sun\'iy intellekt', type: 'IT' },
    { icon: 'school', name: 'IELTS/SAT tayyorlov', type: 'Akademik' },
    { icon: 'palette', name: 'Dizayn va San\'at', type: 'Ijodiy' },
    { icon: 'trending_up', name: 'Tadbirkorlik asoslari', type: 'Biznes' },
  ];

  const certs = [
    { subject: 'Ingliz tili', cert: 'IELTS', target: '6 – 7.5' },
    { subject: 'Matematika', cert: 'Milliy sertifikat, SAT', target: 'B+ – A+ / 530+' },
    { subject: 'Koreys tili', cert: 'TOPIK', target: '3 – 5 daraja' },
    { subject: 'Informatika', cert: "Xalqaro IT sertifikatlari", target: 'Foundation – Advanced' },
    { subject: 'Tarix, Kimyo, Ona tili', cert: 'Milliy sertifikat', target: 'B+ – A+' },
  ];

  const itTeachers = [
    { name: "G'ayrat Latipov", subject: 'Robototexnika fani ustozi' },
    { name: 'Kamronbek Atabayev', subject: 'Dasturlash fani ustozi' },
    { name: 'Anvarbek Sapayev', subject: 'Informatika fani ustozi' },
  ];

  return (
    <>
    <SEO url="/talim" title="Ta'lim" description="DATA Xalqaro Maktabida 11 yillik o'quv reja, Montessori yo'nalishi, olimpiadalar, ingliz tili, IT ta'lim va sertifikatlash tizimi bilan tanishing." />
    <div className="bg-surface font-body text-on-surface">

      {/* Hero */}
      <section className="relative h-auto pt-28 pb-10 md:pt-36 md:pb-14 overflow-hidden flex flex-col justify-end">
        <div className="absolute inset-0 z-0">
          <EditableImage src={get('edu_hero_bg', '/maktab.webp')} alt={e.hero_title} onSave={v => saveKey('edu_hero_bg', v)}
            className="w-full h-full" imgClassName="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/95" />
        </div>
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 relative z-10 pb-0">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-[11px] font-extrabold tracking-[0.25em] text-secondary uppercase mb-4">DATA Xalqaro Maktabi</span>
            <EditableText value={get('edu_hero_title', e.hero_title)} onSave={v => saveKey('edu_hero_title', v)} as="h1"
              className="font-headline text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tighter">
              {get('edu_hero_title', e.hero_title)}
            </EditableText>
            <EditableText value={get('edu_hero_desc', e.hero_desc)} onSave={v => saveKey('edu_hero_desc', v)} as="p" multiline className="mt-4 text-white/80 text-lg max-w-4xl">
              {get('edu_hero_desc', e.hero_desc)}
            </EditableText>
          </motion.div>
        </div>
      </section>

      {/* 11-Year Roadmap Visual */}
      <section className="py-16 md:py-12 md:py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-5">1-sinfdan 11-sinfgacha</span>
            <h2 className="font-headline text-4xl md:text-6xl font-extrabold text-primary tracking-tighter">
              11 yillik <span className="text-[#03caff]">ta'lim yo'l xaritasi</span>
            </h2>
            <p className="mt-5 text-on-surface-muted max-w-2xl mx-auto text-lg">Har bir sinf uchun aniq natija maqsadlari va kompetensiya darajalari belgilangan.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmap.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="flex flex-col rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 bg-white hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
                <div className="aspect-[16/9] relative bg-slate-100">
                  <EditableImage src={get(`edu_road_img_${i}`, `/images/grade-${i+1}.jpg`)} alt={item.sinf} onSave={v => saveKey(`edu_road_img_${i}`, v)}
                    className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 flex items-end gap-3">
                    <span className="bg-[#03caff] text-white font-headline font-extrabold text-xl px-5 py-2 rounded-2xl shadow-lg shadow-[#03caff]/30">{item.sinf}</span>
                    <span className="text-white/80 font-bold text-sm">{item.yosh} yosh</span>
                  </div>
                </div>
                <div className="p-7 flex-1">
                  <h3 className="font-headline font-extrabold text-primary text-lg mb-3 leading-snug">{item.title}</h3>
                  <p className="text-on-surface-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Methodologies */}
          <div className="mt-16 p-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl border border-primary/10">
            <h3 className="font-headline font-extrabold text-primary text-2xl mb-6 text-center">Dastur qurilgan metodikalar</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {['Outcome-Based Education (OBE)', 'Competency-Based Learning', 'Project-Based Learning (PBL)', 'STEAM Education', 'Hybrid Global Education Model', 'College Prep Model (AQSH)', 'Differentiated Instruction', 'Montessori'].map((m, i) => (
                <span key={i} className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-primary border border-primary/15 shadow-sm">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lesson Distribution */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-6">Dars Soatlari Taqsimoti</span>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-6">
                Ixtisoslashuvga <span className="text-[#03caff]">56%</span>
              </h2>
              <p className="text-on-surface-muted text-lg leading-relaxed mb-10">
                Dasturimizning deyarli yarmidan ko'prog'i — 56% — maktabning ixtisoslashgan fanlariga ajratilgan. Bu o'quvchilarda mantiqiy fikrlash, global til kompetensiyalari va zamonaviy raqamli savodxonlikni erta bosqichdan shakllantiradi.
              </p>
              <div className="space-y-5">
                {[
                  { subject: 'Matematika', pct: 23, color: '#062bad' },
                  { subject: 'Ingliz tili', pct: 23, color: '#03caff' },
                  { subject: 'IT (Axborot texnologiyalari)', pct: 10, color: '#041c80' },
                  { subject: '12 ta umumta\'lim fanlari', pct: 44, color: '#64748b' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-primary text-sm">{item.subject}</span>
                      <span className="font-bold text-sm" style={{ color: item.color }}>{item.pct}%</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.pct}%` }} transition={{ duration: 1, ease: 'easeOut' }} viewport={{ once: true }}
                        className="h-full rounded-full" style={{ backgroundColor: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[480px] rounded-[3rem] overflow-hidden shadow-2xl group bg-slate-100">
              <EditableImage src={get('edu_lessons_img', '/images/classroom.jpg')} alt="Darslar" onSave={v => saveKey('edu_lessons_img', v)}
                className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-3">
                {[{ val: '09:00', label: 'Dars boshlanadi' }, { val: '45 min', label: 'Dars davomiyligi' }, { val: '17:00', label: 'Dars tugaydi' }].map((stat, i) => (
                  <div key={i} className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 text-center text-white">
                    <p className="font-headline font-extrabold text-xl">{stat.val}</p>
                    <p className="text-[10px] uppercase tracking-widest opacity-80 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subject Roadmaps — Math, English, IT */}
      <section className="py-16 md:py-12 md:py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-5">Fan Yo'l Xaritalari</span>
            <h2 className="font-headline text-4xl md:text-6xl font-extrabold text-primary">Matematika · Ingliz tili · IT</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {/* Math */}
            <div className="bg-surface rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col h-full bg-slate-50 relative group">
              <div className="aspect-video relative bg-slate-100">
                <EditableImage src={get('edu_math_img', '/images/math.jpg')} alt="Matematika" onSave={v => saveKey('edu_math_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062bad] to-transparent pointer-events-none opacity-80" />
                <div className="absolute bottom-5 left-6 pr-4">
                  <span className="text-white font-headline font-extrabold text-2xl drop-shadow-md">Matematika</span>
                  <p className="text-[#03caff] text-xs font-bold uppercase tracking-widest mt-1 opacity-90 drop-shadow-md">Formula emas — fikrlash tizimi</p>
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-white">
                <div className="space-y-5 mb-8 relative before:absolute before:inset-y-2 before:left-[5px] before:w-px before:bg-slate-100">
                  {[
                    { stage: '1–2-SINF', desc: "Sonlar, qo'shish-ayirish, mantiqiy fikrlash asoslari" },
                    { stage: '3–4-SINF', desc: 'Ko\'paytirish, bo\'lish, kasrga kirish, olimpiada elementlari' },
                    { stage: '5–6-SINF', desc: 'Algebra, kasrlar, tenglamalar — qo\'llash bosqichi' },
                    { stage: '7–8-SINF', desc: 'Formulalar, funksiyalar, kombinatorika, olimpiada tayyorgarligi' },
                    { stage: '9–11-SINF', desc: 'Trigonometriya, analiz, SAT va OTM masalalari' },
                  ].map((item, i) => (
                    <div key={i} className="relative pl-6">
                      <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[#062bad] border-4 border-white shadow-sm" />
                      <span className="block font-bold text-[#062bad] text-[10px] md:text-xs uppercase tracking-widest mb-1">{item.stage}</span>
                      <p className="text-on-surface-muted text-xs md:text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="p-5 bg-[#062bad]/5 rounded-2xl border border-[#062bad]/10 mt-auto flex-shrink-0">
                  <p className="text-[10px] font-bold text-[#062bad] uppercase tracking-widest mb-3">Ustozlar jamoasi</p>
                  {['Azizbek Matchanov — 4 yil, IELTS C1, SAT 1200', 'Feruza Abdullayeva — 3 yil, A+, SAT 1200', "Nargiza Amangaldiyevna — 28 yillik tajriba, SAT 930"].map((t, i) => (
                    <p key={i} className="text-xs text-on-surface-muted font-medium py-1.5 border-b border-[#062bad]/5 last:border-0">{t}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* English */}
            <div className="bg-surface rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col h-full bg-slate-50 relative group">
              <div className="aspect-video relative bg-slate-100">
                <EditableImage src={get('edu_eng_img', '/images/english.jpg')} alt="Ingliz tili" onSave={v => saveKey('edu_eng_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03caff] to-transparent pointer-events-none opacity-80" />
                <div className="absolute bottom-5 left-6 pr-4">
                  <span className="text-white font-headline font-extrabold text-2xl drop-shadow-md">Ingliz tili</span>
                  <p className="text-white/90 text-xs font-bold uppercase tracking-widest mt-1 drop-shadow-md">Global dunyoga ochilgan eshik</p>
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-white">
                <div className="space-y-4 mb-8 relative before:absolute before:inset-y-2 before:left-[5px] before:w-px before:bg-slate-100">
                  {[
                    { stage: '1–2-SINF', desc: 'CEFR yo\'li boshlanadi: 150–250+ so\'z zaxirasi', level: 'Pre-A1' },
                    { stage: '3–4-SINF', desc: "A1 yakunlanadi. Oddiy dialoglar, qisqa matnlar", level: 'A1' },
                    { stage: '5–6-SINF', desc: "Ingliz tilida fikr bildirish shakllana boshlaydi", level: 'A2–B1' },
                    { stage: '7–8-SINF', desc: "Academic writing, speaking, debatlar. IELTS tayyorgarligi", level: 'B1–B2' },
                    { stage: '9–11-SINF', desc: 'IELTS 6.0–7.5+. University darajasida ingliz tili', level: 'C1' },
                  ].map((item, i) => (
                    <div key={i} className="relative pl-6">
                      <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[#03caff] border-4 border-white shadow-sm" />
                      <span className="block font-bold text-[#03caff] text-[10px] md:text-xs uppercase tracking-widest mb-1">{item.stage}</span>
                      <p className="text-on-surface-muted text-xs md:text-sm leading-relaxed mb-1.5">{item.desc}</p>
                      <span className="inline-block px-2 py-0.5 bg-[#03caff]/10 text-[#03caff] rounded font-bold text-[10px] uppercase tracking-wide">CEFR: {item.level}</span>
                    </div>
                  ))}
                </div>
                <div className="p-5 bg-[#03caff]/5 rounded-2xl border border-[#03caff]/10 mt-auto flex-shrink-0">
                  <p className="text-[10px] font-bold text-[#03caff] uppercase tracking-widest mb-3">Ustozlar jamoasi</p>
                  {['Jumazoda Shohida — 13 yil, CEFR C1', 'Zaripbayeva Nasiba — CEFR C1, magistr', 'Durdiboev Malik — IELTS 8.0, 7 yil'].map((t, i) => (
                    <p key={i} className="text-xs text-on-surface-muted font-medium py-1.5 border-b border-[#03caff]/5 last:border-0">{t}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* IT */}
            <div className="bg-surface rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col h-full bg-slate-50 relative group">
              <div className="aspect-video relative bg-slate-100">
                <EditableImage src={get('edu_it_img', '/images/it.jpg')} alt="IT" onSave={v => saveKey('edu_it_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041c80] to-transparent pointer-events-none opacity-80" />
                <div className="absolute bottom-5 left-6 pr-4">
                  <span className="text-white font-headline font-extrabold text-2xl drop-shadow-md">IT Ta'lim</span>
                  <p className="text-[#03caff] text-xs font-bold uppercase tracking-widest mt-1 opacity-90 drop-shadow-md">Ertangi kasb — bugundan</p>
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-white">
                <div className="space-y-4 mb-8 relative before:absolute before:inset-y-2 before:left-[5px] before:w-px before:bg-slate-100">
                  {[
                    { stage: '1–2-SINF', desc: 'Kompyuter bilan tanishuv, algoritmik fikrlash asoslari', tool: 'Scratch' },
                    { stage: '3–4-SINF', desc: 'Word, Paint, Scratch, mini-o\'yinlar', tool: 'Code.org' },
                    { stage: '5–6-SINF', desc: 'TILDA, robototexnika, Python asoslari', tool: 'Python' },
                    { stage: '7–8-SINF', desc: 'Web-dasturlash, AI vositalari, Telegram botlar', tool: 'JavaScript' },
                    { stage: '9–11-SINF', desc: 'Full-stack ilovalar, GitHub, AI proyektlar, startup', tool: 'Full-Stack' },
                  ].map((item, i) => (
                    <div key={i} className="relative pl-6">
                      <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[#041c80] border-4 border-white shadow-sm" />
                      <span className="block font-bold text-[#041c80] text-[10px] md:text-xs uppercase tracking-widest mb-1">{item.stage}</span>
                      <p className="text-on-surface-muted text-xs md:text-sm leading-relaxed mb-1.5">{item.desc}</p>
                      <span className="inline-block px-2 py-0.5 bg-[#041c80]/10 text-[#041c80] rounded font-bold text-[10px] uppercase tracking-wide">{item.tool}</span>
                    </div>
                  ))}
                </div>
                <div className="p-5 bg-[#041c80]/5 rounded-2xl border border-[#041c80]/10 mt-auto flex-shrink-0">
                  <p className="text-[10px] font-bold text-[#041c80] uppercase tracking-widest mb-3">Ustozlar jamoasi</p>
                  {itTeachers.map((t, i) => (
                    <p key={i} className="text-xs text-on-surface-muted font-medium py-1.5 border-b border-[#041c80]/5 last:border-0">{t.name} — {t.subject}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary via-[#041c80] to-secondary">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-white">{e.certs_title}</h2>
            <p className="mt-4 text-white/70 max-w-2xl mx-auto text-lg">Fan sertifikati — imtiyozdir. Oliygohga kirish imtihonlarida real ustunlik va kengroq imkoniyatlar.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {certs.map((cert, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 text-white hover:bg-white/20 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#03caff]/20 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#03caff] text-xl">verified</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-extrabold text-lg mb-1">{cert.subject}</h3>
                    <p className="text-white/70 text-sm mb-2">{cert.cert}</p>
                    <span className="px-3 py-1 bg-[#03caff]/20 border border-[#03caff]/30 rounded-full text-[#03caff] text-xs font-bold">{cert.target}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* SAT Center + IELTS Center */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 border border-white/20 rounded-3xl p-8 flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#03caff]/20 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#03caff] text-3xl">fact_check</span>
              </div>
              <div>
                <h3 className="font-headline font-extrabold text-white text-2xl mb-2">Rasmiy SAT Markazi</h3>
                <p className="text-white/70 text-sm leading-relaxed">College Board tomonidan akkreditatsiyalangan — viloyatimizdagi uchinchi rasmiy markaz. 1200+ ball — davlat granti kafolati (VMQ 578-son).</p>
              </div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-3xl p-8 flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#03caff]/20 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#03caff] text-3xl">translate</span>
              </div>
              <div>
                <h3 className="font-headline font-extrabold text-white text-2xl mb-2">Kompyuter IELTS Markazi</h3>
                <p className="text-white/70 text-sm leading-relaxed">Xorazmdagi kompyuter IELTS markazi aynan DATA hududida. British Council bilan rasmiy hamkorlik.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Olympiads Table */}
      <section className="py-16 md:py-12 md:py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            <div className="flex flex-col justify-between py-2">
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-6">Xalqaro Olimpiadalar</span>
                <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-primary mb-4 leading-tight">Chempionlar <span className="text-[#03caff]">maktabi</span></h2>
                <p className="text-on-surface-muted leading-relaxed text-base">2026–2027 o'quv yilida 8 ta ustuvor olimpiada.</p>
              </div>
              <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-sm mt-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-primary to-[#041c80] text-white">
                    <tr>
                      <th className="text-left p-4 font-bold text-xs uppercase tracking-widest leading-relaxed">Olimpiada</th>
                      <th className="text-left p-4 font-bold text-xs uppercase tracking-widest leading-relaxed">Yo'nalish</th>
                      <th className="text-left p-4 font-bold text-xs uppercase tracking-widest leading-relaxed">Qamrov</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitions.map((comp, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="p-4 font-bold text-primary">{comp.name}</td>
                        <td className="p-4 text-on-surface-muted">{comp.subject}</td>
                        <td className="p-4"><span className="px-3 py-1 bg-[#03caff]/10 text-[#062bad] rounded-full text-[10px] font-bold uppercase tracking-wide whitespace-nowrap">{comp.scope}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-col gap-6 h-full">
              <div className="relative flex-1 rounded-[2.5rem] overflow-hidden shadow-2xl group bg-slate-100 min-h-[300px]">
                <EditableImage src={get('edu_olymp_img', '/images/olympiad.jpg')} alt="Olimpiadalar" onSave={v => saveKey('edu_olymp_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                  <p className="text-white font-bold text-xs uppercase tracking-widest mb-1">2025–2026 natijalar</p>
                  <p className="text-white font-headline font-extrabold text-2xl md:text-3xl">15+ musobaqa — o'rinlar</p>
                </div>
              </div>
              {/* BOND badge */}
              <div className="p-6 md:p-8 bg-gradient-to-r from-[#062bad] to-[#03caff] rounded-3xl text-white flex-shrink-0 shadow-xl shadow-[#062bad]/20">
                <h3 className="font-headline font-extrabold text-2xl mb-2">BOND Olimpiadasi Loyihasi</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6">DATA'ning o'z olimpiadasi — O'zbekiston bo'ylab 1–11-sinf o'quvchilari uchun.</p>
                <a href="https://bondolympiad.uz" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#062bad] px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-xl hover:scale-105 transition-all">
                  bondolympiad.uz
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clubs */}
      <section className="py-16 md:py-12 md:py-16 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-5">Qo'shimcha rivojlanish</span>
            <h2 className="font-headline text-4xl md:text-6xl font-extrabold text-primary">{e.clubs_title}</h2>
            <p className="mt-4 text-on-surface-muted max-w-2xl mx-auto text-lg">Darsdan tashqari vaqt — kelajakni qurish vaqti. 12 ta faol to'garak.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {clubs.map((club, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:-translate-y-2 hover:shadow-xl transition-all text-center group cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">{club.icon}</span>
                </div>
                <h3 className="font-headline font-extrabold text-primary text-base mb-1">{club.name}</h3>
                <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-muted">{club.type}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 p-7 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-headline font-extrabold text-primary text-lg mb-4">2026–2027 o'quv yilida rejadagi yangi to'garaklar</h3>
            <div className="flex flex-wrap gap-3">
              {['Kulolchilik', 'Duradgorlik', 'Musiqa', 'Dron Futbol', 'Kasb Tanlash', "Sahna Madaniyati va Nutq"].map((t, i) => (
                <span key={i} className="px-4 py-2 bg-[#03caff]/10 text-[#062bad] rounded-full text-sm font-bold border border-[#03caff]/20">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Montessori */}
      <section className="py-16 md:py-12 md:py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            <div className="relative h-full min-h-[460px] w-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl group bg-slate-100">
              <EditableImage src={get('edu_montessori_img', '/images/montessori.jpg')} alt="Montessori" onSave={v => saveKey('edu_montessori_img', v)}
                className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent pointer-events-none" />
              <div className="absolute top-6 right-6 bg-[#03caff] text-white px-5 py-3 rounded-2xl shadow-lg">
                <p className="font-headline font-extrabold text-xl">2027–2028</p>
                <p className="text-[10px] md:text-xs uppercase tracking-widest opacity-90 mt-1 font-bold">boshlang'ich sinflar</p>
              </div>
            </div>
            <div className="flex flex-col justify-between py-2">
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-6">{e.montessori_title}</span>
                <EditableText value={get('edu_mont_h', e.montessori_heading)} onSave={v => saveKey('edu_mont_h', v)} as="h2"
                  className="font-headline text-3xl md:text-5xl font-extrabold text-primary mb-4 leading-tight">
                  {get('edu_mont_h', e.montessori_heading)}
                </EditableText>
                <div className="w-16 h-1.5 bg-[#03caff] rounded-full mb-6" />
                <EditableText value={get('edu_mont_desc', e.montessori_desc)} onSave={v => saveKey('edu_mont_desc', v)} as="p" multiline
                  className="text-on-surface-muted leading-relaxed text-base">
                  {get('edu_mont_desc', e.montessori_desc)}
                </EditableText>
              </div>
              <div className="mt-auto space-y-4 mb-6">
                {[
                  { icon: 'self_improvement', title: 'Mustaqillik', desc: 'Bola o\'zi tanlaydi, o\'zi bajaradi, o\'zi xulosa qiladi' },
                  { icon: 'person_celebrate', title: 'Individual rivojlanish', desc: 'Har bir o\'quvchi o\'z tezligida o\'sadi' },
                  { icon: 'science', title: 'Amaliy o\'rganish', desc: 'Bilim tajriba va harakat orqali shakllanadi' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-surface rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white flex-shrink-0 shadow-inner shadow-white/20">
                      <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    </div>
                    <div>
                      <strong className="text-primary block mb-0.5 text-sm">{item.title}</strong>
                      <span className="text-on-surface-muted text-xs">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-5 bg-surface rounded-2xl border border-primary/5 mt-auto">
                <p className="text-[#062bad] font-bold italic text-sm">"Biz bolalarni tizimga moslashtirmaymiz — biz tizimni bolaga moslashtiramiz."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tutor + Coin System */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Tutor */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100">
              <div className="aspect-video relative bg-slate-100 group">
                <EditableImage src={get('edu_tutor_img', '/images/tutor.jpg')} alt="Tyutor" onSave={v => saveKey('edu_tutor_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-7">
                  <span className="text-white font-headline font-extrabold text-2xl">Tyutor Tizimi</span>
                </div>
              </div>
              <div className="p-8">
                <p className="text-on-surface-muted leading-relaxed mb-6">Yuqori sinflardagi har bir o'quvchiga individual yondashuv asosida kundalik kuzatib boruvchi tyutor biriktiriladi.</p>
                <div className="space-y-3">
                  {["O'quvchining bilim darajasini tahlil qilish", "Qiziqishlarini aniqlab, muhim tashabbularga jalb etish", "Ota-onalar bilan doimiy aloqa yuritish", "Intizom va maktab qoidalariga rioyani nazorat qilish"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-surface rounded-2xl">
                      <span className="material-symbols-outlined text-[#03caff] flex-shrink-0 text-xl">check_circle</span>
                      <span className="text-sm font-semibold text-primary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Coin */}
            <div className="bg-gradient-to-br from-[#062bad]/5 to-[#03caff]/5 rounded-[2.5rem] overflow-hidden shadow-lg border border-primary/10">
              <div className="aspect-video relative bg-slate-100 group">
                <EditableImage src={get('edu_coin_img', '/images/coin.jpg')} alt="Coin Tizimi" onSave={v => saveKey('edu_coin_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062bad]/70 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-7">
                  <span className="text-white font-headline font-extrabold text-2xl">COIN Motivatsiya Tizimi</span>
                </div>
              </div>
              <div className="p-8">
                <p className="text-on-surface-muted leading-relaxed mb-6">O'quvchilarni rag'batlantiruvchi maxsus coin tizimi — bilim, xulq va faollik uchun ballar yig'iladi va yarmarkada sarflanadi.</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Merkuriy Coin', val: '1 000 ball', color: '#94a3b8' },
                    { name: 'Venera Coin', val: '5 000 ball', color: '#c084fc' },
                    { name: 'Yupiter Coin', val: '10 000 ball', color: '#60a5fa' },
                    { name: 'Saturn Super Coin', val: '25 000 ball', color: '#fbbf24' },
                  ].map((coin, i) => (
                    <div key={i} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
                      <div className="w-8 h-8 rounded-full mx-auto mb-2" style={{ backgroundColor: coin.color }} />
                      <p className="font-bold text-primary text-xs">{coin.name}</p>
                      <p className="text-[#03caff] font-extrabold text-sm">{coin.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
