"use client";

import Link from "next/link";
import { Mascot } from "@/components/art/Mascot";
import { screenSecondsToday, useApp } from "@/lib/appState";
import { GAMES, SCREEN_LIMIT_MIN } from "@/lib/games";
import { PILLARS } from "@/lib/quiz";

export default function GamesPage() {
  const s = useApp();
  const used = Math.min(SCREEN_LIMIT_MIN * 60, screenSecondsToday(s));
  const pct = used / (SCREEN_LIMIT_MIN * 60);

  return (
    <div className="space-y-5 px-4 pb-10 pt-4">
      <h1 className="font-display text-2xl font-medium">Jogos a dois</h1>

      <div className="flex items-center gap-3 rounded-[24px] bg-ink p-4 text-paper">
        <Mascot mood="think" className="size-14 shrink-0" />
        <div className="flex-1">
          <p className="text-sm leading-snug">
            <b>Regra de ouro:</b> jogar sempre <u>junto</u>, no colo ou lado a lado. A tela é a ponte, não a babá.
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-paper/20">
              <div className="h-full rounded-full bg-butter" style={{ width: `${pct * 100}%` }} />
            </div>
            {Math.floor(used / 60)}/{SCREEN_LIMIT_MIN} min hoje
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {GAMES.map((g, i) => (
          <Link
            key={g.slug}
            href={`/app/jogos/${g.slug}`}
            className={`reveal flex flex-col rounded-[26px] ${g.bg} p-4 transition active:scale-95 ${i === 0 ? "col-span-2 flex-row items-center gap-4" : ""}`}
            style={{ ["--d" as string]: `${i * 60}ms` }}
          >
            <div className={`grid shrink-0 place-items-center rounded-2xl bg-card shadow-sm ${i === 0 ? "size-20 text-5xl" : "size-14 text-3xl"}`}>
              {g.emoji}
            </div>
            <div className={i === 0 ? "" : "mt-3"}>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft">
                {g.kind === "ferramenta" ? "Ferramenta" : PILLARS[g.pillar].short} {g.usesMic ? "· 🎤" : ""}
              </p>
              <h2 className="font-display text-lg leading-tight">{g.name}</h2>
              <p className="mt-1 text-xs leading-snug text-ink-soft">{g.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
