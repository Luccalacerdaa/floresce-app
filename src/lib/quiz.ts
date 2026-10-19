// Quiz gamificado: 5 fases, sementes por resposta e o "estilo de brincar" no fim.
// IMPORTANTE: não é instrumento de triagem nem diagnóstico. Revisar com a fono parceira.

export type PillarKey = "atencao" | "imitacao" | "comunicacao" | "brincar" | "rotinas";

export const PILLARS: Record<PillarKey, { label: string; short: string; about: string }> = {
  atencao: {
    label: "Atenção compartilhada",
    short: "Atenção",
    about: "Olhar junto, apontar e dividir o interesse com você — a base da linguagem.",
  },
  imitacao: {
    label: "Imitação",
    short: "Imitação",
    about: "Copiar gestos e sons é como a criança aprende palavras novas.",
  },
  comunicacao: {
    label: "Comunicação",
    short: "Comunicação",
    about: "Gestos, sons e palavras para pedir, mostrar e conversar.",
  },
  brincar: {
    label: "Brincar junto",
    short: "Brincar",
    about: "Brincar com você por mais tempo abre espaço para trocas e palavras.",
  },
  rotinas: {
    label: "Rotinas e regulação",
    short: "Rotinas",
    about: "Lidar com mudanças e se acalmar deixa a criança disponível para aprender.",
  },
};

export const SEEDS_PER_ANSWER = 10;
export const SEEDS_PER_CHAPTER = 50;

export type Chapter = { title: string; emoji: string; bg: string; fact: string };

export const CHAPTERS: Chapter[] = [
  {
    title: "Quem é a sementinha",
    emoji: "🌱",
    bg: "bg-sage-soft",
    fact: "São 5 fases rapidinhas. A cada resposta você ganha sementes para o jardim.",
  },
  {
    title: "Conversa",
    emoji: "💬",
    bg: "bg-sky-soft",
    fact: "Antes das palavras vêm os gestos: apontar, mostrar e dar tchau são a ponte para a fala.",
  },
  {
    title: "Olhar junto",
    emoji: "👀",
    bg: "bg-butter/40",
    fact: "Olhar para um objeto e depois para você — a \"atenção compartilhada\" — é uma das bases da linguagem.",
  },
  {
    title: "Hora de brincar",
    emoji: "🧸",
    bg: "bg-clay-soft/70",
    fact: "Crianças aprendem palavras com mais facilidade quando o adulto fala sobre aquilo que já chamou a atenção delas.",
  },
  {
    title: "A sua rotina",
    emoji: "🏡",
    bg: "bg-lavender/30",
    fact: "Banho, comida e sono se repetem todo dia — e por isso são ótimos momentos para treinar as mesmas palavras.",
  },
];

type Option = {
  id: string;
  label: string;
  emoji: string;
  score?: Partial<Record<PillarKey, number>>;
};

type Base = { id: string; chapter: number; title: string; subtitle?: string };

export type Step =
  | (Base & { kind: "text"; placeholder: string })
  | (Base & { kind: "single"; options: Option[] })
  | (Base & { kind: "multi"; options: Option[] });

export type Answers = Record<string, string | string[]>;

export const AGE_OPTIONS = ["12a18m", "18ma2a", "2a3a", "3a4a", "4a6a", "6a8a", "8a12a", "12a17a"] as const;
const WORD_LEVELS = ["nenhuma", "1a10", "10a50", "duas", "frases", "complexas"] as const;
// Nível de palavras esperado (aproximado) para cada faixa de idade, usado só para não
// penalizar os menores no perfil.
const EXPECTED_WORD_LEVEL = [1, 2, 3, 4, 4, 5, 5, 5];

export const STEPS: Step[] = [
  // Fase 1 — Quem é a sementinha
  {
    kind: "text",
    chapter: 0,
    id: "nome",
    title: "Como seu filho ou filha se chama?",
    subtitle: "Só o primeiro nome ou apelido.",
    placeholder: "Ex.: Theo",
  },
  {
    kind: "single",
    chapter: 0,
    id: "idade",
    title: "Qual a idade de {nome}?",
    options: [
      { id: "12a18m", label: "1 a 1 ano e meio", emoji: "🍼" },
      { id: "18ma2a", label: "1 ano e meio a 2", emoji: "👣" },
      { id: "2a3a", label: "2 a 3 anos", emoji: "🧸" },
      { id: "3a4a", label: "3 a 4 anos", emoji: "🎈" },
      { id: "4a6a", label: "4 a 6 anos", emoji: "🚲" },
      { id: "6a8a", label: "6 a 8 anos", emoji: "📚" },
      { id: "8a12a", label: "8 a 12 anos", emoji: "🎒" },
      { id: "12a17a", label: "12 a 17 anos", emoji: "🌟" },
    ],
  },
  {
    kind: "single",
    chapter: 0,
    id: "responsavel",
    title: "E quem está jogando com a gente?",
    options: [
      { id: "mae", label: "Mãe", emoji: "👩" },
      { id: "pai", label: "Pai", emoji: "👨" },
      { id: "avos", label: "Avó ou avô", emoji: "👵" },
      { id: "outro", label: "Outro cuidador", emoji: "🤗" },
    ],
  },

  // Fase 2 — Conversa
  {
    kind: "single",
    chapter: 1,
    id: "palavras",
    title: "Quantas palavras {nome} usa hoje?",
    subtitle: "Vale palavra incompleta, como \"aga\" para água.",
    options: [
      { id: "nenhuma", label: "Nenhuma ainda", emoji: "🤫" },
      { id: "1a10", label: "De 1 a 10", emoji: "🌱" },
      { id: "10a50", label: "De 10 a 50", emoji: "🌿" },
      { id: "duas", label: "Junta duas palavras", emoji: "🔗" },
      { id: "frases", label: "Fala frases", emoji: "💬" },
      { id: "complexas", label: "Frases complexas", emoji: "📝" },
    ],
  },
  {
    kind: "multi",
    chapter: 1,
    id: "pedir",
    title: "Quando quer alguma coisa, como {nome} pede?",
    subtitle: "Pode marcar mais de uma.",
    options: [
      { id: "chora", label: "Chora ou grita", emoji: "😭", score: { comunicacao: 0.1 } },
      { id: "mao", label: "Me leva pela mão", emoji: "🤝", score: { comunicacao: 0.3 } },
      { id: "aponta", label: "Aponta", emoji: "👉", score: { comunicacao: 0.55, atencao: 0.6 } },
      { id: "gestos", label: "Faz gestos", emoji: "👋", score: { comunicacao: 0.65 } },
      { id: "fala", label: "Fala", emoji: "🗣️", score: { comunicacao: 1 } },
    ],
  },
  {
    kind: "single",
    chapter: 1,
    id: "imitar",
    title: "{nome} imita gestos ou sons?",
    subtitle: "Dar tchau, bater palmas, fazer barulho de bicho…",
    options: [
      { id: "nao", label: "Ainda não", emoji: "🌰", score: { imitacao: 0.15 } },
      { id: "asvezes", label: "Às vezes", emoji: "🌱", score: { imitacao: 0.55 } },
      { id: "sim", label: "Com frequência", emoji: "🌻", score: { imitacao: 1 } },
    ],
  },

  // Fase 3 — Olhar junto
  {
    kind: "single",
    chapter: 2,
    id: "apontar",
    title: "{nome} aponta para te mostrar algo interessante?",
    subtitle: "Um avião no céu, um cachorro na rua…",
    options: [
      { id: "nao", label: "Ainda não", emoji: "🌰", score: { atencao: 0.15 } },
      { id: "asvezes", label: "Às vezes", emoji: "🌱", score: { atencao: 0.55 } },
      { id: "sim", label: "Com frequência", emoji: "🌻", score: { atencao: 1 } },
    ],
  },
  {
    kind: "single",
    chapter: 2,
    id: "chamar",
    title: "Quando você chama pelo nome, {nome}…",
    options: [
      { id: "raramente", label: "Raramente olha", emoji: "🙈", score: { atencao: 0.15 } },
      { id: "asvezes", label: "Às vezes olha", emoji: "🙂", score: { atencao: 0.55 } },
      { id: "sim", label: "Quase sempre olha", emoji: "😃", score: { atencao: 1 } },
    ],
  },
  {
    kind: "single",
    chapter: 2,
    id: "olhar",
    title: "Brincando, {nome} olha para você para dividir a diversão?",
    options: [
      { id: "raramente", label: "Raramente", emoji: "🌰", score: { atencao: 0.15, brincar: 0.2 } },
      { id: "asvezes", label: "Às vezes", emoji: "🌱", score: { atencao: 0.55, brincar: 0.55 } },
      { id: "sim", label: "Com frequência", emoji: "🌻", score: { atencao: 1, brincar: 1 } },
    ],
  },

  // Fase 4 — Hora de brincar
  {
    kind: "single",
    chapter: 3,
    id: "brinquedos",
    title: "Qual destes parece mais com {nome} brincando?",
    options: [
      { id: "repete", label: "Enfileira, gira ou repete o mesmo movimento", emoji: "🧩", score: { brincar: 0.25 } },
      { id: "troca", label: "Explora rápido e troca toda hora", emoji: "🧭", score: { brincar: 0.4 } },
      { id: "funcional", label: "Usa como \"de verdade\": o carrinho anda", emoji: "🔧", score: { brincar: 0.75 } },
      { id: "faz-de-conta", label: "Faz de conta: dá comida à boneca", emoji: "📖", score: { brincar: 1 } },
    ],
  },
  {
    kind: "single",
    chapter: 3,
    id: "junto",
    title: "Quanto tempo {nome} brinca junto com você na mesma brincadeira?",
    options: [
      { id: "menos1", label: "Menos de 1 minuto", emoji: "⚡", score: { brincar: 0.15 } },
      { id: "1a5", label: "De 1 a 5 minutos", emoji: "⏳", score: { brincar: 0.55 } },
      { id: "mais5", label: "Mais de 5 minutos", emoji: "🎠", score: { brincar: 1 } },
    ],
  },
  {
    kind: "single",
    chapter: 3,
    id: "mudancas",
    title: "Hora de parar de brincar! Como {nome} reage?",
    subtitle: "Ou de sair de casa, trocar de atividade…",
    options: [
      { id: "crises", label: "Crises fortes quase sempre", emoji: "🌪️", score: { rotinas: 0.15 } },
      { id: "chateia", label: "Fica chateado(a), mas se acalma", emoji: "🌦️", score: { rotinas: 0.55 } },
      { id: "bem", label: "Aceita bem", emoji: "☀️", score: { rotinas: 1 } },
    ],
  },
  {
    kind: "single",
    chapter: 3,
    id: "regressao",
    title: "{nome} parou de usar palavras ou habilidades que já tinha?",
    options: [
      { id: "sim", label: "Sim", emoji: "⚠️" },
      { id: "incerto", label: "Não tenho certeza", emoji: "🤔" },
      { id: "nao", label: "Não", emoji: "👍" },
    ],
  },

  // Fase 5 — A sua rotina
  {
    kind: "single",
    chapter: 4,
    id: "tela",
    title: "Em média, quanto tempo de tela por dia?",
    subtitle: "Sem julgamento — é só para o plano caber na sua rotina.",
    options: [
      { id: "menos1", label: "Menos de 1 hora", emoji: "📵" },
      { id: "1a3", label: "De 1 a 3 horas", emoji: "📱" },
      { id: "mais3", label: "Mais de 3 horas", emoji: "📺" },
    ],
  },
  {
    kind: "single",
    chapter: 4,
    id: "avaliacao",
    title: "{nome} já passou por avaliação?",
    options: [
      { id: "nao", label: "Ainda não", emoji: "🔍" },
      { id: "fila", label: "Em investigação ou na fila", emoji: "⏳" },
      { id: "tea", label: "Diagnóstico de autismo (TEA)", emoji: "🧩" },
      { id: "atraso", label: "Diagnóstico de atraso de fala", emoji: "🗣️" },
      { id: "outro", label: "Outro", emoji: "📋" },
    ],
  },
  {
    kind: "multi",
    chapter: 4,
    id: "terapias",
    title: "Faz alguma terapia hoje?",
    subtitle: "Pode marcar mais de uma.",
    options: [
      { id: "nenhuma", label: "Nenhuma", emoji: "➖" },
      { id: "fono", label: "Fono", emoji: "🗣️" },
      { id: "to", label: "Terapia ocupacional", emoji: "🖐️" },
      { id: "psico", label: "Psicologia / ABA", emoji: "🧠" },
      { id: "outra", label: "Outra", emoji: "➕" },
    ],
  },
  {
    kind: "single",
    chapter: 4,
    id: "preocupacao",
    title: "O que mais te preocupa agora?",
    options: [
      { id: "fala", label: "A fala", emoji: "💬" },
      { id: "interacao", label: "Brincar junto", emoji: "🤝" },
      { id: "comportamento", label: "Crises", emoji: "🌪️" },
      { id: "tudo", label: "Um pouco de tudo", emoji: "🌈" },
    ],
  },
  {
    kind: "single",
    chapter: 4,
    id: "tempo",
    title: "Quanto tempo você consegue dedicar por dia?",
    options: [
      { id: "5", label: "5 minutos", emoji: "⏱️" },
      { id: "10", label: "10 minutos", emoji: "⏰" },
      { id: "15", label: "15 ou mais", emoji: "🕰️" },
    ],
  },
  {
    kind: "single",
    chapter: 4,
    id: "desafio",
    title: "Última! Qual é o seu maior desafio hoje?",
    options: [
      { id: "oque", label: "Não sei o que fazer em casa", emoji: "🧭" },
      { id: "tempo", label: "Falta de tempo", emoji: "⏳" },
      { id: "certo", label: "Não sei se estou fazendo certo", emoji: "🤔" },
      { id: "cansaco", label: "Cansaço — me sinto sozinha(o)", emoji: "🫂" },
    ],
  },
];

export const QUESTION_COUNT = STEPS.length;

export function childName(answers: Answers) {
  const raw = typeof answers.nome === "string" ? answers.nome.trim() : "";
  if (!raw) return "";
  const first = raw.split(/\s+/)[0];
  return first.charAt(0).toUpperCase() + first.slice(1);
}

export function fill(text: string, answers: Answers) {
  return text.replaceAll("{nome}", childName(answers) || "seu filho");
}

export function isAnswered(step: Step, answers: Answers) {
  const v = answers[step.id];
  return Array.isArray(v) ? v.length > 0 : typeof v === "string" && v.length > 0;
}

export function seedsFor(answers: Answers) {
  const answered = STEPS.filter((s) => isAnswered(s, answers)).length;
  const chapters = CHAPTERS.filter((_, c) => STEPS.filter((s) => s.chapter === c).every((s) => isAnswered(s, answers))).length;
  return answered * SEEDS_PER_ANSWER + chapters * SEEDS_PER_CHAPTER;
}

// Estágios mostrados como plantas: 1 = brotando, 2 = em botão, 3 = florescendo.
export type Stage = "semente" | "broto" | "flor";

export const STAGES: Record<Stage, { label: string; hint: string; growth: 1 | 2 | 3 }> = {
  semente: { label: "Brotando", hint: "Foco do plano", growth: 1 },
  broto: { label: "Em botão", hint: "Em desenvolvimento", growth: 2 },
  flor: { label: "Florescendo", hint: "Ponto forte", growth: 3 },
};

export function stageOf(score: number): Stage {
  if (score < 0.4) return "semente";
  if (score < 0.7) return "broto";
  return "flor";
}

export type PlayStyleKey = "organizador" | "explorador" | "inventor" | "contador";

export const PLAY_STYLES: Record<
  PlayStyleKey,
  { name: string; emoji: string; bg: string; tagline: string; tip: string }
> = {
  organizador: {
    name: "Organizador",
    emoji: "🧩",
    bg: "from-lavender/70 to-sky-soft",
    tagline: "Ama padrões, ordem e repetição.",
    tip: "Use a repetição a seu favor: as mesmas músicas e rituais, todo dia, viram as primeiras palavras.",
  },
  explorador: {
    name: "Explorador",
    emoji: "🧭",
    bg: "from-sky to-sage-soft",
    tagline: "Curioso, quer ver e tocar em tudo.",
    tip: "Brincadeiras curtas e com movimento, seguindo para onde a curiosidade leva — e você narrando.",
  },
  inventor: {
    name: "Inventor",
    emoji: "🔧",
    bg: "from-butter to-clay-soft",
    tagline: "Quer descobrir como as coisas funcionam.",
    tip: "Brinquedos de causa e efeito: apertar, empurrar, encaixar. Faça uma pausa antes do \"efeito\" e espere um pedido.",
  },
  contador: {
    name: "Contador de histórias",
    emoji: "📖",
    bg: "from-pink to-butter/60",
    tagline: "Imaginação a mil no faz de conta.",
    tip: "Entre no faz de conta e dê voz aos bonecos com frases curtas, um pouquinho maiores que as de seu filho.",
  },
};

const STYLE_BY_TOY: Record<string, PlayStyleKey> = {
  repete: "organizador",
  troca: "explorador",
  funcional: "inventor",
  "faz-de-conta": "contador",
};

export type Flag = { id: string; text: string; strong?: boolean };

export type Profile = {
  name: string;
  ageIndex: number;
  ageLabel: string;
  pillars: { key: PillarKey; score: number; stage: Stage }[];
  focus: PillarKey[];
  strengths: PillarKey[];
  style: PlayStyleKey;
  flags: Flag[];
  hasDiagnosis: boolean;
};

function one(answers: Answers, id: string) {
  const v = answers[id];
  return typeof v === "string" ? v : "";
}

export function computeProfile(answers: Answers): Profile {
  const name = childName(answers) || "seu filho";
  const ageIndex = Math.max(0, AGE_OPTIONS.indexOf(one(answers, "idade") as (typeof AGE_OPTIONS)[number]));
  const ageStep = STEPS.find((s) => s.id === "idade");
  const ageLabel =
    ageStep && ageStep.kind === "single"
      ? (ageStep.options.find((o) => o.id === one(answers, "idade"))?.label ?? "")
      : "";

  const sums: Record<PillarKey, number[]> = {
    atencao: [],
    imitacao: [],
    comunicacao: [],
    brincar: [],
    rotinas: [],
  };

  for (const step of STEPS) {
    if (step.kind === "text") continue;
    const chosen = ([] as string[]).concat(answers[step.id] ?? []);
    const best: Partial<Record<PillarKey, number>> = {};
    for (const option of step.options) {
      if (!chosen.includes(option.id) || !option.score) continue;
      for (const [k, v] of Object.entries(option.score) as [PillarKey, number][]) {
        best[k] = Math.max(best[k] ?? 0, v);
      }
    }
    for (const [k, v] of Object.entries(best) as [PillarKey, number][]) sums[k].push(v);
  }

  // Palavras: comparadas ao esperado para a idade, para não penalizar os menores.
  const wordLevel = WORD_LEVELS.indexOf(one(answers, "palavras") as (typeof WORD_LEVELS)[number]);
  if (wordLevel >= 0) {
    const expected = EXPECTED_WORD_LEVEL[ageIndex];
    sums.comunicacao.push(Math.min(1, (wordLevel + 0.5) / (expected + 0.5)));
  }

  const pillars = (Object.keys(sums) as PillarKey[]).map((key) => {
    const values = sums[key];
    const score = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0.5;
    return { key, score, stage: stageOf(score) };
  });

  const sorted = [...pillars].sort((a, b) => a.score - b.score);
  const focus = sorted.slice(0, 2).map((p) => p.key);
  const strengths = sorted
    .slice(-2)
    .reverse()
    .map((p) => p.key);

  const flags: Flag[] = [];
  if (one(answers, "regressao") === "sim") {
    flags.push({
      id: "regressao",
      strong: true,
      text: `Perder palavras ou habilidades que já existiam é um sinal para procurar o pediatra ou neuropediatra o quanto antes.`,
    });
  }
  if (ageIndex >= 1 && wordLevel === 0) {
    flags.push({
      id: "sem-palavras",
      text: `${name} ainda não usa palavras. A partir de 1 ano e meio, vale conversar com o pediatra ou com uma fonoaudióloga.`,
    });
  } else if (ageIndex >= 2 && wordLevel <= 1) {
    flags.push({
      id: "poucas-palavras",
      text: `Para a idade de ${name}, costuma-se esperar mais palavras e as primeiras combinações. Uma avaliação com fonoaudióloga pode ajudar.`,
    });
  }
  if (ageIndex >= 1 && one(answers, "apontar") === "nao") {
    flags.push({
      id: "apontar",
      text: `Apontar para mostrar coisas costuma aparecer por volta de 1 ano e meio. Vale comentar com o pediatra.`,
    });
  }
  if (one(answers, "chamar") === "raramente") {
    flags.push({
      id: "nome",
      text: `Responder pouco ao próprio nome é algo que vale mencionar ao pediatra.`,
    });
  }

  const hasDiagnosis = ["tea", "atraso"].includes(one(answers, "avaliacao"));
  const style = STYLE_BY_TOY[one(answers, "brinquedos")] ?? "explorador";

  return { name, ageIndex, ageLabel, pillars, focus, strengths, style, flags, hasDiagnosis };
}