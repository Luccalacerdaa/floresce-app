// A trilha de 30 dias: uma missão da vida real por dia, cada uma rega uma planta do jardim.

import type { PillarKey } from "./quiz";

export type TrailDay = {
  day: number;
  week: number;
  pillar: PillarKey;
  title: string;
  emoji: string;
  sticker: string;
};

export const WEEKS = [
  { title: "Olhar junto", emoji: "👀" },
  { title: "Imitar e revezar", emoji: "🪞" },
  { title: "Pedir e escolher", emoji: "👉" },
  { title: "Brincar mais tempo", emoji: "🧸" },
  { title: "Rotinas sem crise", emoji: "🌙" },
];

const PILLAR_CYCLE: PillarKey[] = ["atencao", "imitacao", "comunicacao", "brincar", "rotinas"];

const TITLES: [string, string][] = [
  ["Bolhas com pausa", "🫧"],
  ["Espelho de brincadeira", "🪞"],
  ["Escolha entre dois", "🍌"],
  ["Narrador da brincadeira", "🚗"],
  ["Música da troca", "🎵"],
  ["Cantar e parar", "🎶"],
  ["Hora do banho: partes do corpo", "🛁"],
  ["Esconde-esconde com paninho", "🙈"],
  ["Cesto de tesouros", "🧺"],
  ["Tchau, brinquedo!", "👋"],
  ["Bola pra lá, bola pra cá", "⚽"],
  ["Sons dos bichos", "🐮"],
  ["Mais um pedaço?", "🍎"],
  ["Torre que cai", "🧱"],
  ["Antes e depois", "🗓️"],
  ["Livro de figuras", "📖"],
  ["Palminhas e caretas", "👏"],
  ["Abre e fecha a caixa", "📦"],
  ["Comidinha de faz de conta", "🍲"],
  ["Hora de guardar", "🧸"],
  ["Cadê a luz?", "🔦"],
  ["Imitar o carrinho", "🚙"],
  ["Pedir ajuda", "🤲"],
  ["Cabaninha", "⛺"],
  ["Ritual de dormir", "😴"],
  ["Mostra pra mim", "🖐️"],
  ["Dança e congela", "💃"],
  ["Lanche das escolhas", "🥪"],
  ["Boneco vai passear", "🧸"],
  ["Festa da colheita", "🏆"],
];

const STICKERS = "🐶🐱🐰🦊🐻🐼🐨🐯🦁🐮🐷🐸🐵🐔🐧🐦🐤🦆🦉🐴🦄🐝🐛🦋🐌🐞🐢🐙🐠🐳";

export const TRAIL: TrailDay[] = TITLES.map(([title, emoji], i) => ({
  day: i + 1,
  week: Math.floor(i / 6),
  pillar: PILLAR_CYCLE[i % 5],
  title,
  emoji,
  sticker: [...STICKERS][i],
}));

/** No protótipo, só os 5 primeiros dias têm o roteiro completo. */
export const PLAYABLE_DAYS = 5;
