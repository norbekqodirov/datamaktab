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
    { title: 'Transport', desc: "Maktabda 4 ta avtobus. Ota-onalar GPS orqali real vaqtda kuzatishadi.", icon: 'directions_bus' },
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

  const healthTeam = [
    { name: 'Zulfiya Abdullayeva', role: 'Maktab shifokori', desc: "Kunlik sog'liq nazorati, birlamchi tibbiy yordam, profilaktik ko'riklar va gigiyena nazorati.", icon: 'stethoscope' },
    { name: 'Lyudmila Atadjanova', role: 'Maktab psixologi', desc: "O'quvchi motivatsiyasi, adaptatsiya, sinfdoshlar munosabati va individual psixologik yordam.", icon: 'psychology' },
    { name: 'Rahiya Omirzakova', role: 'Maktab logopedi', desc: "Nutq nuqsonlarini aniqlash va tuzatish, o'qish/yozish qiyinchiliklari, til o'rganishda qo'llab-quvvatlash.", icon: 'record_voice_over' },
  ];

  return (
    <div className="bg-surface font-body text-on-surface">

      {/* Hero */}
      <section className="relative h-auto pt-40 pb-16 md:pt-52 md:pb-20 overflow-hidden flex flex-col justify-end">
        <div className="absolute inset-0 z-0">
          <EditableImage src={get('about_hero_bg', '/maktab.jpg')} alt={a.hero_title} onSave={v => saveKey('about_hero_bg', v)}
            className="w-full h-full" imgClassName="w-full h-full object-cover grayscale-[10%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/95" />
        </div>
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-[11px] font-extrabold tracking-[0.25em] text-secondary uppercase mb-4">DATA Xalqaro Maktabi</span>
            <EditableText value={get('about_hero_title', a.hero_title)} onSave={v => saveKey('about_hero_title', v)} as="h1"
              className="font-headline text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tighter leading-tight">
              {get('about_hero_title', a.hero_title)}
            </EditableText>
            <EditableText value={get('about_hero_desc', a.hero_desc)} onSave={v => saveKey('about_hero_desc', v)} as="p" multiline
              className="mt-4 text-white/80 text-lg max-w-2xl">
              {get('about_hero_desc', a.hero_desc)}
            </EditableText>
          </motion.div>
        </div>
      </section>

      {/* History + Logo Meaning */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-6">Bizning Tarix</span>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-6 leading-tight">
                DATA ta'lim ekotizimi — <span className="text-[#03caff]">2019 yildan</span>
              </h2>
              <div className="w-16 h-1.5 bg-[#03caff] rounded-full mb-8" />
              <p className="text-on-surface-muted leading-relaxed text-lg mb-6">
                DATA ta'lim markazi 2019-yilda Xorazm viloyatining Urganch shahrida tashkil etilgan. IT texnologiyalari va xorijiy tillar yo'nalishlariga ixtisoslashgan bo'lib, <strong className="text-primary">16 000 nafara yaqin yoshlarning</strong> kasb-hunar egallashiga hissa qo'shib kelmoqda.
              </p>
              <p className="text-on-surface-muted leading-relaxed text-lg mb-10">
                2024-yilda ilk maktabni Urganch tumanida ishga tushirib, kurslardan boshlanib maktabgacha o'sgan yaxlit ta'lim ekotizimiga ega bo'ldik.
              </p>
              <div className="p-6 bg-surface rounded-3xl border border-primary/5 space-y-4">
                <h3 className="font-headline font-extrabold text-primary text-xl">Logotipimiz ortidagi g'oya</h3>
                {[
                  { d: 'Birinchi "D"', desc: "Ichki bo'shliq bilan — o'quvchining boshlang'ich bilim darajasi." },
                  { d: 'Ikkinchi "D"', desc: "Qisman to'lgan — bilim, motivatsiya va ilhom bilan to'ldirilayotgan bosqich." },
                  { d: 'Uchinchi "D"', desc: "To'liq to'lgan — shaxsiy rivoj va intellektual yuksalishning yakuniy natijasi." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="font-headline font-extrabold text-2xl text-[#03caff] w-8 flex-shrink-0">{i + 1}</span>
                    <div><strong className="text-primary">{item.d}</strong> — <span className="text-on-surface-muted">{item.desc}</span></div>
                  </div>
                ))}
                <p className="text-[#062bad] font-bold italic">"Bilimga to'ldiramiz!" — shiorimizdagi mazmun ham aynan shu.</p>
              </div>
            </div>
            <div className="relative h-[560px]">
              <div className="absolute top-0 left-0 w-[72%] h-[75%] rounded-[2.5rem] overflow-hidden shadow-2xl z-10 group bg-slate-100">
                <EditableImage src={get('about_hist_img1', '/images/about-1.jpg')} alt="DATA tarixi" onSave={v => saveKey('about_hist_img1', v)}
                  className="w-full h-full" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="absolute bottom-0 right-0 w-[60%] h-[60%] rounded-[2.5rem] overflow-hidden shadow-2xl z-20 border-4 border-white group bg-slate-100">
                <EditableImage src={get('about_hist_img2', '/images/about-2.jpg')} alt="DATA tarixi" onSave={v => saveKey('about_hist_img2', v)}
                  className="w-full h-full" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-4 z-30 bg-[#03caff] text-white rounded-3xl p-5 shadow-2xl shadow-[#03caff]/30">
                <p className="font-headline font-extrabold text-3xl">16K+</p>
                <p className="text-xs uppercase tracking-widest opacity-80 mt-1">Yetishtirilgan yosh</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { key: 'miss', titleKey: 'about_miss_img', fallbackImg: '/images/mission.jpg', textKey: 'about_mission', text: a.mission, title: a.mission_title, icon: 'flag', gradFrom: 'from-primary/80' },
              { key: 'vis', titleKey: 'about_vis_img', fallbackImg: '/images/vision.jpg', textKey: 'about_vision', text: a.vision, title: a.vision_title, icon: 'visibility', gradFrom: 'from-[#041c80]/80' },
            ].map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="rounded-[2.5rem] overflow-hidden border border-primary/10 shadow-xl flex flex-col bg-white">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Director's Letter */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-6">Direktor So'zi</span>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-6 leading-tight">
                <EditableText value={get('director_title', "Adolat, tartib va ochiqlik — boshqaruvimizning asosi")} onSave={v => saveKey('director_title', v)}>
                  {get('director_title', "Adolat, tartib va ochiqlik — boshqaruvimizning asosi")}
                </EditableText>
              </h2>
              <div className="w-16 h-1.5 bg-[#03caff] rounded-full mb-8" />
              <EditableText value={get('director_text', "Direktor sifatida kafolatlayman — boshqaruvning barcha darajalarida adolat, tartib va ochiqlik tamoyillari ustuvor. Har bir o'quvchi bilan ishlashda individual yondashuv qo'llaniladi.")}
                onSave={v => saveKey('director_text', v)} as="p" multiline className="text-on-surface-muted leading-relaxed text-lg mb-8">
                {get('director_text', "Direktor sifatida kafolatlayman — boshqaruvning barcha darajalarida adolat, tartib va ochiqlik tamoyillari ustuvor. Har bir o'quvchi bilan ishlashda individual yondashuv qo'llaniladi.")}
              </EditableText>
              <div className="p-6 bg-surface rounded-3xl border border-primary/5">
                <p className="text-[#062bad] font-bold italic text-sm leading-relaxed">
                  "Agar farzandingizning ta'limi tizimli nazorat qilinadigan, xavfsiz va rivojlantiruvchi muhitda bo'lishini istasangiz, DATA jamoasi siz bilan hamkorlikka tayyor."
                </p>
                <p className="mt-3 text-xs font-extrabold uppercase tracking-widest text-on-surface-muted">— Dilfuza Babajanova, Direktor</p>
              </div>
            </motion.div>
            <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl group bg-slate-100">
              <EditableImage src={get('director_img', '/images/director.jpg')} alt="Dilfuza Babajanova" onSave={v => saveKey('director_img', v)}
                className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-10 left-10 right-10 z-10">
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Maktab Direktori</p>
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
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="flex items-start gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                <span className="material-symbols-outlined text-[#03caff] mt-0.5 flex-shrink-0">verified</span>
                <EditableText value={get(`about_ach_${i}`, ach)} onSave={v => saveKey(`about_ach_${i}`, v)} as="p" multiline className="text-white text-sm font-semibold leading-relaxed">
                  {get(`about_ach_${i}`, ach)}
                </EditableText>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CIS + Cambridge + CyberPark + Legal */}
      <section className="py-24 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-5">Rasmiy Status va A'zoliklar</span>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">Tan olingan maktab</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'public', badge: 'Nomzod', title: 'CIS — Xalqaro Maktablar Kengashi', desc: '122 mamlakatdagi 1530 dan ortiq maktab va universitetni birlashtiruvchi notijorat tashkilot. DATA nomzod maqomida.', color: '#03caff' },
              { icon: 'school', badge: 'Jarayonda', title: 'Cambridge Maktabi Statusiga', desc: "Cambridge Assessment International Education tashkilotiga arizada turibmiz. 2 bosqich muvaffaqiyatli o'tildi.", color: '#041c80' },
              { icon: 'hub', badge: 'Xorazmda birinchi', title: 'CyberPark Rezidenti', desc: "INHA University va Turin Polytechnic bilan bir safda turuvchi texnologik ta'lim muassasasi sifatida akkreditatsiyalangan.", color: '#062bad' },
              { icon: 'verified_user', badge: '№393364', title: "Ta'lim Litsenziyasi", desc: "2024-yil 12-sentabr, O'zbekiston Respublikasi MMTV tomonidan berilgan rasmiy litsenziya.", color: '#03caff' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:-translate-y-2 hover:shadow-xl transition-all flex flex-col">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${item.color}, #041c80)` }}>
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <span className="inline-block px-3 py-1 text-[9px] font-extrabold tracking-widest uppercase rounded-full mb-4" style={{ backgroundColor: item.color + '20', color: item.color }}>{item.badge}</span>
                <h3 className="font-headline font-extrabold text-primary text-lg mb-3 leading-snug">{item.title}</h3>
                <p className="text-on-surface-muted text-sm leading-relaxed flex-1">{item.desc}</p>
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
                  <EditableText value={getArr('about_infra', i, 0, item.title)} onSave={v => saveArr('about_infra', i, 0, infraFallback.map(x=>[x.title,x.desc]), v)}
                    as="h3" className="font-headline font-extrabold text-xl text-primary mb-3">
                    {getArr('about_infra', i, 0, item.title)}
                  </EditableText>
                  <EditableText value={getArr('about_infra', i, 1, item.desc)} onSave={v => saveArr('about_infra', i, 1, infraFallback.map(x=>[x.title,x.desc]), v)}
                    as="p" multiline className="text-on-surface-muted text-sm leading-relaxed">
                    {getArr('about_infra', i, 1, item.desc)}
                  </EditableText>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Team */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-5">Bolalar Sog'lig'i</span>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">Shifokor, Psixolog va Logoped</h2>
            <p className="mt-4 text-on-surface-muted max-w-2xl mx-auto text-lg">Har bir o'quvchi doimiy professional nazorat ostida. Har chorakda bepul tibbiy ko'rik.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {healthTeam.map((person, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="bg-surface rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all">
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
              </motion.div>
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
      <section className="py-24 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100">
              <div className="aspect-video relative bg-slate-100 group">
                <EditableImage src={get('food_img', '/images/food.jpg')} alt="Ovqatlanish" onSave={v => saveKey('food_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-7">
                  <span className="text-white font-headline font-extrabold text-2xl drop-shadow-lg">Kuniga 3 Mahal Issiq Ovqat</span>
                </div>
              </div>
              <div className="p-8">
                <p className="text-on-surface-muted leading-relaxed mb-6">Menyu dietolog nazoratida tuziladi. Nonushta, tushlik va poldnik — hammasini maktab ta'minlaydi.</p>
                <div className="space-y-3">
                  {[
                    { label: 'Nonushta', desc: "Sutli bo'tqa, tvorog, choy — 08:00–09:00" },
                    { label: 'Tushlik', desc: "Sho'rva, go'shtli taom, salat, meva — 12:00–13:00" },
                    { label: 'Poldnik', desc: 'Pirog, pechenye, kompot' },
                  ].map((meal, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-surface rounded-2xl">
                      <span className="material-symbols-outlined text-[#03caff] flex-shrink-0">restaurant</span>
                      <div><strong className="text-primary text-sm">{meal.label}</strong><span className="text-on-surface-muted text-xs ml-2">{meal.desc}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100">
              <div className="aspect-video relative bg-slate-100 group">
                <EditableImage src={get('transport_img', '/images/transport.jpg')} alt="Transport" onSave={v => saveKey('transport_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-7">
                  <span className="text-white font-headline font-extrabold text-2xl drop-shadow-lg">GPS Nazoratli Avtobuslar</span>
                </div>
              </div>
              <div className="p-8">
                <p className="text-on-surface-muted leading-relaxed mb-6">4 ta SAZ NP 26 model avtobus faoliyat yuritadi. Ota-onalar farzandining harakatini real vaqtda kuzatib boradi.</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: 'directions_bus', val: '4 ta', label: 'Avtobus' },
                    { icon: 'person', val: '40', label: "Sig'im (nafar)" },
                    { icon: 'location_on', val: 'GPS', label: 'Real vaqt kuzatuv' },
                    { icon: 'calendar_month', val: '5 kun', label: 'Haftalik xizmat' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-surface rounded-2xl">
                      <span className="material-symbols-outlined text-primary">{item.icon}</span>
                      <div>
                        <p className="font-extrabold text-primary font-headline">{item.val}</p>
                        <p className="text-xs text-on-surface-muted">{item.label}</p>
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
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">{a.comms_title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {a.comms_steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="relative bg-surface rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
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
          <div className="mt-12 grid sm:grid-cols-4 gap-6">
            {[
              { val: '95%', label: "DATA'ni tavsiya qiladi" },
              { val: '70%', label: 'Maktabni 9–10 ball bilan baholagan' },
              { val: '87%', label: "Ijobiy o'zgarish sezgan" },
              { val: '84%', label: "Muammolar o'z vaqtida hal bo'lgan" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="text-center p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl border border-primary/10">
                <p className="font-headline font-extrabold text-4xl text-primary mb-2">{s.val}</p>
                <p className="text-on-surface-muted text-sm font-semibold">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Yashnar + Inclusive */}
      <section className="py-24 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100">
              <div className="aspect-video relative bg-slate-100 group">
                <EditableImage src={get('yashnar_img', '/images/yashnar.jpg')} alt="Yashnar NNT" onSave={v => saveKey('yashnar_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-7">
                  <span className="text-white font-headline font-extrabold text-2xl drop-shadow-lg">"YASHNAR" NNT</span>
                </div>
              </div>
              <div className="p-8">
                <p className="text-on-surface-muted leading-relaxed mb-6">"Bir bola, bir oila, bir jamiyat" shiori ostida DATA daromadining bir qismi ijtimoiy loyihalarga yo'naltiriladi.</p>
                <div className="space-y-3">
                  {["Ijtimoiy himoyaga muhtoj bolalarni qo'llab-quvvatlash", "Inklyuziv ta'lim loyihalarini rivojlantirish", "Ta'limga kirish imkoniyatini kengaytirish"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-surface rounded-2xl">
                      <span className="material-symbols-outlined text-[#03caff] flex-shrink-0">favorite</span>
                      <span className="text-sm font-semibold text-primary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#062bad]/5 to-[#03caff]/5 rounded-[2.5rem] overflow-hidden shadow-lg border border-primary/10">
              <div className="aspect-video relative bg-slate-100 group">
                <EditableImage src={get('inclusive_img', '/images/inclusive.jpg')} alt="Inklyuziv Sinf" onSave={v => saveKey('inclusive_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062bad]/70 to-transparent pointer-events-none" />
                <div className="absolute top-4 right-4 bg-[#03caff] text-white text-[9px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">O'zbekistonda 1-chi</div>
                <div className="absolute bottom-6 left-7">
                  <span className="text-white font-headline font-extrabold text-2xl drop-shadow-lg">Inklyuziv Korreksion Sinf</span>
                </div>
              </div>
              <div className="p-8">
                <p className="text-on-surface-muted leading-relaxed mb-6">2025-yildan boshlab O'zbekistondagi 700 dan ortiq xususiy maktablar orasida ilk bo'lib inklyuziv korreksion sinf tashkil etildi. "Teng maydon" loyihasi.</p>
                <div className="p-5 bg-white rounded-2xl border border-primary/5">
                  <p className="text-primary font-bold text-sm">Hamkorlik: Ijtimoiy Himoya Milliy Agentligi, UNICEF</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Description */}
      <section className="py-24 bg-white">
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
      <section className="py-24 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">Rahbariyat va Ustozlar</h2>
            <p className="mt-4 text-on-surface-muted max-w-2xl mx-auto">Tajribali mutaxassislar va o'z ishining ustalaridan ta'lim oling.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { n: 'Nilufar Kalandarova', r: "O'quv va akademik ishlar bo'yicha direktorning o'rinbosari" },
              { n: 'Quvondiq Hakimov', r: "Yoshlar va ma'naviy-ma'rifiy ishlar bo'yicha o'rinbosar" },
              { n: "Zafarbek Ro'zmetov", r: 'HR direktor' },
            ].map((person, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all text-center">
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
