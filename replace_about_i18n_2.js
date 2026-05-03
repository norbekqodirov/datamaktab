import { readFileSync, writeFileSync } from 'fs';

const file = 'src/pages/About.tsx';
let code = readFileSync(file, 'utf8');

// 1. Food title & description
code = code.replace(
  /<span className="text-white font-headline font-extrabold text-2xl drop-shadow-lg">Kuniga 3 Mahal Issiq Ovqat<\/span>/g,
  `<span className="text-white font-headline font-extrabold text-2xl drop-shadow-lg">{a.food_title}</span>`
);
code = code.replace(
  /<p className="text-on-surface-muted leading-relaxed mb-6">Menyu dietolog nazoratida tuziladi. Nonushta, tushlik va poldnik — hammasini maktab ta'minlaydi.<\/p>/g,
  `<p className="text-on-surface-muted leading-relaxed mb-6">{a.food_desc}</p>`
);

// 2. Food array
code = code.replace(
  /\[\s*\{\s*label:\s*'Nonushta'[\s\S]*?\]\.map/m,
  `a.food_meals.map`
);
code = code.replace(
  /meal\.label/g,
  `meal.time`
);
code = code.replace(
  /meal\.desc/g,
  `meal.menu`
);

// 3. Transport title & description
code = code.replace(
  /<span className="text-white font-headline font-extrabold text-2xl drop-shadow-lg">GPS Nazoratli Avtobuslar<\/span>/g,
  `<span className="text-white font-headline font-extrabold text-2xl drop-shadow-lg">{a.transport_title}</span>`
);
code = code.replace(
  /<p className="text-on-surface-muted leading-relaxed mb-6">4 ta SAZ NP 26 model avtobus faoliyat yuritadi. Ota-onalar farzandining harakatini real vaqtda kuzatib boradi.<\/p>/g,
  `<p className="text-on-surface-muted leading-relaxed mb-6">{a.transport_desc}</p>`
);

// 4. Transport stats array
code = code.replace(
  /\[\s*\{\s*icon:\s*'directions_bus'[\s\S]*?\]\.map/m,
  `[
                    { icon: 'directions_bus', val: a.transport_stats[0].val, label: a.transport_stats[0].label },
                    { icon: 'person', val: '40', label: "Sig'im (nafar)" },
                    { icon: 'location_on', val: 'GPS', label: a.transport_stats[1].label },
                    { icon: 'calendar_month', val: '5 kun', label: 'Haftalik xizmat' },
                  ].map`
);

// 5. Yashnar badge, title, desc
code = code.replace(
  /<span className="text-white font-headline font-extrabold text-2xl drop-shadow-lg">"YASHNAR" NNT<\/span>/g,
  `<span className="text-white font-headline font-extrabold text-2xl drop-shadow-lg">{a.yashnar_title}</span>`
);
code = code.replace(
  /<p className="text-on-surface-muted leading-relaxed mb-6">"Bir bola, bir oila, bir jamiyat" shiori ostida DATA daromadining bir qismi ijtimoiy loyihalarga yo'naltiriladi.<\/p>/g,
  `<p className="text-on-surface-muted leading-relaxed mb-6">{a.yashnar_desc}</p>`
);
code = code.replace(
  /\{"Ijtimoiy himoyaga muhtoj bolalarni qo'llab-quvvatlash", "Inklyuziv ta'lim loyihalarini rivojlantirish", "Ta'limga kirish imkoniyatini kengaytirish"\]\.map/g,
  `a.yashnar_features.map`
);
code = code.replace(
  /\{"Ijtimoiy himoyaga muhtoj bolalarni qo'llab-quvvatlash",.*?\]\.map/,
  `a.yashnar_features.map`
);

// 6. Inclusive
code = code.replace(
  /<div className="absolute top-4 right-4 bg-\[#03caff\] text-white text-\[9px\] font-extrabold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">O'zbekistonda 1-chi<\/div>/g,
  `<div className="absolute top-4 right-4 bg-[#03caff] text-white text-[9px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">{a.achievements[4]}</div>`
);
code = code.replace(
  /<span className="text-white font-headline font-extrabold text-2xl drop-shadow-lg">Inklyuziv Korreksion Sinf<\/span>/g,
  `<span className="text-white font-headline font-extrabold text-2xl drop-shadow-lg">{a.inclusive_title}</span>`
);
code = code.replace(
  /<p className="text-on-surface-muted leading-relaxed mb-6">2025-yildan boshlab O'zbekistondagi 700 dan ortiq xususiy maktablar orasida ilk bo'lib inklyuziv korreksion sinf tashkil etildi. "Teng maydon" loyihasi.<\/p>/g,
  `<p className="text-on-surface-muted leading-relaxed mb-6">{a.inclusive_subtitle}</p>`
);

// 7. Team
const team = "const tm = t.team;";
if (!code.includes(team)) {
  code = code.replace(
    /const a = t\.about;/g,
    `const a = t.about;\n  const tm = t.team;`
  );
}

code = code.replace(
  /<h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">Rahbariyat va Ustozlar<\/h2>/g,
  `<h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">{tm.hero_title}</h2>`
);
code = code.replace(
  /<p className="mt-4 text-on-surface-muted max-w-2xl mx-auto">Tajribali mutaxassislar va o'z ishining ustalaridan ta'lim oling.<\/p>/g,
  `<p className="mt-4 text-on-surface-muted max-w-2xl mx-auto">{tm.hero_desc}</p>`
);

code = code.replace(
  /\{"Ijtimoiy himoyaga muhtoj bolalarni.*?\]/g,
  `a.yashnar_features`
);

writeFileSync(file, code, 'utf8');
console.log('About.tsx translation mapping step 2 applied.');
