"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo, SproutIcon } from "@/components/Brand";
import { SproutProgress } from "@/components/SproutProgress";
import { Arrow, buttonStyles } from "@/components/ui";
import { CONSENT_VERSION } from "@/lib/config";
import { computeProfile, fill, STEPS, type Answers } from "@/lib/quiz";
import { saveQuiz } from "@/lib/storage";
import { getUtms, track } from "@/lib/tracking";

type Phase = "questions" | "lead" | "analyzing";

const ANALYZING = [
  "Organizando as respostas…",
  "Montando o perfil de comunicação…",
  "Escolhendo as primeiras brincadeiras…",
];

export default function QuizPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [phase, setPhase] = useState<Phase>("questions");
  const started = useRef(false);

  const step = STEPS[index];
  const progress = phase === "questions" ? index / STEPS.length : 1;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [index, phase]);

  function answer(id: string, value: string | string[], advance = true) {
    if (!started.current) {
      started.current = true;
      track("QuizStart");
    }
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (advance) setTimeout(next, 220);
  }

  // Usa o índice desta renderização: cliques repetidos na mesma pergunta não pulam a próxima.
  function next() {
    if (index + 1 >= STEPS.length) {
      setPhase("lead");
      track("QuizComplete");
    } else {
      setIndex(index + 1);
    }
  }

  function back() {
    if (phase === "lead") return setPhase("questions");
    setIndex((i) => Math.max(0, i - 1));
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col px-4 pb-10 sm:px-6">
      <header className="flex items-center justify-between py-4">
        <Logo />
        {phase !== "analyzing" && (index > 0 || phase === "lead") ? (
          <button onClick={back} className="text-sm font-semibold text-ink-soft hover:text-ink">
            ← Voltar
          </button>
        ) : (
          <Link href="/" className="text-sm font-semibold text-ink-soft hover:text-ink">
            Sair
          </Link>
        )}
      </header>

      {phase !== "analyzing" && (
        <div className="pr-4 pt-2">
          <SproutProgress value={progress} />
        </div>
      )}

      <main className="flex flex-1 flex-col pt-8">
        {phase === "questions" && (
          <div key={step.id} className="reveal flex flex-1 flex-col">
            {step.kind === "info" ? (
              <InfoStep title={fill(step.title, answers)} body={fill(step.body, answers)} onNext={next} />
            ) : (
              <>
                <h1 className="font-display text-[1.85rem] font-medium leading-tight text-balance">
                  {fill(step.title, answers)}
                </h1>
                {step.subtitle && <p className="mt-2 text-ink-soft">{fill(step.subtitle, answers)}</p>}

                <div className="mt-7 flex-1">
                  {step.kind === "text" && (
                    <TextStep
                      initial={(answers[step.id] as string) ?? ""}
                      placeholder={step.placeholder}
                      onSubmit={(v) => answer(step.id, v)}
                    />
                  )}
                  {step.kind === "single" && (
                    <div className="space-y-3">
                      {step.options.map((o) => (
                        <OptionButton
                          key={o.id}
                          selected={answers[step.id] === o.id}
                          onClick={() => answer(step.id, o.id)}
                        >
                          {o.label}
                        </OptionButton>
                      ))}
                    </div>
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
              </>
            )}
          </div>
        )}

        {phase === "lead" && (
          <LeadStep
            answers={answers}
            onDone={() => {
              setPhase("analyzing");
              setTimeout(() => router.push("/resultado"), 3200);
            }}
          />
        )}

        {phase === "analyzing" && <Analyzing name={fill("{nome}", answers)} />}
      </main>
    </div>
  );
}

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex min-h-15 w-full items-center gap-3 rounded-[20px] border-2 px-5 py-3.5 text-left text-[1.05rem] font-medium transition active:scale-[0.99] ${
        selected
          ? "border-moss bg-sage-soft"
          : "border-transparent bg-card shadow-[0_1px_0_var(--color-line)] hover:border-sage"
      }`}
    >
      <span
        className={`grid size-6 shrink-0 place-items-center rounded-full border-2 transition ${
          selected ? "border-moss bg-moss text-white" : "border-line"
        }`}
        aria-hidden
      >
        {selected && (
          <svg viewBox="0 0 16 16" className="size-3.5">
            <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </svg>
        )}
      </span>
      {children}
    </button>
  );
}

function TextStep({
  initial,
  placeholder,
  onSubmit,
}: {
  initial: string;
  placeholder: string;
  onSubmit: (v: string) => void;
}) {
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
        className="h-15 w-full rounded-[20px] border-2 border-line bg-card px-5 text-lg outline-none transition focus:border-moss"
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
  options: { id: string; label: string }[];
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
    <div className="space-y-3">
      {options.map((o) => (
        <OptionButton key={o.id} selected={value.includes(o.id)} onClick={() => toggle(o.id)}>
          {o.label}
        </OptionButton>
      ))}
      <button onClick={onNext} disabled={!value.length} className={`${buttonStyles.dark} mt-3 w-full`}>
        Continuar <Arrow />
      </button>
    </div>
  );
}

function InfoStep({ title, body, onNext }: { title: string; body: string; onNext: () => void }) {
  return (
    <div className="flex flex-1 flex-col justify-center rounded-[32px] bg-ink p-8 text-paper">
      <SproutIcon className="size-12 animate-sway text-paper" />
      <h1 className="mt-5 font-display text-[1.9rem] font-medium leading-tight">{title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-paper/75">{body}</p>
      <button onClick={onNext} className={`${buttonStyles.primary} mt-8 w-full`}>
        Continuar <Arrow />
      </button>
    </div>
  );
}

function LeadStep({ answers, onDone }: { answers: Answers; onDone: () => void }) {
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
            flags: profile.flags.map((f) => f.id),
          },
          utms: getUtms(),
        }),
      });
      if (!res.ok) throw new Error();
    } catch {
      // Mesmo se o envio falhar, a pessoa vê o resultado. O lead fica no navegador.
      console.error("[lead] falha ao enviar");
    }
    saveQuiz({ answers, parentName: parentName.trim(), savedAt: new Date().toISOString() });
    track("Lead");
    onDone();
  }

  const name = fill("{nome}", answers);

  return (
    <form onSubmit={submit} className="reveal space-y-5">
      <div>
        <h1 className="font-display text-[1.85rem] font-medium leading-tight text-balance">
          Pronto! O perfil de {name} está quase lá.
        </h1>
        <p className="mt-2 text-ink-soft">
          Para onde enviamos o perfil e as primeiras brincadeiras?
        </p>
      </div>

      <Field label="Seu nome">
        <input
          value={parentName}
          onChange={(e) => setParentName(e.target.value)}
          autoComplete="given-name"
          maxLength={60}
          className={inputClass}
        />
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
      <Field label="WhatsApp (opcional)" hint="Para receber a brincadeira do dia.">
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
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 size-5 shrink-0 accent-moss"
        />
        <span>
          Sou responsável pela criança e autorizo o uso destas respostas para gerar o perfil e o plano, conforme a{" "}
          <Link href="/privacidade" target="_blank" className="font-semibold text-ink underline underline-offset-2">
            Política de Privacidade
          </Link>
          . Posso pedir a exclusão a qualquer momento.
        </span>
      </label>
      <label className="flex gap-3 px-4 text-sm text-ink-soft">
        <input
          type="checkbox"
          checked={marketing}
          onChange={(e) => setMarketing(e.target.checked)}
          className="mt-0.5 size-5 shrink-0 accent-moss"
        />
        Quero receber novidades e dicas por e-mail e WhatsApp.
      </label>

      <button type="submit" disabled={!valid || sending} className={`${buttonStyles.primary} w-full`}>
        {sending ? "Enviando…" : "Ver o perfil de " + name}
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

function Analyzing({ name }: { name: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => Math.min(v + 1, ANALYZING.length - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="relative size-28">
        <div className="absolute inset-0 animate-ping rounded-full bg-sage/30" />
        <div className="relative grid size-28 place-items-center rounded-full bg-sage-soft">
          <SproutIcon className="size-14 animate-sway text-ink" />
        </div>
      </div>
      <h1 className="mt-8 font-display text-2xl font-medium">Preparando o perfil de {name}</h1>
      <p key={i} className="reveal mt-2 text-ink-soft">
        {ANALYZING[i]}
      </p>
    </div>
  );
}
