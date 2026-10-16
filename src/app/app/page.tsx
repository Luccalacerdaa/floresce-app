"use client";

import Link from "next/link";
import { useState } from "react";
import { Confetti } from "@/components/art/Confetti";
import { GardenScene } from "@/components/art/Garden";
import { Mascot, SpeechBubble } from "@/components/art/Mascot";
import { actions, MILESTONES, screenSecondsToday, stages, useApp } from "@/lib/appState";
import { GAMES, SCREEN_LIMIT_MIN } from "@/lib/games";
import { PILLARS } from "@/lib/quiz";
import { TRAIL } from "@/lib/trail";

export default function TodayPage() {
  const s = useApp();
  const [party, setParty] = useState(0);
  const next = TRAIL.find((d) => !s.done.includes(d.day)) ?? TRAIL[TRAIL.length - 1];
  const game = GAMES[(next.day - 1) % 4];
  const screenMin = Math.floor(screenSecondsToday(s) / 60);
  const hour = new Date().getHours();
  const hello = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <div className="space-y-5 px-4 pb-8 pt-4">
      <Confetti seed={party} />
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-ink-soft">{hello} 👋</p>
          <h1 className="font-display text-2xl font-medium">O jardim de {s.childName}</h1>
        </div>
        <div className="flex gap-1.5">
          <span className="rounded-full bg-clay-soft px-2.5 py-1.5 text-sm font-bold" title="Dias seguidos">
            🔥 {s.streak}
          </span>
          <span className="rounded-full bg-butter/60 px-2.5 py-1.5 text-sm font-bold" title="Sementes">
            🌱 {s.seeds}
          </span>
        </div>
      </header>

      <div className="relative overflow-hidden rounded-[30px] shadow-[0_16px_40px_-24px_rgb(30_51_41/0.7)]">
        <GardenScene stages={stages(s)} className="block w-full" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <Mascot mood="happy" className="size-12" />
          <SpeechBubble className="max-w-[180px] text-xs">
            {s.done.length === 0
              ? "Vamos regar o jardim hoje?"
              : `${s.done.length} ${s.done.length === 1 ? "missão feita" : "missões feitas"}! Que lindo.`}
          </SpeechBubble>
        </div>
      </div>

      {/* Missão do dia */}
      <Link
        href={`/app/missao/${next.day}`}
        className="block overflow-hidden rounded-[28px] bg-ink text-paper shadow-[0_10px_0_-2px_var(--color-moss)] transition active:translate-y-1 active:shadow-none"
      >
        <div className="flex items-center gap-4 p-5">
          <div className="grid size-16 shrink-0 place-items-center rounded-[20px] bg-paper text-4xl">{next.emoji}</div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-butter">Missão do dia {next.day} · sem tela</p>
            <h2 className="font-display text-xl leading-tight">{next.title}</h2>
            <p className="mt-1 text-xs text-paper/70">
              Rega: {PILLARS[next.pillar].label} · +50 🌱
            </p>
          </div>
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-butter text-lg text-ink">▶</span>
        </div>
      </Link>

      {/* Jogo a dois */}
      <Link href={`/app/jogos/${game.slug}`} className={`flex items-center gap-4 rounded-[28px] ${game.bg} p-4`}>
        <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-card text-3xl shadow-sm">{game.emoji}</div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">Jogo a dois · 3 min</p>
          <h2 className="font-display text-lg leading-tight">{game.name}</h2>
        </div>
        <div className="text-right text-xs font-semibold text-ink-soft">
          📱 {screenMin}/{SCREEN_LIMIT_MIN} min
          <br />
          de tela hoje
        </div>
      </Link>

      {/* Vídeo */}
      <Link href="/app/video" className="flex items-center gap-4 rounded-[28px] border-2 border-dashed border-sage bg-card p-4">
        <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-sage-soft text-3xl">🎬</div>
        <div className="flex-1">
          <h2 className="font-semibold leading-tight">Filme 1 minuto da brincadeira</h2>
          <p className="text-xs text-ink-soft">Receba um retorno da fono · {s.videos}/2 nesta semana</p>
        </div>
        <span className="text-xl">›</span>
      </Link>

      {/* Marcos */}
      <section className="rounded-[28px] bg-card p-5">
        <h2 className="font-display text-lg">Hoje {s.childName} fez algo novo?</h2>
        <p className="text-xs text-ink-soft">Toque para registrar. Cada marco vira uma estrela no jardim.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {MILESTONES.slice(0, 5).map((m) => {
            const on = s.milestones.includes(m.id);
            return (
              <button
                key={m.id}
                onClick={() => {
                  if (!on) setParty((p) => p + 1);
                  actions.toggleMilestone(m.id);
                }}
                className={`rounded-full border-2 px-3 py-1.5 text-sm font-semibold transition active:scale-95 ${
                  on ? "border-moss bg-sage-soft" : "border-line bg-paper"
                }`}
              >
                {m.emoji} {m.label}
              </button>
            );
          })}
        </div>
      </section>

      <button onClick={() => actions.reset()} className="mx-auto block text-xs text-ink-soft underline">
        Reiniciar protótipo
      </button>
    </div>
  );
}
