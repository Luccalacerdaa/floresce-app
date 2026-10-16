"use client";

import { useState } from "react";
import { Confetti } from "@/components/art/Confetti";
import { actions, BADGES, MILESTONES, useApp } from "@/lib/appState";
import { TRAIL } from "@/lib/trail";

export default function AchievementsPage() {
  const s = useApp();
  const [party, setParty] = useState(0);

  return (
    <div className="space-y-7 px-4 pb-10 pt-4">
      <Confetti seed={party} />
      <h1 className="font-display text-2xl font-medium">Conquistas</h1>

      <div className="grid grid-cols-3 gap-3">
        <Stat emoji="🌱" value={s.seeds} label="sementes" />
        <Stat emoji="🔥" value={s.streak} label="dias seguidos" />
        <Stat emoji="⭐" value={s.milestones.length} label="marcos" />
      </div>

      <section>
        <h2 className="font-display text-xl">Medalhas</h2>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {BADGES.map((b) => {
            const on = b.test(s);
            return (
              <div key={b.id} className="flex flex-col items-center gap-1 text-center">
                <div
                  className={`grid size-16 place-items-center rounded-full text-3xl ${
                    on ? "bg-butter shadow-[0_5px_0_#d4a52f]" : "bg-paper-2 opacity-50 grayscale"
                  }`}
                >
                  {on ? b.emoji : "🔒"}
                </div>
                <p className="text-[10px] font-semibold leading-tight">{b.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl">Álbum de figurinhas</h2>
        <p className="text-sm text-ink-soft">Cada missão cumprida dá uma figurinha. Mostre para {s.childName}!</p>
        <div className="mt-3 grid grid-cols-6 gap-2 rounded-[24px] bg-card p-3">
          {TRAIL.map((d) => {
            const on = s.stickers.includes(d.sticker);
            return (
              <div
                key={d.day}
                className={`grid aspect-square place-items-center rounded-xl text-2xl ${on ? "animate-bounce-in bg-sky-soft" : "border-2 border-dashed border-line text-xs font-bold text-ink-soft/50"}`}
              >
                {on ? d.sticker : d.day}
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl">Marcos de {s.childName}</h2>
        <p className="text-sm text-ink-soft">Registre quando acontecer. Eles aparecem no relatório para a terapeuta.</p>
        <ul className="mt-3 space-y-2">
          {MILESTONES.map((m) => {
            const on = s.milestones.includes(m.id);
            return (
              <li key={m.id}>
                <button
                  onClick={() => {
                    if (!on) setParty((p) => p + 1);
                    actions.toggleMilestone(m.id);
                  }}
                  className={`flex w-full items-center gap-3 rounded-[20px] border-2 p-3 text-left font-semibold ${
                    on ? "border-moss bg-sage-soft" : "border-transparent bg-card"
                  }`}
                >
                  <span className="grid size-10 place-items-center rounded-full bg-paper text-xl">{on ? "⭐" : m.emoji}</span>
                  <span className="flex-1">{m.label}</span>
                  {on && <span className="text-xs text-moss">+30 🌱</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function Stat({ emoji, value, label }: { emoji: string; value: number; label: string }) {
  return (
    <div className="rounded-[22px] bg-card p-3 text-center">
      <p className="text-2xl">{emoji}</p>
      <p className="font-display text-2xl tabular-nums">{value}</p>
      <p className="text-[11px] text-ink-soft">{label}</p>
    </div>
  );
}
