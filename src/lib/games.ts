// "Jogos a dois": partidas curtas para a criança jogar JUNTO com o adulto.
// Cada jogo tem uma pausa embutida — o momento em que o adulto espera a criança se comunicar.

import type { PillarKey } from "./quiz";

export type GameSlug = "cade" | "sopra" | "som" | "escolha" | "troca";

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
};

export const GAMES: Game[] = [
  {
    slug: "cade",
    name: "Cadê o Bicho?",
    emoji: "🐶",
    pillar: "atencao",
    bg: "bg-butter/60",
    kind: "jogo",
    desc: "Um bichinho se esconde atrás das moitas. Vocês procuram juntos — e a criança aponta.",
    parentTip: "Pergunte “Cadê?” com cara de surpresa e espere a criança olhar ou apontar antes de tocar.",
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
    parentTip: "Imite o som junto com o app e depois conte até 5 em silêncio. Qualquer som vale!",
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
    parentTip: "Faça “fuuu” primeiro, bem exagerado, e diga “sua vez!”. Revezar a vez é o exercício.",
  },
  {
    slug: "escolha",
    name: "Este ou Aquele?",
    emoji: "🍌",
    pillar: "comunicacao",
    bg: "bg-sage-soft",
    kind: "jogo",
    desc: "Duas coisas na tela. A criança escolhe e o app diz o nome — de novo e de novo.",
    parentTip: "Antes de tocar, diga os dois nomes devagar e espere a criança olhar ou apontar.",
  },
  {
    slug: "troca",
    name: "Hora de Trocar",
    emoji: "🌼",
    pillar: "rotinas",
    bg: "bg-lavender/40",
    kind: "ferramenta",
    desc: "Uma flor que vai se fechando avisa que a brincadeira está acabando. Menos crises nas trocas.",
    parentTip: "Use sempre antes de trocar de atividade: banho, comida, sair de casa. A previsibilidade acalma.",
  },
];

export function gameBySlug(slug: string) {
  return GAMES.find((g) => g.slug === slug);
}

export const SCREEN_LIMIT_MIN = 5;
