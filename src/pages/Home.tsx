import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image_url: string;
  created_at: string;
}

export default function Home() {
  const { t } = useLanguage();
  const { get, saveKey } = useSiteSettings();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(data => setArticles(data.slice(0, 3)))
      .catch(() => {});
  }, []);

  const openEnrollModal = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event('open-enroll-modal'));
  };

  const techItems = [
    { icon: 'computer', val: '24 ta', label: 'iMac Kompyuter', img: '/images/imac.jpg', desc: 'Apple Distinguished School maqomiga nomzod' },
    { icon: 'laptop', val: '60 ta', label: 'Notebook', img: '/images/notebook.jpg', desc: 'Har bir o\'quvchiga individual qurilma' },
    { icon: 'view_in_ar', val: '20 ta', label: 'VR Ko\'zoynak', img: '/images/vr.jpg', desc: 'Interaktiv virtual ta\'lim muhiti' },
    { icon: 'smart_toy', val: '20 ta', label: 'AI Yordamchi', img: '/images/alisa.jpg', desc: 'Har bir sinfda "Алиса" sun\'iy intellekt' },
  ];

  const pillars = [
    { icon: 'school', title: 'Sifatli Ta\'lim', img: '/images/pillar-edu.jpg', desc: 'Ustozlar qat\'iy nizomlar asosida tanlanadi. Dars sifati doimiy nazorat ostida, o\'quv materiallari eng zamonaviy andozalarda.' },
    { icon: 'home', title: 'Shart-Sharoit', img: '/images/pillar-cond.jpg', desc: 'Kuniga 3 mahal ovqat, transport, to\'garaklar, ta\'limiy sayohatlar, kutubxona, sport zali va yotoqxona.' },
    { icon: 'health_and_safety', title: 'Sog\'liq va Xavfsizlik', img: '/images/pillar-health.jpg', desc: 'Doimiy shifokor, psixolog va logoped. Har bir o\'quvchi 20 mlngacha sug\'urtalangan. Milliy gvardiya nazorati.' },
    { icon: 'forum', title: 'Tizimli Muloqot', img: '/images/pillar-comm.jpg', desc: 'To\'rt bosqichli muloqot tizimi: Durbin.uz ilova, sinf rahbari, ota-onalar majlisi va administrator darajasi.' },
  ];

  const olympiadResults = [
    { event: 'Copernicus (AQSH)', result: '10 ta bronza medal', icon: 'emoji_events', color: '#CD7F32' },
    { event: 'Amakids (Gruziya)', result: '8 ta 1-o\'rin, 7 ta 2-o\'rin, 8 ta 3-o\'rin', icon: 'military_tech', color: '#FFD700' },
    { event: 'SEAMO', result: '2 ta bronza medal', icon: 'workspace_premium', color: '#CD7F32' },
    { event: '"Daho Bolalar" Buxoro', result: '1 ta Super chempion, 5 ta oliy o\'rin', icon: 'stars', color: '#FFD700' },
    { event: '"Daho Bolalar" Samarqand', result: '1 ta Chempion, 10 ta oliy o\'rin', icon: 'trophy', color: '#FFD700' },
    { event: 'Coding Olimpiadasi', result: '4 ta oltin, 1 ta kumush medal', icon: 'code', color: '#FFD700' },
  ];

  const vipVisitors = [
    { name: 'Abdulla Aripov', role: 'O\'zbekiston Respublikasi Bosh vaziri' },
    { name: 'Sherzod Xotamovich', role: 'Raqamli texnologiyalar vaziri' },
    { name: 'Ruslanbek Davletov', role: 'Prezident maslahatchisi' },
    { name: 'Mansurbek Olloyorov', role: 'Prezident maslahatchisi' },
    { name: 'Sardor Umrzoqov', role: 'Prezident maslahatchisi' },
    { name: 'Botir Erkinovich', role: 'Kambag\'allikni qisqartirish vaziri' },
  ];

  return (
    <div className="bg-transparent font-body text-on-surface">

      {/* ─── HERO ─── */}
      <section className="relative min-h-[100svh] overflow-hidden flex flex-col justify-end">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full">
            <EditableImage
              src={get('hero_bg', '/maktab.jpg')}
              alt="DATA Maktabi"
              onSave={v => saveKey('hero_bg', v)}
              className="w-full h-full"
              imgClassName="w-full h-full object-cover grayscale-[30%] scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-secondary/50 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
        </div>

        {/* HERO IMAGE - Absolute to screen edge for ultra-wide zoom stability */}
        <div className="absolute bottom-0 right-0 w-[50%] lg:w-[45%] max-w-[850px] hidden lg:flex justify-end items-end pointer-events-none z-10 px-8 xl:px-16 pb-0">
          <div className="absolute bottom-1/4 right-20 w-64 h-64 bg-secondary blur-[120px] rounded-full opacity-60 z-0" />
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary blur-[120px] rounded-full opacity-50 z-0" />
          <EditableImage
            src={get('hero_student_img', '/students-hero.png')}
            alt="O'quvchilar"
            onSave={v => saveKey('hero_student_img', v)}
            className="w-full relative z-10 pointer-events-auto flex justify-end"
            imgClassName="w-full h-auto max-h-[85vh] object-contain object-bottom drop-shadow-2xl"
          />
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 relative z-20 pt-32 pb-0 flex-grow flex flex-col justify-end">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-end flex-grow">
            <div className="max-w-xl mx-auto lg:mx-0 anim-slide-up text-center lg:text-left pb-16 lg:pb-24">
              <span className="inline-block px-4 py-1.5 mb-5 text-[10px] tracking-[0.2em] font-extrabold text-white uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                {t.hero.badge}
              </span>
              <h1 className="font-headline text-[2.75rem] md:text-6xl lg:text-[5.5rem] font-extrabold text-white tracking-[-0.03em] leading-[1.05] mb-6">
                <EditableText value={get('hero_title1', t.hero.title1)} onSave={v => saveKey('hero_title1', v)} className="inline">{get('hero_title1', t.hero.title1)}</EditableText>
                {' '}<span className="text-secondary-light">
                  <EditableText value={get('hero_title2', t.hero.title2)} onSave={v => saveKey('hero_title2', v)} className="inline">{get('hero_title2', t.hero.title2)}</EditableText>
                </span>{' '}
                <EditableText value={get('hero_title3', t.hero.title3)} onSave={v => saveKey('hero_title3', v)} className="inline">{get('hero_title3', t.hero.title3)}</EditableText>
              </h1>
              <EditableText value={get('hero_desc', t.hero.desc)} onSave={v => saveKey('hero_desc', v)} as="p" multiline className="text-white/90 text-base md:text-lg max-w-md mx-auto lg:mx-0 font-light mb-8 leading-relaxed">
                {get('hero_desc', t.hero.desc)}
              </EditableText>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-10">
                <button onClick={openEnrollModal} className="btn-primary px-8 py-3.5 rounded-full text-[11px] uppercase font-bold tracking-widest shadow-[0_10px_40px_-5px_rgba(1,202,255,0.4)]">
                  {t.hero.cta_primary}
                </button>
                <Link to="/maktab-haqida" className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-3.5 rounded-full font-headline font-bold uppercase tracking-widest text-[11px] hover:bg-white hover:text-primary transition-all flex items-center justify-center">
                  {t.hero.cta_secondary}
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-md mx-auto lg:mx-0 anim-fade-in delay-300">
                {[
                  { val: t.hero.stat1_val, label: t.hero.stat1_label },
                  { val: t.hero.stat2_val, label: t.hero.stat2_label },
                  { val: t.hero.stat3_val, label: t.hero.stat3_label },
                ].map((stat, idx) => (
                  <div key={idx} className="glass-card p-3 md:p-5 rounded-2xl text-center">
                    <h4 className="text-2xl md:text-3xl font-extrabold text-white mb-1 font-headline">{stat.val}</h4>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Empty right column for grid layout alignment */}
            <div className="hidden lg:block w-full"></div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-16 md:py-12 md:py-16 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-20">
            <span className="inline-block text-[11px] font-extrabold tracking-[0.25em] text-secondary uppercase mb-4">DATA Maktabi</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-extrabold text-primary tracking-tighter">{t.features.title}</h2>
            <p className="mt-4 text-on-surface-muted max-w-2xl mx-auto">{t.features.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.items.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }} viewport={{ once: true }}
                className="glass-card rounded-3xl p-8 group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-primary/5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-white text-2xl">{item.icon}</span>
                </div>
                <h3 className="font-headline font-extrabold text-xl text-primary mb-3">{item.title}</h3>
                <p className="text-on-surface-muted text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOUNDER'S LETTER ─── */}
      <section className="py-12 md:py-16 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left image */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="relative h-[500px] md:h-[620px] rounded-[3rem] overflow-hidden shadow-2xl group bg-slate-100">
                <EditableImage src={get('founder_img', '/images/founder.jpg')} alt="Shahzod Sabirov" onSave={v => saveKey('founder_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-10 left-10 right-10 z-10">
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-2">Asoschimiz</p>
                  <h3 className="text-white font-headline font-extrabold text-3xl drop-shadow-lg">Shahzod Sabirov</h3>
                  <p className="text-[#03caff] text-sm font-semibold mt-1">"Mard o'g'lon" davlat mukofoti sohibi</p>
                </div>
              </div>

            </motion.div>

            {/* Right content */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-6">Asoschimiz So'zi</span>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-6 leading-tight">
                <EditableText value={get('founder_title', 'Ta\'lim — kelajak uchun eng muhim investitsiya')} onSave={v => saveKey('founder_title', v)}>
                  {get('founder_title', 'Ta\'lim — kelajak uchun eng muhim investitsiya')}
                </EditableText>
              </h2>
              <div className="w-16 h-1.5 bg-[#03caff] rounded-full mb-8" />
              <div className="space-y-4 text-on-surface-muted leading-relaxed">
                <EditableText value={get('founder_p1', '"DATA xalqaro maktabi"ni tashkil etishdan asosiy maqsadimiz — faqat bilim berish emas, balki fikrlaydigan, mas\'uliyatni his qiladigan va ongli ravishda o\'z yo\'lini tanlay oladigan avlodni tarbiyalash.')} onSave={v => saveKey('founder_p1', v)} as="p" multiline>
                  {get('founder_p1', '"DATA xalqaro maktabi"ni tashkil etishdan asosiy maqsadimiz — faqat bilim berish emas, balki fikrlaydigan, mas\'uliyatni his qiladigan va ongli ravishda o\'z yo\'lini tanlay oladigan avlodni tarbiyalash.')}
                </EditableText>
                <EditableText value={get('founder_p2', 'Biz bu yerda faqat dars bermaymiz: bolalarga savol berishni, izlanishni va o\'z ustida ishlashni o\'rgatamiz. Haqiqiy natija esa ota-ona, muhit va farzandning o\'z ustida ishlashi uyg\'unligida shakllanadi.')} onSave={v => saveKey('founder_p2', v)} as="p" multiline>
                  {get('founder_p2', 'Biz bu yerda faqat dars bermaymiz: bolalarga savol berishni, izlanishni va o\'z ustida ishlashni o\'rgatamiz. Haqiqiy natija esa ota-ona, muhit va farzandning o\'z ustida ishlashi uyg\'unligida shakllanadi.')}
                </EditableText>
              </div>
              <div className="mt-10 p-6 bg-surface rounded-3xl border border-primary/5">
                <p className="text-[#062bad] font-bold text-sm italic leading-relaxed">
                  "Bizning maqsadimiz — bilimli, mas'uliyatli va jamiyatga foyda keltira oladigan avlodni tarbiyalashdir."
                </p>
                <p className="mt-3 text-xs font-extrabold uppercase tracking-widest text-on-surface-muted">— Shahzod Sabirov, Asoschi</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* ─── 4 PILLARS / NIMA UCHUN DATA ─── */}
      <section className="py-16 md:py-12 md:py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-5">Nima uchun DATA?</span>
            <h2 className="font-headline text-4xl md:text-6xl font-extrabold text-primary tracking-tighter leading-tight">
              Xotirjamlikning <span className="text-[#03caff]">4 ta ustuni</span>
            </h2>
            <p className="mt-5 text-on-surface-muted max-w-2xl mx-auto text-lg">Ota-onalar bizni aynan xotirjam bo'lish uchun tanlashadi.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="flex flex-col rounded-[2rem] overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 bg-white border border-slate-100 group">
                <div className="aspect-[4/3] relative bg-slate-100 overflow-hidden">
                  <EditableImage src={get(`pillar_img_${i}`, p.img)} alt={p.title} onSave={v => saveKey(`pillar_img_${i}`, v)}
                    className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                    <span className="material-symbols-outlined text-white text-xl">{p.icon}</span>
                  </div>
                </div>
                <div className="p-6 flex-1">
                  <h3 className="font-headline font-extrabold text-lg text-primary mb-3">{p.title}</h3>
                  <p className="text-on-surface-muted text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section className="py-16 bg-gradient-to-r from-primary via-[#041c80] to-secondary">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { val: '2019', label: 'Asos solingan yil' },
              { val: '16 000+', label: 'Yetishtirilgan yoshlar' },
              { val: '95%', label: 'Tavsiya qiladi' },
              { val: '15+', label: 'Xalqaro olimpiada' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="space-y-2">
                <p className="text-4xl md:text-5xl font-headline font-extrabold">{s.val}</p>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECH HIGHLIGHTS ─── */}
      <section className="py-16 md:py-12 md:py-16 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-5">Zamonaviy Texnologiyalar</span>
            <h2 className="font-headline text-4xl md:text-6xl font-extrabold text-primary tracking-tighter">
              Kelajak <span className="text-[#03caff]">bugun boshlanadi</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.93 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="relative rounded-[2rem] overflow-hidden bg-white shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group border border-slate-100">
                <div className="aspect-[4/3] relative bg-slate-100">
                  <EditableImage src={get(`tech_img_${i}`, item.img)} alt={item.label} onSave={v => saveKey(`tech_img_${i}`, v)}
                    className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 bg-[#03caff] text-white rounded-2xl px-4 py-2 shadow-lg shadow-[#03caff]/30">
                    <p className="font-headline font-extrabold text-2xl leading-none">{item.val}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                    <h3 className="font-headline font-extrabold text-primary text-lg">{item.label}</h3>
                  </div>
                  <p className="text-on-surface-muted text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Extra tech badges row */}
          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {[
              { icon: 'video_camera_front', label: 'Interaktiv Video Studiya', desc: 'Xorazmdagi yagona interaktiv yozib olish studiyasi' },
              { icon: 'menu_book', label: '4603 ta Kitob — 7 tilda', desc: 'O\'zbek, rus, ingliz, koreys, xitoy, nemis va brayl alfabetida' },
              { icon: 'ventilation', label: 'Ilmiy Havo Tizimi', desc: 'Har sinfga alohida supply va exhaust havo tizimi, chiller bilan isitish va sovutish' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="flex items-start gap-5 p-7 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-white text-2xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-headline font-extrabold text-primary text-lg mb-2">{item.label}</h3>
                  <p className="text-on-surface-muted text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OLYMPIAD RESULTS ─── */}
      <section className="py-16 md:py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#041c80] to-secondary" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <img src="/maktab.jpg" className="w-full h-full object-cover scale-110" alt="" />
        </div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#03caff] border border-[#03caff]/30 rounded-full uppercase mb-5">2025–2026 o'quv yili</span>
            <h2 className="font-headline text-4xl md:text-6xl font-extrabold text-white tracking-tighter leading-tight">
              Chempionlar <span className="text-[#03caff]">maktabi</span>
            </h2>
            <p className="mt-5 text-white/70 max-w-2xl mx-auto text-lg">15 dan ortiq xalqaro va respublika olimpiadalarida faxrli o'rinlar</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {olympiadResults.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-7 flex items-start gap-5 hover:bg-white/20 transition-all">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white/10 border border-white/20">
                  <span className="material-symbols-outlined text-2xl" style={{ color: r.color }}>{r.icon}</span>
                </div>
                <div>
                  <p className="font-headline font-extrabold text-white text-lg leading-snug mb-2">{r.event}</p>
                  <p className="text-[#03caff] font-bold text-sm">{r.result}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* code.org badge */}
          <div className="bg-white/10 border border-white/20 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="w-20 h-20 rounded-3xl bg-[#03caff]/20 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[#03caff] text-4xl">code</span>
            </div>
            <div className="flex-1">
              <h3 className="font-headline font-extrabold text-white text-2xl md:text-3xl mb-3">Code.org xalqaro sertifikati</h3>
              <p className="text-white/70 leading-relaxed">O'tgan yil <strong className="text-white">50 ta o'quvchimiz</strong> Google, Amazon va Microsoft qo'llab-quvvatlaydigan Code.org platformasidan xalqaro sertifikat oldi.</p>
            </div>
            <a href="https://code.org" target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 bg-[#03caff] text-white rounded-full px-7 py-3.5 font-bold uppercase tracking-widest text-xs shadow-lg shadow-[#03caff]/30 hover:scale-105 transition-transform">
              Code.org
            </a>
          </div>
        </div>
      </section>

      {/* ─── VIP VISITORS ─── */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            <div className="flex flex-col justify-between py-2">
              <div className="mb-8">
                <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-5">Rasmiy Tashrif</span>
                <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-primary mb-4 leading-tight">
                  Nufuzli mehmonlar <span className="text-[#03caff]">manzili</span>
                </h2>
                <p className="text-on-surface-muted text-base leading-relaxed">Ochiqligimiz va natijalarimiz tufayli maktabimiz davlat va hukumat vakillari uchun ham diqqatga tushgan manzilga aylandi.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
                {vipVisitors.map((v, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}
                    className="flex items-center gap-3 p-3.5 bg-surface rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 text-white font-headline font-extrabold text-sm shadow-inner shadow-white/20">
                      {v.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-extrabold text-primary text-xs truncate">{v.name}</p>
                      <p className="text-on-surface-muted text-[10px] mt-0.5 leading-tight line-clamp-2">{v.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="relative aspect-[4/3] w-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl group bg-slate-100 h-full">
              <EditableImage src={get('vip_img', '/images/vip-visit.jpg')} alt="Nufuzli Mehmonlar" onSave={v => saveKey('vip_img', v)}
                className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-5 shadow-2xl">
                  <p className="text-white font-headline font-extrabold text-lg md:text-xl mb-1">O'zbekiston Prezidenti bilan</p>
                  <p className="text-white/80 text-xs md:text-sm">2023-yil 31-mart va 2025-yil 1-may — ikki marta uchrashuv</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BLOG PREVIEW ─── */}
      {articles.length > 0 && (
        <section className="py-16 md:py-12 md:py-16 bg-surface">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-5">Yangiliklar</span>
                <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary tracking-tighter leading-tight">
                  So'nggi <span className="text-[#03caff]">maqolalar</span>
                </h2>
              </div>
              <Link to="/blog" className="inline-flex items-center gap-2 font-headline font-bold text-sm text-[#062bad] hover:text-secondary transition-colors flex-shrink-0 group">
                Barchasini ko'rish <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {articles.map((article, idx) => (
                <motion.article key={article.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group flex flex-col">
                  <Link to={`/blog/${article.id}`} className="block h-56 bg-slate-100 overflow-hidden relative">
                    {article.image_url ? (
                      <img src={article.image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
                    <h3 className="font-headline font-extrabold text-xl text-primary mb-3 leading-snug line-clamp-2 flex-1">
                      {article.title}
                    </h3>
                    <p className="text-on-surface-muted text-sm leading-relaxed mb-6 line-clamp-2">{article.excerpt}</p>
                    <Link to={`/blog/${article.id}`} className="inline-flex items-center gap-2 font-headline font-bold text-sm text-[#062bad] hover:text-secondary transition-colors group/link">
                      O'qish <ArrowRight size={15} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-r from-primary via-[#041c80] to-secondary py-16 md:py-24 px-6 md:px-16 text-center shadow-2xl">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-primary/40 mix-blend-multiply z-10" />
              <img className="w-full h-full object-cover scale-110 opacity-[0.15] mix-blend-overlay" src="/maktab.jpg" alt="" />
            </div>
            <div className="relative z-10">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-headline text-4xl md:text-6xl font-extrabold text-white tracking-[-0.03em] leading-tight mb-6">{t.cta.title}</h2>
                <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">{t.cta.desc}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={openEnrollModal} className="bg-white text-primary hover:bg-slate-50 px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl transition-all">
                    {t.cta.primary}
                  </button>
                  <Link to="/maktab-haqida" className="bg-white/10 border border-white/30 backdrop-blur-lg text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-primary transition-all flex items-center gap-2 justify-center">
                    {t.cta.secondary} <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
