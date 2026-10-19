"use client";

import { Mascot } from "@/components/art/Mascot";
import { actions, REWARD_CHEST, useApp } from "@/lib/appState";
import { Confetti } from "@/components/art/Confetti";
import { useState } from "react";

export default function BauPage() {
  const s = useApp();
  const [party, setParty] = useState(0);

  return (
    <div className="space-y-5 px-4 pb-10 pt-4">
      <Confetti seed={party} />

      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium">Baú de Recompensas</h1>
          <p className="text-sm text-ink-soft">Troque sementes por momentos especiais!</p>
        </div>
        <span className="rounded-full bg-butter/60 px-3 py-1.5 text-sm font-bold">
          🌱 {s.seeds}
        </span>
      </header>

      <div className="flex items-center gap-3 rounded-[24px] bg-sage-soft p-4">
        <Mascot mood="love" className="size-14 shrink-0" />
        <p className="text-sm leading-snug">
          Cada missão, jogo e marco dá sementes. Junte bastante e troque por uma recompensa real — um passeio, um sorvete, uma história extra!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {REWARD_CHEST.map((reward) => {
          const redeemed = s.redeemedRewards.includes(reward.id);
          const canAfford = s.seeds >= reward.cost;

          return (
            <div
              key={reward.id}
              className={`relative flex flex-col items-center rounded-[24px] p-4 text-center transition ${
                redeemed
                  ? "bg-moss/10 opacity-60"
                  : canAfford
                  ? "bg-card shadow-md"
                  : "bg-paper-2 opacity-70"
              }`}
            >
              {redeemed && (
                <span className="absolute right-2 top-2 rounded-full bg-moss px-2 py-0.5 text-[10px] font-bold text-white">
                  ✓ Resgatado
                </span>
              )}

              <span className="text-4xl mb-2">{reward.emoji}</span>
              <h3 className="font-display text-sm leading-tight">{reward.name}</h3>
              <p className="mt-1 text-[11px] text-ink-soft leading-snug">{reward.description}</p>

              <div className="mt-3 flex w-full items-center justify-between">
                <span className="text-xs font-bold text-butter-dark">🌱 {reward.cost}</span>
                {!redeemed && (
                  <button
                    disabled={!canAfford}
                    onClick={() => {
                      actions.redeemReward(reward.id, reward.cost);
                      setParty((p) => p + 1);
                    }}
                    className={`rounded-full px-3 py-1 text-xs font-bold transition active:scale-95 ${
                      canAfford
                        ? "bg-moss text-white shadow"
                        : "bg-paper-2 text-ink-soft cursor-not-allowed"
                    }`}
                  >
                    {canAfford ? "Trocar" : "Faltam sementes"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-[24px] bg-ink p-4 text-paper text-center">
        <p className="text-sm">
          💡 <b>Dica:</b> as recompensas são momentos juntos — não objetos caros. O valor está no tempo com você.
        </p>
      </div>
    </div>
  );
}