import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';

export default function Admission() {
  const { t } = useLanguage();
  const { get, saveKey } = useSiteSettings();
  const a = t.admission;

  const financeFB = [
    { label: "O'qituvchilar va xodimlar oyligi", pct: 35, icon: 'person' },
    { label: "Ovqatlanish", pct: 20, icon: 'restaurant' },
    { label: "IT infratuzilma", pct: 15, icon: 'computer' },
    { label: "Tibbiy xizmatlar", pct: 10, icon: 'health_and_safety' },
    { label: "Xavfsizlik va kommunal", pct: 10, icon: 'security' },
    { label: "Akademik ta'minot va to'garaklar", pct: 10, icon: 'menu_book' },
  ];

  const getArr = (key: string, arrIdx: number, valIdx: number, fb: string) => {
    try {
       const arr = JSON.parse(get(key, '[]'));
       if (arr[arrIdx] && arr[arrIdx][valIdx]) return arr[arrIdx][valIdx];
    } catch {}
    return fb;
  };

  const saveArr = (key: string, arrIdx: number, valIdx: number, fbArr: any[], val: string) => {
    try {
      let arr = JSON.parse(get(key, '[]'));
      if (!Array.isArray(arr) || arr.length === 0) arr = fbArr;
      arr[arrIdx][valIdx] = val;
      saveKey(key, JSON.stringify(arr));
    } catch {
      const arr = [...fbArr];
      arr[arrIdx][valIdx] = val;
      saveKey(key, JSON.stringify(arr));
    }
  };

  const openEnrollModal = (e: MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event('open-enroll-modal'));
  };

  return (
    <div className="bg-surface font-body text-on-surface">

      {/* Hero */}
      <section className="relative h-auto pt-28 pb-10 md:pt-36 md:pb-14 overflow-hidden flex flex-col justify-end">
        <div className="absolute inset-0 z-0">
          <EditableImage src={get('adm_hero_bg', '/maktab.jpg')} alt={a.hero_title} onSave={v => saveKey('adm_hero_bg', v)}
            className="w-full h-full" imgClassName="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/95" />
        </div>
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 relative z-10 pb-0">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-[11px] font-extrabold tracking-[0.25em] text-secondary uppercase mb-4">DATA Xalqaro Maktabi</span>
            <EditableText value={get('adm_hero_title', a.hero_title)} onSave={v => saveKey('adm_hero_title', v)} as="h1"
              className="font-headline text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tighter">
              {get('adm_hero_title', a.hero_title)}
            </EditableText>
            <EditableText value={get('adm_hero_desc', a.hero_desc)} onSave={v => saveKey('adm_hero_desc', v)} as="p" multiline className="mt-4 text-white/80 text-lg max-w-4xl">
              {get('adm_hero_desc', a.hero_desc)}
            </EditableText>
          </motion.div>
        </div>
      </section>

      {/* Admission Steps — Grade 1 vs Grade 2-10 */}
      <section className="py-16 md:py-12 md:py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-5">Qabul Tartibi</span>
            <h2 className="font-headline text-4xl md:text-6xl font-extrabold text-primary tracking-tighter">
              2026–2027 o'quv yili <span className="text-[#03caff]">qabuli</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Grade 1 */}
            <div className="bg-surface rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100">
              <div className="aspect-video relative bg-slate-100 group">
                <EditableImage src={get('adm_step1_img', '/images/admission-1.jpg')} alt="1-sinf qabuli" onSave={v => saveKey('adm_step1_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-7">
                  <span className="bg-[#03caff] text-white text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-2 inline-block">1-sinflar</span>
                  <p className="text-white font-headline font-extrabold text-2xl">Individual Suhbat</p>
                </div>
              </div>
              <div className="p-8">
                <p className="text-on-surface-muted leading-relaxed mb-6">1-sinfga qabul faqat individual suhbat asosida amalga oshiriladi. Maktab psixologi va pedagoglar:</p>
                <div className="space-y-3">
                  {["Eshitish va tushunish darajasi", "Fikrlash va e'tibor salohiyati", "Nutq rivojlanishi", "Psixologik tayyorgarlik"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl">
                      <span className="material-symbols-outlined text-[#03caff] flex-shrink-0">check_circle</span>
                      <span className="text-sm font-semibold text-primary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Grade 2-10 */}
            <div className="bg-surface rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100">
              <div className="aspect-video relative bg-slate-100 group">
                <EditableImage src={get('adm_step2_img', '/images/admission-2.jpg')} alt="2-10 sinf qabuli" onSave={v => saveKey('adm_step2_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041c80]/80 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-7">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-2 inline-block border border-white/30">2–10-sinflar</span>
                  <p className="text-white font-headline font-extrabold text-2xl">2 Bosqichli Qabul</p>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-5">
                  <div className="flex gap-5 p-5 bg-white rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-extrabold flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">Yozma Test Sinovi (45–60 daqiqa)</h4>
                      <p className="text-on-surface-muted text-sm">Matematika (mantiqiy fikrlash), Ona tili (o'zbek yoki rus), Ingliz tili (majburiy)</p>
                    </div>
                  </div>
                  <div className="flex gap-5 p-5 bg-white rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-extrabold flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">Individual Suhbat</h4>
                      <p className="text-on-surface-muted text-sm">Testdan o'tgan o'quvchilar fikrlash darajasi va o'zini tutish madaniyatiga baholanadi</p>
                    </div>
                  </div>
                  <div className="p-4 bg-[#03caff]/10 border border-[#03caff]/20 rounded-2xl">
                    <p className="text-[#062bad] font-bold text-sm">Natija 3 ish kuni ichida SMS yoki telefon orqali e'lon qilinadi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* After results — 5 days steps */}
          <div className="p-8 bg-gradient-to-r from-[#062bad]/5 to-[#03caff]/5 rounded-3xl border border-primary/10">
            <h3 className="font-headline font-extrabold text-primary text-2xl mb-6">Natijadan keyin — <span className="text-[#03caff]">5 ish kunida</span></h3>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { num: '1', text: 'Kerakli hujjatlar maktabga topshirilishi' },
                { num: '2', text: 'Shartnoma rasmiylashtirilishi' },
                { num: '3', text: 'Maktab formasiga buyurtma berilishi' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm">
                  <span className="font-headline font-extrabold text-3xl text-[#03caff] leading-none">{item.num}</span>
                  <p className="font-semibold text-primary text-sm mt-1">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 p-4 bg-orange-50 border border-orange-200 rounded-2xl">
              <p className="text-orange-800 font-bold text-sm">⚠️ Muhim: 5 ish kuni ichida to'lov va hujjatlar to'liq rasmiylashtirilmasa, o'rin keyingi nomzodga beriladi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[480px] rounded-[3rem] overflow-hidden shadow-2xl group bg-slate-100">
              <EditableImage src={get('adm_docs_img', '/images/documents.jpg')} alt="Hujjatlar" onSave={v => saveKey('adm_docs_img', v)}
                className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-5">
                  <p className="text-white font-headline font-extrabold text-xl">Hujjatlar to'plami</p>
                  <p className="text-white/80 text-sm mt-1">Barcha hujjatlar bir joyda va to'liq bo'lishi shart</p>
                </div>
              </div>
            </div>
            <div>
              <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-6">Kerakli hujjatlar</span>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-8">
                Qabul uchun <span className="text-[#03caff]">zarur hujjatlar</span>
              </h2>
              <div className="space-y-3">
                {[
                  { icon: 'badge', doc: "O'quvchining tug'ilganlik guvohnomasi (nusxa)" },
                  { icon: 'photo_camera', doc: "3×4 formatdagi 6 dona fotosurat" },
                  { icon: 'credit_card', doc: "Ota-onaning pasport nusxalari" },
                  { icon: 'medical_information', doc: "086-formadagi tibbiy ma'lumotnoma" },
                  { icon: 'assignment', doc: "Oldingi ta'lim muassasasidan baholar tablitsasi (TABEL)" },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }}
                    className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white flex-shrink-0">
                      <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    </div>
                    <p className="font-semibold text-primary text-sm">{item.doc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Steps (existing translated) */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">{a.steps_title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {a.steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="flex flex-col rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 bg-surface hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
                <div className="aspect-[4/3] relative bg-slate-100">
                  <EditableImage src={get(`adm_step_img_${i}`, `/images/step-${i+1}.jpg`)} alt={step.title} onSave={v => saveKey(`adm_step_img_${i}`, v)}
                    className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-[#03caff] text-white font-headline font-extrabold text-4xl px-3 py-1 rounded-xl shadow-lg shadow-[#03caff]/30">{i+1}</span>
                  </div>
                </div>
                <div className="p-7 flex-1">
                  <EditableText value={getArr('adm_steps', i, 0, step.title)} onSave={v => saveArr('adm_steps', i, 0, a.steps.map(s => [s.title, s.desc]), v)}
                    as="h3" className="font-headline font-extrabold text-xl text-primary mb-3">
                    {getArr('adm_steps', i, 0, step.title)}
                  </EditableText>
                  <EditableText value={getArr('adm_steps', i, 1, step.desc)} onSave={v => saveArr('adm_steps', i, 1, a.steps.map(s => [s.title, s.desc]), v)}
                    as="p" multiline className="text-on-surface-muted text-sm leading-relaxed">
                    {getArr('adm_steps', i, 1, step.desc)}
                  </EditableText>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing + Finance */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary via-[#041c80] to-secondary">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#03caff] border border-[#03caff]/30 rounded-full uppercase mb-6">2026–2027 o'quv yili</span>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-6">{a.pricing_title}</h2>
              <div className="space-y-4 mb-10">
                <div className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl">
                  <EditableText value={get('adm_price_label', a.pricing_label)} onSave={v => saveKey('adm_price_label', v)} as="p" className="text-white/70 text-sm font-bold uppercase tracking-widest mb-2">
                    {get('adm_price_label', a.pricing_label)}
                  </EditableText>
                  <EditableText value={get('adm_price_val', a.pricing_value)} onSave={v => saveKey('adm_price_val', v)} as="p" className="text-4xl font-headline font-extrabold text-white">
                    {get('adm_price_val', a.pricing_value)}
                  </EditableText>
                </div>
                <div className="p-6 bg-[#03caff]/20 border border-[#03caff]/30 rounded-3xl">
                  <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-2">Oldindan to'lovda 10% chegirma</p>
                  <p className="text-4xl font-headline font-extrabold text-[#03caff]">45 000 000 so'm</p>
                </div>
              </div>
              <div className="p-5 bg-white/10 rounded-2xl">
                <p className="text-white/80 text-sm leading-relaxed">
                  <strong className="text-white">Alohida to'lov talab qilinadigan xizmatlar:</strong> maktab formasi, ta'lim lagerlari, olimpiadalar, qo'shimcha ustoz, sport formasi, yotoqxona, sinf tadbirlari.
                </p>
              </div>
              <div className="mt-8">
                <a href="tel:+998556020055" className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined">phone</span>
                  +998 55 602 00 55
                </a>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="font-headline font-extrabold text-primary text-2xl mb-6">{a.finance_title}</h3>
              <div className="space-y-5">
                {financeFB.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">{item.icon}</span>
                        <EditableText value={getArr('adm_finance', i, 0, item.label)} onSave={v => saveArr('adm_finance', i, 0, financeFB.map(f => [f.label, f.pct.toString()]), v)}
                          as="span" className="text-sm font-semibold text-primary">
                          {getArr('adm_finance', i, 0, item.label)}
                        </EditableText>
                      </div>
                      <span className="font-bold text-[#03caff]">{item.pct}%</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.pct}%` }} transition={{ duration: 1, ease: 'easeOut', delay: i * 0.1 }} viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-primary to-[#03caff] rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free supplies + Dress Code */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Free supplies */}
            <div className="bg-surface rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100">
              <div className="aspect-video relative bg-slate-100 group">
                <EditableImage src={get('adm_supplies_img', '/images/supplies.jpg')} alt="Bepul o'quv qurollari" onSave={v => saveKey('adm_supplies_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-7">
                  <span className="text-white font-headline font-extrabold text-2xl drop-shadow-lg">Bepul O'quv Qurollari</span>
                </div>
              </div>
              <div className="p-8">
                <p className="text-on-surface-muted leading-relaxed mb-6">DATA xalqaro maktabida barcha zarur o'quv qurollari va materiallari o'quvchilarga bepul taqdim etiladi. Ota-onalarning qo'shimcha xarajatini kamaytiramiz.</p>
                <div className="p-5 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/10">
                  <p className="text-[#062bad] font-bold text-sm">"Har bir o'quvchining zamonaviy, qulay va bepul o'quv jihozlari bilan ta'lim olishi — bizning sifatlilik mezonimiz."</p>
                </div>
              </div>
            </div>
            {/* Dress code */}
            <div className="bg-surface rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100">
              <div className="aspect-video relative bg-slate-100 group">
                <EditableImage src={get('adm_uniform_img', '/images/uniform.jpg')} alt="Maktab formasi" onSave={v => saveKey('adm_uniform_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-7">
                  <span className="text-white font-headline font-extrabold text-2xl drop-shadow-lg">Maktab Formasi va Dress-Kod</span>
                </div>
              </div>
              <div className="p-8">
                <p className="text-on-surface-muted leading-relaxed mb-6">Forma — nafaqat tashqi ko'rinish, balki tartib, intizom va maktabga mansublik hissini shakllantiradi.</p>
                <div className="space-y-3">
                  {[
                    "O'quv kuni davomida, kelish va ketish vaqtida majburiy",
                    "Ekskursiya va rasmiy tadbirlarda majburiy",
                    "Ekstremal soch ranglari qat'iyan taqiqlanadi",
                    "Formasiz ekskursiyada ishtirok etib bo'lmaydi",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-2xl">
                      <span className="material-symbols-outlined text-[#062bad] flex-shrink-0">checkroom</span>
                      <span className="text-sm font-semibold text-primary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prohibitions */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-6">Maktab Qoidalari</span>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-6">{a.prohib_title}</h2>
              <p className="text-on-surface-muted text-lg leading-relaxed mb-10">Xavfsiz, sog'lom va adolatli muhit uchun 5 ta asosiy qoida.</p>
              <div className="space-y-4">
                {[
                  { icon: 'smartphone', title: "Telefon va elektron qurilmalar", desc: "Boshlang'ich sinf o'quvchilari uchun telefon, aqlli soat, simsiz quloqchin va mp3 player taqiqlanadi." },
                  { icon: 'cake', title: "Tug'ilgan kun nishonlash", desc: "Maktab hududida shaxsiy bayramlarni nishonlash man etilgan. Bu barcha o'quvchilarga teng muhit yaratadi." },
                  { icon: 'lunch_dining', title: "Qo'shimcha ovqat olib kelish", desc: "Sanitariya xavfsizligi sababli o'z ovqatini maktabga olib kelish ruxsat etilmaydi." },
                  { icon: 'front_hand', title: "Odob-axloq qoidalari", desc: "Jismoniy, so'z yoki elektron ko'rinishdagi tajovuz, kamsitishga nol bag'rikenglik siyosati." },
                  { icon: 'card_giftcard', title: "Sovg'alar berish taqiqlanadi", desc: "O'qituvchilar va xodimlarga sovg'a yoki pul olish qat'iyan man etiladi. Shaffoflik tamoyili." },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                    className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-red-500 text-xl">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-sm mb-1">{item.title}</h4>
                      <p className="text-on-surface-muted text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative h-[540px] rounded-[3rem] overflow-hidden shadow-2xl group bg-slate-100">
              <EditableImage src={get('adm_prohib_img', '/images/school-rules.jpg')} alt="Maktab qoidalari" onSave={v => saveKey('adm_prohib_img', v)}
                className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-5">
                  <p className="text-white font-headline font-extrabold text-lg">Xavfsiz va Baxtli Maktab Muhiti</p>
                  <p className="text-white/80 text-sm mt-1">Har bir o'quvchi uchun adolatli, teng va qulay sharoit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-r from-primary via-[#041c80] to-secondary py-12 md:py-16 md:py-32 px-6 md:px-16 text-center shadow-2xl">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-primary/40 mix-blend-multiply z-10" />
              <img className="w-full h-full object-cover scale-110 opacity-[0.15] mix-blend-overlay" src="/maktab.jpg" alt="" />
            </div>
            <div className="relative z-10">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <EditableText value={get('adm_cta_title', a.cta_title)} onSave={v => saveKey('adm_cta_title', v)} as="h2"
                  className="font-headline text-4xl md:text-6xl font-extrabold text-white tracking-[-0.03em] leading-tight mb-6">
                  {get('adm_cta_title', a.cta_title)}
                </EditableText>
                <EditableText value={get('adm_cta_desc', a.cta_desc)} onSave={v => saveKey('adm_cta_desc', v)} as="p" multiline
                  className="text-white/80 max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
                  {get('adm_cta_desc', a.cta_desc)}
                </EditableText>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={openEnrollModal} className="btn-secondary px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl">
                    {a.cta_primary}
                  </button>
                  <a href="tel:+998556020055" className="bg-white/10 border border-white/30 backdrop-blur-lg text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-primary transition-all flex items-center gap-2 justify-center">
                    <span className="material-symbols-outlined text-lg">phone</span>
                    +998 55 602 00 55
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
