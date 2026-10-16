"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Confetti } from "@/components/art/Confetti";
import { Plant } from "@/components/art/Garden";
import { Mascot } from "@/components/art/Mascot";
import { Arrow, buttonStyles } from "@/components/ui";
import { ACTIVITIES } from "@/lib/activities";
import { actions, growth, useApp } from "@/lib/appState";
import { PILLARS } from "@/lib/quiz";
import { chime } from "@/lib/sound";
import { PLAYABLE_DAYS, TRAIL } from "@/lib/trail";

type Phase = "intro" | "play" | "check" | "reward";

const FEELINGS = [
  { id: "dificil", emoji: "😣", label: "Difícil" },
  { id: "ok", emoji: "🙂", label: "Mais ou menos" },
  { id: "amei", emoji: "🤩", label: "Amamos!" },
];

const OBSERVED = ["Olhou para mim", "Apontou", "Imitou", "Fez um som", "Falou uma palavra", "Pediu de novo"];

export default function MissionPage() {
  const { day } = useParams<{ day: string }>();
  const router = useRouter();
  const s = useApp();
  const mission = TRAIL.find((d) => d.day === Number(day));
  const [phase, setPhase] = useState<Phase>("intro");
  const [checked, setChecked] = useState<number[]>([]);
  const [feeling, setFeeling] = useState("");
  const [observed, setObserved] = useState<string[]>([]);
  const [before, setBefore] = useState<0 | 1 | 2 | 3>(0);

  if (!mission) return <p className="p-6">Missão não encontrada.</p>;

  const name = s.childName;
  const fillName = (t: string) => t.replaceAll("{nome}", name);
  const locked = mission.day > PLAYABLE_DAYS;
  const activity = ACTIVITIES[mission.pillar];

  if (locked) {
    return (
      <Shell onClose={() => router.push("/app/trilha")}>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="grid size-28 place-items-center rounded-full bg-paper-2 text-6xl">{mission.emoji}</div>
          <h1 className="font-display text-2xl">{mission.title}</h1>
          <p className="text-ink-soft">Esta missão abre no beta. No protótipo, as 5 primeiras missões estão completas.</p>
          <Link href="/app/trilha" className={buttonStyles.dark}>
            Voltar para a trilha
          </Link>
        </div>
      </Shell>
    );
  }

  function finish() {
    setBefore(growth(s, mission!.pillar));
    actions.completeMission(mission!.day, mission!.pillar, mission!.sticker);
    chime(true);
    setPhase("reward");
  }

  return (
    <Shell onClose={() => router.push("/app")}>
      {phase === "intro" && (
        <div className="reveal flex flex-1 flex-col p-5">
          <div className="rounded-[30px] bg-ink p-6 text-paper">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-butter">
              Dia {mission.day} · {PILLARS[mission.pillar].label}
            </p>
            <div className="mt-3 flex items-center gap-4">
              <span className="grid size-16 place-items-center rounded-[20px] bg-paper text-4xl">{mission.emoji}</span>
              <h1 className="font-display text-3xl leading-tight">{mission.title}</h1>
            </div>
            <p className="mt-4 leading-relaxed text-paper/80">{fillName(activity.why)}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-[20px] bg-card p-4">
              <p className="text-xs font-bold text-ink-soft">⏱️ Tempo</p>
              <p className="mt-1 font-semibold">{activity.minutes} minutos</p>
            </div>
            <div className="rounded-[20px] bg-card p-4">
              <p className="text-xs font-bold text-ink-soft">🧺 Material</p>
              <p className="mt-1 font-semibold leading-tight">{fillName(activity.material)}</p>
            </div>
          </div>
          <div className="mt-4 flex items-start gap-3 rounded-[20px] bg-butter/30 p-4 text-sm leading-relaxed">
            <Mascot mood="wow" className="size-12 shrink-0" />
            <p>
              <b>O segredo de hoje:</b> {fillName(activity.observe)}
            </p>
          </div>
          <div className="flex-1" />
          <button onClick={() => setPhase("play")} className={`${buttonStyles.primary} mt-6 w-full`}>
            Começar a missão <Arrow />
          </button>
          <p className="mt-2 text-center text-xs text-ink-soft">Deixe o celular de lado durante a brincadeira 💛</p>
        </div>
      )}

      {phase === "play" && (
        <div className="reveal flex flex-1 flex-col p-5">
          <Timer minutes={activity.minutes} />
          <h2 className="mt-5 font-display text-xl">Passo a passo</h2>
          <ol className="mt-3 space-y-2.5">
            {activity.steps.map((step, i) => {
              const on = checked.includes(i);
              return (
                <li key={i}>
                  <button
                    onClick={() => setChecked(on ? checked.filter((c) => c !== i) : [...checked, i])}
                    className={`flex w-full gap-3 rounded-[20px] border-2 p-4 text-left leading-relaxed transition ${
                      on ? "border-moss bg-sage-soft" : "border-transparent bg-card"
                    }`}
                  >
                    <span
                      className={`grid size-7 shrink-0 place-items-center rounded-full text-sm font-bold ${
                        on ? "bg-moss text-white" : "bg-paper-2 text-ink-soft"
                      }`}
                    >
                      {on ? "✓" : i + 1}
                    </span>
                    <span className={on ? "text-ink-soft line-through decoration-moss/50" : ""}>{fillName(step)}</span>
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="flex-1" />
          <button onClick={() => setPhase("check")} className={`${buttonStyles.dark} mt-6 w-full`}>
            Terminamos! <Arrow />
          </button>
        </div>
      )}

      {phase === "check" && (
        <div className="reveal flex flex-1 flex-col p-5">
          <h1 className="font-display text-3xl">Como foi?</h1>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {FEELINGS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFeeling(f.id)}
                className={`flex flex-col items-center gap-1 rounded-[22px] border-[3px] p-3 font-semibold transition ${
                  feeling === f.id ? "scale-105 border-moss bg-sage-soft" : "border-transparent bg-card"
                }`}
              >
                <span className="text-4xl">{f.emoji}</span>
                <span className="text-xs">{f.label}</span>
              </button>
            ))}
          </div>
          <h2 className="mt-7 font-display text-xl">O que {name} fez durante a brincadeira?</h2>
          <p className="text-sm text-ink-soft">Marque tudo o que você viu. Isso ajusta as próximas missões.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {OBSERVED.map((o) => {
              const on = observed.includes(o);
              return (
                <button
                  key={o}
                  onClick={() => setObserved(on ? observed.filter((x) => x !== o) : [...observed, o])}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-semibold ${on ? "border-moss bg-sage-soft" : "border-line bg-card"}`}
                >
                  {on ? "✓ " : ""}
                  {o}
                </button>
              );
            })}
          </div>
          <div className="flex-1" />
          <button onClick={finish} disabled={!feeling} className={`${buttonStyles.primary} mt-6 w-full`}>
            Regar o jardim 💧
          </button>
        </div>
      )}

      {phase === "reward" && <Reward mission={mission} before={before} name={name} />}
    </Shell>
  );
}

function Shell({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="flex min-h-[calc(100dvh-24px)] flex-col sm:min-h-full">
      <div className="flex justify-end px-4 pt-3">
        <button onClick={onClose} className="grid size-10 place-items-center rounded-full bg-card" aria-label="Fechar">
          ✕
        </button>
      </div>
      {children}
    </div>
  );
}

function Timer({ minutes }: { minutes: number }) {
  const total = minutes * 60;
  const [left, setLeft] = useState(total);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setLeft((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(t);
  }, [running]);

  useEffect(() => {
    if (left === 0) chime(true);
  }, [left]);

  const pct = 1 - left / total;
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-5 rounded-[28px] bg-card p-5">
      <div className="relative size-32 shrink-0">
        <svg viewBox="0 0 120 120" className="size-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="var(--color-paper-2)" strokeWidth="12" />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke="var(--color-moss)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct)}
            className="transition-[stroke-dashoffset] duration-1000 ease-linear"
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-2xl tabular-nums">
          {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}
        </span>
      </div>
      <div className="flex-1">
        <p className="font-semibold">{left === 0 ? "Tempo! Que bom 💛" : running ? "Brincando…" : "Pronto para brincar?"}</p>
        <button
          onClick={() => setRunning(!running)}
          className="mt-3 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper"
        >
          {running ? "Pausar" : left < total ? "Continuar" : "Iniciar"}
        </button>
      </div>
    </div>
  );
}

function Reward({
  mission,
  before,
  name,
}: {
  mission: (typeof TRAIL)[number];
  before: 0 | 1 | 2 | 3;
  name: string;
}) {
  const s = useApp();
  const after = growth(s, mission.pillar);
  const [shown, setShown] = useState(before);

  useEffect(() => {
    const t = setTimeout(() => setShown(after), 900);
    return () => clearTimeout(t);
  }, [after]);

  return (
    <div className="flex flex-1 flex-col items-center p-6 text-center">
      <Confetti seed={mission.day + 100} count={40} />
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-moss">Missão cumprida!</p>
      <h1 className="mt-2 font-display text-3xl">Vocês regaram o jardim 💧</h1>
      <div className="relative mt-6 grid h-52 w-40 place-items-end">
        <div className="absolute inset-x-0 bottom-0 h-36 rounded-full bg-sage-soft blur-2xl" />
        <Plant key={shown} pillar={mission.pillar} stage={shown} className="relative h-52 w-36 animate-bounce-in" />
      </div>
      <p className="mt-2 text-ink-soft">
        {after > before ? `${PILLARS[mission.pillar].label} cresceu!` : `${PILLARS[mission.pillar].label} está florida e forte.`}
      </p>
      <div className="mt-6 grid w-full grid-cols-2 gap-3">
        <div className="animate-bounce-in rounded-[22px] bg-butter/50 p-4" style={{ animationDelay: "600ms" }}>
          <p className="text-3xl">🌱</p>
          <p className="font-bold">+50 sementes</p>
        </div>
        <div className="animate-bounce-in rounded-[22px] bg-clay-soft p-4" style={{ animationDelay: "800ms" }}>
          <p className="text-3xl">{mission.sticker}</p>
          <p className="font-bold">Figurinha nova!</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-ink-soft">Mostre a figurinha para {name} — a conquista é dos dois.</p>
      <div className="flex-1" />
      <Link href="/app" className={`${buttonStyles.dark} mt-6 w-full`}>
        Voltar ao jardim
      </Link>
    </div>
  );
}
