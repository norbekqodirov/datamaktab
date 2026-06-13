// "Farzandingizga mos maktab" testi — ADAPTIV (tarmoqlanuvchi) algoritm.
//
// Tuzilma: savollar grafi. 1-savol (start) ota-onani 3 tarmoqdan biriga
// yo'naltiradi (boshlang'ich / o'rta / yuqori), tarmoq ichida ham ayrim
// javoblar keyingi savolni o'zgartiradi (option.next).
// Har foydalanuvchi jami 10 ta savolga javob beradi: start + 9 tarmoq savoli.
//
// Savol matnlari i18n'da (t.quiz.questions, tugun id bo'yicha);
// bu fayl faqat tuzilma, og'irliklar va hisoblash mantig'ini saqlaydi.

export type DimId = 'UNI' | 'ENG' | 'ADAPT' | 'OLYMP' | 'IND' | 'IT' | 'CARE' | 'COMFORT';
export type StageId = 'boshlangich' | 'orta' | 'yuqori';

// Teng foiz/ball bo'lganda ustunlik tartibi — natija har doim bir xil chiqishi uchun
export const DIM_ORDER: DimId[] = ['UNI', 'ENG', 'ADAPT', 'OLYMP', 'IND', 'IT', 'CARE', 'COMFORT'];

export const DIM_LINKS: Record<DimId, string> = {
  UNI: '/talim',
  ENG: '/talim',
  ADAPT: '/talim',
  OLYMP: '/maktab-haqida',
  IND: '/maktab-haqida',
  IT: '/talim',
  CARE: '/maktab-haqida',
  COMFORT: '/qabul',
};

export const DIM_ICONS: Record<DimId, string> = {
  UNI: 'school',
  ENG: 'language',
  ADAPT: 'favorite',
  OLYMP: 'emoji_events',
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
  stage?: StageId; // faqat start tugunida
  next?: string; // tugun darajasidagi next'ni bekor qiladi (fork)
}

export interface NodeMeta {
  options: OptionMeta[];
  next?: string; // standart keyingi tugun; yo'q bo'lsa va option.next ham bo'lmasa — test tugaydi
}

export const START_NODE = 'start';
export const TOTAL_QUESTIONS = 10; // start + 9 tarmoq savoli (fork'lar bir-birini almashtiradi)

// Og'irliklar: 3 — kuchli signal, 2 — o'rtacha, 1 — bilvosita.
export const NODES: Record<string, NodeMeta> = {
  // ───────── UMUMIY ─────────
  // start — sof tarmoq selektori: ball bermaydi, faqat bosqichni belgilaydi.
  // (Ball bersa, tanlanmagan variantlar pathMax orqali boshqa tarmoq o'lchovlarini
  //  "active" qilib qo'yardi — masalan boshlang'ichda UNI 0% bo'lib ko'rinardi.)
  start: {
    options: [
      { icon: 'child_care', stage: 'boshlangich', next: 'b1' },
      { icon: 'auto_stories', stage: 'orta', next: 'm1' },
      { icon: 'school', stage: 'yuqori', next: 'y1' },
    ],
  },

  // ───────── BOSHLANG'ICH (maktabgacha / 1–2-sinf) ─────────
  b1: {
    next: 'b2',
    options: [
      { icon: 'psychology', weights: { ADAPT: 3, CARE: 1 } },
      { icon: 'rocket_launch', weights: { ADAPT: 2, IT: 1 } },
      { icon: 'verified', weights: { ADAPT: 1, IND: 1 } },
    ],
  },
  b2: {
    next: 'b3',
    options: [
      { icon: 'edit_note', weights: { IND: 2, ADAPT: 1 } },
      { icon: 'favorite', weights: { ADAPT: 3 } },
      { icon: 'volunteer_activism', weights: { CARE: 3 } },
      { icon: 'language', weights: { ENG: 3 }, next: 'b3x' }, // ingliz tanlandi → chuqur savol
    ],
  },
  b3: {
    next: 'b4',
    options: [
      { icon: 'local_fire_department', weights: { ENG: 3 } },
      { icon: 'menu_book', weights: { ENG: 1, IND: 1 } },
      { icon: 'balance', weights: { ENG: 2, ADAPT: 1 } },
    ],
  },
  b3x: {
    next: 'b4',
    options: [
      { icon: 'record_voice_over', weights: { ENG: 3 } },
      { icon: 'workspace_premium', weights: { ENG: 3 } },
      { icon: 'check_circle', weights: { ENG: 1 } },
    ],
  },
  b4: {
    next: 'b5',
    options: [
      { icon: 'computer', weights: { IT: 3 } },
      { icon: 'smartphone', weights: { IT: 2, CARE: 1 } },
      { icon: 'menu_book', weights: { IT: 1, ADAPT: 1 } },
    ],
  },
  b5: {
    next: 'b6',
    options: [
      { icon: 'group', weights: { IND: 3 } },
      { icon: 'badge', weights: { IND: 2, CARE: 1 } },
      { icon: 'rocket_launch', weights: { IND: 1 } },
    ],
  },
  b6: {
    next: 'b7',
    options: [
      { icon: 'directions_bus', weights: { COMFORT: 3 } },
      { icon: 'schedule', weights: { COMFORT: 2, IT: 1 } },
      { icon: 'sports_soccer', weights: { COMFORT: 2 } },
    ],
  },
  b7: {
    next: 'b8',
    options: [
      { icon: 'restaurant', weights: { CARE: 2, COMFORT: 1 } },
      { icon: 'medical_services', weights: { CARE: 3 } },
      { icon: 'air', weights: { CARE: 2 } },
    ],
  },
  b8: {
    next: 'b9',
    options: [
      { icon: 'security', weights: { CARE: 3 } },
      { icon: 'shield', weights: { CARE: 2 } },
      { icon: 'self_improvement', weights: { ADAPT: 2, CARE: 1 } },
    ],
  },
  b9: {
    options: [
      { icon: 'smartphone', weights: { IND: 2 } },
      { icon: 'forum', weights: { IND: 2, CARE: 1 } },
      { icon: 'done_all', weights: { IND: 3 } },
    ],
  },

  // ───────── O'RTA (3–6-sinf) ─────────
  m1: {
    next: 'm2',
    options: [
      { icon: 'calculate', weights: { IND: 2, OLYMP: 1 } },
      { icon: 'language', weights: { ENG: 3 }, next: 'm2x' }, // ingliz og'riq → chuqur savol
      { icon: 'trending_down', weights: { IND: 2, IT: 1 } },
      { icon: 'person_search', weights: { IND: 3 } },
    ],
  },
  m2: {
    next: 'm3',
    options: [
      { icon: 'local_fire_department', weights: { ENG: 3 } },
      { icon: 'thumb_up', weights: { ENG: 2, IT: 1 } },
      { icon: 'bar_chart', weights: { ENG: 1 } },
    ],
  },
  m2x: {
    next: 'm3',
    options: [
      { icon: 'record_voice_over', weights: { ENG: 3 } },
      { icon: 'workspace_premium', weights: { ENG: 3 } },
      { icon: 'favorite', weights: { ENG: 2, IND: 1 } },
    ],
  },
  m3: {
    next: 'm4',
    options: [
      { icon: 'emoji_events', weights: { OLYMP: 3 } },
      { icon: 'trending_up', weights: { OLYMP: 2, IND: 1 } },
      { icon: 'foundation', weights: { IND: 3 } },
    ],
  },
  m4: {
    next: 'm5',
    options: [
      { icon: 'computer', weights: { IT: 3 } },
      { icon: 'smart_toy', weights: { IT: 3 } },
      { icon: 'balance', weights: { IT: 1 } },
    ],
  },
  m5: {
    next: 'm6',
    options: [
      { icon: 'sports_soccer', weights: { COMFORT: 2, CARE: 1 } },
      { icon: 'extension', weights: { OLYMP: 2 } },
      { icon: 'menu_book', weights: { ENG: 1, IND: 1 } },
    ],
  },
  m6: {
    next: 'm7',
    options: [
      { icon: 'directions_bus', weights: { COMFORT: 3 } },
      { icon: 'night_shelter', weights: { COMFORT: 3 } },
      { icon: 'directions_car', weights: { COMFORT: 1 } },
    ],
  },
  m7: {
    next: 'm8',
    options: [
      { icon: 'medical_services', weights: { CARE: 3 } },
      { icon: 'restaurant', weights: { CARE: 2, COMFORT: 1 } },
      { icon: 'security', weights: { CARE: 3 } },
    ],
  },
  m8: {
    next: 'm9',
    options: [
      { icon: 'smartphone', weights: { CARE: 2, IT: 1 } },
      { icon: 'visibility', weights: { CARE: 1, IND: 1 } },
      { icon: 'check_circle', weights: { IND: 1 } },
    ],
  },
  m9: {
    options: [
      { icon: 'smartphone', weights: { IND: 2 } },
      { icon: 'forum', weights: { IND: 2, CARE: 1 } },
      { icon: 'done_all', weights: { IND: 3 } },
    ],
  },

  // ───────── YUQORI (7–10-sinf) ─────────
  y1: {
    options: [
      { icon: 'account_balance', weights: { UNI: 3 }, next: 'y2a' },
      { icon: 'public', weights: { UNI: 3, ENG: 1 }, next: 'y2b' },
      { icon: 'explore', weights: { UNI: 1, IND: 2 }, next: 'y2c' },
    ],
  },
  y2a: {
    next: 'y3',
    options: [
      { icon: 'rocket_launch', weights: { UNI: 3 } },
      { icon: 'help', weights: { UNI: 2 } },
      { icon: 'lightbulb', weights: { UNI: 2 } },
    ],
  },
  y2b: {
    next: 'y3',
    options: [
      { icon: 'trending_up', weights: { ENG: 2, UNI: 1 } },
      { icon: 'hourglass_empty', weights: { ENG: 3 } },
      { icon: 'workspace_premium', weights: { ENG: 2, UNI: 2 } },
    ],
  },
  y2c: {
    next: 'y3',
    options: [
      { icon: 'computer', weights: { IT: 3 } },
      { icon: 'language', weights: { ENG: 2 } },
      { icon: 'science', weights: { OLYMP: 2, UNI: 1 } },
      { icon: 'psychology', weights: { IND: 2 } },
    ],
  },
  y3: {
    next: 'y4',
    options: [
      { icon: 'visibility_off', weights: { IND: 3 } },
      { icon: 'group', weights: { IND: 2, UNI: 1 } },
      { icon: 'trending_up', weights: { IND: 2 } },
    ],
  },
  y4: {
    next: 'y5',
    options: [
      { icon: 'computer', weights: { IT: 3 } },
      { icon: 'edit_note', weights: { IT: 2, UNI: 1 } },
      { icon: 'school', weights: { UNI: 2 } },
    ],
  },
  y5: {
    next: 'y6',
    options: [
      { icon: 'emoji_events', weights: { OLYMP: 3 } },
      { icon: 'star', weights: { OLYMP: 1, UNI: 1 } },
      { icon: 'workspace_premium', weights: { UNI: 1 } },
    ],
  },
  y6: {
    next: 'y7',
    options: [
      { icon: 'psychology', weights: { CARE: 3 } },
      { icon: 'trending_down', weights: { IND: 2, CARE: 1 } },
      { icon: 'check_circle', weights: { IND: 1 } },
    ],
  },
  y7: {
    next: 'y8',
    options: [
      { icon: 'directions_bus', weights: { COMFORT: 3 } },
      { icon: 'night_shelter', weights: { COMFORT: 3 } },
      { icon: 'directions_car', weights: { COMFORT: 1 } },
    ],
  },
  y8: {
    next: 'y9',
    options: [
      { icon: 'medical_services', weights: { CARE: 3 } },
      { icon: 'restaurant', weights: { CARE: 2, COMFORT: 1 } },
      { icon: 'security', weights: { CARE: 3 } },
    ],
  },
  y9: {
    options: [
      { icon: 'smartphone', weights: { IND: 2 } },
      { icon: 'forum', weights: { IND: 2, CARE: 1 } },
      { icon: 'done_all', weights: { IND: 3 } },
    ],
  },
};

// Tanlangan javobga ko'ra keyingi tugun; null — test tugadi
export function nextNodeId(nodeId: string, optIdx: number): string | null {
  const node = NODES[nodeId];
  if (!node) return null;
  return node.options[optIdx]?.next ?? node.next ?? null;
}

export interface QuizResult {
  stage: StageId;
  scores: Record<DimId, number>;
  // 0–100, bosib o'tilgan yo'ldagi nazariy maksimumga nisbatan
  percents: Record<DimId, number>;
  // Shu yo'lda umuman ball to'plash mumkin bo'lgan o'lchovlar (diagrammada faqat shular)
  activeDims: DimId[];
  topDims: DimId[];
}

const zeroDims = (): Record<DimId, number> =>
  ({ UNI: 0, ENG: 0, ADAPT: 0, OLYMP: 0, IND: 0, IT: 0, CARE: 0, COMFORT: 0 });

// path — bosib o'tilgan tugun id'lari (tartibda), answers — tugun id → variant indeksi.
// Sof funksiya: bir xil yo'l va javoblar har doim bir xil natija beradi.
export function computeResult(path: string[], answers: Record<string, number>): QuizResult {
  const scores = zeroDims();
  const pathMax = zeroDims();
  let stage: StageId = 'orta';

  for (const id of path) {
    const node = NODES[id];
    if (!node) continue;

    // shu tugunda har o'lchov bo'yicha olish mumkin bo'lgan eng katta ball
    const best: Partial<Record<DimId, number>> = {};
    for (const o of node.options) {
      for (const [dim, w] of Object.entries(o.weights ?? {})) {
        const d = dim as DimId;
        if ((best[d] ?? 0) < w) best[d] = w;
      }
    }
    for (const [dim, w] of Object.entries(best)) pathMax[dim as DimId] += w;

    const opt = node.options[answers[id]];
    if (!opt) continue;
    if (opt.stage) stage = opt.stage;
    for (const [dim, w] of Object.entries(opt.weights ?? {})) {
      scores[dim as DimId] += w;
    }
  }

  const percents = zeroDims();
  for (const dim of DIM_ORDER) {
    percents[dim] = pathMax[dim] > 0 ? Math.round((scores[dim] / pathMax[dim]) * 100) : 0;
  }

  const activeDims = DIM_ORDER.filter(d => pathMax[d] > 0);
  const topDims = rankDims(scores, percents).filter(d => activeDims.includes(d)).slice(0, 3);

  return { stage, scores, percents, activeDims, topDims };
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
