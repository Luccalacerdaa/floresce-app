"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Confetti } from "@/components/art/Confetti";
import { Mascot } from "@/components/art/Mascot";
import { Arrow, buttonStyles } from "@/components/ui";
import { actions, screenSecondsToday, useApp } from "@/lib/appState";
import { SCREEN_LIMIT_MIN, type Game } from "@/lib/games";
import { TRAIL } from "@/lib/trail";

const ROUND_SECONDS = 180;

/**
 * Moldura de todo jogo a dois: dica para o adulto antes, cronômetro de 3 minutos,
 * contagem do tempo de tela do dia e tela final que manda para a vida real.
 */
export function GameShell({
  game,
  children,
  onStart,
}: {
  game: Game;
  children: (api: { name: string; celebrate: () => void; score: () => void }) => React.ReactNode;
  onStart?: () => void | Promise<void>;
}) {
  const s = useApp();
  const [phase, setPhase] = useState<"tip" | "play" | "end">("tip");
  const [left, setLeft] = useState(ROUND_SECONDS);
  const [party, setParty] = useState(0);
  const [points, setPoints] = useState(0);
  const started = useRef(0);
  const overLimit = screenSecondsToday(s) >= SCREEN_LIMIT_MIN * 60;
  // Estáveis entre renderizações: os jogos usam nas dependências dos efeitos.
  const celebrate = useCallback(() => setParty((p) => p + 1), []);
  const score = useCallback(() => setPoints((p) => p + 1), []);

  const finish = useCallback(() => {
    setPhase("end");
    actions.addSeeds(20);
  }, []);

  useEffect(() => {
    if (phase !== "play") return;
    started.current = Date.now();
    let remaining = ROUND_SECONDS;
    const t = setInterval(() => {
      remaining -= 1;
      setLeft(remaining);
      if (remaining <= 0) finish();
    }, 1000);
    return () => {
      clearInterval(t);
      actions.addScreenSeconds((Date.now() - started.current) / 1000);
    };
  }, [phase, finish]);

  const mission = TRAIL.find((d) => d.pillar === game.pillar);

  return (
    <div className={`flex min-h-[calc(100dvh-24px)] flex-col sm:min-h-full ${game.bg}`}>
      <Confetti seed={party} />
      <header className="flex items-center justify-between px-4 py-3">
        <Link href="/app/jogos" className="grid size-10 place-items-center rounded-full bg-card" aria-label="Sair do jogo">
          ✕
        </Link>
        <p className="font-display text-lg">
          {game.emoji} {game.name}
        </p>
        {phase === "play" ? (
          <span className="rounded-full bg-card px-3 py-1.5 text-sm font-bold tabular-nums">
            ⭐ {points} · {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}
          </span>
        ) : (
          <span className="w-10" />
        )}
      </header>

      {phase === "tip" && (
        <div className="reveal flex flex-1 flex-col p-5">
          <div className="grid flex-1 place-items-center">
            <div className="grid size-40 animate-float place-items-center rounded-full bg-card text-8xl shadow-xl">{game.emoji}</div>
          </div>
          <div className="rounded-[28px] bg-card p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-moss">Como jogar a dois</p>
            <p className="mt-2 leading-relaxed">{game.desc}</p>
            <div className="mt-4 flex items-start gap-3 rounded-[20px] bg-butter/40 p-3 text-sm leading-relaxed">
              <Mascot mood="wow" className="size-11 shrink-0" />
              <p>
                <b>Dica para você:</b> {game.parentTip}
              </p>
            </div>
            {overLimit && (
              <p className="mt-3 rounded-[16px] bg-clay-soft p-3 text-sm">
                🌙 Vocês já usaram os {SCREEN_LIMIT_MIN} minutos de tela de hoje. Que tal uma missão sem tela? (No protótipo,
                dá para jogar mesmo assim.)
              </p>
            )}
            <button
              onClick={async () => {
                await onStart?.();
                setPhase("play");
              }}
              className={`${buttonStyles.primary} mt-5 w-full`}
            >
              Jogar juntos <Arrow />
            </button>
            {game.usesMic && (
              <p className="mt-2 text-center text-xs text-ink-soft">
                🎤 Usa o microfone só para medir o volume, no próprio aparelho. Nada é gravado.
              </p>
            )}
          </div>
        </div>
      )}

      {phase === "play" && (
        <div className="flex flex-1 flex-col">
          {children({ name: s.childName, celebrate, score })}
          <div className="p-4">
            <button onClick={finish} className="w-full rounded-full bg-card/70 py-3 text-sm font-semibold text-ink-soft">
              Terminar por hoje
            </button>
          </div>
        </div>
      )}

      {phase === "end" && (
        <div className="reveal flex flex-1 flex-col items-center p-6 text-center">
          <Mascot mood="love" className="mt-6 size-32" />
          <h1 className="mt-4 font-display text-3xl">Muito bem, vocês dois!</h1>
          <p className="mt-2 text-ink-soft">
            ⭐ {points} acertos · +20 🌱
          </p>
          <div className="mt-6 w-full rounded-[26px] bg-card p-5 text-left">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-moss">Agora, sem tela</p>
            <p className="mt-1 font-display text-xl">Leve o jogo para a vida real</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
              Guarde o celular e faça a missão “{mission?.title}” — é a mesma habilidade, com você de verdade.
            </p>
            {mission && (
              <Link href={`/app/missao/${mission.day}`} className={`${buttonStyles.dark} mt-4 w-full`}>
                Ir para a missão <Arrow />
              </Link>
            )}
          </div>
          <Link href="/app" className="mt-4 text-sm font-semibold text-ink-soft underline">
            Voltar ao jardim
          </Link>
        </div>
      )}
    </div>
  );
}
