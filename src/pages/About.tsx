import React from 'react';
import { maktabData } from '../data/content';

export default function About() {
  return (
    <div className="bg-surface font-body text-on-surface pt-32 pb-24">
      {/* Hero Section */}
      <section className="relative px-6 md:px-16 max-w-[1440px] mx-auto mb-20 md:mb-32">
        <div className="text-center max-w-4xl mx-auto anim-slide-up">
          <span className="text-secondary font-headline text-sm font-extrabold tracking-[0.3em] uppercase mb-4 block">Biz Haqimizda</span>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-[-0.04em] text-primary mb-8 leading-none">
            Maktab haqida 
          </h1>
          <p className="text-on-surface-muted text-lg md:text-2xl font-light leading-relaxed">
            {maktabData.about.mission}
          </p>
        </div>
      </section>





      {/* Logic / Logo Meaning */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-32">
        <div className="glass-card rounded-[3rem] p-10 md:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
          <div className="relative z-10 max-w-2xl">
             <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-primary mb-6">"DATA" logotipi nima anglatadi?</h2>
             <p className="text-on-surface-muted text-lg leading-relaxed mb-6">
                DATA logotipidagi uchta "D" harfi yaxlit g'oyani ifodalaydi. Har bir "D" da bo'shliqning to'lishi o'zgaradi: birinchisi boshlang'ich bilim darajasini, ikkinchisi motivatsiya bilan to'ldirilayotgan bosqichni, uchinchisi intellektual yuksalishni bildiradi.
             </p>
             <p className="text-on-surface-muted text-lg leading-relaxed mb-8">
               "DATA" axborot degan ma'noni anglatadi. Bizning shiorimiz rostdan ham: <strong>"Bilimga to'ldiramiz!"</strong>
             </p>
          </div>
        </div>
      </section>

      {/* History and Status */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
           <div>
              <span className="text-secondary font-headline text-xs font-extrabold tracking-[0.3em] uppercase mb-4 block">Yutuqlarimiz</span>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-10 leading-none">Xalqaro darajaga <br/> qadam</h2>
              <ul className="space-y-6">
                 {maktabData.about.achievements.map((ach, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                       <span className="material-symbols-outlined text-secondary mt-1 bg-secondary/10 p-2 rounded-full">check_circle</span>
                       <span className="font-headline font-semibold text-lg text-on-surface-muted">{ach}</span>
                    </li>
                 ))}
              </ul>
           </div>
           
           <div className="grid grid-cols-2 gap-6 relative">
              <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10 rounded-full"></div>
              <div className="glass-panel p-8 rounded-3xl flex flex-col items-center justify-center text-center mt-12 shadow-xl border border-white/50">
                <span className="material-symbols-outlined text-[60px] text-primary mb-4" style={{fontVariationSettings: "'FILL' 1"}}>apartment</span>
                <span className="font-headline font-bold text-xl text-primary">Cyberpark Rekord</span>
                <span className="text-sm text-on-surface-muted mt-2">Viloyatdagi ilk rezident</span>
              </div>
              <div className="glass-panel p-8 rounded-3xl flex flex-col items-center justify-center text-center shadow-xl border border-white/50 mb-12 bg-primary text-white">
                <span className="material-symbols-outlined text-[60px] text-white mb-4" style={{fontVariationSettings: "'FILL' 1"}}>school</span>
                <span className="font-headline font-bold text-xl text-white">Cambridge Status</span>
                <span className="text-sm text-white/70 mt-2">Nomzod maktab</span>
              </div>
           </div>
        </div>
      </section>

      {/* Yashnar NNT */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="bg-gradient-to-br from-primary to-primary-light rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden">
           <div className="absolute -top-40 -left-40 w-96 h-96 bg-secondary/30 rounded-full blur-[100px]"></div>
           <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/30 rounded-full blur-[100px]"></div>
           
           <div className="relative z-10 flex flex-col md:flex-row gap-16 items-center">
              <div className="flex-1">
                 <span className="inline-block px-4 py-1.5 mb-6 text-[10px] tracking-[0.25em] font-bold text-white uppercase bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                    Ijtimoiy Loyiha
                 </span>
                 <h2 className="font-headline text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-white">"Yashnar" NNT</h2>
                 <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed mb-6">
                    "Bir bola — bir oila. Bir oila — bir jamiyat." Daromadimizning ma'lum qismi ijtimoiy himoyaga muhtoj bolalarni qo'llab-quvvatlash va "Teng maydon" inklyuziv ta'lim loyihalariga yo'naltiriladi.
                 </p>
                 <p className="font-headline font-bold text-secondary-light tracking-widest uppercase">
                    Har bir bola yashnasin, yashasin!
                 </p>
              </div>
              <div className="md:w-1/3 flex justify-center">
                 <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl flex items-center justify-center relative shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                    <span className="material-symbols-outlined text-[80px] text-secondary-light absolute">diversity_1</span>
                 </div>
              </div>
           </div>
        </div>
      </section>
      {/* --------- EXPANDED INFRASTRUCTURE & TEAM --------- */}

      {/* 1. Xavfsizlik va Sug'urta */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mt-32">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
           <div className="w-full lg:w-1/2 order-2 lg:order-1 relative min-h-[400px]">
              <div className="absolute inset-0 bg-secondary/10 rounded-[3rem] -rotate-3 transform origin-bottom-left"></div>
              <img 
                src="/images/security-guard.jpg" 
                alt="Milliy Gvardiya" 
                className="absolute inset-0 w-full h-full object-cover rounded-[3rem] shadow-xl z-10"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://picsum.photos/seed/sec/600/500";
                  target.style.filter = "grayscale(50%)";
                }}
              />
              <div className="absolute -bottom-8 -right-8 glass-card p-6 rounded-3xl z-20 shadow-[0_20px_40px_rgba(0,0,0,0.2)] max-w-[250px] border border-white/40">
                 <span className="material-symbols-outlined text-secondary text-4xl mb-2">admin_panel_settings</span>
                 <p className="font-headline font-bold text-primary leading-tight">20 MLN SO'MLIK SUG'URTA POLISI</p>
              </div>
           </div>
           
           <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <span className="text-secondary font-headline text-sm font-extrabold tracking-[0.3em] uppercase mb-4 block">Xavfsizlik</span>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-6">Xavfsiz va xotirjam makon</h2>
              <p className="text-on-surface-muted text-lg leading-relaxed mb-8">
                Maktab hududi <strong>Milliy gvardiya</strong> tomonidan doimiy nazorat qilinadi. Har bir burchakda 24/7 CCTV kameralar ishlaydi. 
                Shuningdek, farzandingiz uchun o'quv yili boshida 20 million so'mlik hayot sug'urtasi bepul taqdim etiladi.
              </p>
              <ul className="space-y-4">
                 {[
                   "Kirish-chiqish to'liq nazoratda (Face ID).",
                   "Favqulodda holatlar uchun maxsus SOS tizimi.",
                   "Hodisa maktabda bo'lmasa ham sug'urta ishlaydi."
                 ].map((item, idx) => (
                    <li key={idx} className="flex gap-4 items-center">
                       <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-full text-sm">verified_user</span>
                       <span className="font-bold text-on-surface-muted">{item}</span>
                    </li>
                 ))}
              </ul>
           </div>
        </div>
      </section>

      {/* 2. Tibbiyot */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mt-32">
         <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-headline text-sm font-extrabold tracking-[0.3em] uppercase mb-4 block">Tibbiyot</span>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-6">Har bir o'quvchi doimiy nazoratda</h2>
            <p className="text-on-surface-muted text-lg leading-relaxed">
              Jismoniy va ruhiy salomatlik - yetuk avlod poydevori. Maktabimizda tibbiyot sohasining yetakchi mutaxassislari doimiy faoliyat yuritadi.
            </p>
         </div>

         <div className="grid md:grid-cols-3 gap-6">
            {[
               { role: "Maktab Shifokori", name: "Kelvin Wallace", desc: "Bolalarni doimiy tibbiy ko'rikdan o'tkazish, birlamchi tibbiy yordam va gigiyena nazorati.", image: "/images/doctor.jpg" },
               { role: "Psixolog", name: "Kelvin Wallace", desc: "Bolaning hissiy holati va motivatsiyasini kuzatish, moslashishdagi qiyinchiliklarni hal qilish.", image: "/images/psychologist.jpg" },
               { role: "Logoped", name: "Kelvin Wallace", desc: "Nutq nuqsonlarini erta aniqlash va tuzatish. O'qish va yozishdagi to'siqlarni olib tashlash.", image: "/images/logoped.jpg" }
            ].map((staff, idx) => (
               <div key={idx} className="glass-card rounded-[2rem] overflow-hidden flex flex-col group hover:-translate-y-2 transition-transform shadow-sm">
                  <div className="h-56 relative bg-primary/5">
                     <img 
                        src={staff.image} 
                        alt={staff.role} 
                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://picsum.photos/seed/${staff.role}/400/300`;
                        }}
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 to-transparent flex items-end p-6">
                        <h3 className="font-headline text-2xl font-bold text-white">{staff.role}</h3>
                     </div>
                  </div>
                  <div className="p-6">
                     <span className="text-sm font-bold tracking-widest text-secondary uppercase block mb-3">{staff.name}</span>
                     <p className="text-on-surface-muted leading-relaxed text-sm">{staff.desc}</p>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 3. Oziq-ovqat va Transport */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mt-32">
         <div className="grid lg:grid-cols-2 gap-8">
            {/* Food */}
            <div className="bg-white rounded-[3rem] p-10 md:p-14 border border-surface-muted shadow-xl relative overflow-hidden group">
               <div className="absolute right-0 top-0 w-1/2 h-full">
                  <img src="/images/cafeteria.jpg" alt="Cafeteria" className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-1000" 
                      onError={(e) => { const target = e.target as HTMLImageElement; target.src = "https://picsum.photos/seed/food/400/600"; }} />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
               </div>
               
               <div className="relative z-10">
                  <span className="material-symbols-outlined text-5xl text-primary mb-6 bg-primary/5 p-4 rounded-xl">restaurant_menu</span>
                  <h3 className="font-headline text-3xl font-extrabold text-primary mb-2">3 Mahal Issiq Ovqat</h3>
                  <span className="text-xs font-bold tracking-widest text-secondary uppercase block mb-6">Bosh oshpaz: Qudrat Novvotov</span>
                  
                  <div className="space-y-4 text-on-surface-muted text-sm">
                     <div className="bg-surface/50 p-4 rounded-xl border border-black/5">
                        <strong className="text-primary tracking-wide">08:00–09:00 (Nonushta):</strong> Sutli bo'tqa, tvorogli blinchik, baton va murabbo.
                     </div>
                     <div className="bg-surface/50 p-4 rounded-xl border border-black/5">
                        <strong className="text-primary tracking-wide">12:00–13:00 (Tushlik):</strong> Birinchi taomga sho'rvalar. Ikkinchisiga palov, manti, bifstroganov.
                     </div>
                     <div className="bg-surface/50 p-4 rounded-xl border border-black/5">
                        <strong className="text-primary tracking-wide">Poldnik:</strong> Pirog, mevalar, kompot va bahor salatlari.
                     </div>
                  </div>
               </div>
            </div>

            {/* Transport */}
            <div className="bg-primary rounded-[3rem] p-10 md:p-14 text-white shadow-xl relative overflow-hidden group">
               <div className="absolute right-0 top-0 w-1/2 h-full">
                  <img src="/images/school-bus.jpg" alt="School Bus" className="w-full h-full object-cover opacity-[0.15] group-hover:opacity-30 transition-opacity duration-1000 mix-blend-overlay"
                      onError={(e) => { const target = e.target as HTMLImageElement; target.src = "https://picsum.photos/seed/bus/400/600"; }} />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
               </div>
               
               <div className="relative z-10 h-full flex flex-col">
                  <div>
                     <span className="material-symbols-outlined text-5xl text-white mb-6 bg-white/10 p-4 rounded-xl backdrop-blur-md">directions_bus</span>
                     <h3 className="font-headline text-3xl font-extrabold mb-2">Xavfsiz Transport</h3>
                     <span className="text-xs font-bold tracking-widest text-secondary-light uppercase block mb-6">Uydan maktabga, maktabdan uyga</span>
                  </div>
                  
                  <p className="text-white/80 leading-relaxed max-w-sm mb-8">
                     Bizda 4 ta maxsus SAZ NP 26 maktab avtobuslari o'quvchilarni tumanlar bo'ylab manziliga yetkazadi.
                     Har bir avtobus 40 yo'lovchi sig'imiga ega va bolalar to'liq o'tirgan holda, xavfsizlik nazorati ostida qatnaydi.
                  </p>
                  
                  <div className="mt-auto">
                     <span className="inline-block px-4 py-2 border border-white/30 rounded-lg text-sm bg-white/10 backdrop-blur-sm">
                        Maxsus GPS ilova orqali real vaqtda kuzatuv!
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4-bosqichli muloqot va Tyutor */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mt-32">
         <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-headline text-sm font-extrabold tracking-[0.3em] uppercase mb-4 block">Maktab va Oila Hamkorligi</span>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-6">Ota-ona barchasidan xabardor</h2>
            <p className="text-on-surface-muted text-lg leading-relaxed mb-6">Biz ota-onalarni jarayondan xabardor qilishni tizimlashtirganmiz. Xabardor ota-ona — xotirjam ota-ona!</p>
            <div className="inline-block bg-primary/10 text-primary px-5 py-2.5 rounded-2xl font-bold tracking-widest text-sm border border-primary/20">
               84% ota-onalar muammolar o'z vaqtida hal bo'lishini ta'kidladi
            </div>
         </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
               { icon: "supervisor_account", title: "1. Sinf Rahbari / Tyutor", desc: "Haftada bir marta o'qish, xulq va rivojlanish haqida ota-onaga ma'lumot beriladi." },
               { icon: "support_agent", title: "2. Administrator", desc: "Maktab faoliyatiga oid taklif va shikoyatlar o'rganilib, natijasi xabar qilinadi." },
               { icon: "diversity_3", title: "3. Ota-onalar Majlisi", desc: "Har chorakda 1 marta direktor bilan oflayn formatda. Yutuq va rejalar ochiq muhokama qilinadi." },
               { icon: "smartphone", title: "4. Durbin.uz CRM", desc: "Baholar, jadval va e'lonlar real vaqt rejimida telefoningizda." }
            ].map((step, idx) => (
               <div key={idx} className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group relative z-10 flex flex-col">
                  <span className="material-symbols-outlined text-[40px] text-secondary mb-6 bg-secondary/10 w-fit p-4 rounded-xl group-hover:scale-110 transition-transform">{step.icon}</span>
                  <h4 className="font-headline font-bold text-xl text-primary mb-3">{step.title}</h4>
                  <p className="text-sm text-on-surface-muted leading-relaxed mt-auto">{step.desc}</p>
               </div>
            ))}
         </div>

         <div className="mt-16 bg-surface-muted border border-black/5 rounded-[3rem] p-10 lg:p-16 flex flex-col md:flex-row items-center gap-10 shadow-sm">
            <div className="w-full md:w-1/2 lg:w-1/3">
               <span className="material-symbols-outlined text-[50px] text-primary hidden md:block mb-4">admin_panel_settings</span>
               <h3 className="font-headline text-3xl font-extrabold text-primary mb-4">Tyutor Nazorati</h3>
               <p className="text-on-surface-muted text-sm leading-relaxed mb-6">Yuqori sinflarga tyutor biriktirilgan bo‘lib, ular o‘quvchilarning ta’lim va tarbiyasini individual yondashuv ostida kuzatadi. <strong>Asosiy vazifalari:</strong></p>
               <ul className="space-y-3 text-sm font-bold text-primary opacity-80">
                  <li className="flex gap-2"><span className="text-secondary">•</span> Bilim darajasini tahlil qilish</li>
                  <li className="flex gap-2"><span className="text-secondary">•</span> 5 tashabbusga jalb etish</li>
                  <li className="flex gap-2"><span className="text-secondary">•</span> Darsga qatnash, intizom va formani nazorat qilish</li>
               </ul>
            </div>
            <div className="w-full md:w-1/2 lg:w-2/3 grid grid-cols-2 lg:grid-cols-3 gap-4">
               {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square bg-primary/5 rounded-2xl overflow-hidden relative border border-primary/10 group">
                     <img src={`/images/team-${i + 10}.jpg`} alt="Tyutor" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer" onError={(e)=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/t${i}/300/300`;}} />
                     <div className="absolute inset-x-0 bottom-0 bg-white/90 p-2 text-center text-[10px] font-bold text-primary uppercase translate-y-full group-hover:translate-y-0 transition-transform">Tyutor</div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. Jamoa */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mt-32 mb-32">
         <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-headline text-sm font-extrabold tracking-[0.3em] uppercase mb-4 block">Bizning Jamoa</span>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-6">Ustozlar — Ta'lim Ustuni</h2>
            <p className="text-on-surface-muted text-lg leading-relaxed">
              Ustozlarni tanlash jarayoni HR, ilmiy bo'lim, sinov darsi va 1 oylik sinov muddatidan iborat 4 bosqichli saralash tizimi asosida amalga oshiriladi.
            </p>
         </div>

         <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
               { name: "Sanjar Madraximov", desc: "IELTS 8.5 BALL VA CELTA SERTIFIKATI SOHIBI", type: "English" },
               { name: "Dilfuza Babajanova", desc: "Maktab Direktori. Adolat, tartib va ochiqlik kafili.", type: "Management" },
               { name: "Nilufar Kalandarova", desc: "O'quv va akademik ishlar bo'yicha direktorning birinchi o'rinbosari.", type: "Management" },
               { name: "Zafarbek Ro'zmetov", desc: "HR Direktor", type: "Management" },
               { name: "Nodira Abdullayeva", desc: "IELTS 8.0 BALL", type: "English" },
               { name: "G'ayrat Latipov", desc: "Informatika va robototexnika fani ustozi", type: "IT" },
               { name: "Azizbek Matchanov", desc: "Matematika fani ustozi", type: "Math" }
            ].map((member, idx) => (
               <div key={idx} className="break-inside-avoid bg-white rounded-3xl p-2 shadow-sm hover:shadow-lg transition-all border border-black/5">
                  <div className="aspect-square w-full rounded-[2rem] bg-surface relative overflow-hidden mb-4">
                     <img 
                       src={`/images/team-${idx}.jpg`} 
                       alt={member.name} 
                       className="w-full h-full object-cover"
                       onError={(e) => {
                         const target = e.target as HTMLImageElement;
                         target.src = `https://picsum.photos/seed/face${idx}/400/400`;
                       }}
                     />
                     <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur text-[10px] font-bold tracking-widest uppercase rounded-full text-primary">
                           {member.type}
                        </span>
                     </div>
                  </div>
                  <div className="px-4 pb-4">
                     <h4 className="font-headline font-bold text-xl text-primary mb-1">{member.name}</h4>
                     <p className="text-xs font-bold text-on-surface-muted leading-relaxed uppercase">{member.desc}</p>
                  </div>
               </div>
            ))}
         </div>
      </section>
    </div>
  );
}
