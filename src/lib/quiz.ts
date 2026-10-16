// Perguntas do quiz e cálculo do "Perfil de Comunicação".
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

type Option = {
  id: string;
  label: string;
  score?: Partial<Record<PillarKey, number>>;
};

export type Step =
  | { kind: "text"; id: string; title: string; subtitle?: string; placeholder: string }
  | { kind: "single"; id: string; title: string; subtitle?: string; options: Option[] }
  | { kind: "multi"; id: string; title: string; subtitle?: string; options: Option[] }
  | { kind: "info"; id: string; title: string; body: string };

export type Answers = Record<string, string | string[]>;

export const AGE_OPTIONS = ["12a18m", "18ma2a", "2a3a", "3a4a", "4a6a"] as const;
const WORD_LEVELS = ["nenhuma", "1a10", "10a50", "duas", "frases"] as const;
// Nível de palavras esperado (aproximado) para cada faixa de idade, usado só para não
// penalizar os menores no perfil.
const EXPECTED_WORD_LEVEL = [1, 2, 3, 4, 4];

export const STEPS: Step[] = [
  {
    kind: "text",
    id: "nome",
    title: "Como seu filho ou filha se chama?",
    subtitle: "Só o primeiro nome ou apelido. Usamos para personalizar o plano.",
    placeholder: "Ex.: Theo",
  },
  {
    kind: "single",
    id: "idade",
    title: "Qual a idade de {nome}?",
    options: [
      { id: "12a18m", label: "1 ano a 1 ano e meio" },
      { id: "18ma2a", label: "1 ano e meio a 2 anos" },
      { id: "2a3a", label: "2 a 3 anos" },
      { id: "3a4a", label: "3 a 4 anos" },
      { id: "4a6a", label: "4 a 6 anos" },
    ],
  },
  {
    kind: "single",
    id: "responsavel",
    title: "Quem está respondendo?",
    options: [
      { id: "mae", label: "Mãe" },
      { id: "pai", label: "Pai" },
      { id: "avos", label: "Avó ou avô" },
      { id: "outro", label: "Outro cuidador" },
    ],
  },
  {
    kind: "single",
    id: "palavras",
    title: "Quantas palavras {nome} usa hoje?",
    subtitle: "Vale palavra incompleta, como “aga” para água.",
    options: [
      { id: "nenhuma", label: "Nenhuma ainda" },
      { id: "1a10", label: "De 1 a 10 palavras" },
      { id: "10a50", label: "De 10 a 50 palavras" },
      { id: "duas", label: "Junta duas palavras (“quer água”)" },
      { id: "frases", label: "Fala frases" },
    ],
  },
  {
    kind: "multi",
    id: "pedir",
    title: "Quando quer alguma coisa, como {nome} pede?",
    subtitle: "Pode marcar mais de uma.",
    options: [
      { id: "chora", label: "Chora ou grita", score: { comunicacao: 0.1 } },
      { id: "mao", label: "Me leva pela mão até a coisa", score: { comunicacao: 0.3 } },
      { id: "aponta", label: "Aponta", score: { comunicacao: 0.55, atencao: 0.6 } },
      { id: "gestos", label: "Faz gestos ou sinais", score: { comunicacao: 0.65 } },
      { id: "fala", label: "Fala", score: { comunicacao: 1 } },
    ],
  },
  {
    kind: "single",
    id: "apontar",
    title: "{nome} aponta para te mostrar algo interessante?",
    subtitle: "Por exemplo: um avião no céu ou um cachorro na rua.",
    options: [
      { id: "nao", label: "Ainda não", score: { atencao: 0.15 } },
      { id: "asvezes", label: "Às vezes", score: { atencao: 0.55 } },
      { id: "sim", label: "Com frequência", score: { atencao: 1 } },
    ],
  },
  {
    kind: "single",
    id: "chamar",
    title: "Quando você chama pelo nome, {nome}…",
    options: [
      { id: "raramente", label: "Raramente olha", score: { atencao: 0.15 } },
      { id: "asvezes", label: "Às vezes olha", score: { atencao: 0.55 } },
      { id: "sim", label: "Quase sempre olha", score: { atencao: 1 } },
    ],
  },
  {
    kind: "info",
    id: "info-horas",
    title: "Você é a pessoa mais importante desse processo.",
    body: "Uma semana tem 168 horas. Mesmo quem faz terapia passa a imensa maioria delas em casa — no banho, na comida, no chão da sala. Pesquisas sobre intervenção mediada pelos pais mostram que essas horas podem fazer muita diferença.",
  },
  {
    kind: "single",
    id: "olhar",
    title: "Brincando, {nome} olha para você para dividir a diversão?",
    options: [
      { id: "raramente", label: "Raramente", score: { atencao: 0.15, brincar: 0.2 } },
      { id: "asvezes", label: "Às vezes", score: { atencao: 0.55, brincar: 0.55 } },
      { id: "sim", label: "Com frequência", score: { atencao: 1, brincar: 1 } },
    ],
  },
  {
    kind: "single",
    id: "imitar",
    title: "{nome} imita gestos ou sons?",
    subtitle: "Dar tchau, bater palmas, fazer barulho de bicho…",
    options: [
      { id: "nao", label: "Ainda não", score: { imitacao: 0.15 } },
      { id: "asvezes", label: "Às vezes", score: { imitacao: 0.55 } },
      { id: "sim", label: "Com frequência", score: { imitacao: 1 } },
    ],
  },
  {
    kind: "single",
    id: "brinquedos",
    title: "Como {nome} costuma brincar com os brinquedos?",
    options: [
      { id: "repete", label: "Enfileira, gira ou repete o mesmo movimento", score: { brincar: 0.25 } },
      { id: "troca", label: "Explora rápido e troca toda hora", score: { brincar: 0.4 } },
      { id: "funcional", label: "Usa como “de verdade” (o carrinho anda)", score: { brincar: 0.75 } },
      { id: "faz-de-conta", label: "Faz de conta (dá comida à boneca)", score: { brincar: 1 } },
    ],
  },
  {
    kind: "single",
    id: "junto",
    title: "Por quanto tempo {nome} brinca junto com você na mesma brincadeira?",
    options: [
      { id: "menos1", label: "Menos de 1 minuto", score: { brincar: 0.15 } },
      { id: "1a5", label: "De 1 a 5 minutos", score: { brincar: 0.55 } },
      { id: "mais5", label: "Mais de 5 minutos", score: { brincar: 1 } },
    ],
  },
  {
    kind: "single",
    id: "mudancas",
    title: "Como {nome} lida com mudanças?",
    subtitle: "Parar de brincar, sair de casa, trocar de atividade.",
    options: [
      { id: "crises", label: "Crises fortes quase sempre", score: { rotinas: 0.15 } },
      { id: "chateia", label: "Fica chateado(a), mas se acalma", score: { rotinas: 0.55 } },
      { id: "bem", label: "Aceita bem", score: { rotinas: 1 } },
    ],
  },
  {
    kind: "single",
    id: "regressao",
    title: "{nome} parou de usar palavras ou habilidades que já tinha?",
    options: [
      { id: "sim", label: "Sim" },
      { id: "incerto", label: "Não tenho certeza" },
      { id: "nao", label: "Não" },
    ],
  },
  {
    kind: "single",
    id: "tela",
    title: "Em média, quanto tempo de tela por dia?",
    subtitle: "Sem julgamento — é só para montar um plano que caiba na rotina.",
    options: [
      { id: "menos1", label: "Menos de 1 hora" },
      { id: "1a3", label: "De 1 a 3 horas" },
      { id: "mais3", label: "Mais de 3 horas" },
    ],
  },
  {
    kind: "single",
    id: "avaliacao",
    title: "{nome} já passou por avaliação?",
    options: [
      { id: "nao", label: "Ainda não" },
      { id: "fila", label: "Em investigação ou na fila" },
      { id: "tea", label: "Tem diagnóstico de autismo (TEA)" },
      { id: "atraso", label: "Tem diagnóstico de atraso de fala ou linguagem" },
      { id: "outro", label: "Outro" },
    ],
  },
  {
    kind: "multi",
    id: "terapias",
    title: "Faz alguma terapia hoje?",
    subtitle: "Pode marcar mais de uma.",
    options: [
      { id: "nenhuma", label: "Nenhuma" },
      { id: "fono", label: "Fonoaudiologia" },
      { id: "to", label: "Terapia ocupacional" },
      { id: "psico", label: "Psicologia / ABA" },
      { id: "outra", label: "Outra" },
    ],
  },
  {
    kind: "single",
    id: "preocupacao",
    title: "O que mais te preocupa agora?",
    options: [
      { id: "fala", label: "A fala" },
      { id: "interacao", label: "A interação e o brincar junto" },
      { id: "comportamento", label: "Crises e comportamento" },
      { id: "tudo", label: "Um pouco de tudo" },
    ],
  },
  {
    kind: "single",
    id: "tempo",
    title: "Quanto tempo você consegue dedicar por dia?",
    options: [
      { id: "5", label: "5 minutos" },
      { id: "10", label: "10 minutos" },
      { id: "15", label: "15 minutos ou mais" },
    ],
  },
  {
    kind: "single",
    id: "desafio",
    title: "E qual é o seu maior desafio hoje?",
    options: [
      { id: "oque", label: "Não sei o que fazer em casa" },
      { id: "tempo", label: "Falta de tempo" },
      { id: "certo", label: "Não sei se estou fazendo certo" },
      { id: "cansaco", label: "Cansaço — me sinto sozinha(o) nisso" },
    ],
  },
];

export const QUESTION_COUNT = STEPS.filter((s) => s.kind !== "info").length;

export function childName(answers: Answers) {
  const raw = typeof answers.nome === "string" ? answers.nome.trim() : "";
  if (!raw) return "";
  const first = raw.split(/\s+/)[0];
  return first.charAt(0).toUpperCase() + first.slice(1);
}

export function fill(text: string, answers: Answers) {
  return text.replaceAll("{nome}", childName(answers) || "seu filho");
}

export type Stage = "semente" | "broto" | "flor";

export const STAGES: Record<Stage, { label: string; hint: string }> = {
  semente: { label: "Semente", hint: "Foco do plano" },
  broto: { label: "Brotando", hint: "Em desenvolvimento" },
  flor: { label: "Florescendo", hint: "Ponto forte" },
};

export function stageOf(score: number): Stage {
  if (score < 0.4) return "semente";
  if (score < 0.7) return "broto";
  return "flor";
}

export type Flag = { id: string; text: string; strong?: boolean };

export type Profile = {
  name: string;
  ageIndex: number;
  ageLabel: string;
  pillars: { key: PillarKey; score: number; stage: Stage }[];
  focus: PillarKey[];
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
    if (step.kind !== "single" && step.kind !== "multi") continue;
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

  const focus = [...pillars]
    .sort((a, b) => a.score - b.score)
    .slice(0, 2)
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
  } else if (ageIndex >= 2 && wordLevel === 1) {
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

  return { name, ageIndex, ageLabel, pillars, focus, flags, hasDiagnosis };
}
