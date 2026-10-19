"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { speak } from "@/lib/sound";

const PAIRS = [
  { emoji: "🐱", name: "gato" },
  { emoji: "🐶", name: "cachorro" },
  { emoji: "🐰", name: "coelho" },
  { emoji: "🐻", name: "urso" },
  { emoji: "🦊", name: "raposa" },
  { emoji: "🐸", name: "sapo" },
];

type Card = { id: number; pairIndex: number; emoji: string; name: string; flipped: boolean; matched: boolean };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function MemoriaGame({ celebrate, score }: { celebrate: () => void; score: () => void }) {
  const [cards, setCards] = useState<Card[]>(() => {
    const doubled = PAIRS.flatMap((p, i) => [
      { id: i * 2, pairIndex: i, emoji: p.emoji, name: p.name, flipped: false, matched: false },
      { id: i * 2 + 1, pairIndex: i, emoji: p.emoji, name: p.name, flipped: false, matched: false },
    ]);
    return shuffle(doubled);
  });
  const [selected, setSelected] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);

  const flip = useCallback(
    (id: number) => {
      if (locked) return;
      const card = cards.find((c) => c.id === id);
      if (!card || card.flipped || card.matched) return;

      speak(card.name);

      const newCards = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c));
      setCards(newCards);

      const newSelected = [...selected, id];
      setSelected(newSelected);

      if (newSelected.length === 2) {
        setLocked(true);
        const [a, b] = newSelected;
        const cardA = newCards.find((c) => c.id === a)!;
        const cardB = newCards.find((c) => c.id === b)!;

        if (cardA.pairIndex === cardB.pairIndex) {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) => (c.id === a || c.id === b ? { ...c, matched: true } : c))
            );
            setSelected([]);
            setLocked(false);
            celebrate();
          }, 600);
        } else {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) => (c.id === a || c.id === b ? { ...c, flipped: false } : c))
            );
            setSelected([]);
            setLocked(false);
          }, 1200);
        }
      }
    },
    [cards, selected, locked, celebrate]
  );

  const allMatched = cards.every((c) => c.matched);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4">
      {allMatched ? (
        <div className="text-center animate-bounce">
          <p className="text-5xl">🎉</p>
          <p className="font-display text-2xl mt-2">Encontrou todos!</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 w-full max-w-[280px]">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => flip(card.id)}
              className={`aspect-square rounded-2xl text-4xl shadow-md transition-all duration-300 active:scale-95 ${
                card.matched
                  ? "bg-moss/20 scale-95 opacity-60"
                  : card.flipped
                  ? "bg-butter rotate-0"
                  : "bg-ink text-transparent rotate-0"
              }`}
            >
              {card.flipped || card.matched ? card.emoji : "❓"}
            </button>
          ))}
        </div>
      )}
      <p className="text-xs text-ink-soft">
        {cards.filter((c) => c.matched).length / 2}/{PAIRS.length} pares
      </p>
    </div>
  );
}