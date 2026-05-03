import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';
import SEO from '../components/SEO';

export default function About() {
  const { t } = useLanguage();
  const { get, saveKey } = useSiteSettings();
  const a = t.about;
  const tm = t.team;

  const infraFallback = a.infra_items.map(item => ({ ...item, icon: item.title.includes('Bino') || item.title.includes('Новое') || item.title.includes('New') ? 'apartment' : item.title.includes('Texnologiya') || item.title.includes('Modern') || item.title.includes('Современные') ? 'computer' : item.title.includes('Ovqat') || item.title.includes('Питание') || item.title.includes('Catering') ? 'restaurant' : item.title.includes('Sog\'liq') || item.title.includes('Health') || item.title.includes('Здравоохранение') ? 'health_and_safety' : item.title.includes('Xavfsiz') || item.title.includes('Secur') || item.title.includes('Безопасность') ? 'security' : 'directions_bus' }));

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

  const healthTeam = a.health_team.map(item => ({ ...item, icon: item.role.includes('shifokor') || item.role.includes('Doctor') || item.role.includes('врач') ? 'stethoscope' : item.role.includes('psixolog') || item.role.includes('Psychologist') || item.role.includes('психолог') ? 'psychology' : 'record_voice_over' }));

  return (
    <>
    <SEO url="/maktab-haqida" title="Maktab Haqida" description="DATA Xalqaro Maktabi haqida batafsil ma'lumot: tarix, infratuzilma, tibbiy xizmat, ovqatlanish va transport. Urganch shahridagi eng sifatli xalqaro maktab." />

    <div className="bg-surface font-body text-on-surface">

      {/* Hero */}
      <section className="relative h-auto pt-28 pb-10 md:pt-36 md:pb-14 overflow-hidden flex flex-col justify-end">
        <div className="absolute inset-0 z-0">
          <EditableImage src={get('about_hero_bg', '/maktab.webp')} alt={a.hero_title} onSave={v => saveKey('about_hero_bg', v)}
            className="w-full h-full" imgClassName="w-full h-full object-cover grayscale-[10%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/95" />
        </div>
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 relative z-10 pb-0">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-[11px] font-extrabold tracking-[0.25em] text-secondary uppercase mb-4">DATA Xalqaro Maktabi</span>
            <EditableText value={get('about_hero_title', a.hero_title)} onSave={v => saveKey('about_hero_title', v)} as="h1"
              className="font-headline text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tighter leading-tight">
              {get('about_hero_title', a.hero_title)}
            </EditableText>
            <EditableText value={get('about_hero_desc', a.hero_desc)} onSave={v => saveKey('about_hero_desc', v)} as="p" multiline
              className="mt-4 text-white/80 text-lg max-w-4xl">
              {get('about_hero_desc', a.hero_desc)}
            </EditableText>
          </motion.div>
        </div>
      </section>

      {/* History + Logo Meaning */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            <div className="flex flex-col justify-between py-2">
              <div className="mb-8">
                <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-6">{a.history_badge}</span>
                <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: a.history_title.replace('—', '<span class="text-[#03caff]">—').replace('2019', '2019</span>') }}></h2>
                <div className="w-16 h-1.5 bg-[#03caff] rounded-full mb-8" />
                <p className="text-on-surface-muted leading-relaxed text-lg mb-6" dangerouslySetInnerHTML={{ __html: a.history_p1.replace('16 000', '<strong class="text-primary">16 000').replace('yoshlarning', 'yoshlarning</strong>') }}></p>
                <p className="text-on-surface-muted leading-relaxed text-lg mb-10">{a.history_p2}</p>
              </div>
              <div className="p-6 bg-surface rounded-3xl border border-primary/5 space-y-4 mt-auto">
                <h3 className="font-headline font-extrabold text-primary text-xl">{a.logo_title}</h3>
                {a.logo_items.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="font-headline font-extrabold text-2xl text-[#03caff] w-8 flex-shrink-0">{i + 1}</span>
                    <div><strong className="text-primary">{item.d}</strong> — <span className="text-on-surface-muted max-w-4xl">{item.desc}</span></div>
                  </div>
                ))}
                <p className="text-[#062bad] font-bold italic mt-2">{a.logo_quote}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6 h-full min-h-[460px] w-full">
              <div className="col-span-1 h-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-xl relative group bg-slate-100">
                <EditableImage src={get('about_hist_img1', '/images/about-1.jpg')} alt="DATA tarixi" onSave={v => saveKey('about_hist_img1', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="col-span-1 grid grid-rows-2 gap-4 md:gap-6 h-full">
                <div className="h-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-xl relative group bg-slate-100">
                  <EditableImage src={get('about_hist_img2', '/images/about-2.jpg')} alt="DATA tarixi" onSave={v => saveKey('about_hist_img2', v)}
                    className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="h-full rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#03caff] to-[#062bad] text-white p-6 shadow-xl shadow-[#03caff]/30 transition-transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#03caff]/40">
                  <p className="font-headline font-extrabold text-4xl lg:text-5xl mb-2 drop-shadow-md">16K+</p>
                  <p className="text-[10px] md:text-xs uppercase tracking-widest opacity-90 font-bold max-w-[120px] mx-auto leading-relaxed">{a.stats_graduated}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { key: 'miss', titleKey: 'about_miss_img', fallbackImg: '/images/mission.jpg', textKey: 'about_mission', text: a.mission, title: a.mission_title, icon: 'flag', gradFrom: 'from-primary/80' },
              { key: 'vis', titleKey: 'about_vis_img', fallbackImg: '/images/vision.jpg', textKey: 'about_vision', text: a.vision, title: a.vision_title, icon: 'visibility', gradFrom: 'from-[#041c80]/80' },
            ].map((card, i) => (
              <div key={i} className="rounded-[2.5rem] overflow-hidden border border-primary/10 shadow-xl flex flex-col bg-white">
                <div className="h-56 md:h-72 relative w-full bg-slate-100 group">
                  <EditableImage src={get(card.titleKey, card.fallbackImg)} alt={card.title} onSave={v => saveKey(card.titleKey, v)}
                    className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${card.gradFrom} to-transparent pointer-events-none`} />
                  <div className="absolute bottom-6 left-8 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-md shadow-lg border border-white/20 text-white">
                      <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                    </div>
                    <h2 className="font-headline font-extrabold text-3xl text-white m-0 drop-shadow-md">{card.title}</h2>
                  </div>
                </div>
                <div className="p-8 md:p-12 flex-1">
                  <EditableText value={get(card.textKey, card.text)} onSave={v => saveKey(card.textKey, v)} as="p" multiline className="text-on-surface-muted leading-relaxed text-lg">
                    {get(card.textKey, card.text)}
                  </EditableText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Director's Letter */}
      <section className="py-12 md:py-16 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-6">{a.director_badge}</span>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-6 leading-tight">
                <EditableText value={get('director_title', a.director_title)} onSave={v => saveKey('director_title', v)}>
                  {get('director_title', a.director_title)}
                </EditableText>
              </h2>
              <div className="w-16 h-1.5 bg-[#03caff] rounded-full mb-8" />
              <EditableText value={get('director_text', a.director_text)}
                onSave={v => saveKey('director_text', v)} as="p" multiline className="text-on-surface-muted leading-relaxed text-lg mb-8">
                {get('director_text', a.director_text)}
              </EditableText>
              <div className="p-6 bg-surface rounded-3xl border border-primary/5">
                <p className="text-[#062bad] font-bold italic text-sm leading-relaxed">
                  {a.director_quote}
                </p>
                <p className="mt-3 text-xs font-extrabold uppercase tracking-widest text-on-surface-muted">— Dilfuza Babajanova, {a.director_role_label}</p>
              </div>
            </div>
            <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl group bg-slate-100">
              <EditableImage src={get('director_img', '/images/director.jpg')} alt="Dilfuza Babajanova" onSave={v => saveKey('director_img', v)}
                className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-10 left-10 right-10 z-10">
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">{a.director_role_label}</p>
                <h3 className="text-white font-headline font-extrabold text-2xl drop-shadow-lg">Dilfuza Babajanova</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gradient-to-r from-primary via-[#041c80] to-secondary">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-white mb-12 text-center">{a.achievements_title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {a.achievements.map((ach, i) => (
              <div key={i} className="flex items-start gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                <span className="material-symbols-outlined text-[#03caff] mt-0.5 flex-shrink-0">verified</span>
                <EditableText value={get(`about_ach_${i}`, ach)} onSave={v => saveKey(`about_ach_${i}`, v)} as="p" multiline className="text-white text-sm font-semibold leading-relaxed">
                  {get(`about_ach_${i}`, ach)}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CIS + Cambridge + CyberPark + Legal */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-5">{a.status_badge}</span>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">{a.status_title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {a.status_cards.map((item, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:-translate-y-2 hover:shadow-xl transition-all flex flex-col">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${item.color}, #041c80)` }}>
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <span className="inline-block px-3 py-1 text-[9px] font-extrabold tracking-widest uppercase rounded-full mb-4" style={{ backgroundColor: item.color + '20', color: item.color }}>{item.badge}</span>
                <h3 className="font-headline font-extrabold text-primary text-lg mb-3 leading-snug">{item.title}</h3>
                <p className="text-on-surface-muted text-sm leading-relaxed flex-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">{a.infra_title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infraFallback.map((item, i) => (
              <div key={i} className="glass-card rounded-[2rem] overflow-hidden border border-primary/5 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 bg-white flex flex-col">
                <div className="aspect-[4/3] w-full relative bg-slate-100 group">
                  <EditableImage src={get(`about_infra_img_${i}`, `/images/infra-${i+1}.jpg`)} alt={item.title} onSave={v => saveKey(`about_infra_img_${i}`, v)}
                    className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8 pb-10 flex-1 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center -mt-14 mb-5 bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20 relative z-10 border-4 border-white text-white">
                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  </div>
                  <EditableText value={getArr('about_infra', i, 0, item.title)} onSave={v => saveArr('about_infra', i, 0, infraFallback.map(x=>[x.title,x.desc]), v)}
                    as="h3" className="font-headline font-extrabold text-xl text-primary mb-3">
                    {getArr('about_infra', i, 0, item.title)}
                  </EditableText>
                  <EditableText value={getArr('about_infra', i, 1, item.desc)} onSave={v => saveArr('about_infra', i, 1, infraFallback.map(x=>[x.title,x.desc]), v)}
                    as="p" multiline className="text-on-surface-muted text-sm leading-relaxed">
                    {getArr('about_infra', i, 1, item.desc)}
                  </EditableText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Team */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-5">Bolalar Sog'lig'i</span>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">Shifokor, Psixolog va Logoped</h2>
            <p className="mt-4 text-on-surface-muted max-w-2xl mx-auto text-lg">Har bir o'quvchi doimiy professional nazorat ostida. Har chorakda bepul tibbiy ko'rik.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {healthTeam.map((person, i) => (
              <div key={i} className="bg-surface rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all">
                <div className="aspect-[4/3] relative bg-slate-100 group">
                  <EditableImage src={get(`health_img_${i}`, `/images/health-${i+1}.jpg`)} alt={person.name} onSave={v => saveKey(`health_img_${i}`, v)}
                    className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/20 -mt-14 mb-5 mx-auto relative z-10 border-4 border-white">
                    <span className="material-symbols-outlined text-2xl">{person.icon}</span>
                  </div>
                  <h3 className="font-headline font-extrabold text-primary text-xl mb-1">{person.name}</h3>
                  <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-[#062bad] bg-[#03caff]/10 rounded-full mb-4">{person.role}</span>
                  <p className="text-on-surface-muted text-sm leading-relaxed">{person.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-8 bg-gradient-to-r from-primary to-[#041c80] rounded-3xl text-white flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-white text-2xl">shield</span>
              </div>
              <div>
                <h3 className="font-headline font-extrabold text-2xl mb-3">20 MLN SO'MLIK SUG'URTA</h3>
                <p className="text-white/80 text-sm leading-relaxed">"Uzbekinvest" bilan shartnoma asosida har bir o'quvchi sug'urtalanadi. Baxtsiz hodisa maktab hududidan tashqarida bo'lsa ham, 20 million so'm to'lanadi.</p>
              </div>
            </div>
            <div className="p-8 bg-gradient-to-r from-[#041c80] to-secondary rounded-3xl text-white flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-white text-2xl">security</span>
              </div>
              <div>
                <h3 className="font-headline font-extrabold text-2xl mb-3">MILLIY GVARDIYA QO'RIQLAYDI</h3>
                <p className="text-white/80 text-sm leading-relaxed">Maktab hududi doimiy nazorat ostida. SOS signal yuborilsa, 5 daqiqa ichida xavfsizlik xodimlari yetib keladi.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food + Transport */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full">
              <div className="aspect-video relative bg-slate-100 group flex-shrink-0">
                <EditableImage src={get('food_img', '/images/food.jpg')} alt="Ovqatlanish" onSave={v => saveKey('food_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-7">
                  <span className="text-white font-headline font-extrabold text-2xl drop-shadow-lg">{a.food_title}</span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-on-surface-muted leading-relaxed mb-6">{a.food_desc}</p>
                <div className="space-y-2 mt-auto">
                  {a.food_meals.map((meal, i) => (
                    <div key={i} className="flex items-start gap-3 py-2.5 px-4 bg-surface rounded-xl">
                      <span className="material-symbols-outlined text-[#03caff] flex-shrink-0 text-[18px]">restaurant</span>
                      <div><strong className="text-primary text-[13px]">{meal.time}</strong><span className="text-on-surface-muted text-[11px] ml-2 block sm:inline">{meal.menu}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full">
              <div className="aspect-video relative bg-slate-100 group flex-shrink-0">
                <EditableImage src={get('transport_img', '/images/transport.jpg')} alt="Transport" onSave={v => saveKey('transport_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-7">
                  <span className="text-white font-headline font-extrabold text-2xl drop-shadow-lg">{a.transport_title}</span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-on-surface-muted leading-relaxed mb-6">{a.transport_desc}</p>
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  {[
                    { icon: 'directions_bus', val: a.transport_stats[0].val, label: a.transport_stats[0].label },
                    { icon: 'person', val: '40', label: "Sig'im (nafar)" },
                    { icon: 'location_on', val: 'GPS', label: a.transport_stats[1].label },
                    { icon: 'calendar_month', val: '5 kun', label: 'Haftalik xizmat' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 px-3 bg-surface rounded-xl">
                      <span className="material-symbols-outlined text-primary text-[20px]">{item.icon}</span>
                      <div>
                        <p className="font-extrabold text-primary font-headline text-[15px]">{item.val}</p>
                        <p className="text-[11px] text-on-surface-muted leading-tight">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Communication + Survey */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">{a.comms_title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {a.comms_steps.map((step, i) => (
              <div key={i} className="relative bg-surface rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
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
              </div>
            ))}
          </div>
          <div className="mt-12 grid sm:grid-cols-4 gap-6">
            {a.survey_stats.map((s, i) => (
              <div key={i} className="text-center p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl border border-primary/10">
                <p className="font-headline font-extrabold text-4xl text-primary mb-2">{s.val}</p>
                <p className="text-on-surface-muted text-sm font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Yashnar + Inclusive */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full">
              <div className="aspect-video relative bg-slate-100 group flex-shrink-0">
                <EditableImage src={get('yashnar_img', '/images/yashnar.jpg')} alt="Yashnar NNT" onSave={v => saveKey('yashnar_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-7">
                  <span className="text-white font-headline font-extrabold text-2xl drop-shadow-lg">{a.yashnar_title}</span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-on-surface-muted leading-relaxed mb-6">{a.yashnar_desc}</p>
                <div className="space-y-2 mt-auto">
                  {a.yashnar_items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 px-3 bg-surface rounded-xl">
                      <span className="material-symbols-outlined text-[#03caff] flex-shrink-0 text-[20px]">favorite</span>
                      <span className="text-[13px] font-semibold text-primary leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#062bad]/5 to-[#03caff]/5 rounded-[2.5rem] overflow-hidden shadow-lg border border-primary/10 flex flex-col h-full">
              <div className="aspect-video relative bg-slate-100 group flex-shrink-0">
                <EditableImage src={get('inclusive_img', '/images/inclusive.jpg')} alt="Inklyuziv Sinf" onSave={v => saveKey('inclusive_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062bad]/70 to-transparent pointer-events-none" />
                <div className="absolute top-4 right-4 bg-[#03caff] text-white text-[9px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">{a.achievements[4]}</div>
                <div className="absolute bottom-6 left-7">
                  <span className="text-white font-headline font-extrabold text-2xl drop-shadow-lg">{a.inclusive_title}</span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-on-surface-muted leading-relaxed mb-6">{a.inclusive_subtitle}</p>
                <div className="p-5 bg-white rounded-2xl border border-primary/5 mt-auto">
                  <p className="text-primary font-bold text-sm">{a.partner_prefix} Ijtimoiy Himoya Milliy Agentligi, UNICEF</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Description */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="glass-card rounded-[3rem] p-10 md:p-16 border border-primary/10 shadow-xl flex flex-col md:flex-row items-center gap-12 bg-gradient-to-r from-blue-50 to-white">
            <div className="w-48 md:w-64 flex-shrink-0">
              <EditableImage src={get('about_logo_img', '/logo.svg')} alt="Maktab Logosi" onSave={v => saveKey('about_logo_img', v)}
                className="w-full relative group" imgClassName="w-full h-auto object-contain drop-shadow-xl" />
            </div>
            <div className="flex-1">
              <EditableText value={get('about_logo_title', "Logotipning Ma'nosi")} onSave={v => saveKey('about_logo_title', v)} as="h2" className="font-headline text-3xl md:text-4xl font-extrabold text-primary mb-6">
                {get('about_logo_title', "Logotipning Ma'nosi")}
              </EditableText>
              <EditableText value={get('about_logo_desc', "DATA logotipidagi uchta 'D' harfi bilim, motivatsiya va intellektual yuksalishni anglatadi. 'DATA' — axborot texnologiyalarini ramzlaydi. Shiorimiz: \"Bilimga to'ldiramiz!\"")} onSave={v => saveKey('about_logo_desc', v)} as="p" multiline className="text-on-surface-muted leading-relaxed text-lg">
                {get('about_logo_desc', "DATA logotipidagi uchta 'D' harfi bilim, motivatsiya va intellektual yuksalishni anglatadi. 'DATA' — axborot texnologiyalarini ramzlaydi. Shiorimiz: \"Bilimga to'ldiramiz!\"")}
              </EditableText>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">{tm.hero_title}</h2>
            <p className="mt-4 text-on-surface-muted max-w-2xl mx-auto">{tm.hero_desc}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { n: 'Nilufar Kalandarova', r: "O'quv va akademik ishlar bo'yicha direktorning o'rinbosari" },
              { n: 'Quvondiq Hakimov', r: "Yoshlar va ma'naviy-ma'rifiy ishlar bo'yicha o'rinbosar" },
              { n: "Zafarbek Ro'zmetov", r: 'HR direktor' },
            ].map((person, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all text-center">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 mx-auto bg-slate-100 shadow-lg border-4 border-white relative group">
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
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/maktab-haqida/jamoa" className="bg-primary text-white hover:bg-[#041c80] px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest inline-flex items-center gap-2 hover:scale-105 transition-all shadow-lg">
              {a.see_all_team} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
