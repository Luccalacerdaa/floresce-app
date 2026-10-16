"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Confetti } from "@/components/art/Confetti";
import { GardenScene, type GrowthStage } from "@/components/art/Garden";
import { Mascot, SpeechBubble } from "@/components/art/Mascot";
import { Arrow, buttonStyles } from "@/components/ui";
import { CONSENT_VERSION } from "@/lib/config";
import {
  CHAPTERS,
  computeProfile,
  fill,
  SEEDS_PER_CHAPTER,
  seedsFor,
  STEPS,
  type Answers,
  type PillarKey,
} from "@/lib/quiz";
import { saveQuiz } from "@/lib/storage";
import { getUtms, track } from "@/lib/tracking";

type Phase = "chapter" | "question" | "lead" | "analyzing";

const CHEERS = ["Boa!", "Isso aí!", "Anotado 🌱", "Ótimo!", "Que legal!", "Seguindo!", "Perfeito!"];

export default function QuizPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [phase, setPhase] = useState<Phase>("chapter");
  const [burst, setBurst] = useState(0); // dispara o "+10"
  const [party, setParty] = useState(0); // dispara o confete
  const started = useRef(false);

  const step = STEPS[index];
  const chapter = step.chapter;
  const seeds = seedsFor(answers);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [index, phase]);

  function answer(id: string, value: string | string[], advance = true) {
    if (!started.current) {
      started.current = true;
      track("QuizStart");
    }
    const already = answers[id] !== undefined;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (!already) setBurst((b) => b + 1);
    if (advance) setTimeout(next, 380);
  }

  // Usa o índice desta renderização: cliques repetidos na mesma pergunta não pulam a próxima.
  function next() {
    if (index + 1 >= STEPS.length) {
      setParty((p) => p + 1);
      setPhase("lead");
      track("QuizComplete");
      return;
    }
    const nextStep = STEPS[index + 1];
    setIndex(index + 1);
    if (nextStep.chapter !== step.chapter) {
      setParty((p) => p + 1);
      setPhase("chapter");
    }
  }

  function back() {
    if (phase === "lead") return setPhase("question");
    if (phase === "chapter") {
      if (index === 0) return;
      setPhase("question");
      setIndex(index - 1);
      return;
    }
    if (index === 0) return setPhase("chapter");
    setIndex(index - 1);
  }

  const canGoBack = phase !== "analyzing" && !(phase === "chapter" && index === 0);

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col px-4 pb-8 sm:px-6">
      <Confetti seed={party} />

      {phase !== "analyzing" && (
        <header className="sticky top-0 z-10 -mx-4 bg-paper/90 px-4 pb-3 pt-3 backdrop-blur sm:-mx-6 sm:px-6">
          <div className="flex items-center justify-between">
            {canGoBack ? (
              <button onClick={back} className="grid size-10 place-items-center rounded-full bg-card text-lg" aria-label="Voltar">
                ←
              </button>
            ) : (
              <Link href="/" className="grid size-10 place-items-center rounded-full bg-card text-lg" aria-label="Sair">
                ✕
              </Link>
            )}
            <ChapterTrack current={phase === "lead" ? CHAPTERS.length : chapter} answers={answers} />
            <SeedCounter seeds={seeds} burst={burst} />
          </div>
          {phase === "question" && <QuestionBar index={index} />}
        </header>
      )}

      <main className="flex flex-1 flex-col pt-4">
        {phase === "chapter" && (
          <ChapterIntro
            key={chapter}
            chapter={chapter}
            answers={answers}
            onStart={() => setPhase("question")}
          />
        )}

        {phase === "question" && (
          <div key={step.id} className="flex flex-1 flex-col">
            <div className="reveal flex items-center gap-3">
              <Mascot mood={index % 3 === 2 ? "wow" : "happy"} className="size-16 shrink-0" />
              <SpeechBubble className="ml-1">
                {index === 0 ? "Vamos começar!" : CHEERS[index % CHEERS.length]}
              </SpeechBubble>
            </div>
            <h1 className="reveal mt-4 font-display text-[1.75rem] font-medium leading-tight text-balance" style={{ ["--d" as string]: "60ms" }}>
              {fill(step.title, answers)}
            </h1>
            {step.subtitle && (
              <p className="reveal mt-2 text-ink-soft" style={{ ["--d" as string]: "100ms" }}>
                {fill(step.subtitle, answers)}
              </p>
            )}

            <div className="mt-6 flex-1">
              {step.kind === "text" && (
                <TextStep
                  initial={(answers[step.id] as string) ?? ""}
                  placeholder={step.placeholder}
                  onSubmit={(v) => answer(step.id, v)}
                />
              )}
              {step.kind === "single" && (
                <Options
                  options={step.options}
                  isSelected={(id) => answers[step.id] === id}
                  onPick={(id) => answer(step.id, id)}
                />
              )}
              {step.kind === "multi" && (
                <MultiStep
                  options={step.options}
                  value={(answers[step.id] as string[]) ?? []}
                  onChange={(v) => answer(step.id, v, false)}
                  onNext={next}
                />
              )}
            </div>
          </div>
        )}

        {phase === "lead" && (
          <LeadStep
            answers={answers}
            seeds={seeds}
            onDone={() => {
              setPhase("analyzing");
              setTimeout(() => router.push("/resultado"), 3600);
            }}
          />
        )}

        {phase === "analyzing" && <Analyzing answers={answers} />}
      </main>
    </div>
  );
}

function ChapterTrack({ current, answers }: { current: number; answers: Answers }) {
  return (
    <ol className="flex items-center gap-1.5" aria-label="Fases do quiz">
      {CHAPTERS.map((c, i) => {
        const done = STEPS.filter((s) => s.chapter === i).every((s) => answers[s.id] !== undefined);
        const active = i === current;
        return (
          <li
            key={c.title}
            className={`grid place-items-center rounded-full text-sm transition-all ${
              active ? "size-9 bg-ink shadow-md" : done ? "size-7 bg-moss" : "size-7 bg-paper-2"
            }`}
            title={c.title}
          >
            <span className={active || done ? "" : "opacity-40 grayscale"}>{done && !active ? "✓" : c.emoji}</span>
          </li>
        );
      })}
    </ol>
  );
}

function SeedCounter({ seeds, burst }: { seeds: number; burst: number }) {
  return (
    <div className="relative">
      <div key={seeds} className="flex animate-bounce-in items-center gap-1 rounded-full bg-butter/50 px-3 py-1.5 text-sm font-bold">
        🌱 <span className="tabular-nums">{seeds}</span>
      </div>
      {burst > 0 && (
        <span key={burst} className="pointer-events-none absolute -top-1 right-1 animate-fly-up text-sm font-extrabold text-moss">
          +10
        </span>
      )}
    </div>
  );
}

function QuestionBar({ index }: { index: number }) {
  const pct = (index / STEPS.length) * 100;
  return (
    <div className="mt-3 h-2 overflow-hidden rounded-full bg-paper-2">
      <div className="h-full rounded-full bg-gradient-to-r from-sage to-moss transition-[width] duration-500" style={{ width: `${pct}%` }} />
    </div>
  );
}

function ChapterIntro({ chapter, answers, onStart }: { chapter: number; answers: Answers; onStart: () => void }) {
  const c = CHAPTERS[chapter];
  const count = STEPS.filter((s) => s.chapter === chapter).length;
  return (
    <div className={`reveal relative flex flex-1 flex-col overflow-hidden rounded-[36px] ${c.bg} p-7`}>
      {chapter > 0 && (
        <div className="mx-auto mb-4 flex animate-bounce-in items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-bold shadow-sm">
          ✓ Fase {chapter} concluída · +{SEEDS_PER_CHAPTER} 🌱
        </div>
      )}
      <div className="grid flex-1 place-items-center">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse-ring rounded-full bg-card/70" />
          <div className="relative grid size-36 animate-float place-items-center rounded-full bg-card text-7xl shadow-lg">
            {c.emoji}
          </div>
        </div>
      </div>
      <p className="mt-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
        Fase {chapter + 1} de {CHAPTERS.length} · {count} perguntas
      </p>
      <h1 className="mt-2 text-center font-display text-4xl font-medium">{fill(c.title, answers)}</h1>
      <div className="mt-5 flex items-start gap-3 rounded-[22px] bg-card/80 p-4">
        <Mascot mood={chapter === 0 ? "happy" : "wow"} className="size-12 shrink-0" />
        <p className="text-[0.95rem] leading-relaxed">
          {chapter > 0 && <b>Você sabia? </b>}
          {c.fact}
        </p>
      </div>
      <button onClick={onStart} className={`${buttonStyles.dark} mt-6 w-full`}>
        {chapter === 0 ? "Começar o jogo" : "Começar fase"} <Arrow />
      </button>
    </div>
  );
}

type Opt = { id: string; label: string; emoji: string };

function Options({ options, isSelected, onPick }: { options: Opt[]; isSelected: (id: string) => boolean; onPick: (id: string) => void }) {
  const grid = options.length <= 4 && options.every((o) => o.label.length <= 22);
  return (
    <div className={grid ? "grid grid-cols-2 gap-3" : "space-y-3"}>
      {options.map((o, i) => (
        <OptionTile key={o.id} option={o} grid={grid} selected={isSelected(o.id)} onClick={() => onPick(o.id)} delay={i * 50} />
      ))}
    </div>
  );
}

function OptionTile({
  option,
  grid,
  selected,
  onClick,
  delay,
}: {
  option: Opt;
  grid: boolean;
  selected: boolean;
  onClick: () => void;
  delay: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      style={{ animationDelay: `${delay}ms` }}
      className={`animate-bounce-in rounded-[24px] border-[3px] font-semibold transition active:scale-95 ${
        selected
          ? "scale-[1.02] border-moss bg-sage-soft shadow-[0_8px_0_-2px_var(--color-moss)]"
          : "border-transparent bg-card shadow-[0_6px_0_-2px_var(--color-line)] hover:border-sage"
      } ${grid ? "flex min-h-32 flex-col items-center justify-center gap-2 p-4 text-center" : "flex min-h-16 w-full items-center gap-4 px-4 py-3 text-left"}`}
    >
      <span
        className={`grid shrink-0 place-items-center rounded-2xl bg-paper ${grid ? "size-14 text-4xl" : "size-11 text-2xl"} ${
          selected ? "animate-wiggle" : ""
        }`}
      >
        {option.emoji}
      </span>
      <span className={grid ? "text-[0.98rem] leading-tight" : "text-[1.02rem] leading-snug"}>{option.label}</span>
    </button>
  );
}

function TextStep({ initial, placeholder, onSubmit }: { initial: string; placeholder: string; onSubmit: (v: string) => void }) {
  const [value, setValue] = useState(initial);
  const valid = value.trim().length >= 2;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) onSubmit(value.trim().slice(0, 40));
      }}
      className="space-y-5"
    >
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        maxLength={40}
        autoComplete="off"
        className="h-16 w-full rounded-[22px] border-[3px] border-line bg-card px-5 text-xl font-semibold outline-none transition focus:border-moss"
      />
      <button type="submit" disabled={!valid} className={`${buttonStyles.dark} w-full`}>
        Continuar <Arrow />
      </button>
    </form>
  );
}

function MultiStep({
  options,
  value,
  onChange,
  onNext,
}: {
  options: Opt[];
  value: string[];
  onChange: (v: string[]) => void;
  onNext: () => void;
}) {
  function toggle(id: string) {
    // "Nenhuma" exclui as outras opções e vice-versa.
    if (id === "nenhuma") return onChange(value.includes(id) ? [] : [id]);
    const without = value.filter((v) => v !== "nenhuma");
    onChange(without.includes(id) ? without.filter((v) => v !== id) : [...without, id]);
  }
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        {options.map((o, i) => (
          <OptionTile key={o.id} option={o} grid selected={value.includes(o.id)} onClick={() => toggle(o.id)} delay={i * 50} />
        ))}
      </div>
      <button onClick={onNext} disabled={!value.length} className={`${buttonStyles.dark} mt-5 w-full`}>
        Continuar <Arrow />
      </button>
    </div>
  );
}

function LeadStep({ answers, seeds, onDone }: { answers: Answers; seeds: number; onDone: () => void }) {
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [consent, setConsent] = useState(false);
  // LGPD: consentimento não pode vir pré-marcado.
  const [marketing, setMarketing] = useState(false);
  const [website, setWebsite] = useState(""); // armadilha para robôs
  const [sending, setSending] = useState(false);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  const valid = parentName.trim().length >= 2 && emailOk && consent;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || sending) return;
    setSending(true);
    const profile = computeProfile(answers);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: parentName.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim(),
          consent,
          marketing,
          website,
          consentVersion: CONSENT_VERSION,
          answers,
          profile: {
            pillars: profile.pillars,
            focus: profile.focus,
            style: profile.style,
            flags: profile.flags.map((f) => f.id),
          },
          utms: getUtms(),
        }),
      });
      if (!res.ok) throw new Error();
    } catch {
      // Mesmo se o envio falhar, a pessoa vê o resultado.
      console.error("[lead] falha ao enviar");
    }
    saveQuiz({ answers, parentName: parentName.trim(), seeds, savedAt: new Date().toISOString() });
    track("Lead");
    onDone();
  }

  const name = fill("{nome}", answers);

  return (
    <form onSubmit={submit} className="reveal space-y-5">
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-butter to-clay-soft p-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">Jogo concluído!</p>
        <div className="mx-auto mt-3 grid size-24 place-items-center rounded-[28px] bg-card text-5xl shadow-lg">
          <span className="blur-[6px]">🧭</span>
          <span className="absolute text-3xl">🔒</span>
        </div>
        <h1 className="mt-4 font-display text-[1.7rem] font-medium leading-tight">
          O estilo de brincar de {name} está pronto!
        </h1>
        <p className="mt-2 text-ink-soft">
          Você juntou <b className="text-ink">{seeds} sementes</b> para o jardim de {name}. Diga para onde enviamos o
          resultado.
        </p>
      </div>

      <Field label="Seu nome">
        <input value={parentName} onChange={(e) => setParentName(e.target.value)} autoComplete="given-name" maxLength={60} className={inputClass} />
      </Field>
      <Field label="Seu e-mail">
        <input
          type="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          maxLength={120}
          className={inputClass}
        />
      </Field>
      <Field label="WhatsApp (opcional)" hint="Para receber a missão do dia.">
        <input
          type="tel"
          inputMode="tel"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          autoComplete="tel"
          placeholder="(11) 99999-9999"
          maxLength={20}
          className={inputClass}
        />
      </Field>
      <input
        tabIndex={-1}
        aria-hidden
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        name="website"
      />

      <label className="flex gap-3 rounded-[18px] bg-card p-4 text-sm leading-relaxed text-ink-soft">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-moss" />
        <span>
          Sou responsável pela criança e autorizo o uso destas respostas para gerar o resultado e o plano, conforme a{" "}
          <Link href="/privacidade" target="_blank" className="font-semibold text-ink underline underline-offset-2">
            Política de Privacidade
          </Link>
          . Posso pedir a exclusão a qualquer momento.
        </span>
      </label>
      <label className="flex gap-3 px-4 text-sm text-ink-soft">
        <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-moss" />
        Quero receber novidades e dicas por e-mail e WhatsApp.
      </label>

      <button type="submit" disabled={!valid || sending} className={`${buttonStyles.primary} w-full`}>
        {sending ? "Abrindo…" : "🔓 Desbloquear o resultado"}
      </button>
      <p className="text-center text-xs text-ink-soft">Sem spam. Seus dados não são vendidos nem compartilhados.</p>
    </form>
  );
}

const inputClass =
  "h-14 w-full rounded-[18px] border-2 border-line bg-card px-4 text-lg outline-none transition focus:border-moss";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-semibold">{label}</span>
      {children}
      {hint && <span className="block text-xs text-ink-soft">{hint}</span>}
    </label>
  );
}

const GROWING = ["Plantando as sementes…", "Regando o jardim…", "Abrindo as primeiras flores…"];

function Analyzing({ answers }: { answers: Answers }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((v) => Math.min(v + 1, 3)), 900);
    return () => clearInterval(t);
  }, []);

  const profile = computeProfile(answers);
  const stages = Object.fromEntries(
    profile.pillars.map((p) => {
      const final = p.stage === "semente" ? 1 : p.stage === "broto" ? 2 : 3;
      return [p.key, Math.min(final, tick) as GrowthStage];
    }),
  ) as Record<PillarKey, GrowthStage>;

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="w-full overflow-hidden rounded-[32px] shadow-lg">
        <GardenScene stages={stages} className="block w-full" />
      </div>
      <h1 className="mt-8 font-display text-2xl font-medium">O jardim de {profile.name} está crescendo</h1>
      <p key={tick} className="reveal mt-2 text-ink-soft">
        {GROWING[Math.min(tick, GROWING.length - 1)]}
      </p>
    </div>
  );
}
