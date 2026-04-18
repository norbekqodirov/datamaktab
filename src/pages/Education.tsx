import React from 'react';
import { maktabData } from '../data/content';

export default function Education() {
  return (
    <div className="bg-surface font-body text-on-surface pt-32 pb-24 min-h-screen">
      {/* Hero */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-20 md:mb-32 text-center">
        <div className="max-w-4xl mx-auto anim-slide-up">
          <span className="text-secondary font-headline text-sm font-extrabold tracking-[0.3em] uppercase mb-4 block">Ta'lim Dasturi</span>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-[-0.04em] text-primary mb-8 leading-none">
            Ta'lim ekotizimi
          </h1>
          <p className="text-on-surface-muted text-lg md:text-2xl font-light leading-relaxed">
            Bizda dars soatlari an'anaviy maktablardan farq qiladi. 56% asosiy fanlar o'quvchini bevosita xalqaro imtihonlarga va IT olamiga tayyorlaydi.
          </p>
        </div>
      </section>

      {/* Structure Timeline / Breakdown */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-32">
        <div className="grid md:grid-cols-12 gap-8">
           <div className="md:col-span-4 bg-primary text-white rounded-[3rem] p-10 relative overflow-hidden flex flex-col justify-center shadow-2xl shadow-primary/20 hover:-translate-y-2 transition-transform duration-500">
              <span className="material-symbols-outlined text-[200px] absolute -right-10 -bottom-10 text-white/5 pointer-events-none">pie_chart</span>
              <h3 className="font-headline text-3xl font-extrabold mb-8 relative z-10">Dars Taqsimoti</h3>
              <ul className="space-y-6 relative z-10">
                 <li className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-sm font-bold tracking-widest text-secondary-light">
                       <span>56% Asosiy fanlar</span>
                    </div>
                    <span className="font-headline font-bold text-xl">Matematika, Ingliz tili, IT</span>
                 </li>
                 <li className="flex flex-col gap-1 mt-4">
                    <div className="flex justify-between items-center text-sm font-bold tracking-widest text-[#a3b1ff]">
                       <span>44% Boshqa fanlar</span>
                    </div>
                    <span className="font-headline font-bold text-xl opacity-90">Ona tili, Tarix, Biologiya...</span>
                 </li>
              </ul>
           </div>
           
           <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card rounded-[2rem] p-10 hover:-translate-y-2 transition-transform shadow-sm group">
                 <span className="material-symbols-outlined text-4xl text-primary mb-6 bg-primary/5 p-4 rounded-xl transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white">child_care</span>
                 <h4 className="font-headline text-2xl font-bold text-primary mb-4">Montessori Yondashuvi</h4>
                 <p className="text-on-surface-muted leading-relaxed text-sm mb-4">2027-2028 o'quv yilidan boshlab 1-4 sinflarda e'tibor bolaning mustaqilligiga qaratiladi. <strong>Biz bolalarni tizimga moslashtirmaymiz. Biz tizimni bolaga moslashtiramiz.</strong></p>
                 <ul className="space-y-2 text-sm text-on-surface-muted italic">
                    <li>- Bola o‘zi tanlaydi, o‘zi bajaradi, o‘zi xulosa qiladi</li>
                    <li>- Har bir o‘quvchi o‘z tezligida o‘sadi</li>
                 </ul>
              </div>
              <div className="glass-card rounded-[2rem] p-10 hover:-translate-y-2 transition-transform shadow-sm bg-white">
                 <span className="material-symbols-outlined text-4xl text-secondary mb-6 bg-secondary/10 p-4 rounded-xl">code_blocks</span>
                 <h4 className="font-headline text-2xl font-bold text-primary mb-4">Code.org Integratsiyasi</h4>
                 <p className="text-on-surface-muted leading-relaxed">Microsoft va Google tomonidan qo'llab-quvvatlanadigan Code.org darslari 1-sinfdanoq boshlanadi. AI, Scratch va algoritmik ta'lim.</p>
              </div>
           </div>
        </div>
      </section>

      {/* 11 Yillik Reja Roadmap */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-headline text-sm font-extrabold tracking-[0.3em] uppercase mb-4 block">Ta'lim Yo'l Xaritasi</span>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-6">Ta'lim tasodif emas — bu 11 yillik reja</h2>
          <p className="text-on-surface-muted text-lg leading-relaxed">
            DATA xalqaro maktabida har bir sinf uchun 1-sinfdan 11-sinfgacha to‘liq ta’lim yo‘l xaritasi ishlab chiqilgan.
          </p>
        </div>

        <div className="relative overflow-hidden pt-8 pb-12">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                { grade: "1", age: "7 yosh", desc: "Maktab hayotiga kirish — adaptatsiya" },
                { grade: "2", age: "8 yosh", desc: "Ko'nikma mustahkamlash — o'qish va hisoblash" },
                { grade: "3", age: "9 yosh", desc: "Tizimli bilim va birinchi olimpiada yo'li" },
                { grade: "4", age: "10 yosh", desc: "Kuchli fanlarda chuqurlashuv, birinchi portfolio" },
                { grade: "5", age: "11 yosh", desc: "Akademik jiddiylik va darajaga bo’linish" },
                { grade: "6", age: "11-12 yosh", desc: "Rivojlanish bosqichi" },
                { grade: "7", age: "12-13 yosh", desc: "Identlik shakllanuv — notiqlik, tadbirkorlik" },
                { grade: "8", age: "13-14 yosh", desc: "Kasbiy tayyorgarlik — AI, IELTS bosqichi" },
                { grade: "9", age: "14-15 yosh", desc: "Intensiv yo'nalish — IELTS 6.5+, OTM tayyorgarligi" },
                { grade: "10", age: "15-16 yosh", desc: "Oliy ta'lim — IELTS 7.0+, staj va ariza strategiyasi" },
                { grade: "11", age: "16-17 yosh", desc: "Bitiruvchi yil — IELTS 7.5+, qabul va kelajak" },
                { grade: "🎓", age: "Natija", desc: "Sog’lom, raqobatbardosh va faol yosh mutaxassis", highlight: true }
              ].map((step, idx) => (
                 <div key={idx} className={`relative p-8 rounded-3xl border transition-all hover:-translate-y-2 ${step.highlight ? 'bg-primary text-white border-primary shadow-xl scale-105 z-10' : 'bg-white border-black/5 hover:border-primary/20 shadow-sm'}`}>
                    <span className={`block font-headline text-5xl font-extrabold mb-4 ${step.highlight ? 'text-white' : 'text-primary/10'}`}>{step.grade !== "🎓" ? `${step.grade}-sinf` : step.grade}</span>
                    <span className={`inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full mb-4 ${step.highlight ? 'bg-white/20 text-white' : 'bg-surface-muted text-on-surface-muted'}`}>{step.age}</span>
                    <p className={`font-headline font-bold text-lg leading-tight ${step.highlight ? 'text-white' : 'text-primary'}`}>{step.desc}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Target Certifications */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-32">
        <div className="bg-gradient-to-br from-[#062bad] to-[#03caff] rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row gap-12 items-center">
           <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1)_0%,_transparent_60%)] pointer-events-none"></div>
           
           <div className="lg:w-1/3 relative z-10">
              <span className="material-symbols-outlined text-[60px] text-white/90 mb-6 drop-shadow-md">workspace_premium</span>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-md">Sertifikat - imtiyozdir!</h2>
              <p className="text-white/80 text-lg font-light leading-relaxed mb-8">
                 Yuqori sinf o‘quvchilarimizni fan sertifikati olishga tayyorlaymiz. Sertifikatlar imtihonlarda imtiyoz va kuchli portfolio yaratadi.
              </p>
           </div>
           
           <div className="lg:w-2/3 relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {[
                { title: "Ingliz tili", target: "IELTS 6 - 7.5" },
                { title: "Matematika", target: "Milliy sertifikat, SAT (530+)" },
                { title: "Koreys tili", target: "TOPIK 3 - 5 level" },
                { title: "Ona tili", target: "Milliy sertifikat (B+ – A+)" },
                { title: "Kimyo", target: "Milliy sertifikat (B+ – A+)" },
                { title: "Informatika", target: "Xalqaro IT sertifikatlar" },
              ].map((cert, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex flex-col justify-center text-center hover:bg-white hover:text-primary transition-colors cursor-default group">
                   <h4 className="font-bold text-sm tracking-widest uppercase mb-2 text-white/70 group-hover:text-primary/70">{cert.title}</h4>
                   <p className="font-headline font-extrabold text-xl">{cert.target}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Extracurriculars & Sports */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-headline text-sm font-extrabold tracking-[0.3em] uppercase mb-4 block">To'garaklar va Sport</span>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-6">Darsdan tashqari vaqt — kelajakni qurish vaqti</h2>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-6">
           {/* Karate & Gym - Images Needed Here */}
           <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="glass-card rounded-[2rem] overflow-hidden flex flex-col sm:flex-row relative group min-h-[250px]">
                 <div className="w-full sm:w-1/2 h-48 sm:h-auto bg-primary/5 relative">
                    <img 
                      src="/images/karate.jpg" 
                      alt="Karate Intizor Raximova" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                         const target = e.target as HTMLImageElement;
                         target.src = "https://picsum.photos/seed/karate/400/400";
                         target.style.filter = "grayscale(50%)";
                      }}
                    />
                 </div>
                 <div className="w-full sm:w-1/2 p-8 flex flex-col justify-center bg-white/80 backdrop-blur-md z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">Sport Bo'limi</span>
                    <h3 className="font-headline font-bold text-2xl text-primary mb-2">Karate</h3>
                    <p className="text-sm text-on-surface-muted mb-4">Intizom, iroda va o‘zini boshqarish. Murabbiy: Intizor Raximova (ko'plab chempionlar ustozi).</p>
                 </div>
              </div>

              <div className="glass-card rounded-[2rem] overflow-hidden flex flex-col sm:flex-row-reverse relative group min-h-[250px]">
                 <div className="w-full sm:w-1/2 h-48 sm:h-auto bg-secondary/10 relative">
                    <img 
                      src="/images/gymnastics.jpg" 
                      alt="Gimnastika Elina Karimova" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                         const target = e.target as HTMLImageElement;
                         target.src = "https://picsum.photos/seed/gymnastics/400/400";
                         target.style.filter = "grayscale(50%)";
                      }}
                    />
                 </div>
                 <div className="w-full sm:w-1/2 p-8 flex flex-col justify-center bg-white/80 backdrop-blur-md z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">Sport Bo'limi</span>
                    <h3 className="font-headline font-bold text-2xl text-primary mb-2">Gimnastika</h3>
                    <p className="text-sm text-on-surface-muted mb-4">Moslashuvchanlik va muvozanat. Murabbiy: Elina Karimova (1-toifali trener).</p>
                 </div>
              </div>
           </div>

           {/* Other Clubs Grid */}
           <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { name: 'Shahmat', icon: 'chess' },
                { name: 'Mental arifmetika', icon: 'calculate' },
                { name: 'Dasturlash', icon: 'terminal' },
                { name: 'Robototexnika', icon: 'smart_toy' },
                { name: 'SMM menejer', icon: 'campaign' },
                { name: 'Xorijiy tillar', icon: 'translate' },
                { name: 'Mobilografiya', icon: 'photo_camera' },
                { name: 'Sun’iy intellekt', icon: 'memory' },
                { name: 'Kulolchilik', icon: 'partly_cloudy_day' }
              ].map((club, idx) => (
                <div key={idx} className="bg-surface-muted border border-white/50 rounded-2xl p-6 text-center hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <span className="material-symbols-outlined text-3xl text-primary mb-3" style={{fontVariationSettings: "'FILL' 1"}}>{club.icon}</span>
                  <p className="font-bold text-sm text-on-surface-muted leading-tight">{club.name}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Olympiads (BOND) */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-32">
         <div className="bg-primary rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/40 via-transparent to-transparent"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
               <div className="lg:w-1/2">
                  <span className="inline-block px-4 py-1.5 mb-6 text-[10px] tracking-[0.25em] font-bold text-primary uppercase bg-white rounded-full">
                     DATA - Chempionlar Maktabi
                  </span>
                  <h2 className="font-headline text-4xl md:text-6xl font-extrabold mb-6 leading-tight">Xalqaro<br/>Olimpiadalar</h2>
                  <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed mb-10 border-l-4 border-secondary pl-6">
                     BOND olimpiadasi sayti (bondolympiad.uz) orqali o‘quvchilarimiz bilimini sinovdan o‘tkazadi. Bu faqatgina musobaqa emas, balki rivojlanish maydoni.
                  </p>
               </div>
               
               <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                     { title: "TASIMO", desc: "Matematika bo'yicha O'zbekiston miqyosida" },
                     { title: "SASMO", desc: "Matematika. Dunyoning 42 ta davlatida o'tkaziladi" },
                     { title: "HIPPO", desc: "Ingliz tili. Final bosqichi Italiyada o'tkaziladi" },
                     { title: "Copernicus", desc: "Matematika. Final bosqichi AQSh, Nyu-Yorkda" }
                  ].map((olympiad, idx) => (
                     <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                        <h4 className="font-headline font-bold text-xl text-white mb-2">{olympiad.title}</h4>
                        <p className="text-sm text-white/70 leading-relaxed">{olympiad.desc}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Durbin & Coin System Expanded */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto">
         <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-headline text-sm font-extrabold tracking-[0.3em] uppercase mb-4 block">Raqamli Ekosistema</span>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-6">Durbin CRM & Coin Tizimi</h2>
            <p className="text-on-surface-muted text-lg leading-relaxed mb-6">
              Baholar, dars jadvali, e'lonlar va o'quvchi faolligi — barchasi bitta ilovada. Ota-onalar farzandlarining reytingi va Coin xaridlarini real vaqtda kuzatib borishadi.
            </p>
         </div>

         <div className="grid xl:grid-cols-2 gap-16 items-center">
            {/* Durbin App Mockup - Image needed */}
            <div className="relative w-full aspect-square md:aspect-video xl:aspect-square bg-gradient-to-br from-primary/5 to-secondary/10 rounded-[3rem] overflow-hidden flex justify-center items-end border border-white/60 shadow-xl group">
               <div className="absolute top-10 w-full text-center px-10">
                  <h3 className="font-headline text-2xl font-bold text-primary mb-2">Endi natijalar bitta ilovada!</h3>
                  <p className="text-sm text-on-surface-muted max-w-sm mx-auto">84% ota-onalar Durbin orqali maktab jarayonlaridan xabardor bo'lib, xotirjamliklarini ta'kidlashgan.</p>
               </div>
               
               <img 
                 src="/images/durbin-mockup.png" 
                 alt="Durbin CRM Ilovasi" 
                 className="relative z-10 w-[80%] max-w-[400px] object-cover rounded-t-[2rem] shadow-[-20px_-20px_60px_rgba(0,0,0,0.1)] transition-transform duration-700 group-hover:translate-y-4"
                 onError={(e) => {
                   const target = e.target as HTMLImageElement;
                   target.src = "https://picsum.photos/seed/app/400/600";
                 }}
               />
            </div>

            {/* Coin Yarmarkasi Cards */}
            <div className="flex flex-col gap-8">
               <div className="bg-primary p-8 rounded-[2rem] text-white flex flex-col sm:flex-row items-center gap-8 shadow-xl">
                  <div className="w-24 h-24 shrink-0 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-yellow-200">
                     <span className="material-symbols-outlined text-[50px] text-yellow-700" style={{fontVariationSettings: "'FILL' 1"}}>toll</span>
                  </div>
                  <div>
                     <h4 className="font-headline text-2xl font-bold mb-2">Coin Yarmarkasi</h4>
                     <p className="text-white/80 text-sm leading-relaxed">
                        Coinlar yaxshi baholar, uy vazifasi va xulq-atvor evaziga beriladi. O'quvchilar ushbu koinlarni maxsus yarmarkada ajoyib sovg'alarga almashtiradilar.
                     </p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  {[
                     { name: 'Merkuriy Coin', val: '1 000', color: 'bg-slate-100 text-slate-600' },
                     { name: 'Venera Coin', val: '5 000', color: 'bg-orange-50 text-orange-600' },
                     { name: 'Yupiter Coin', val: '10 000', color: 'bg-blue-50 text-blue-600' },
                     { name: 'Saturn Super Coin', val: '25 000', color: 'bg-purple-50 text-purple-600' }
                  ].map((coin, idx) => (
                     <div key={idx} className={`${coin.color} p-6 rounded-2xl border border-current/10 flex flex-col justify-center items-center text-center shadow-sm hover:scale-105 transition-transform`}>
                        <span className="font-headline font-extrabold text-3xl mb-1">{coin.val}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">{coin.name}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
