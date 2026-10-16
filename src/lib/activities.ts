// Brincadeiras de amostra entregues de graça no resultado do quiz.
// Rascunho: precisa da revisão e da assinatura da fonoaudióloga parceira antes de rodar tráfego.

import type { PillarKey } from "./quiz";

export type Activity = {
  title: string;
  minutes: number;
  material: string;
  why: string;
  steps: string[];
  observe: string;
};

export const ACTIVITIES: Record<PillarKey, Activity> = {
  atencao: {
    title: "Bolhas com pausa",
    minutes: 10,
    material: "Um pote de bolhas de sabão",
    why: "A pausa cria um motivo para {nome} olhar para você e pedir — o começo da conversa.",
    steps: [
      "Sente-se de frente para {nome}, na altura dos olhos.",
      "Sopre algumas bolhas e curta junto, com animação.",
      "Pare. Segure o pote perto do seu rosto e espere em silêncio, contando até 5.",
      "Qualquer olhar, som ou gesto vale como pedido: diga “bolha!” e sopre de novo.",
    ],
    observe: "Se {nome} olha para o seu rosto, estende a mão ou faz algum som durante a pausa.",
  },
  imitacao: {
    title: "Espelho de brincadeira",
    minutes: 10,
    material: "Dois brinquedos iguais ou parecidos (dois carrinhos, duas colheres)",
    why: "Quando você imita {nome}, a criança percebe que vocês estão jogando juntos — e passa a imitar você.",
    steps: [
      "Fique de frente para {nome}, cada um com o seu brinquedo.",
      "Imite exatamente o que {nome} faz: se bate o carrinho, você bate o seu.",
      "Depois de algumas rodadas, faça um movimento novo e simples, com um som divertido.",
      "Espere. Se {nome} copiar, comemore com entusiasmo.",
    ],
    observe: "Se {nome} percebe que você está imitando e se tenta copiar o seu movimento novo.",
  },
  comunicacao: {
    title: "Escolha entre dois",
    minutes: 5,
    material: "Dois alimentos ou objetos de que {nome} gosta",
    why: "Escolher dá a {nome} um motivo real para se comunicar, do jeito que conseguir.",
    steps: [
      "Na hora do lanche, mostre duas opções, uma em cada mão.",
      "Diga o nome de cada uma devagar: “banana”… “biscoito”.",
      "Espere. Olhar, apontar, estender a mão ou falar: tudo vale.",
      "Entregue o escolhido repetindo a palavra: “banana!”.",
    ],
    observe: "Como {nome} escolheu: olhando, apontando, com som ou com palavra.",
  },
  brincar: {
    title: "Narrador da brincadeira",
    minutes: 10,
    material: "O brinquedo que {nome} escolher",
    why: "Entrar na brincadeira de {nome}, sem comandar, aumenta o tempo que vocês brincam juntos.",
    steps: [
      "Deixe {nome} escolher o brinquedo e sente-se perto, de frente.",
      "Não dirija nem faça perguntas. Só participe, seguindo a criança.",
      "Narre com frases curtas: “carro… vai!”, “caiu!”, “de novo!”.",
      "Use uma ou duas palavras a mais do que {nome} usa hoje.",
    ],
    observe: "Quanto tempo {nome} fica brincando com você antes de trocar de atividade.",
  },
  rotinas: {
    title: "Música da troca",
    minutes: 5,
    material: "Uma musiquinha curta, sempre a mesma",
    why: "Avisar antes e repetir o mesmo ritual deixa as mudanças mais previsíveis e com menos crises.",
    steps: [
      "Escolha uma musiquinha curta para os momentos de troca (ex.: hora do banho).",
      "Avise antes: “mais uma vez e acabou”, mostrando um dedo.",
      "Cante a música e mostre o objeto da próxima atividade (a toalha, por exemplo).",
      "Repita o mesmo ritual todos os dias, no mesmo momento.",
    ],
    observe: "Se, com os dias, {nome} começa a reconhecer a música e a aceitar melhor a troca.",
  },
};

export const PLAN_PREVIEW = [
  "Dia 3 · Cantar e parar: a música que pede “mais”",
  "Dia 5 · Hora do banho: nomear partes do corpo",
  "Dia 8 · Esconde-esconde com paninho",
  "Dia 12 · Cesto de tesouros com sons",
  "Dia 17 · Primeiros pedidos com gesto",
  "Dia 23 · Faz de conta: comidinha",
  "Dia 30 · Revisão do perfil e próximos passos",
];
