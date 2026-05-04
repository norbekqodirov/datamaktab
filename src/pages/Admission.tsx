import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';
import SEO from '../components/SEO';

export default function Admission() {
  const { t } = useLanguage();
  const { get, saveKey } = useSiteSettings();
  const a = t.admission;

  const openEnrollModal = (e: MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event('open-enroll-modal'));
  };

  return (
    <>
    <SEO url="/qabul" title={a.hero_title} description={a.hero_desc} />
    <div className="bg-surface font-body text-on-surface">

      {/* Hero */}
      <section className="relative h-auto pt-28 pb-10 md:pt-36 md:pb-14 overflow-hidden flex flex-col justify-end">
        <div className="absolute inset-0 z-0">
          <EditableImage src={get('adm_hero_bg', '/maktab.webp')} alt={a.hero_title} onSave={v => saveKey('adm_hero_bg', v)}
            className="w-full h-full" imgClassName="w-full h-full object-cover" priority={true} />
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
            <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-5">{a.process_badge}</span>
            <h2 className="font-headline text-4xl md:text-6xl font-extrabold text-primary tracking-tighter">
              {a.process_title.split(' ').slice(0,-1).join(' ')} <span className="text-[#03caff]">{a.process_title.split(' ').slice(-1)}</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16 items-stretch">
            {/* Grade 1 */}
            <div className="bg-surface rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col h-full bg-slate-50">
              <div className="aspect-video relative bg-slate-100 group flex-shrink-0">
                <EditableImage src={get('adm_step1_img', '/images/admission-1.jpg')} alt={a.grade1_title} onSave={v => saveKey('adm_step1_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062bad] to-transparent pointer-events-none opacity-80" />
                <div className="absolute bottom-6 left-7">
                  <span className="bg-[#03caff] text-white text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-2 inline-block shadow-md">{a.grade1_badge}</span>
                  <p className="text-white font-headline font-extrabold text-2xl md:text-3xl drop-shadow-lg">{a.grade1_title}</p>
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col bg-white">
                <p className="text-on-surface-muted leading-relaxed mb-6">{a.grade1_desc}</p>
                <div className="space-y-3 mb-8">
                  {a.grade1_criteria.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 px-1 py-1 group/item">
                      <span className="material-symbols-outlined text-[#03caff] flex-shrink-0 text-xl">check_circle</span>
                      <span className="text-sm md:text-base font-semibold text-primary">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-[#062bad]/5 border border-[#062bad]/10 rounded-2xl mt-auto">
                  <p className="text-[#062bad] font-bold text-xs md:text-sm text-center">{a.grade1_warning}</p>
                </div>
              </div>
            </div>

            {/* Grade 2-10 */}
            <div className="bg-surface rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col h-full bg-slate-50">
              <div className="aspect-video relative bg-slate-100 group flex-shrink-0">
                <EditableImage src={get('adm_step2_img', '/images/admission-2.jpg')} alt={a.grade210_title} onSave={v => saveKey('adm_step2_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041c80] to-transparent pointer-events-none opacity-80" />
                <div className="absolute bottom-6 left-7">
                  <span className="bg-white/20 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-2 inline-block border border-white/30 shadow-md">{a.grade210_badge}</span>
                  <p className="text-white font-headline font-extrabold text-2xl md:text-3xl drop-shadow-lg">{a.grade210_title}</p>
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col bg-white">
                <div className="space-y-4 mb-8">
                  <div className="flex gap-4 p-4 border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-[#03caff]/30 transition-colors rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#062bad] to-[#03caff] text-white flex items-center justify-center font-extrabold flex-shrink-0 shadow-md">1</div>
                    <div className="mt-1">
                      <h4 className="font-bold text-primary mb-1">{a.grade210_step1_title} <span className="text-xs text-on-surface-muted italic font-normal ml-1">{a.grade210_step1_duration}</span></h4>
                      <p className="text-on-surface-muted text-xs md:text-sm leading-relaxed">{a.grade210_step1_desc}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-[#03caff]/30 transition-colors rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#062bad] to-[#03caff] text-white flex items-center justify-center font-extrabold flex-shrink-0 shadow-md">2</div>
                    <div className="mt-1">
                      <h4 className="font-bold text-primary mb-1">{a.grade210_step2_title}</h4>
                      <p className="text-on-surface-muted text-xs md:text-sm leading-relaxed">{a.grade210_step2_desc}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-[#03caff]/10 border border-[#03caff]/20 rounded-2xl mt-auto">
                  <p className="text-[#062bad] font-bold text-xs md:text-sm text-center">{a.grade210_result}</p>
                </div>
              </div>
            </div>
          </div>

          {/* After results — 5 days steps */}
          <div className="p-8 bg-gradient-to-r from-[#062bad]/5 to-[#03caff]/5 rounded-3xl border border-primary/10">
            <h3 className="font-headline font-extrabold text-primary text-2xl mb-6">{a.after_title} <span className="text-[#03caff]">{a.after_accent}</span></h3>
            <div className="grid sm:grid-cols-3 gap-5">
              {a.after_steps.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm">
                  <span className="font-headline font-extrabold text-3xl text-[#03caff] leading-none">{i + 1}</span>
                  <p className="font-semibold text-primary text-sm mt-1">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 p-4 bg-orange-50 border border-orange-200 rounded-2xl">
              <p className="text-orange-800 font-bold text-sm">{a.after_warning}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            <div className="relative h-full min-h-[460px] w-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl group bg-slate-100">
              <EditableImage src={get('adm_docs_img', '/images/documents.jpg')} alt={a.docs_title} onSave={v => saveKey('adm_docs_img', v)}
                className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:right-8">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 md:p-5">
                  <p className="text-white font-headline font-extrabold text-lg md:text-xl">{a.docs_box_title}</p>
                  <p className="text-white/80 text-[10px] md:text-xs mt-1">{a.docs_box_sub}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between py-2">
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-4">{a.docs_badge}</span>
                <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-primary mb-4 leading-tight">
                  {a.docs_title.split(' ').slice(0,-2).join(' ')} <span className="text-[#03caff]">{a.docs_title.split(' ').slice(-2).join(' ')}</span>
                </h2>
              </div>
              <div className="space-y-3 mt-auto">
                {a.docs.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 md:p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white flex-shrink-0 shadow-inner shadow-white/20">
                      <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    </div>
                    <p className="font-semibold text-primary text-xs md:text-sm">{item.doc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Steps */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">{a.steps_title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {a.steps.map((step, i) => (
              <div key={i} className="flex flex-col rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 bg-surface hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
                <div className="aspect-[4/3] relative bg-slate-100">
                  <EditableImage src={get(`adm_step_img_${i}`, `/images/step-${i+1}.jpg`)} alt={step.t} onSave={v => saveKey(`adm_step_img_${i}`, v)}
                    className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-[#03caff] text-white font-headline font-extrabold text-4xl px-3 py-1 rounded-xl shadow-lg shadow-[#03caff]/30">{i+1}</span>
                  </div>
                </div>
                <div className="p-7 flex-1">
                  <h3 className="font-headline font-extrabold text-xl text-primary mb-3">{step.t}</h3>
                  <p className="text-on-surface-muted text-sm leading-relaxed">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing + Finance */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary via-[#041c80] to-secondary">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            <div className="text-white flex flex-col justify-center py-2 h-full">
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#03caff] border border-[#03caff]/30 rounded-full uppercase mb-6">{a.pricing_badge}</span>
                <h2 className="font-headline text-3xl md:text-5xl font-extrabold mb-4">{a.pricing_title}</h2>
              </div>
              <div className="space-y-4 mb-8">
                <div className="p-6 md:p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl">
                  <EditableText value={get('adm_price_label', a.fee_title)} onSave={v => saveKey('adm_price_label', v)} as="p" className="text-white/70 text-xs font-bold uppercase tracking-widest mb-2">
                    {get('adm_price_label', a.fee_title)}
                  </EditableText>
                  <EditableText value={get('adm_price_val', a.fee)} onSave={v => saveKey('adm_price_val', v)} as="p" className="text-3xl md:text-5xl font-headline font-extrabold text-white">
                    {get('adm_price_val', a.fee)}
                  </EditableText>
                </div>
                <div className="p-6 md:p-8 bg-[#03caff]/20 border border-[#03caff]/30 rounded-3xl shadow-lg">
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-2">{a.discount_label}</p>
                  <p className="text-3xl md:text-5xl font-headline font-extrabold text-[#03caff]">{a.discount_price}</p>
                </div>
              </div>
              <div className="p-5 bg-white/10 rounded-2xl">
                <p className="text-white/80 text-sm leading-relaxed">
                  <strong className="text-white">{a.extra_title}</strong> {a.extra_desc}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/10">
                <a href="tel:+998556020055" className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl hover:scale-105 transition-transform w-max">
                  <span className="material-symbols-outlined">phone</span>
                  +998 55 602 00 55
                </a>
              </div>
            </div>
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl h-full flex flex-col justify-center">
              <h3 className="font-headline font-extrabold text-primary text-2xl md:text-3xl mb-8">{a.finance_title}</h3>
              <div className="space-y-6">
                {a.finance_items.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">{item.icon}</span>
                        <span className="text-sm font-semibold text-primary">{item.label}</span>
                      </div>
                      <span className="font-bold text-[#03caff]">{item.pct}%</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-[#03caff] rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free supplies + Dress Code */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10 items-stretch">

            {/* Free supplies */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full group/card">
              <div className="aspect-[16/10] relative bg-slate-100 overflow-hidden">
                <EditableImage src={get('adm_supplies_img', '/images/supplies.jpg')} alt={a.supplies_title} onSave={v => saveKey('adm_supplies_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-1 drop-shadow-sm">{a.supplies_badge}</p>
                  <h3 className="text-white font-headline font-extrabold text-2xl drop-shadow-md">{a.supplies_title}</h3>
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col bg-white">
                <p className="text-on-surface-muted leading-relaxed text-sm md:text-base mb-6">{a.supplies_desc}</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {a.supplies_items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-[#03caff]/5 border border-[#03caff]/15 rounded-xl">
                      <span className="material-symbols-outlined text-[#03caff] text-base">check_circle</span>
                      <span className="text-primary font-semibold text-xs">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-[#062bad]/5 border-l-4 border-[#062bad] rounded-r-2xl mt-auto">
                  <p className="text-[#062bad] font-bold text-xs md:text-sm leading-relaxed italic">{a.supplies_quote}</p>
                </div>
              </div>
            </div>

            {/* Dress code */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full group/card">
              <div className="aspect-[16/10] relative bg-slate-100 overflow-hidden">
                <EditableImage src={get('adm_uniform_img', '/images/uniform.jpg')} alt={a.uniform_title} onSave={v => saveKey('adm_uniform_img', v)}
                  className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-1 drop-shadow-sm">{a.uniform_badge}</p>
                  <h3 className="text-white font-headline font-extrabold text-2xl drop-shadow-md">{a.uniform_title}</h3>
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col bg-white">
                <p className="text-on-surface-muted leading-relaxed text-sm md:text-base mb-6">{a.uniform_desc}</p>
                <div className="space-y-2.5 flex-1">
                  {a.uniform_rules.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3.5 bg-slate-50 hover:bg-white border border-slate-100 hover:border-[#062bad]/20 rounded-2xl transition-colors">
                      <span className="material-symbols-outlined text-[#062bad] text-lg shrink-0">checkroom</span>
                      <p className="text-primary font-bold text-xs md:text-sm leading-snug">{item}</p>
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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            <div className="py-2">
              <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-6">{a.prohib_badge}</span>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-6">{a.prohib_title}</h2>
              <p className="text-on-surface-muted text-lg leading-relaxed mb-8">{a.prohib_desc}</p>
              <div className="space-y-3">
                {a.prohibitions.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-[#03caff]/30 hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-red-500 text-xl">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-sm mb-0.5">{item.title}</h4>
                      <p className="text-on-surface-muted text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-full min-h-[400px] rounded-[2.5rem] overflow-hidden shadow-xl group bg-slate-100 flex flex-col justify-end">
              <EditableImage src={get('adm_prohib_img', '/images/school-rules.jpg')} alt={a.prohib_title} onSave={v => saveKey('adm_prohib_img', v)}
                className="w-full h-full absolute inset-0" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041c80]/90 via-[#041c80]/20 to-transparent pointer-events-none opacity-90" />
              <div className="relative z-10 w-full p-6 md:p-8 mt-auto">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 md:p-6 shadow-2xl">
                  <p className="text-white font-headline font-extrabold text-xl md:text-2xl drop-shadow-md">{a.prohib_safe_title}</p>
                  <p className="text-white/80 text-sm mt-2 max-w-sm">{a.prohib_safe_desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-r from-primary via-[#041c80] to-secondary py-16 md:py-24 px-6 md:px-16 text-center shadow-2xl">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-primary/40 mix-blend-multiply z-10" />
              <img className="w-full h-full object-cover scale-110 opacity-[0.15] mix-blend-overlay" src="/maktab.webp" alt="" />
            </div>
            <div className="relative z-10">
              <div>
                <EditableText value={get('adm_cta_title', a.cta_title)} onSave={v => saveKey('adm_cta_title', v)} as="h2"
                  className="font-headline text-4xl md:text-6xl font-extrabold text-white tracking-[-0.03em] leading-tight mb-6">
                  {get('adm_cta_title', a.cta_title)}
                </EditableText>
                <EditableText value={get('adm_cta_desc', a.cta_desc)} onSave={v => saveKey('adm_cta_desc', v)} as="p" multiline
                  className="text-white/80 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
                  {get('adm_cta_desc', a.cta_desc)}
                </EditableText>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={openEnrollModal} className="bg-white text-primary hover:bg-slate-50 transition-colors px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl">
                    {t.cta.primary}
                  </button>
                  <a href="tel:+998556020055" className="bg-white/10 border border-white/30 backdrop-blur-lg text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-primary transition-all flex items-center gap-2 justify-center">
                    <span className="material-symbols-outlined text-lg">phone</span>
                    +998 55 602 00 55
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
