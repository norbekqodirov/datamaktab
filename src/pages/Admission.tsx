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
    { label: "O'qituvchilar maoshi", pct: 40, icon: 'person' },
    { label: "Ovqatlanish", pct: 20, icon: 'restaurant' },
    { label: "IT va qurilmalar", pct: 15, icon: 'computer' },
    { label: "Infratuzilma", pct: 12, icon: 'apartment' },
    { label: "Sug'urta va tibbiyot", pct: 8, icon: 'health_and_safety' },
    { label: "Ta'lim resurslari", pct: 5, icon: 'menu_book' },
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

  return (
    <div className="bg-surface font-body text-on-surface">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden flex items-end bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#041c80] to-secondary opacity-90" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-[11px] font-extrabold tracking-[0.25em] text-secondary uppercase mb-4">2026–2027</span>
            <EditableText value={get('adm_hero_title', a.hero_title)} onSave={v => saveKey('adm_hero_title', v)} as="h1" className="font-headline text-5xl md:text-7xl font-extrabold text-white tracking-tighter">
              {get('adm_hero_title', a.hero_title)}
            </EditableText>
            <EditableText value={get('adm_hero_desc', a.hero_desc)} onSave={v => saveKey('adm_hero_desc', v)} as="p" multiline className="mt-3 text-white/80 text-lg max-w-2xl">
              {get('adm_hero_desc', a.hero_desc)}
            </EditableText>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div className="relative h-[450px] md:h-[650px] rounded-[3rem] overflow-hidden shadow-2xl border border-primary/5 group bg-slate-100">
              <EditableImage src={get('adm_steps_img', '/images/admission-steps.jpg')} alt="Qabul Jarayoni" onSave={v => saveKey('adm_steps_img', v)}
                className="w-full h-full" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-10 left-10 right-10 z-10 pointer-events-none">
                <EditableText value={get('adm_steps_img_caption', 'Maktabga qabul jarayoni sodda va ochiq tashkil etiladi')} onSave={v => saveKey('adm_steps_img_caption', v)} as="p" multiline className="text-white text-2xl md:text-3xl font-headline font-extrabold drop-shadow-md pointer-events-auto leading-tight">
                  {get('adm_steps_img_caption', 'Maktabga qabul jarayoni sodda va ochiq tashkil etiladi')}
                </EditableText>
              </div>
            </div>

            <div>
              <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-6">4 Qadam</span>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-10 leading-tight">{a.steps_title}</h2>
              <div className="space-y-6">
                {a.steps.map((step, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                    className="flex gap-6 bg-surface p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                      <span className="text-white font-headline font-extrabold text-xl">{step.n}</span>
                    </div>
                    <div>
                      <EditableText value={get(`adm_step_${i}_t`, step.t)} onSave={v => saveKey(`adm_step_${i}_t`, v)} as="h3" className="font-headline font-extrabold text-xl text-primary mb-2">
                        {get(`adm_step_${i}_t`, step.t)}
                      </EditableText>
                      <EditableText value={get(`adm_step_${i}_d`, step.d)} onSave={v => saveKey(`adm_step_${i}_d`, v)} as="p" multiline className="text-on-surface-muted text-sm leading-relaxed">
                        {get(`adm_step_${i}_d`, step.d)}
                      </EditableText>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gradient-to-r from-primary via-[#041c80] to-secondary">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h2 className="font-headline text-4xl font-extrabold mb-4">{a.fee_title}</h2>
              <div className="flex items-end gap-3 mb-4">
                <EditableText value={get('adm_fee', a.fee)} onSave={v => saveKey('adm_fee', v)} as="span" className="text-5xl md:text-6xl font-headline font-extrabold text-secondary">
                  {get('adm_fee', a.fee)}
                </EditableText>
              </div>
              <EditableText value={get('adm_discount', a.discount)} onSave={v => saveKey('adm_discount', v)} as="p" multiline className="text-white/70 text-lg">
                {get('adm_discount', a.discount)}
              </EditableText>
            </div>
            <div className="glass-card rounded-3xl p-8 bg-white/10 border border-white/20">
              <h3 className="font-headline font-extrabold text-white text-xl mb-6">{a.covers_title}</h3>
              <ul className="space-y-4">
                {a.covers.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/90">
                    <span className="material-symbols-outlined text-[#03caff] text-xl flex-shrink-0">check_circle</span>
                    <EditableText value={get(`adm_cover_${i}`, item)} onSave={v => saveKey(`adm_cover_${i}`, v)} as="span" className="text-sm font-semibold leading-tight">
                      {get(`adm_cover_${i}`, item)}
                    </EditableText>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Transparency */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-14">
            <h2 className="font-headline text-4xl font-extrabold text-primary">{a.finance_title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {financeFB.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 border border-primary/5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <EditableText value={getArr('adm_finance', i, 0, item.label)} onSave={v => saveArr('adm_finance', i, 0, financeFB.map(x=>[x.label]), v)}
                    as="p" className="font-semibold text-primary text-sm truncate">{getArr('adm_finance', i, 0, item.label)}</EditableText>
                  <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${item.pct}%` }} initial={{ width: 0 }} whileInView={{ width: `${item.pct}%` }} transition={{ duration: 1, delay: i * 0.07 }} viewport={{ once: true }} />
                  </div>
                  <p className="text-xs text-on-surface-muted mt-1 font-bold">{item.pct}%</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prohibitions */}
      <section className="py-24 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div className="order-2 lg:order-1">
              <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#e11d48] bg-[#e11d48]/10 rounded-full uppercase mb-6">Muhim Qoidalar</span>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-10 leading-tight">{a.prohibitions_title}</h2>
              <div className="space-y-4">
                {a.prohibitions.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-slate-100/50 hover:border-red-100 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 border border-red-100">
                      <span className="material-symbols-outlined text-red-500 text-lg">block</span>
                    </div>
                    <EditableText value={get(`adm_prohib_${i}`, item)} onSave={v => saveKey(`adm_prohib_${i}`, v)} as="span" multiline className="text-[15px] text-on-surface-muted font-medium w-full leading-relaxed">
                      {get(`adm_prohib_${i}`, item)}
                    </EditableText>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 relative h-[400px] md:h-[550px] rounded-[3rem] overflow-hidden shadow-2xl border border-primary/5 group bg-slate-100">
              <EditableImage src={get('adm_prohib_img', '/images/admission-rules.jpg')} alt="Maktab Qoidalari" onSave={v => saveKey('adm_prohib_img', v)}
                className="w-full h-full" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[20%]" />
              <div className="absolute inset-0 bg-primary/10 pointer-events-none mix-blend-multiply" />
            </div>

          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 text-center">
          <button onClick={() => window.dispatchEvent(new Event('open-enroll-modal'))} className="btn-primary px-12 py-5 rounded-full text-sm font-extrabold uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-105 transition-transform">
            {t.nav.enroll}
          </button>
        </div>
      </section>
    </div>
  );
}
