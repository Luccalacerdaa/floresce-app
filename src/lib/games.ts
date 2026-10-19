// "Jogos a dois": partidas curtas para a criança jogar JUNTO com o adulto.
// Cada jogo tem uma pausa embutida — o momento em que o adulto espera a criança se comunicar.

import type { PillarKey } from "./quiz";

export type GameSlug =
  | "cade"
  | "sopra"
  | "som"
  | "escolha"
  | "troca"
  | "paises"
  | "linguas"
  | "memoria"
  | "emocoes"
  | "sequencia";

export type Game = {
  slug: GameSlug;
  name: string;
  emoji: string;
  pillar: PillarKey;
  bg: string;
  kind: "jogo" | "ferramenta";
  desc: string;
  parentTip: string;
  usesMic?: boolean;
  minAge?: number; // índice mínimo em AGE_OPTIONS (0 = 12a18m)
};

export const GAMES: Game[] = [
  // --- Originais (todas as idades) ---
  {
    slug: "cade",
    name: "Cadê o Bicho?",
    emoji: "🐶",
    pillar: "atencao",
    bg: "bg-butter/60",
    kind: "jogo",
    desc: "Um bichinho se esconde atrás das moitas. Vocês procuram juntos — e a criança aponta.",
    parentTip:
      'Pergunte "Cadê?" com cara de surpresa e espere a criança olhar ou apontar antes de tocar.',
  },
  {
    slug: "som",
    name: "Faz o Som!",
    emoji: "🐮",
    pillar: "imitacao",
    bg: "bg-clay-soft/80",
    kind: "jogo",
    usesMic: true,
    desc: "O bicho faz um som e espera. Qualquer tentativa de imitar faz ele dançar.",
    parentTip:
      "Imite o som junto com o app e depois conte até 5 em silêncio. Qualquer som vale!",
  },
  {
    slug: "sopra",
    name: "Sopra-Sopra",
    emoji: "🌬️",
    pillar: "brincar",
    bg: "bg-sky-soft",
    kind: "jogo",
    usesMic: true,
    desc: "Soprem juntos e vejam as sementes do dente-de-leão voarem. Uma vez cada um!",
    parentTip:
      'Faça "fuuu" primeiro, bem exagerado, e diga "sua vez!". Revezar a vez é o exercício.',
  },
  {
    slug: "escolha",
    name: "Este ou Aquele?",
    emoji: "🍌",
    pillar: "comunicacao",
    bg: "bg-sage-soft",
    kind: "jogo",
    desc: "Duas coisas na tela. A criança escolhe e o app diz o nome — de novo e de novo.",
    parentTip:
      "Antes de tocar, diga os dois nomes devagar e espere a criança olhar ou apontar.",
  },
  {
    slug: "troca",
    name: "Hora de Trocar",
    emoji: "🌼",
    pillar: "rotinas",
    bg: "bg-lavender/40",
    kind: "ferramenta",
    desc: "Uma flor que vai se fechando avisa que a brincadeira está acabando. Menos crises nas trocas.",
    parentTip:
      "Use sempre antes de trocar de atividade: banho, comida, sair de casa. A previsibilidade acalma.",
  },

  // --- Novos jogos ---
  {
    slug: "paises",
    name: "Volta ao Mundo",
    emoji: "🌍",
    pillar: "comunicacao",
    bg: "bg-sky-soft/80",
    kind: "jogo",
    minAge: 3, // 3a4a+
    desc: "Viajem por países! Cada bandeira revela o nome do país e uma palavra na língua deles.",
    parentTip:
      "Diga o nome do país devagar e espere a criança repetir. Celebre cada tentativa!",
  },
  {
    slug: "linguas",
    name: "Como se Diz?",
    emoji: "🗣️",
    pillar: "imitacao",
    bg: "bg-pink/40",
    kind: "jogo",
    usesMic: true,
    minAge: 2, // 2a3a+
    desc: "Palavras do dia a dia em várias línguas. O app fala e a criança tenta imitar.",
    parentTip:
      "Fale junto com o app e comemore qualquer som. O importante é a tentativa, não a perfeição.",
  },
  {
    slug: "memoria",
    name: "Jogo da Memória",
    emoji: "🧠",
    pillar: "atencao",
    bg: "bg-butter/40",
    kind: "jogo",
    minAge: 2, // 2a3a+
    desc: "Vire as cartas e encontre os pares! Treina atenção, memória e vocabulário.",
    parentTip:
      'Nomeie cada figura ao virar: "olha, um gato!". Espere a criança apontar ou repetir.',
  },
  {
    slug: "emocoes",
    name: "Que Emoção É Essa?",
    emoji: "😊",
    pillar: "comunicacao",
    bg: "bg-clay-soft/60",
    kind: "jogo",
    minAge: 1, // 18ma2a+
    desc: "Rostos com emoções diferentes. A criança identifica e o app nomeia o sentimento.",
    parentTip:
      'Faça a mesma expressão com o seu rosto e pergunte "como você está?". Nomear emoções ajuda a regular.',
  },
  {
    slug: "sequencia",
    name: "O Que Vem Depois?",
    emoji: "🔢",
    pillar: "rotinas",
    bg: "bg-sage-soft/80",
    kind: "jogo",
    minAge: 2, // 2a3a+
    desc: "Uma sequência de figuras aparece. A criança escolhe o que vem depois — rotina e lógica.",
    parentTip:
      'Narre a sequência: "primeiro... depois...". Prever o próximo passo acalma e ensina.',
  },
];

export function gameBySlug(slug: string) {
  return GAMES.find((g) => g.slug === slug);
}

/** Filtra jogos disponíveis para a faixa etária (ageIndex do quiz). */
export function gamesForAge(ageIndex: number): Game[] {
  return GAMES.filter((g) => !g.minAge || ageIndex >= g.minAge);
}

export const SCREEN_LIMIT_MIN = 5;