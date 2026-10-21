// Biblioteca de vídeos curtos (protótipo). Em produção: CDN real com streaming.
// Cada vídeo tem <60s e demonstra uma técnica para os pais.
import type { PillarKey } from "./quiz";

export type Video = {
  id: string;
  title: string;
  emoji: string;
  pillar: PillarKey;
  duration: string; // "0:45"
  description: string;
  tags: string[];
  /** Placeholder visual — em produção seria URL de vídeo real */
  color: string;
};

export const VIDEOS: Video[] = [
  {
    id: "v1",
    title: "Como esperar a resposta",
    emoji: "⏳",
    pillar: "comunicacao",
    duration: "0:45",
    description:
      "Depois de fazer uma pergunta ou convite, conte até 5 em silêncio. Esse tempo é essencial para a criança processar e tentar responder.",
    tags: ["Pausa", "Comunicação", "Espera"],
    color: "bg-sky-soft",
  },
  {
    id: "v2",
    title: "Modelar frases curtas",
    emoji: "💬",
    pillar: "comunicacao",
    duration: "0:38",
    description:
      "Use frases um pouco maiores que as do seu filho. Se ele diz 'água', você diz 'quero água' ou 'mais água'.",
    tags: ["Modelagem", "Fala", "Expansão"],
    color: "bg-butter/60",
  },
  {
    id: "v3",
    title: "Atenção compartilhada na prática",
    emoji: "👀",
    pillar: "atencao",
    duration: "0:52",
    description:
      "Aponte para algo interessante, olhe para o objeto e depois para a criança. Esse triângulo de olhar é a base da comunicação.",
    tags: ["Olhar", "Apontar", "Conexão"],
    color: "bg-sage-soft",
  },
  {
    id: "v4",
    title: "Imitação: espelhar para conectar",
    emoji: "🪞",
    pillar: "imitacao",
    duration: "0:41",
    description:
      "Copie o que a criança faz com o brinquedo. Quando ela percebe que vocês estão juntos, começa a imitar você também.",
    tags: ["Espelho", "Brincar", "Conexão"],
    color: "bg-lavender/40",
  },
  {
    id: "v5",
    title: "Ritual de transição sem crise",
    emoji: "🎵",
    pillar: "rotinas",
    duration: "0:55",
    description:
      "Use sempre a mesma música ou frase antes de trocar de atividade. A previsibilidade reduz crises e ansiedade.",
    tags: ["Transição", "Música", "Regulação"],
    color: "bg-clay-soft/70",
  },
  {
    id: "v6",
    title: "Brincar de faz de conta",
    emoji: "🍲",
    pillar: "brincar",
    duration: "0:48",
    description:
      "Entre na brincadeira simbólica: dê comida ao boneco, faça chá imaginário. Narre com frases curtas e simples.",
    tags: ["Simbólico", "Imaginação", "Vocabulário"],
    color: "bg-pink/40",
  },
  {
    id: "v7",
    title: "Sons onomatopaicos",
    emoji: "🐮",
    pillar: "imitacao",
    duration: "0:35",
    description:
      "Sons de bichos e objetos são mais fáceis de imitar que palavras. Comece por eles para abrir caminho para a fala.",
    tags: ["Sons", "Animais", "Primeiros sons"],
    color: "bg-butter/40",
  },
  {
    id: "v8",
    title: "Revezar a vez na brincadeira",
    emoji: "⚽",
    pillar: "brincar",
    duration: "0:42",
    description:
      "Minha vez, sua vez. Rolar a bola, empilhar blocos, soprar bolhas. Revezar ensina a base da conversa.",
    tags: ["Turno", "Social", "Interação"],
    color: "bg-sky-soft/80",
  },
];

export function videosByPillar(pillar: PillarKey): Video[] {
  return VIDEOS.filter((v) => v.pillar === pillar);
}

export function searchVideos(query: string): Video[] {
  const q = query.toLowerCase();
  if (!q) return VIDEOS;
  return VIDEOS.filter(
    (v) =>
      v.title.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q) ||
      v.tags.some((t) => t.toLowerCase().includes(q))
  );
}