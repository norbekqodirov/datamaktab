import React from 'react';
import { maktabData } from '../data/content';

export default function Admission() {
  return (
    <div className="bg-surface font-body text-on-surface pt-32 pb-24 min-h-screen">
      {/* Hero */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-20 md:mb-32 text-center">
        <div className="max-w-4xl mx-auto anim-slide-up">
          <span className="text-secondary font-headline text-sm font-extrabold tracking-[0.3em] uppercase mb-4 block">Qabul Jaryoni</span>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-[-0.04em] text-primary mb-8 leading-none">
            2026 – 2027 O'quv Yiliga Qabul
          </h1>
          <p className="text-on-surface-muted text-lg md:text-2xl font-light leading-relaxed">
            1-10 sinflar uchun qabul davom etmoqda. O'z farzandingizga sifatli, ishonchli va xavfsiz kelajak poydevorini yarating.
          </p>
        </div>
      </section>

      {/* Pricing / Contract */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-32">
        <div className="glass-card rounded-[3rem] p-10 md:p-20 overflow-hidden relative shadow-2xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-secondary font-headline text-xs font-extrabold tracking-[0.3em] uppercase mb-6 block">To'lov Tartibi</span>
              <h2 className="font-headline text-4xl md:text-6xl font-extrabold text-primary mb-6">
                Yillik Shartnoma
              </h2>
              <div className="bg-primary text-white p-8 rounded-3xl mb-8">
                 <p className="text-sm uppercase tracking-widest font-bold text-white/70 mb-2">Umumiy to'lov</p>
                 <h3 className="text-4xl md:text-5xl font-extrabold">{maktabData.admission.fee}</h3>
              </div>
              <div className="bg-secondary/10 border border-secondary/30 p-8 rounded-3xl">
                 <p className="text-sm uppercase tracking-widest font-bold text-primary mb-2">Aksiya va Chegirmalar</p>
                 <h3 className="text-2xl md:text-3xl font-extrabold text-primary mb-2">{maktabData.admission.discount}</h3>
              </div>
            </div>
            
            <div>
              <h3 className="font-headline text-2xl font-bold text-primary mb-8 border-b pb-4 border-slate-200">To'lov nimalarni o'z ichiga oladi?</h3>
              <ul className="space-y-5">
                {maktabData.admission.covers.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                     <span className="material-symbols-outlined text-secondary text-2xl">done_all</span>
                     <span className="font-headline font-bold text-lg text-on-surface-muted">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 p-6 bg-primary/5 rounded-2xl">
                 <p className="text-sm text-on-surface-muted font-bold">
                    * Barcha o'quv qurollari bepul ta'minlanadi, bu ota-onalar xarajatini kamaytirib, bolani darsga doim hozir holatda saqlashga xizmat qiladi.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Transparency */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-32">
         <div className="bg-gradient-to-br from-[#062bad] to-[#011454] text-white rounded-[3rem] p-10 md:p-20 relative overflow-hidden shadow-2xl">
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8 text-center leading-tight">
               Maktabdagi asosiy xarajat — bino emas!<br/>
               <span className="text-[#03caff]">Bu inson va tizimdir.</span>
            </h2>
            <div className="text-center mb-16">
               <span className="inline-block px-5 py-2.5 border-2 border-white/20 rounded-full text-xs font-bold tracking-[0.2em] uppercase bg-white/5 backdrop-blur-sm shadow-md">To'lovlar qanday xarajatlarga yo'naltiriladi?</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 relative z-10">
               {[
                  { name: "Ustoz va xodimlar oyligi", icon: "payments" },
                  { name: "Soliqlar va Tizim", icon: "account_balance" },
                  { name: "Ovqatlanish (3 Mahal)", icon: "restaurant" },
                  { name: "Akademik ta'minot", icon: "book" },
                  { name: "Xavfsizlik (Milliy Gvardiya)", icon: "security" },
                  { name: "Tibbiy xizmat va Sug'urta", icon: "medical_services" },
                  { name: "IT Infratuzilma", icon: "computer" },
                  { name: "To'garaklar (IELTS, IT)", icon: "sports_e-sports" },
                  { name: "O'quv va darslik qurollari", icon: "edit_document" },
                  { name: "Amortizatsiya", icon: "build_circle" },
               ].map((item, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center hover:bg-white hover:text-[#062bad] transition-colors duration-500 group shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                     <span className="material-symbols-outlined text-[40px] mb-4 text-[#03caff] group-hover:text-[#062bad] transition-colors duration-500" style={{fontVariationSettings: "'FILL' 1"}}>{item.icon}</span>
                     <h4 className="font-bold text-xs md:text-sm tracking-wide leading-tight px-2">{item.name}</h4>
                  </div>
               ))}
            </div>

            {/* Light bursts */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#03caff] opacity-10 blur-[150px] rounded-full pointer-events-none"></div>
         </div>
      </section>

      {/* Rules & Prohibitions */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="bg-surface-muted rounded-[3rem] p-10 md:p-20 relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center mb-16">
             <span className="material-symbols-outlined text-[60px] text-primary mb-6">gavel</span>
             <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-primary mb-6">Taqiqlangan Holatlar va Qoidalar</h2>
             <p className="text-on-surface-muted text-lg">
                DATA xalqaro maktabining o'quv muhiti xavfsiz, sog'lom va adolatli bo'lishi uchun quyidagi qoidalarga qat'iy amal qilinadi.
             </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {maktabData.admission.prohibitions.map((rule, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                   <span className="material-symbols-outlined text-red-500">block</span>
                   <p className="font-headline font-bold text-on-surface-muted">{rule}</p>
                </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
