import { readFileSync, writeFileSync } from 'fs';

const file = 'src/pages/About.tsx';
let code = readFileSync(file, 'utf8');

// 1. infraFallback
code = code.replace(
  /const infraFallback\s*=\s*\[[\s\S]*?\];/,
  `const infraFallback = a.infra_items.map(item => ({ ...item, icon: item.title.includes('Bino') || item.title.includes('Новое') || item.title.includes('New') ? 'apartment' : item.title.includes('Texnologiya') || item.title.includes('Modern') || item.title.includes('Современные') ? 'computer' : item.title.includes('Ovqat') || item.title.includes('Питание') || item.title.includes('Catering') ? 'restaurant' : item.title.includes('Sog\\'liq') || item.title.includes('Health') || item.title.includes('Здравоохранение') ? 'health_and_safety' : item.title.includes('Xavfsiz') || item.title.includes('Secur') || item.title.includes('Безопасность') ? 'security' : 'directions_bus' }));`
);

// 2. healthTeam
code = code.replace(
  /const healthTeam\s*=\s*\[[\s\S]*?\];/,
  `const healthTeam = a.health_team.map(item => ({ ...item, icon: item.role.includes('shifokor') || item.role.includes('Doctor') || item.role.includes('врач') ? 'stethoscope' : item.role.includes('psixolog') || item.role.includes('Psychologist') || item.role.includes('психолог') ? 'psychology' : 'record_voice_over' }));`
);

// 3. History block
code = code.replace(
  /<div className="mb-8">[\s\S]*?<\/div>\s*<div className="p-6 bg-surface rounded-3xl/m,
  `<div className="mb-8">
                <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-6">{a.history_badge}</span>
                <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: a.history_title.replace('—', '<span class=\"text-[#03caff]\">—').replace('2019', '2019</span>') }}></h2>
                <div className="w-16 h-1.5 bg-[#03caff] rounded-full mb-8" />
                <p className="text-on-surface-muted leading-relaxed text-lg mb-6" dangerouslySetInnerHTML={{ __html: a.history_p1.replace('16 000', '<strong class=\"text-primary\">16 000').replace('yoshlarning', 'yoshlarning</strong>') }}></p>
                <p className="text-on-surface-muted leading-relaxed text-lg mb-10">{a.history_p2}</p>
              </div>
              <div className="p-6 bg-surface rounded-3xl`
);

// 4. Logo meaning title
code = code.replace(
  /<h3 className="font-headline font-extrabold text-primary text-xl">Logotipimiz ortidagi g'oya<\/h3>/g,
  `<h3 className="font-headline font-extrabold text-primary text-xl">{a.logo_title}</h3>`
);

// 5. Logo array
code = code.replace(
  /\[\s*\{\s*d:\s*'Birinchi[\s\S]*?\]\.map/m,
  `a.logo_items.map`
);

// 6. Logo description italic
code = code.replace(
  /<p className="text-\[#062bad\] font-bold italic mt-2">"Bilimga to'ldiramiz!" — shiorimizdagi mazmun ham aynan shu\.<\/p>/g,
  `<p className="text-[#062bad] font-bold italic mt-2">{a.logo_quote}</p>`
);

// 7. 16K+ Stats string
code = code.replace(
  /<p className="text-\[10px\] md:text-xs uppercase tracking-widest opacity-90 font-bold max-w-\[120px\] mx-auto leading-relaxed">Yetishtirilgan Yosh<\/p>/g,
  `<p className="text-[10px] md:text-xs uppercase tracking-widest opacity-90 font-bold max-w-[120px] mx-auto leading-relaxed">{a.stats_graduated}</p>`
);

// 8. Infra Section Badge
code = code.replace(
  /<span className="inline-block px-4 py-1.5 text-\[10px\] font-extrabold tracking-\[0.25em\] text-\[#062bad\] bg-\[#03caff\]\/10 rounded-full uppercase mb-4 md:mb-6">Maktab Infratuzilmasi<\/span>/g,
  `<span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-4 md:mb-6">{a.infra_badge}</span>`
);

// 9. Infra Section Title
code = code.replace(
  /<h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary leading-tight mb-8">Xalqaro standartlardagi ta'lim muhiti<\/h2>/g,
  `<h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary leading-tight mb-8">{a.infra_title}</h2>`
);

// 10. Health Section badge & title
code = code.replace(
  /<span className="inline-block px-4 py-1.5 text-\[10px\] font-extrabold tracking-\[0.25em\] text-\[#062bad\] bg-white rounded-full shadow-sm shadow-primary\/5 uppercase mb-6 pt-2">Sog'liqni saqlash<\/span>/g,
  `<span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-white rounded-full shadow-sm shadow-primary/5 uppercase mb-6 pt-2">{a.health_badge}</span>`
);
code = code.replace(
  /<h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-6 leading-tight max-w-2xl">Har bir o'quvchi salomatligi shifokorlar nazoratida<\/h2>/g,
  `<h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-6 leading-tight max-w-2xl">{a.health_title}</h2>`
);

// 11. Health insurance
code = code.replace(
  /<h3 className="font-extrabold text-primary mb-1 text-sm md:text-base">Qo'shimcha kafolat<\/h3>/g,
  `<h3 className="font-extrabold text-primary mb-1 text-sm md:text-base">{a.health_insurance}</h3>`
);
code = code.replace(
  /<p className="text-on-surface-muted text-xs md:text-sm">Maktabimiz o'quvchilari baxtsiz hodisalardan 20 000 000 so'mgacha sug'urtalangan. Bu ota-onalarning to'liq xotirjamligini ta'minlaydi.<\/p>/g,
  `<p className="text-on-surface-muted text-xs md:text-sm">{a.health_insurance_desc}</p>`
);

writeFileSync(file, code, 'utf8');
console.log('About.tsx translation mapping step 1 applied.');
