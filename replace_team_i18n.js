import { readFileSync, writeFileSync } from 'fs';

const file = 'src/pages/Team.tsx';
let code = readFileSync(file, 'utf8');

// 1. Add hook
if (!code.includes('useLanguage')) {
  code = code.replace(
    /import \{ useSiteSettings \} from '\.\.\/hooks\/useSiteSettings';/g,
    `import { useSiteSettings } from '../hooks/useSiteSettings';\nimport { useLanguage } from '../context/LanguageContext';`
  );
  code = code.replace(
    /const \{ get, saveKey \} = useSiteSettings\(\);/g,
    `const { get, saveKey } = useSiteSettings();\n  const { t } = useLanguage();\n  const tm = t.team;`
  );
}

// 2. Hero Section
code = code.replace(
  /<span className="inline-block px-4 py-1 mb-6 text-\[10px\] tracking-\[0.3em\] font-bold text-white uppercase bg-secondary\/20 backdrop-blur-md rounded-full">\s*Ustozlar va Rahbariyat\s*<\/span>/g,
  `<span className="inline-block px-4 py-1 mb-6 text-[10px] tracking-[0.3em] font-bold text-white uppercase bg-secondary/20 backdrop-blur-md rounded-full">{tm.management_title}</span>`
);
code = code.replace(
  /<h1 className="font-headline text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tighter leading-tight mb-6">\s*Bizning Jamoa\s*<\/h1>/g,
  `<h1 className="font-headline text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tighter leading-tight mb-6">{tm.hero_title}</h1>`
);
code = code.replace(
  /<p className="text-white\/80 text-lg md:text-xl font-body leading-relaxed">\s*O'z ishining ustalari, tajribali va fidoyi ustozlar jamoasi\.\s*<\/p>/g,
  `<p className="text-white/80 text-lg md:text-xl font-body leading-relaxed">{tm.hero_desc}</p>`
);

// 3. Management Team
code = code.replace(
  /<h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary">Menejment Jamoasi<\/h2>/g,
  `<h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary">{tm.management_title}</h2>`
);

// 4. English Teachers
code = code.replace(
  /<h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary">Ingliz Tili Ustozlari<\/h2>/g,
  `<h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary">{tm.teachers_title}</h2>`
);

// 5. Hiring Process
code = code.replace(
  /<h2 className="font-headline text-3xl md:text-4xl font-extrabold">Ustoz Tanlash Jarayoni<\/h2>/g,
  `<h2 className="font-headline text-3xl md:text-4xl font-extrabold">{tm.selection_title}</h2>`
);

code = code.replace(
  /<h3 className="font-headline font-extrabold text-secondary text-xl mb-4 relative z-10">HR O'rganishi<\/h3>[\s\S]*?<p className="text-white\/80 leading-relaxed relative z-10">Nomzodning ma'lumoti, toifasi, sertifikatlari va ish tajribasini o'rganish\.<\/p>/g,
  `<h3 className="font-headline font-extrabold text-secondary text-xl mb-4 relative z-10">{tm.selection_steps[0].label}</h3><p className="text-white/80 leading-relaxed relative z-10"></p>`
);

code = code.replace(
  /<h3 className="font-headline font-extrabold text-secondary text-xl mb-4 relative z-10">Suhbat<\/h3>[\s\S]*?<p className="text-white\/80 leading-relaxed relative z-10">Maktab direktori va akademik bo'lim rahbarlari bilan kasbiy yondashuvni baholash\.<\/p>/g,
  `<h3 className="font-headline font-extrabold text-secondary text-xl mb-4 relative z-10">{tm.selection_steps[2].label}</h3><p className="text-white/80 leading-relaxed relative z-10"></p>`
);

code = code.replace(
  /<h3 className="font-headline font-extrabold text-secondary text-xl mb-4 relative z-10">Sinov Darsi<\/h3>[\s\S]*?<p className="text-white\/80 leading-relaxed relative z-10">Nomzod bitta dars o'tib, pedagogik mahoratini amalda ko'rsatadi\.<\/p>/g,
  `<h3 className="font-headline font-extrabold text-secondary text-xl mb-4 relative z-10">{tm.selection_steps[3].label}</h3><p className="text-white/80 leading-relaxed relative z-10"></p>`
);

code = code.replace(
  /<h3 className="font-headline font-extrabold text-secondary text-xl mb-4 relative z-10">Sinov Muddati<\/h3>[\s\S]*?<p className="text-white\/80 leading-relaxed relative z-10">Bir oylik sinov: dars sifati, muloqot, intizom va jamoaga moslashuv baholanadi\.<\/p>/g,
  `<h3 className="font-headline font-extrabold text-secondary text-xl mb-4 relative z-10">{tm.selection_steps[1].label}</h3><p className="text-white/80 leading-relaxed relative z-10"></p>`
);

writeFileSync(file, code, 'utf8');
console.log('Team.tsx translation mapping applied.');
