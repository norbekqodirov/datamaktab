import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Download, RotateCcw, Phone, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import {
  NODES,
  START_NODE,
  TOTAL_QUESTIONS,
  nextNodeId,
  DIM_LINKS,
  DIM_ICONS,
  STAGE_ICONS,
  computeResult,
  rankDims,
  type DimId,
} from '../data/quizData';

type Screen = 'intro' | 'quiz' | 'result' | 'thanks';

interface QOption { label: string; tag: string; title: string; text: string }
interface QNode { q: string; sub: string; options: QOption[] }
interface DimContent { title: string; desc: string; facts: string[] }

interface SavedState {
  screen: Screen;
  idx: number;
  path: string[];
  answers: Record<string, number>;
}

const STORAGE_KEY = 'data_quiz_v2';

function loadState(): SavedState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as SavedState;
    if (!Array.isArray(s.path) || typeof s.answers !== 'object') return null;
    return s;
  } catch {
    return null;
  }
}

export default function SchoolMatch() {
  const { t, lang } = useLanguage();
  const q = t.quiz;
  const dateLocale = { uz: 'uz-UZ', ru: 'ru-RU', en: 'en-GB' }[lang];

  // i18n savollar tugun id bo'yicha — generik string indeksatsiya uchun cast
  const questions = q.questions as unknown as Record<string, QNode>;
  const dimStages = q.dimStages as unknown as Record<string, Record<string, DimContent>>;

  const saved = useMemo(loadState, []);
  const [screen, setScreen] = useState<Screen>(saved?.screen === 'thanks' ? 'result' : saved?.screen ?? 'intro');
  const [path, setPath] = useState<string[]>(saved?.path?.length ? saved.path : [START_NODE]);
  const [idx, setIdx] = useState(saved?.idx ?? 0);
  const [answers, setAnswers] = useState<Record<string, number>>(saved?.answers ?? {});

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [timeIdx, setTimeIdx] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ screen, idx, path, answers }));
    } catch { /* xotira to'lgan bo'lsa ham test ishlayveradi */ }
  }, [screen, idx, path, answers]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [screen, idx]);

  const nodeId = path[idx];
  const selectedIdx = answers[nodeId];
  const node = questions[nodeId];

  const pathComplete = path.length === TOTAL_QUESTIONS && path.every(id => answers[id] !== undefined);
  const result = useMemo(
    () => (pathComplete ? computeResult(path, answers) : null),
    [path, answers, pathComplete],
  );

  // Bosqichga mos o'lchov matnini qaytaradi (yo'q bo'lsa — asosiy matn)
  const dimContent = (stage: string, dim: DimId): DimContent =>
    dimStages[stage]?.[dim] ?? (q.dims[dim] as DimContent);

  // Javob tanlash: oldinga ketgan yo'l bekor qilinadi (yangi javob boshqa tarmoqqa olib borishi mumkin)
  const selectOption = (optIdx: number) => {
    setAnswers(prev => {
      const next = { ...prev, [nodeId]: optIdx };
      for (const dropped of path.slice(idx + 1)) delete next[dropped];
      return next;
    });
    setPath(prev => prev.slice(0, idx + 1));
  };

  const goNext = () => {
    if (selectedIdx === undefined) return;
    const nextId = nextNodeId(nodeId, selectedIdx);
    if (nextId === null) {
      setScreen('result');
      return;
    }
    setPath(prev => [...prev.slice(0, idx + 1), nextId]);
    setIdx(idx + 1);
  };

  const goBack = () => {
    if (idx > 0) setIdx(idx - 1);
    else setScreen('intro');
  };

  const startQuiz = () => {
    setPath([START_NODE]);
    setIdx(0);
    setScreen('quiz');
  };

  const restart = () => {
    setAnswers({});
    setPath([START_NODE]);
    setIdx(0);
    setScreen('intro');
    try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* noop */ }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!result) return;
    if (!name.trim()) { alert(q.result.err_name); return; }
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 9) { alert(q.result.err_phone); return; }

    setSubmitting(true);
    const formattedPhone = digits.startsWith('998') ? `+${digits}` : `+998${digits}`;
    const nameParts = name.trim().split(/\s+/);

    const answerLines = path
      .map((id, i) => `${i + 1}) ${questions[id].options[answers[id]].label}`)
      .join(' | ');
    const topTitles = result.topDims.map(d => dimContent(result.stage, d).title).join(', ');

    try {
      const res = await fetch('/api/crm/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: nameParts[0] || name,
          // Durbin lastName bo'sh bo'lishini qabul qilmaydi (422 UNPROCESSABLE_ENTITY)
          lastName: nameParts.slice(1).join(' ') || '-',
          phone: formattedPhone,
          class: questions[START_NODE].options[answers[START_NODE]].label,
          source: 'Sayt testi (mos-maktab)',
          description: `${q.result.form_time}: ${q.result.time_opts[timeIdx]}. ${q.result.stage_label}: ${q.stages[result.stage].tag}. TOP-3: ${topTitles}. ${q.pdf.answers_label}: ${answerLines}`,
        }),
      });
      if (res.ok || res.status === 201) {
        setScreen('thanks');
      } else {
        alert(q.result.form_error);
      }
    } catch {
      alert(q.result.form_error);
    } finally {
      setSubmitting(false);
    }
  };

  // Blok-asosli sahifalash: har bir [data-pdf-block] butunligicha joylashadi,
  // sahifaga sig'masa to'liq keyingi sahifaga o'tadi — matn hech qachon kesilmaydi.
  const downloadPdf = async () => {
    const container = pdfRef.current;
    if (!container || pdfLoading) return;
    setPdfLoading(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas-pro'),
        import('jspdf'),
      ]);
      const canvas = await html2canvas(container, { scale: 2, backgroundColor: '#ffffff', useCORS: true });
      const blocks = Array.from(container.querySelectorAll('[data-pdf-block]')) as HTMLElement[];
      if (!blocks.length) return;

      const pageW = 210;
      const pageH = 297;
      const topMargin = 14;
      const bottomMargin = 14;
      const defaultGap = 5;
      const pxToMm = pageW / container.offsetWidth;
      const cScale = canvas.width / container.offsetWidth;

      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
      let y = 0;
      let first = true;

      for (let i = 0; i < blocks.length; i++) {
        const el = blocks[i];
        const hMm = el.offsetHeight * pxToMm;

        // sarlavha bloklari keyingi blok bilan birga ko'chadi — yetim sarlavha qolmasin
        let needed = hMm;
        if (el.dataset.keepNext !== undefined && blocks[i + 1]) {
          needed += defaultGap + blocks[i + 1].offsetHeight * pxToMm;
        }
        if (!first && y + needed > pageH - bottomMargin) {
          pdf.addPage();
          y = topMargin;
        }

        const srcY = el.offsetTop * cScale;
        const srcH = Math.max(1, Math.round(el.offsetHeight * cScale));
        const slice = document.createElement('canvas');
        slice.width = canvas.width;
        slice.height = srcH;
        const ctx = slice.getContext('2d');
        if (!ctx) continue;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, slice.width, slice.height);
        ctx.drawImage(canvas, 0, srcY, canvas.width, srcH, 0, 0, canvas.width, srcH);
        pdf.addImage(slice.toDataURL('image/jpeg', 0.92), 'JPEG', 0, y, pageW, hMm);

        const gap = el.dataset.gapAfter !== undefined ? Number(el.dataset.gapAfter) : defaultGap;
        y += hMm + gap;
        first = false;
      }

      // sahifa raqamlari
      const total = pdf.getNumberOfPages();
      if (total > 1) {
        for (let p = 1; p <= total; p++) {
          pdf.setPage(p);
          pdf.setFontSize(8);
          pdf.setTextColor(148, 163, 184);
          pdf.text(`${p} / ${total}`, pageW / 2, pageH - 6, { align: 'center' });
        }
      }

      pdf.save(`${q.pdf.file_name}-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (err) {
      console.error('PDF error:', err);
      alert(q.result.form_error);
    } finally {
      setPdfLoading(false);
    }
  };

  const progress = screen === 'intro' ? 0
    : screen === 'quiz' ? ((idx + (selectedIdx !== undefined ? 1 : 0)) / TOTAL_QUESTIONS) * 100
    : 100;

  const reveal = screen === 'quiz' && selectedIdx !== undefined ? node.options[selectedIdx] : null;

  // diagramma/PDF uchun: faqat shu yo'lda qatnashgan o'lchovlar, ballga ko'ra tartiblangan
  const chartDims = result ? rankDims(result.scores, result.percents).filter(d => result.activeDims.includes(d)) : [];

  return (
    <>
      <SEO url="/mos-maktab" title={q.seo_title} description={q.seo_desc} />
      <div className="relative min-h-screen bg-surface-muted font-body text-on-surface overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-5 md:px-8 pt-28 md:pt-36 pb-20">

          {/* progress */}
          {screen !== 'thanks' && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-primary">
                  {screen === 'quiz' ? `${q.question_label} ${idx + 1} / ${TOTAL_QUESTIONS}` : 'DATA'}
                </span>
                <span className="text-[11px] font-bold text-on-surface-muted">{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full rounded-full editorial-gradient transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {/* ───── INTRO ───── */}
          {screen === 'intro' && (
            <div key="intro" className="anim-slide-up glass-card rounded-[2rem] p-7 md:p-12 text-center">
              <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-6">
                {q.badge}
              </span>
              <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-primary tracking-tight leading-tight mb-5">
                {q.intro_title}
              </h1>
              <p className="text-on-surface-muted max-w-xl mx-auto leading-relaxed mb-8">{q.intro_desc}</p>
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-8">
                {q.intro_stats.map((s, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                    <p className="font-headline font-extrabold text-xl md:text-2xl text-primary">{s.val}</p>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-on-surface-muted mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <button onClick={startQuiz} className="btn-primary w-full sm:w-auto px-12 py-4 text-sm uppercase tracking-widest inline-flex items-center justify-center gap-2">
                {q.start} <ArrowRight size={16} />
              </button>
              <p className="flex items-center justify-center gap-2 text-xs text-on-surface-muted mt-6">
                <Download size={13} /> {q.intro_note}
              </p>
            </div>
          )}

          {/* ───── QUIZ ───── */}
          {screen === 'quiz' && node && (
            <div key={`q-${nodeId}`} className="anim-slide-up">
              <div className="glass-card rounded-[2rem] p-6 md:p-10">
                <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-primary leading-snug mb-2">
                  {node.q}
                </h2>
                {node.sub
                  ? <p className="text-on-surface-muted text-sm mb-6">{node.sub}</p>
                  : <div className="mb-6" />}

                <div className="space-y-3">
                  {node.options.map((opt, i) => {
                    const sel = selectedIdx === i;
                    return (
                      <button
                        key={i}
                        onClick={() => selectOption(i)}
                        className={`w-full flex items-center gap-4 text-left rounded-2xl border-2 px-4 py-4 md:px-5 transition-all duration-200 ${
                          sel ? 'border-primary bg-primary/5 shadow-md'
                              : 'border-slate-200 bg-white hover:border-secondary hover:-translate-y-0.5 hover:shadow-md'
                        }`}
                      >
                        <span className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                          sel ? 'editorial-gradient text-white' : 'bg-surface-muted text-primary'
                        }`}>
                          <span className="material-symbols-outlined text-xl">{NODES[nodeId].options[i].icon}</span>
                        </span>
                        <span className="font-semibold text-sm md:text-base text-on-surface flex-1">{opt.label}</span>
                        {sel && <CheckCircle2 size={20} className="text-primary flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* reveal — tanlangan javobga aynan mos DATA javobi */}
                {reveal && (
                  <div className="mt-5 rounded-2xl bg-gradient-to-br from-primary to-[#041c80] text-white p-5 md:p-6 shadow-xl shadow-primary/20 anim-slide-up relative overflow-hidden">
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-secondary/20 blur-2xl rounded-full pointer-events-none" />
                    <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-secondary-light mb-2">✦ {reveal.tag}</p>
                    <h3 className="font-headline font-extrabold text-lg mb-1.5">{reveal.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{reveal.text}</p>
                  </div>
                )}

                <div className="flex items-center gap-3 mt-7">
                  <button onClick={goBack} className="flex items-center gap-1.5 px-5 py-3.5 rounded-full border border-slate-200 bg-white text-on-surface-muted hover:text-primary hover:border-primary/30 font-bold text-xs uppercase tracking-widest transition-colors">
                    <ArrowLeft size={14} /> {q.back}
                  </button>
                  <button
                    onClick={goNext}
                    disabled={selectedIdx === undefined}
                    className="btn-primary flex-1 py-3.5 text-xs uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none inline-flex items-center justify-center gap-2"
                  >
                    {idx === TOTAL_QUESTIONS - 1 ? q.see_result : q.next} <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ───── RESULT ───── */}
          {screen === 'result' && result && (
            <div key="result" className="anim-slide-up space-y-6">
              <div className="text-center">
                <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-5">
                  ✦ {q.result.badge}
                </span>
                <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-primary tracking-tight leading-tight mb-3">
                  {q.result.title}
                </h1>
                <p className="text-on-surface-muted">{q.result.subtitle}</p>
              </div>

              {/* bosqich kartasi */}
              <div className="rounded-[2rem] bg-gradient-to-br from-primary via-[#041c80] to-[#062bad] text-white p-7 md:p-10 shadow-2xl shadow-primary/30 relative overflow-hidden">
                <div className="absolute -right-16 -top-16 w-64 h-64 bg-secondary/20 blur-3xl rounded-full pointer-events-none" />
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary-light">{STAGE_ICONS[result.stage]}</span>
                  </span>
                  <div>
                    <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-secondary-light">{q.result.stage_label}</p>
                    <p className="font-bold text-sm text-white/80">{q.stages[result.stage].tag}</p>
                  </div>
                </div>
                <h2 className="font-headline font-extrabold text-2xl md:text-3xl mb-2">{q.stages[result.stage].title}</h2>
                <p className="text-white/75 text-sm md:text-base mb-6 max-w-2xl">{q.stages[result.stage].desc}</p>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {q.stages[result.stage].points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                      <CheckCircle2 size={16} className="text-secondary-light flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white/90">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* top-3 yo'nalish — bosqichga mos matnda */}
              <div>
                <h3 className="font-headline font-extrabold text-xl md:text-2xl text-primary text-center mb-5">{q.result.dims_title}</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {result.topDims.map((dim, i) => {
                    const dc = dimContent(result.stage, dim);
                    return (
                      <div key={dim} className="glass-card rounded-3xl p-6 flex flex-col border border-primary/5">
                        <div className="flex items-center justify-between mb-4">
                          <span className="w-12 h-12 rounded-2xl editorial-gradient flex items-center justify-center shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-white text-xl">{DIM_ICONS[dim]}</span>
                          </span>
                          <span className="font-headline font-extrabold text-3xl text-slate-200">{i + 1}</span>
                        </div>
                        <h4 className="font-headline font-extrabold text-primary text-lg leading-snug mb-2">{dc.title}</h4>
                        <p className="text-on-surface-muted text-xs leading-relaxed mb-4">{dc.desc}</p>
                        <ul className="space-y-2 mb-5 flex-1">
                          {dc.facts.map((f, fi) => (
                            <li key={fi} className="flex items-start gap-2 text-xs text-on-surface">
                              <CheckCircle2 size={14} className="text-secondary flex-shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                        <Link to={DIM_LINKS[dim]} className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#062bad] hover:text-secondary transition-colors mt-auto">
                          {q.result.more} <ArrowRight size={13} />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ustuvorliklar diagrammasi — faqat shu yo'lda qatnashgan o'lchovlar */}
              <div className="glass-card rounded-3xl p-6 md:p-8">
                <h3 className="font-headline font-extrabold text-lg text-primary mb-5">{q.result.chart_title}</h3>
                <div className="space-y-4">
                  {chartDims.map(dim => {
                    const isTop = result.topDims.includes(dim);
                    return (
                      <div key={dim}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className={`text-xs font-bold ${isTop ? 'text-primary' : 'text-on-surface-muted'}`}>{dimContent(result.stage, dim).title}</span>
                          <span className={`text-xs font-extrabold ${isTop ? 'text-secondary' : 'text-slate-400'}`}>{result.percents[dim]}%</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-700 ${isTop ? 'editorial-gradient' : 'bg-slate-300'}`} style={{ width: `${result.percents[dim]}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PDF + qayta boshlash */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={downloadPdf} disabled={pdfLoading} className="flex-1 inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-colors disabled:opacity-50">
                  <Download size={16} /> {pdfLoading ? q.result.pdf_loading : q.result.pdf_btn}
                </button>
                <button onClick={restart} className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-slate-200 bg-white text-on-surface-muted hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors">
                  <RotateCcw size={14} /> {q.result.restart}
                </button>
              </div>

              {/* lead forma */}
              <div className="rounded-[2rem] bg-white border border-slate-100 shadow-xl p-7 md:p-10">
                <h3 className="font-headline font-extrabold text-2xl text-primary mb-2">{q.result.form_title}</h3>
                <p className="text-on-surface-muted text-sm leading-relaxed mb-6">{q.result.form_desc}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">{q.result.form_name}</label>
                      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={q.result.form_name_ph} autoComplete="name"
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-slate-50" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">{q.result.form_phone}</label>
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" placeholder="+998 90 123 45 67"
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-slate-50" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">{q.result.form_time}</label>
                    <select value={timeIdx} onChange={e => setTimeIdx(Number(e.target.value))}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-slate-50">
                      {q.result.time_opts.map((opt, i) => <option key={i} value={i}>{opt}</option>)}
                    </select>
                  </div>
                  <button type="submit" disabled={submitting} className="btn-primary w-full py-4 text-sm uppercase tracking-widest disabled:opacity-60">
                    {submitting ? q.result.form_submitting : q.result.form_submit}
                  </button>
                  <p className="flex items-center justify-center gap-1.5 text-[11px] text-on-surface-muted text-center">
                    <Lock size={11} /> {q.result.privacy}
                  </p>
                </form>
              </div>
            </div>
          )}

          {/* ───── THANKS ───── */}
          {screen === 'thanks' && result && (
            <div key="thanks" className="anim-slide-up glass-card rounded-[2rem] p-8 md:p-12 text-center">
              <div className="w-20 h-20 mx-auto bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-primary mb-4">
                {q.thanks.title}, {name.trim().split(/\s+/)[0]}!
              </h1>
              <p className="text-on-surface-muted leading-relaxed max-w-md mx-auto mb-2">
                {q.thanks.desc_before} <b className="text-primary">{q.result.time_opts[timeIdx].split('(')[0].trim()}</b> {q.thanks.desc_after}
              </p>
              <p className="flex items-center justify-center gap-2 font-headline font-bold text-primary mt-4 mb-8">
                <Phone size={16} /> +998 55 602 00 55
              </p>

              <p className="text-xs text-on-surface-muted mb-3">{q.thanks.pdf_hint}</p>
              <button onClick={downloadPdf} disabled={pdfLoading} className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-colors disabled:opacity-50 mb-8">
                <Download size={15} /> {pdfLoading ? q.result.pdf_loading : q.result.pdf_btn}
              </button>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/qabul" className="btn-primary px-8 py-3.5 text-xs uppercase tracking-widest inline-flex items-center justify-center gap-2">
                  {q.thanks.go_admission} <ArrowRight size={14} />
                </Link>
                <Link to="/" className="px-8 py-3.5 rounded-full border border-slate-200 bg-white text-on-surface-muted hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors inline-flex items-center justify-center">
                  {q.thanks.go_home}
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ───── PDF uchun yashirin shablon ─────
            Har bir [data-pdf-block] sahifalashda butun birlik sifatida ko'chadi. */}
        {(screen === 'result' || screen === 'thanks') && result && (
          <div style={{ position: 'fixed', left: '-10000px', top: 0 }} aria-hidden="true">
            <div ref={pdfRef} style={{ position: 'relative', width: 794, background: '#ffffff', fontFamily: "'Inter','Manrope',Arial,sans-serif", color: '#0f172a' }}>

              {/* 1 — sarlavha */}
              <div data-pdf-block="true" data-gap-after="7" style={{ background: 'linear-gradient(120deg,#062bad 0%,#0a3fd6 55%,#03caff 135%)', padding: '28px 40px', color: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 12, background: '#ffffff', color: '#062bad', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 24, fontFamily: "'Manrope',Arial,sans-serif" }}>D</div>
                    <div>
                      <p style={{ margin: 0, fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', opacity: 0.8 }}>{q.pdf.brand}</p>
                      <h1 style={{ margin: '5px 0 0', fontSize: 22, fontWeight: 800, fontFamily: "'Manrope',Arial,sans-serif" }}>{q.pdf.doc_title}</h1>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 10, padding: '8px 16px', textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: 9, textTransform: 'uppercase', letterSpacing: 1.5, opacity: 0.8 }}>{q.pdf.date_label}</p>
                    <p style={{ margin: '3px 0 0', fontWeight: 800, fontSize: 12 }}>{new Date().toLocaleDateString(dateLocale)}</p>
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 40px' }}>
                {/* 2 — bosqich */}
                <div data-pdf-block="true">
                  <p style={{ margin: '0 0 8px', fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: '#062bad' }}>
                    <span style={{ color: '#03caff' }}>■</span>&nbsp; {q.pdf.stage_label}
                  </p>
                  <div style={{ background: 'linear-gradient(135deg,#062bad,#041c80)', borderRadius: 18, padding: '20px 24px', color: '#ffffff' }}>
                    <p style={{ margin: 0, fontSize: 10.5, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: '#4de0ff' }}>{q.stages[result.stage].tag}</p>
                    <h2 style={{ margin: '7px 0 7px', fontSize: 19, fontWeight: 800, fontFamily: "'Manrope',Arial,sans-serif" }}>{q.stages[result.stage].title}</h2>
                    <p style={{ margin: '0 0 14px', fontSize: 11.5, lineHeight: 1.55, opacity: 0.85 }}>{q.stages[result.stage].desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {q.stages[result.stage].points.map((p, i) => (
                        <div key={i} style={{ width: '47%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 10, padding: '8px 12px', fontSize: 10.5, lineHeight: 1.45 }}>
                          <span style={{ color: '#4de0ff', fontWeight: 800 }}>✓</span>&nbsp;&nbsp;{p}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3 — top-3 yo'nalish */}
                <div data-pdf-block="true">
                  <p style={{ margin: '0 0 8px', fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: '#062bad' }}>
                    <span style={{ color: '#03caff' }}>■</span>&nbsp; {q.pdf.dims_label}
                  </p>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
                    {result.topDims.map((dim, i) => {
                      const dc = dimContent(result.stage, dim);
                      return (
                        <div key={dim} style={{ flex: 1, border: '1.5px solid #e2e8f0', borderTop: '4px solid #03caff', borderRadius: 14, padding: '14px 16px', background: '#fbfcfe' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg,#062bad,#03caff)', color: '#ffffff', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
                            <h3 style={{ margin: 0, fontSize: 12.5, fontWeight: 800, color: '#062bad', lineHeight: 1.25, fontFamily: "'Manrope',Arial,sans-serif" }}>{dc.title}</h3>
                          </div>
                          {dc.facts.map((f, fi) => (
                            <p key={fi} style={{ margin: '0 0 5px', fontSize: 9.5, lineHeight: 1.5, color: '#475569' }}>
                              <span style={{ color: '#03caff', fontWeight: 800 }}>✓</span>&nbsp;{f}
                            </p>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4 — diagramma */}
                <div data-pdf-block="true">
                  <p style={{ margin: '0 0 8px', fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: '#062bad' }}>
                    <span style={{ color: '#03caff' }}>■</span>&nbsp; {q.pdf.chart_label}
                  </p>
                  <div style={{ border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '16px 20px' }}>
                    {chartDims.map(dim => {
                      const isTop = result.topDims.includes(dim);
                      return (
                        <div key={dim} style={{ marginBottom: 10 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                            <span style={{ fontSize: 10.5, fontWeight: 700, color: isTop ? '#062bad' : '#64748b' }}>{dimContent(result.stage, dim).title}</span>
                            <span style={{ fontSize: 10.5, fontWeight: 800, color: isTop ? '#03caff' : '#94a3b8' }}>{result.percents[dim]}%</span>
                          </div>
                          <div style={{ height: 8, borderRadius: 99, background: '#f1f5f9', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${result.percents[dim]}%`, borderRadius: 99, background: isTop ? 'linear-gradient(90deg,#062bad,#03caff)' : '#cbd5e1' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 5 — javoblar sarlavhasi */}
                <div data-pdf-block="true" data-keep-next="true" data-gap-after="3">
                  <p style={{ margin: 0, fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: '#062bad' }}>
                    <span style={{ color: '#03caff' }}>■</span>&nbsp; {q.pdf.answers_label}
                  </p>
                </div>
                {path.map((id, i) => (
                  <div key={id} data-pdf-block="true" data-gap-after="2.5" style={{ display: 'flex', gap: 11, alignItems: 'flex-start', border: '1px solid #e2e8f0', borderRadius: 12, padding: '9px 14px', background: i % 2 === 0 ? '#fbfcfe' : '#ffffff' }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#e8edfb', color: '#062bad', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                    <div>
                      <p style={{ margin: 0, fontSize: 9.5, color: '#64748b', lineHeight: 1.4 }}>{questions[id].q}</p>
                      <p style={{ margin: '3px 0 0', fontSize: 11, fontWeight: 700, color: '#062bad', lineHeight: 1.4 }}>{questions[id].options[answers[id]].label}</p>
                    </div>
                  </div>
                ))}

                {/* 6 — footer */}
                <div data-pdf-block="true" style={{ borderTop: '2.5px solid #062bad', paddingTop: 12, paddingBottom: 6, marginTop: 8 }}>
                  <p style={{ margin: 0, fontSize: 10.5, fontWeight: 800, color: '#062bad', textAlign: 'center' }}>{q.pdf.footer}</p>
                  <p style={{ margin: '6px 0 0', fontSize: 8.5, color: '#94a3b8', textAlign: 'center' }}>{q.pdf.note}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
