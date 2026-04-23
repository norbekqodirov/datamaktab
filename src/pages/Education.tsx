import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';

export default function Education() {
  const { t } = useLanguage();
  const { get, saveKey } = useSiteSettings();
  const e = t.education;

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

  const roadmapFB = [
    { grade: '1-4',  title: "Boshlang'ich",    tag: t.nav.education, color: 'from-[#03caff] to-[#062bad]', desc: "Montessori yondashuvi, o'yin orqali o'rganish, ingliz tilining asoslari." },
    { grade: '5-7',  title: "O'rta bosqich",    tag: 'IELTS B1', color: 'from-[#062bad] to-[#041c80]', desc: "Chuqurlashtirilgan IT va matematika, IELTS B1 darajasiga tayyorlik." },
    { grade: '8-9',  title: "Yuqori o'rta",     tag: 'SAT 500+', color: 'from-[#041c80] to-[#03caff]', desc: "Profilaktik fanlar, international olympiads, SAT tayyorgarligi." },
    { grade: '10-11', title: "Tayyorlov",        tag: 'IELTS 7.5+', color: 'from-[#03caff] to-[#062bad]', desc: "Universitet tanlov, IELTS 7.5+, kasbiy yo'naltirish." },
  ];

  const certsFB = [
    { name: 'IELTS', target: '6.0 → 7.5+', icon: 'language', partner: 'British Council' },
    { name: 'SAT', target: '530+', icon: 'calculate', partner: 'College Board' },
    { name: 'TOPIK', target: 'II daraja', icon: 'g_translate', partner: 'NIIED Korea' },
    { name: 'Cambridge', target: 'B2–C1', icon: 'school', partner: 'Cambridge Assesment' },
    { name: 'Milliy Sertifikat', target: 'B+', icon: 'workspace_premium', partner: "O'zbekiston DTM" },
    { name: 'BOND Olympiad', target: 'Top 10%', icon: 'emoji_events', partner: 'International BOND' },
  ];

  const structureFB = [
    { label: "Matematika", pct: 23, color: '#062bad' },
    { label: "Ingliz tili", pct: 23, color: '#03caff' },
    { label: "IT va Dasturlash", pct: 10, color: '#041c80' },
    { label: "Qolgan fanlar", pct: 44, color: '#e2ebff' },
  ];

  const montesFeatsFB = ['Mustaqil fikrlash', 'Ijodiy rivojlanish', 'Amaliy o\'rganish', 'Individual yondashuv'];

  return (
    <div className="bg-surface font-body text-on-surface">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] overflow-hidden flex items-end bg-primary">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#041c80] to-secondary opacity-90" />
          <div className="absolute top-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-primary/40 rounded-full blur-2xl" />
        </div>
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-[11px] font-extrabold tracking-[0.25em] text-secondary uppercase mb-4">DATA Maktabi</span>
            <EditableText value={get('edu_hero_title', e.hero_title)} onSave={v => saveKey('edu_hero_title', v)} as="h1" className="font-headline text-5xl md:text-7xl font-extrabold text-white tracking-tighter">
              {get('edu_hero_title', e.hero_title)}
            </EditableText>
            <EditableText value={get('edu_hero_desc', e.hero_desc)} onSave={v => saveKey('edu_hero_desc', v)} as="p" multiline className="mt-3 text-white/80 text-lg max-w-2xl">
              {get('edu_hero_desc', e.hero_desc)}
            </EditableText>
          </motion.div>
        </div>
      </section>

      {/* 11-Year Roadmap */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">{e.roadmap_title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmapFB.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="glass-card rounded-3xl overflow-hidden border border-primary/10 shadow-md hover:-translate-y-2 hover:shadow-xl transition-all flex flex-col bg-white">
                <div className="aspect-[4/3] w-full relative group overflow-hidden bg-slate-100">
                  <EditableImage src={get(`edu_roadmap_img_${i}`, `/images/edu-roadmap-${i+1}.jpg`)} alt={step.title} onSave={v => saveKey(`edu_roadmap_img_${i}`, v)}
                    className="absolute inset-0 w-full h-full"
                    imgClassName="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${step.color} z-10`} />
                </div>
                <div className="p-7 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-headline font-extrabold text-primary/20">{step.grade}</span>
                    <EditableText value={getArr('edu_roadmap', i, 0, step.tag)} onSave={v => saveArr('edu_roadmap', i, 0, roadmapFB.map(x=>[x.tag,x.title,x.desc]), v)}
                      as="span" className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 bg-[#03caff]/10 text-[#062bad] rounded-full">
                      {getArr('edu_roadmap', i, 0, step.tag)}
                    </EditableText>
                  </div>
                  <EditableText value={getArr('edu_roadmap', i, 1, step.title)} onSave={v => saveArr('edu_roadmap', i, 1, roadmapFB.map(x=>[x.tag,x.title,x.desc]), v)}
                    as="h3" className="font-headline font-extrabold text-xl text-primary mb-3">
                    {getArr('edu_roadmap', i, 1, step.title)}
                  </EditableText>
                  <EditableText value={getArr('edu_roadmap', i, 2, step.desc)} onSave={v => saveArr('edu_roadmap', i, 2, roadmapFB.map(x=>[x.tag,x.title,x.desc]), v)}
                    as="p" multiline className="text-on-surface-muted text-sm leading-relaxed flex-1">
                    {getArr('edu_roadmap', i, 2, step.desc)}
                  </EditableText>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* International Certs */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50/50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">{e.cert_title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {certsFB.map((cert, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 border border-primary/5 flex items-center gap-5 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-white text-lg">{cert.icon}</span>
                </div>
                <div>
                  <EditableText value={getArr('edu_certs', i, 0, cert.name)} onSave={v => saveArr('edu_certs', i, 0, certsFB.map(x=>[x.name,x.target,x.partner]), v)}
                    as="h3" className="font-headline font-extrabold text-primary">{getArr('edu_certs', i, 0, cert.name)}</EditableText>
                  <EditableText value={getArr('edu_certs', i, 1, cert.target)} onSave={v => saveArr('edu_certs', i, 1, certsFB.map(x=>[x.name,x.target,x.partner]), v)}
                    as="p" className="text-secondary font-bold text-sm">{getArr('edu_certs', i, 1, cert.target)}</EditableText>
                  <EditableText value={getArr('edu_certs', i, 2, cert.partner)} onSave={v => saveArr('edu_certs', i, 2, certsFB.map(x=>[x.name,x.target,x.partner]), v)}
                    as="p" className="text-on-surface-muted text-[11px] mt-0.5">{getArr('edu_certs', i, 2, cert.partner)}</EditableText>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Montessori */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-primary/5 shadow-2xl shadow-primary/5">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* Left Images */}
              <div className="relative h-[400px] md:h-[500px]">
                <div className="absolute top-0 left-0 w-3/4 h-[80%] rounded-[2rem] overflow-hidden shadow-xl z-10 border-4 border-white bg-slate-100 group">
                  <EditableImage src={get('edu_mont_img1', '/images/montessori-1.jpg')} alt="Montessori" onSave={v => saveKey('edu_mont_img1', v)}
                    className="w-full h-full" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="absolute bottom-0 right-0 w-[60%] h-[60%] rounded-[2rem] overflow-hidden shadow-2xl z-20 border-4 border-white bg-slate-100 group">
                  <EditableImage src={get('edu_mont_img2', '/images/montessori-2.jpg')} alt="Montessori" onSave={v => saveKey('edu_mont_img2', v)}
                    className="w-full h-full" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>

              {/* Right Content */}
              <div>
                <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-6">2027–2028 yildan boshlab</span>
                <EditableText value={get('edu_mont_title', e.montessori_title)} onSave={v => saveKey('edu_mont_title', v)} as="h2" className="font-headline text-3xl md:text-5xl font-extrabold text-primary mb-6 leading-tight">
                  {get('edu_mont_title', e.montessori_title)}
                </EditableText>
                <div className="w-16 h-1.5 bg-[#03caff] rounded-full mb-8" />
                <EditableText value={get('edu_mont_desc', e.montessori_desc)} onSave={v => saveKey('edu_mont_desc', v)} as="p" multiline className="text-on-surface-muted leading-relaxed text-lg mb-10">
                  {get('edu_mont_desc', e.montessori_desc)}
                </EditableText>
                
                <div className="grid grid-cols-2 gap-4">
                  {montesFeatsFB.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#03caff]/20 flex items-center justify-center flex-shrink-0 text-[#062bad]">
                        <span className="material-symbols-outlined text-sm">check</span>
                      </div>
                      <EditableText value={get(`edu_mont_f${i}`, feat)} onSave={v => saveKey(`edu_mont_f${i}`, v)} as="span" className="font-bold text-sm text-primary">
                        {get(`edu_mont_f${i}`, feat)}
                      </EditableText>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Lesson structure */}
      <section className="py-24 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">{e.structure_title}</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-5">
            {structureFB.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="flex items-center gap-6">
                <EditableText value={getArr('edu_struct', i, 0, item.label)} onSave={v => saveArr('edu_struct', i, 0, structureFB.map(x=>[x.label]), v)}
                  as="p" className="w-32 text-right font-bold text-sm text-primary">{getArr('edu_struct', i, 0, item.label)}</EditableText>
                <div className="flex-1 h-12 bg-white rounded-full overflow-hidden shadow-inner border border-slate-100 flex items-center">
                  <motion.div className="h-full flex items-center justify-end px-4 shadow-[inset_-5px_0_15px_rgba(0,0,0,0.1)]"
                    style={{ width: `${item.pct}%`, backgroundColor: item.color }} initial={{ width: 0 }} whileInView={{ width: `${item.pct}%` }} transition={{ duration: 1, delay: 0.2 }} viewport={{ once: true }}>
                    <span className="text-white font-extrabold text-sm">{item.pct}%</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
