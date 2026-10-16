"use client";

import Link from "next/link";
import { Mascot } from "@/components/art/Mascot";
import { useApp } from "@/lib/appState";
import { TRAIL, WEEKS } from "@/lib/trail";

export default function TrailPage() {
  const s = useApp();
  const current = TRAIL.find((d) => !s.done.includes(d.day))?.day ?? 31;

  return (
    <div className="px-4 pb-10 pt-4">
      <h1 className="font-display text-2xl font-medium">A trilha de {s.childName}</h1>
      <p className="text-sm text-ink-soft">
        {s.done.length} de {TRAIL.length} missões · uma por dia
      </p>

      {WEEKS.map((week, w) => {
        const days = TRAIL.filter((d) => d.week === w);
        return (
          <section key={week.title} className="mt-6">
            <div className="sticky top-0 z-10 -mx-1 rounded-[20px] bg-ink px-4 py-3 text-paper shadow-md">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-butter">Semana {w + 1}</p>
              <p className="font-display text-lg">
                {week.emoji} {week.title}
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 py-6">
              {days.map((d, i) => {
                const done = s.done.includes(d.day);
                const isCurrent = d.day === current;
                const locked = d.day > current;
                const offset = Math.round(Math.sin((d.day - 1) * 0.9) * 80);
                return (
                  <div key={d.day} className={`relative ${isCurrent ? "mb-9" : ""}`} style={{ transform: `translateX(${offset}px)` }}>
                    {isCurrent && (
                      <div className="absolute -left-16 top-1 hidden min-[360px]:block">
                        <Mascot mood="happy" className="size-14 animate-float" />
                      </div>
                    )}
                    <Link
                      href={`/app/missao/${d.day}`}
                      aria-label={`Dia ${d.day}: ${d.title}`}
                      className={`relative grid size-[72px] place-items-center rounded-full text-3xl transition active:translate-y-1 ${
                        done
                          ? "bg-moss text-white shadow-[0_7px_0_#3f6340]"
                          : isCurrent
                            ? "bg-butter shadow-[0_7px_0_#d4a52f]"
                            : "bg-paper-2 shadow-[0_7px_0_rgb(30_51_41/0.15)]"
                      }`}
                    >
                      {isCurrent && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-butter" />}
                      <span className={`relative ${locked ? "opacity-35 grayscale" : ""}`}>{done ? "✓" : d.emoji}</span>
                    </Link>
                    {isCurrent && (
                      <p className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-card px-3 py-1 text-xs font-bold shadow">
                        Hoje: {d.title}
                      </p>
                    )}
                    {i === days.length - 1 && w < WEEKS.length - 1 && <div className="h-2" />}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
