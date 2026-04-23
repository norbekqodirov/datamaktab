import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';

export default function Home() {
  const { t } = useLanguage();
  const { get, saveKey } = useSiteSettings();

  const openEnrollModal = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event('open-enroll-modal'));
  };

  return (
    <div className="bg-transparent font-body text-on-surface">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[100svh] overflow-hidden flex flex-col justify-end">
        <div className="absolute inset-0 z-0">
          <EditableImage
            src={get('hero_bg', '/maktab.jpg')}
            alt="DATA Maktabi"
            onSave={v => saveKey('hero_bg', v)}
            className="w-full h-full"
            imgClassName="w-full h-full object-cover grayscale-[30%] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-secondary/50 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 relative z-10 pt-32 pb-0 flex-grow flex flex-col justify-end">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-end flex-grow">
            <div className="max-w-xl mx-auto lg:mx-0 anim-slide-up text-center lg:text-left pb-16 lg:pb-24">
              <span className="inline-block px-4 py-1.5 mb-5 text-[10px] tracking-[0.2em] font-extrabold text-white uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                {t.hero.badge}
              </span>
              <h1 className="font-headline text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold text-white tracking-[-0.03em] leading-[1.05] mb-6">
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
                  <div key={idx} className="glass-panel p-3 md:p-5 rounded-2xl text-center">
                    <h4 className="text-2xl md:text-3xl font-extrabold text-primary mb-1 font-headline">{stat.val}</h4>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-on-surface-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex justify-end items-start anim-fade-in delay-200 relative h-full w-full">
              <div className="absolute top-[-5%] right-[-10%] w-[125%] h-full flex justify-end items-start pointer-events-none">
                <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary blur-[120px] rounded-full opacity-60 z-0" />
                <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary blur-[120px] rounded-full opacity-50 z-0" />
                <EditableImage
                  src={get('hero_student_img', '/students-hero.png')}
                  alt="O'quvchilar"
                  onSave={v => saveKey('hero_student_img', v)}
                  className="w-full h-auto relative z-10 transform translate-y-4 translate-x-8 lg:translate-x-24 pointer-events-auto"
                  imgClassName="w-full h-auto object-contain object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-28 bg-surface">
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

      {/* ─── PRESIDENT QUOTE ─── */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-surface">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="bg-white rounded-[2.5rem] p-6 md:p-10 lg:p-12 relative border border-primary/5 shadow-2xl shadow-primary/5 overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10">
              <div className="lg:col-span-7 relative">
                <span className="material-symbols-outlined text-[80px] absolute -top-8 -left-6 text-[#03caff]/10 -rotate-12 pointer-events-none">format_quote</span>
                <div className="relative z-10 pl-6 border-l-4 border-[#03caff]">
                  <EditableText value={get('prez_quote', t.president.quote)} onSave={v => saveKey('prez_quote', v)} as="h2" multiline
                    className="text-xl md:text-2xl lg:text-3xl font-headline font-extrabold text-primary mb-8 leading-relaxed tracking-tight">
                    {get('prez_quote', t.president.quote)}
                  </EditableText>
                  
                  <div>
                    <EditableText value={get('prez_author', t.president.author)} onSave={v => saveKey('prez_author', v)} as="p" className="text-xs font-bold uppercase tracking-[0.2em] text-[#062bad]">
                      {get('prez_author', t.president.author)}
                    </EditableText>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-on-surface-muted mt-1.5">{t.president.role}</p>
                    
                    <div className="mt-6 inline-flex px-4 py-1.5 border border-[#03caff]/30 rounded-full bg-[#03caff]/5">
                      <p className="text-[10px] font-bold text-[#062bad]">{t.president.badge}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col justify-center gap-3 lg:gap-4 h-full xl:pl-4">
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  <EditableImage src={get('prez_img1', '/images/prezident-1.jpg')} alt="Prezident" onSave={v => saveKey('prez_img1', v)}
                    className="relative w-full aspect-[4/3] rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-md border border-primary/5 group bg-slate-100"
                    imgClassName="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <EditableImage src={get('prez_img2', '/images/prezident-2.jpg')} alt="Prezident" onSave={v => saveKey('prez_img2', v)}
                    className="relative w-full aspect-[4/3] rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-md border border-primary/5 group bg-slate-100"
                    imgClassName="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <EditableImage src={get('prez_img3', '/images/prezident-3.jpg')} alt="Prezident" onSave={v => saveKey('prez_img3', v)}
                  className="relative w-full aspect-[16/9] lg:aspect-[2/1] rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-md border border-primary/5 group bg-slate-100"
                  imgClassName="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section className="py-16 bg-gradient-to-r from-primary via-[#041c80] to-secondary">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { val: '2023', label: 'Asos solingan yil' },
              { val: '500+', label: "O'quvchilar" },
              { val: '50+', label: "O'qituvchilar" },
              { val: '95%', label: 'Mamnunlik darajasi' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="space-y-2">
                <p className="text-4xl md:text-5xl font-headline font-extrabold">{s.val}</p>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-r from-primary via-[#041c80] to-secondary py-24 md:py-32 px-6 md:px-16 text-center shadow-2xl">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-primary/40 mix-blend-multiply z-10" />
              <img className="w-full h-full object-cover scale-110 opacity-[0.15] mix-blend-overlay" src="/maktab.jpg" alt="" />
            </div>
            <div className="relative z-10">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-headline text-4xl md:text-6xl font-extrabold text-white tracking-[-0.03em] leading-tight mb-6">{t.cta.title}</h2>
                <p className="text-white/80 max-w-2xl mx-auto mb-12 text-lg leading-relaxed">{t.cta.desc}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={openEnrollModal} className="btn-secondary px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl">
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
