// "Farzandingizga mos maktab" testi — deterministik algoritm.
// Savol matnlari i18n'da (t.quiz.questions, indeks bo'yicha mos keladi);
// bu fayl faqat tuzilma, og'irliklar va hisoblash mantig'ini saqlaydi.

export type DimId = 'UNI' | 'ENG' | 'IND' | 'IT' | 'CARE' | 'COMFORT';
export type StageId = 'boshlangich' | 'orta' | 'yuqori';

// Teng ball bo'lganda ustunlik tartibi — natija har doim bir xil chiqishi uchun
export const DIM_ORDER: DimId[] = ['UNI', 'ENG', 'IND', 'IT', 'CARE', 'COMFORT'];

// Har bir o'lchov natijada qaysi sahifaga yo'naltiradi
export const DIM_LINKS: Record<DimId, string> = {
  UNI: '/talim',
  ENG: '/talim',
  IND: '/maktab-haqida',
  IT: '/talim',
  CARE: '/maktab-haqida',
  COMFORT: '/qabul',
};

export const DIM_ICONS: Record<DimId, string> = {
  UNI: 'school',
  ENG: 'language',
  IND: 'person_search',
  IT: 'computer',
  CARE: 'health_and_safety',
  COMFORT: 'directions_bus',
};

export const STAGE_ICONS: Record<StageId, string> = {
  boshlangich: 'child_care',
  orta: 'auto_stories',
  yuqori: 'school',
};

export interface OptionMeta {
  icon: string; // material symbol nomi
  weights?: Partial<Record<DimId, number>>;
  stage?: StageId; // faqat 1-savol variantlarida
}

export interface QuestionMeta {
  options: OptionMeta[];
}

// Og'irliklar: 3 — kuchli signal, 2 — o'rtacha, 1 — bilvosita.
// Indekslar i18n'dagi t.quiz.questions[i].options[j] bilan mos keladi.
export const QUIZ_META: QuestionMeta[] = [
  // 1. Necha sinf? — bosqichni belgilaydi
  {
    options: [
      { icon: 'child_care', stage: 'boshlangich', weights: { CARE: 1 } },
      { icon: 'auto_stories', stage: 'orta' },
      { icon: 'school', stage: 'yuqori', weights: { UNI: 1 } },
    ],
  },
  // 2. Eng katta tashvish?
  {
    options: [
      { icon: 'language', weights: { ENG: 3, UNI: 1 } },
      { icon: 'person_search', weights: { IND: 3, CARE: 1 } },
      { icon: 'flag', weights: { UNI: 3, ENG: 1 } },
      { icon: 'shield', weights: { CARE: 3 } },
    ],
  },
  // 3. Hozirgi maktabda e'tibor yetarlimi?
  {
    options: [
      { icon: 'visibility_off', weights: { IND: 3 } },
      { icon: 'help', weights: { IND: 2 } },
      { icon: 'thumb_up', weights: { IND: 1 } },
    ],
  },
  // 4. Kelajakda qayerda o'qishi?
  {
    options: [
      { icon: 'account_balance', weights: { UNI: 3 } },
      { icon: 'public', weights: { UNI: 3, ENG: 2 } },
      { icon: 'explore', weights: { UNI: 1, IND: 1 } },
    ],
  },
  // 5. Ingliz tili qanchalik muhim?
  {
    options: [
      { icon: 'local_fire_department', weights: { ENG: 3 } },
      { icon: 'thumb_up', weights: { ENG: 2, IT: 1 } },
      { icon: 'bar_chart', weights: { ENG: 1 } },
    ],
  },
  // 6. Qatnov va sharoit?
  {
    options: [
      { icon: 'directions_bus', weights: { COMFORT: 3 } },
      { icon: 'night_shelter', weights: { COMFORT: 3 } },
      { icon: 'directions_car', weights: { COMFORT: 1 } },
    ],
  },
  // 7. IT ta'limi muhimmi?
  {
    options: [
      { icon: 'computer', weights: { IT: 3 } },
      { icon: 'balance', weights: { IT: 2 } },
      { icon: 'menu_book', weights: { IT: 1, IND: 1 } },
    ],
  },
  // 8. Sog'liq va xavfsizlikda nima muhim?
  {
    options: [
      { icon: 'medical_services', weights: { CARE: 3 } },
      { icon: 'restaurant', weights: { CARE: 2, COMFORT: 1 } },
      { icon: 'security', weights: { CARE: 3 } },
    ],
  },
];

export const QUESTION_COUNT = QUIZ_META.length;

// Har bir o'lchov bo'yicha nazariy maksimal ball (foiz hisoblash uchun)
const MAX_PER_DIM: Record<DimId, number> = (() => {
  const max: Record<DimId, number> = { UNI: 0, ENG: 0, IND: 0, IT: 0, CARE: 0, COMFORT: 0 };
  for (const q of QUIZ_META) {
    const best: Partial<Record<DimId, number>> = {};
    for (const opt of q.options) {
      for (const [dim, w] of Object.entries(opt.weights ?? {})) {
        const d = dim as DimId;
        if ((best[d] ?? 0) < w) best[d] = w;
      }
    }
    for (const [dim, w] of Object.entries(best)) max[dim as DimId] += w;
  }
  return max;
})();

export interface QuizResult {
  stage: StageId;
  scores: Record<DimId, number>;
  // 0–100 oralig'ida, o'lchovning nazariy maksimumiga nisbatan
  percents: Record<DimId, number>;
  // Eng yuqori 3 o'lchov, ball bo'yicha kamayish tartibida
  topDims: DimId[];
}

// answers[i] — i-savolda tanlangan variant indeksi.
// Sof funksiya: bir xil javoblar har doim bir xil natija beradi.
export function computeResult(answers: number[]): QuizResult {
  const scores: Record<DimId, number> = { UNI: 0, ENG: 0, IND: 0, IT: 0, CARE: 0, COMFORT: 0 };
  let stage: StageId = 'orta';

  QUIZ_META.forEach((q, i) => {
    const opt = q.options[answers[i]];
    if (!opt) return;
    if (opt.stage) stage = opt.stage;
    for (const [dim, w] of Object.entries(opt.weights ?? {})) {
      scores[dim as DimId] += w;
    }
  });

  const percents: Record<DimId, number> = { UNI: 0, ENG: 0, IND: 0, IT: 0, CARE: 0, COMFORT: 0 };
  for (const dim of DIM_ORDER) {
    percents[dim] = MAX_PER_DIM[dim] > 0 ? Math.round((scores[dim] / MAX_PER_DIM[dim]) * 100) : 0;
  }

  const topDims = rankDims(scores, percents).slice(0, 3);

  return { stage, scores, percents, topDims };
}

// Saralash mezoni: intensivlik (foiz) > xom ball > qat'iy tartib.
// Diagramma va top-3 bir xil tartibda chiqishi uchun bitta joyda saqlanadi.
export function rankDims(scores: Record<DimId, number>, percents: Record<DimId, number>): DimId[] {
  return [...DIM_ORDER].sort(
    (a, b) =>
      percents[b] - percents[a] ||
      scores[b] - scores[a] ||
      DIM_ORDER.indexOf(a) - DIM_ORDER.indexOf(b)
  );
}
