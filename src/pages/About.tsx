import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';

export default function About() {
  const { t } = useLanguage();
  const { get, saveKey } = useSiteSettings();
  const a = t.about;

  const infraFallback = [
    { title: 'Yangi Bino (KADORR Group)', desc: "5 qavatli 4000 m² maydon, 20 zamonaviy sinfxona, aqlli ventilyatsiya.", icon: 'apartment' },
    { title: 'Zamonaviy Texnologiyalar', desc: "24 ta iMac, 60 ta Notebook, 20 ta VR ko'zoynak va har sinfda AI yordamchisi.", icon: 'computer' },
    { title: 'Ovqatlanish', desc: "Kuniga 3 mahal issiq, sog'lom va to'yimli ovqat. Dietolog nazoratidagi maxsus menyu.", icon: 'restaurant' },
    { title: "Sog'liqni Saqlash", desc: "Doimiy shifokor, psixolog va logoped nazorati. O'quvchilar hayoti 20 mlngacha sug'urtalanadi.", icon: 'health_and_safety' },
    { title: 'Xavfsizlik', desc: "Milliy gvardiya tomonidan qo'riqlanadi, har bir hududda kamera va favqulodda SOS tizimi.", icon: 'security' },
    { title: 'Transport', desc: "Maktabda jami 8 ta avtobus. Ota-onalar GPS orqali kuzatishadi.", icon: 'directions_bus' },
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
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-end">
        <div className="absolute inset-0 z-0">
          <EditableImage
            src={get('about_hero_bg', '/maktab.jpg')}
            alt={a.hero_title}
            onSave={v => saveKey('about_hero_bg', v)}
            className="w-full h-full"
            imgClassName="w-full h-full object-cover grayscale-[10%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/95" />
        </div>
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-[11px] font-extrabold tracking-[0.25em] text-secondary uppercase mb-4">DATA Xalqaro Maktabi</span>
            <EditableText value={get('about_hero_title', a.hero_title)} onSave={v => saveKey('about_hero_title', v)} as="h1"
              className="font-headline text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-tight">
              {get('about_hero_title', a.hero_title)}
            </EditableText>
            <EditableText value={get('about_hero_desc', a.hero_desc)} onSave={v => saveKey('about_hero_desc', v)} as="p" multiline
              className="mt-4 text-white/80 text-lg max-w-2xl">
              {get('about_hero_desc', a.hero_desc)}
            </EditableText>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-[2.5rem] overflow-hidden border border-primary/10 shadow-xl flex flex-col bg-white"
            >
              <div className="h-56 md:h-72 relative w-full bg-slate-100 group">
                <EditableImage src={get('about_miss_img', '/images/mission.jpg')} alt="Missiya" onSave={v => saveKey('about_miss_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-8 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-md shadow-lg border border-white/20 text-white">
                    <span className="material-symbols-outlined text-2xl">flag</span>
                  </div>
                  <h2 className="font-headline font-extrabold text-3xl text-white m-0 drop-shadow-md">{a.mission_title}</h2>
                </div>
              </div>
              <div className="p-8 md:p-12 flex-1">
                <EditableText value={get('about_mission', a.mission)} onSave={v => saveKey('about_mission', v)} as="p" multiline
                  className="text-on-surface-muted leading-relaxed text-lg">
                  {get('about_mission', a.mission)}
                </EditableText>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="rounded-[2.5rem] overflow-hidden border border-primary/10 shadow-xl flex flex-col bg-white"
            >
              <div className="h-56 md:h-72 relative w-full bg-slate-100 group">
                <EditableImage src={get('about_vis_img', '/images/vision.jpg')} alt="Vizyon" onSave={v => saveKey('about_vis_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041c80]/80 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-8 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-md shadow-lg border border-white/20 text-white">
                    <span className="material-symbols-outlined text-2xl">visibility</span>
                  </div>
                  <h2 className="font-headline font-extrabold text-3xl text-white m-0 drop-shadow-md">{a.vision_title}</h2>
                </div>
              </div>
              <div className="p-8 md:p-12 flex-1">
                <EditableText value={get('about_vision', a.vision)} onSave={v => saveKey('about_vision', v)} as="p" multiline
                  className="text-on-surface-muted leading-relaxed text-lg">
                  {get('about_vision', a.vision)}
                </EditableText>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gradient-to-r from-primary via-[#041c80] to-secondary">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-white mb-12 text-center">{a.achievements_title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {a.achievements.map((ach, i) => (
              <motion.div
                key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="flex items-start gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10"
              >
                <span className="material-symbols-outlined text-[#03caff] mt-0.5 flex-shrink-0">verified</span>
                <EditableText value={get(`about_ach_${i}`, ach)} onSave={v => saveKey(`about_ach_${i}`, v)} as="p" multiline
                  className="text-white text-sm font-semibold leading-relaxed">
                  {get(`about_ach_${i}`, ach)}
                </EditableText>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">{a.infra_title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infraFallback.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="glass-card rounded-[2rem] overflow-hidden border border-primary/5 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 bg-white flex flex-col">
                <div className="aspect-[4/3] w-full relative bg-slate-100 group">
                  <EditableImage src={get(`about_infra_img_${i}`, `/images/infra-${i+1}.jpg`)} alt={item.title} onSave={v => saveKey(`about_infra_img_${i}`, v)}
                    className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8 pb-10 flex-1 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center -mt-14 mb-5 bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20 relative z-10 border-4 border-white text-white">
                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  </div>
                  <EditableText
                    value={getArr('about_infra', i, 0, item.title)}
                    onSave={v => saveArr('about_infra', i, 0, infraFallback.map(x=>[x.title,x.desc]), v)}
                    as="h3" className="font-headline font-extrabold text-xl text-primary mb-3">
                    {getArr('about_infra', i, 0, item.title)}
                  </EditableText>
                  <EditableText
                    value={getArr('about_infra', i, 1, item.desc)}
                    onSave={v => saveArr('about_infra', i, 1, infraFallback.map(x=>[x.title,x.desc]), v)}
                    as="p" multiline className="text-on-surface-muted text-sm leading-relaxed">
                    {getArr('about_infra', i, 1, item.desc)}
                  </EditableText>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Communication */}
      <section className="py-24 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">{a.comms_title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {a.comms_steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="relative bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                <div className="absolute top-8 right-8 text-6xl font-headline font-black text-slate-50 leading-none pointer-events-none">
                  {(i + 1).toString().padStart(2, '0')}
                </div>
                <div className="relative z-10 flex-1">
                  <EditableText value={get(`about_comms_${i}_t`, step.title)} onSave={v => saveKey(`about_comms_${i}_t`, v)} as="h3" className="font-headline font-bold text-xl text-primary mb-3">
                    {get(`about_comms_${i}_t`, step.title)}
                  </EditableText>
                  <EditableText value={get(`about_comms_${i}_d`, step.desc)} onSave={v => saveKey(`about_comms_${i}_d`, v)} as="p" multiline className="text-sm text-on-surface-muted leading-relaxed">
                    {get(`about_comms_${i}_d`, step.desc)}
                  </EditableText>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Description */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="glass-card rounded-[3rem] p-10 md:p-16 border border-primary/10 shadow-xl flex flex-col md:flex-row items-center gap-12 bg-gradient-to-r from-blue-50 to-white">
            <div className="w-48 md:w-64 flex-shrink-0">
              <EditableImage src={get('about_logo_img', '/logo.svg')} alt="Maktab Logosi" onSave={v => saveKey('about_logo_img', v)}
                className="w-full relative group" imgClassName="w-full h-auto object-contain drop-shadow-xl" />
            </div>
            <div className="flex-1">
              <EditableText value={get('about_logo_title', 'Logotipning Ma\'nosi')} onSave={v => saveKey('about_logo_title', v)} as="h2" className="font-headline text-3xl md:text-4xl font-extrabold text-primary mb-6">
                {get('about_logo_title', 'Logotipning Ma\'nosi')}
              </EditableText>
              <EditableText value={get('about_logo_desc', a.vision || "DATA logotipidagi uchta 'D' harfi bilim, motivatsiya va intellektual yuksalishni anglatadi. 'DATA' axborot texnologiyalariga ixtisoslashganimiz ramzidir.")} onSave={v => saveKey('about_logo_desc', v)} as="p" multiline className="text-on-surface-muted leading-relaxed text-lg">
                {get('about_logo_desc', a.vision || "DATA logotipidagi uchta 'D' harfi bilim, motivatsiya va intellektual yuksalishni anglatadi. 'DATA' axborot texnologiyalariga ixtisoslashganimiz ramzidir.")}
              </EditableText>
            </div>
          </div>
        </div>
      </section>

      {/* Team / Management Snapshot */}
      <section className="py-24 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">Rahbariyat va Ustozlar</h2>
            <p className="mt-4 text-on-surface-muted max-w-2xl mx-auto">Tajribali mutaxassislar va o'z ishining ustalaridan ta'lim oling.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { n: 'Nilufar Kalandarova', r: 'O\'quv va akademik ishlar bo\'yicha direktorning o\'rinbosari' },
              { n: 'Quvondiq Hakimov', r: 'Yoshlar va ma\'naviy-ma\'rifiy ishlar bo\'yicha o\'rinbosar' },
              { n: 'Zafarbek Ro\'zmetov', r: 'HR direktor' }
            ].map((person, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all text-center">
                <div className="aspect-square w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 mx-auto bg-slate-100 shadow-lg border-4 border-white group relative">
                  <EditableImage src={get(`about_team_img_${i}`, `/images/team-${i+1}.jpg`)} alt={person.n} onSave={v => saveKey(`about_team_img_${i}`, v)}
                    className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <EditableText value={get(`about_team_n_${i}`, person.n)} onSave={v => saveKey(`about_team_n_${i}`, v)} as="h3" className="font-headline font-extrabold text-primary text-xl mb-3">
                  {get(`about_team_n_${i}`, person.n)}
                </EditableText>
                <div className="h-1 w-12 bg-secondary rounded-full mx-auto mb-4" />
                <EditableText value={get(`about_team_r_${i}`, person.r)} onSave={v => saveKey(`about_team_r_${i}`, v)} as="p" multiline className="text-sm font-semibold text-[#062bad] leading-relaxed uppercase tracking-widest">
                  {get(`about_team_r_${i}`, person.r)}
                </EditableText>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
             <Link to="/maktab-haqida/jamoa" className="btn-secondary px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest inline-flex items-center gap-2 hover:scale-105 transition-transform">
                Barcha jamoa a'zolarini ko'rish <ArrowRight size={16} />
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
