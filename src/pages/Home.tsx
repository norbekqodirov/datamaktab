import React from 'react';
import { Link } from 'react-router-dom';
import { maktabData } from '../data/content';

export default function Home() {
  const openEnrollModal = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event('open-enroll-modal'));
  };

  return (
    <div className="bg-transparent font-body text-on-surface">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] overflow-hidden flex flex-col justify-end">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover grayscale-[30%] scale-105"
            src="/maktab.jpg"
            alt="DATA Maktabi"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-secondary/50 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80"></div>
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 relative z-10 pt-32 pb-0 flex-grow flex flex-col justify-end">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-end flex-grow">

            {/* Left Column: Text and Stats */}
            <div className="max-w-xl mx-auto lg:mx-0 anim-slide-up text-center lg:text-left pb-16 lg:pb-24">
              <span className="inline-block px-4 py-1.5 mb-5 text-[10px] tracking-[0.2em] font-extrabold text-white uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                {maktabData.hero.subtitle}
              </span>
              <h1 className="font-headline text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold text-white tracking-[-0.03em] leading-[1.05] mb-6">
                Xorazmning eng <br className="hidden lg:block" />
                <span className="text-secondary-light">zamonaviy</span> maktabi
              </h1>
              <p className="text-white/90 text-base md:text-lg max-w-md mx-auto lg:mx-0 font-body font-light mb-8 leading-relaxed">
                IT va ingliz tili ta'limiga ixtisoslashgan innovatsion maskan. Yoshlarning bilim bo'shliqlarini amaliy ko'nikmalar bilan to'ldiramiz.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-10">
                <button
                  onClick={openEnrollModal}
                  className="btn-primary px-8 py-3.5 rounded-full text-[11px] uppercase font-bold tracking-widest shadow-[0_10px_40px_-5px_rgba(1,202,255,0.4)]"
                >
                  Qabul hujjatlari
                </button>
                <Link
                  to="/maktab-haqida"
                  className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-3.5 rounded-full font-headline font-bold uppercase tracking-widest text-[11px] hover:bg-white hover:text-primary transition-all flex items-center justify-center"
                >
                  Maktab bilan tanishuv
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-md mx-auto lg:mx-0 anim-fade-in delay-300">
                {maktabData.hero.stats.map((stat, idx) => (
                  <div key={idx} className="glass-panel p-3 md:p-5 rounded-2xl text-center">
                    <h4 className="text-2xl md:text-3xl font-extrabold text-primary mb-1 font-headline">{stat.value}</h4>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-on-surface-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Image Placeholder */}
            <div className="hidden lg:flex justify-end items-start anim-fade-in delay-200 relative h-full w-full">
              <div className="absolute top-[-5%] right-[-10%] w-[150%] h-full flex justify-end items-start pointer-events-none">
                {/* Dekorativ elementlar: rasm orqasida chiroyli nur effektlari */}
                <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary blur-[120px] rounded-full opacity-60 z-0"></div>
                <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary blur-[120px] rounded-full opacity-50 z-0"></div>

                {/* Rasm qismi (fonsiz) */}
                <img
                  src="/students-hero.png"
                  alt="O'quvchilar"
                  className="w-[110%] max-w-[110%] h-auto object-contain object-top relative z-10 pointer-events-auto transform translate-y-4 translate-x-4 lg:translate-x-12"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if(target.src.includes('students-hero')) {
                       // O'zgargan bo'lsa hech nima qilmaymiz,
                    }
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why DATA? Bento Grid */}
      <section className="py-32 relative z-20 bg-surface-muted pb-40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 mb-6 text-[10px] tracking-[0.25em] font-extrabold text-secondary uppercase bg-secondary/10 rounded-full">
                Ekotizim Afzalliklari
              </span>
              <h2 className="font-headline text-5xl md:text-7xl font-extrabold tracking-[-0.04em] leading-[1.1] text-on-surface">Maktabdan ko'proq — <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Ertangi kun poydevori</span></h2>
            </div>
            <p className="text-on-surface-muted max-w-sm font-body text-base md:text-lg leading-relaxed mb-4">
              Biz farzandingizning har tomonlama rivojlanishi uchun xalqaro standartdagi premium qulayliklarni yaratdik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
            {/* IT */}
            <div className="md:col-span-8 glass-card rounded-[2rem] overflow-hidden relative group p-10 md:p-16 flex flex-col justify-end min-h-[480px]">
              <img
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000 ease-out"
                src="https://picsum.photos/seed/it-c/800/600"
                alt="IT Lab"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent"></div>
              <div className="relative z-10 text-white mt-auto">
                <span className="material-symbols-outlined text-secondary-light mb-6 text-5xl bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20">desktop_mac</span>
                <h3 className="font-headline text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-md">Zamonaviy IT Ta'limi</h3>
                <p className="text-white/90 max-w-2xl font-body text-lg leading-relaxed drop-shadow-sm">Har bir sinfda "Alisa" sun'iy intellekti, maxsus iMacs laboratoriyasi hamda VR ko'zoynaklar bilan boyitilgan dasturlash tizimi.</p>
              </div>
            </div>

            {/* IELTS */}
            <div className="md:col-span-4 bg-gradient-to-br from-primary to-[#051e7a] rounded-[2rem] p-10 md:p-14 relative overflow-hidden flex flex-col justify-between min-h-[480px] shadow-xl group hover:shadow-primary/30 transition-all duration-500">
              <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-secondary/40 via-transparent to-transparent opacity-80 group-hover:scale-110 transition-transform duration-1000"></div>
              <div className="relative z-10 w-full h-full flex flex-col">
                <span className="material-symbols-outlined text-white mb-auto text-5xl bg-white/10 w-max p-4 rounded-2xl backdrop-blur-md border border-white/10">language</span>
                <div className="mt-8">
                   <h3 className="font-headline text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">Xalqaro<br/>IELTS Standarti</h3>
                   <p className="text-secondary-light font-body text-base leading-relaxed">Kembrij va British Council asosidagi darslar, muntazam mock testlar va IELTS 8.5 gacha ustozlar.</p>
                </div>
              </div>
            </div>

            {/* Safety */}
            <div className="md:col-span-4 bg-gradient-to-bl from-secondary to-[#029bc4] rounded-[2rem] p-10 flex flex-col justify-between min-h-[350px] relative overflow-hidden shadow-xl group hover:-translate-y-1 transition-transform">
              <div className="absolute -bottom-10 -right-10 opacity-[0.08] group-hover:rotate-12 transition-transform duration-1000">
                <span className="material-symbols-outlined text-[200px] text-black">security</span>
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <span className="material-symbols-outlined text-primary mb-auto text-5xl bg-white w-max p-4 rounded-2xl shadow-md">security</span>
                <div className="mt-8">
                   <h3 className="font-headline text-2xl md:text-3xl font-extrabold text-white mb-3">Xavfsiz Muhit</h3>
                   <p className="text-white/90 font-body text-sm leading-relaxed">Milliy gvardiya qo'riqlovi, 24/7 CCTV, Face ID va 20 MLN gacha sug'urta.</p>
                </div>
              </div>
            </div>

            {/* Nutrition */}
            <div className="md:col-span-4 bg-white rounded-[2rem] p-10 flex flex-col justify-between min-h-[350px] border border-black/5 hover:border-primary/20 shadow-lg hover:shadow-xl transition-all">
              <div className="flex flex-col h-full">
                <span className="material-symbols-outlined text-secondary mb-auto text-5xl bg-secondary/10 w-max p-4 rounded-2xl">restaurant</span>
                <div className="mt-8">
                   <h3 className="font-headline text-2xl md:text-3xl font-extrabold text-primary mb-3">3 Mahal Ovqat</h3>
                   <p className="text-on-surface-muted font-body text-sm leading-relaxed">Dietolog nazoratidagi halol, sog'lom va to'yimli menu farzandlarimiz uchun maxsus tayyorlanadi.</p>
                </div>
              </div>
            </div>

            {/* Transport */}
            <div className="md:col-span-4 bg-white rounded-[2rem] p-10 flex flex-col justify-between min-h-[350px] border border-black/5 hover:border-primary/20 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group">
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-primary blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="flex flex-col h-full relative z-10">
                <span className="material-symbols-outlined text-primary mb-auto text-5xl bg-primary/10 w-max p-4 rounded-2xl">directions_bus</span>
                <div className="mt-8">
                   <h3 className="font-headline text-2xl md:text-3xl font-extrabold text-primary mb-3">Xavfsiz Transport</h3>
                   <p className="text-on-surface-muted font-body text-sm leading-relaxed">4 ta yangi maxsus maktab avtobuslari GPS tizimi bilan jihozlangan holda uydan maktabga xavfsiz eltadi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* President Visit Quote */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="glass-card bg-primary/5 rounded-[3rem] p-10 md:p-20 relative border-0 shadow-2xl">
            <span className="material-symbols-outlined text-[150px] absolute -top-10 -left-10 text-primary/5 -rotate-12">format_quote</span>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="text-3xl md:text-5xl font-headline font-extrabold text-primary mb-8 leading-tight">
                "Agar mendan sizni nima qiynaydi deb so'rasangiz, farzandlarimizning ta'lim va tarbiyasi deb javob beraman."
              </h2>
              <div className="w-20 h-1 bg-secondary mx-auto mb-8 rounded-full"></div>
              <p className="text-sm font-bold uppercase tracking-widest text-on-surface-muted">Shavkat Mirziyoyev — O'zbekiston Respublikasi Prezidenti</p>
              <p className="mt-8 text-on-surface-muted max-w-2xl mx-auto">2023 va 2025-yillarda Prezident tashrifi bilan e'tirof etilgan muassasa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Admission CTA */}
      <section className="py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-r from-primary via-[#041c80] to-secondary py-24 md:py-32 px-6 md:px-16 text-center shadow-2xl">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-primary/40 mix-blend-multiply z-10"></div>
              <img
                className="w-full h-full object-cover scale-110 opacity-[0.15] mix-blend-overlay"
                src="https://picsum.photos/seed/kadorr/1920/1080"
                alt="Kadorr Building"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative z-20 max-w-4xl mx-auto">
              <span className="inline-block px-5 py-2 mb-8 text-[11px] tracking-[0.25em] font-extrabold text-secondary uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                DATA Qabul Markazi
              </span>
              <h2 className="font-headline text-5xl md:text-7xl font-extrabold text-white tracking-[-0.03em] mb-8 leading-none">
                Yangi 500 o'rinli bino<br />sizni kutmoqda
              </h2>
              <p className="text-white/80 text-xl md:text-2xl mb-16 font-body font-light">
                1-10 sinflar uchun qabul davom etmoqda. Oldindan to'lovda 10% chegirma.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-5">
                <button
                  onClick={openEnrollModal}
                  className="bg-white text-primary px-12 py-6 rounded-full font-headline font-bold uppercase tracking-widest text-sm hover:scale-105 hover:shadow-[0_20px_50px_rgba(255,255,255,0.3)] transition-all"
                >
                  Ariza topshirish
                </button>
                <Link
                  to="/qabul"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-12 py-6 rounded-full font-headline font-bold uppercase tracking-widest text-sm hover:bg-white/20 hover:text-white transition-all inline-flex items-center justify-center"
                >
                  Qabul narxlari
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
