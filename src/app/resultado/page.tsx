"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useSyncExternalStore } from "react";
import { Confetti } from "@/components/art/Confetti";
import { GardenScene, PILLAR_PLANT, Plant, type GrowthStage } from "@/components/art/Garden";
import { Mascot } from "@/components/art/Mascot";
import { Logo } from "@/components/Brand";
import { CheckoutButton } from "@/components/CheckoutButton";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/ui";
import { ACTIVITIES, type Activity } from "@/lib/activities";
import { BRAND, OFFER, brl } from "@/lib/config";
import { GAMES } from "@/lib/games";
import { computeProfile, PILLARS, PLAY_STYLES, STAGES, type PillarKey, type Profile } from "@/lib/quiz";
import { loadQuiz, type SavedQuiz } from "@/lib/storage";
import { track } from "@/lib/tracking";

const subscribe = () => () => {};
const readQuiz = () => {
  const saved = loadQuiz();
  return saved ? JSON.stringify(saved) : "";
};

export default function ResultPage() {
  const router = useRouter();
  const raw = useSyncExternalStore(subscribe, readQuiz, () => null);
  const saved = useMemo(() => (raw ? (JSON.parse(raw) as SavedQuiz) : null), [raw]);
  const profile = useMemo(() => (saved ? computeProfile(saved.answers) : null), [saved]);

  useEffect(() => {
    if (raw === "") router.replace("/quiz");
    if (raw) track("ViewContent", { content_name: "resultado" });
  }, [raw, router]);

  if (!profile || !saved) return <div className="min-h-dvh" />;

  return (
    <>
      <Confetti seed={1} count={36} />
      <header className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo />
        <span className="rounded-full bg-butter/50 px-3 py-1.5 text-sm font-bold">🌱 {saved.seeds ?? 0}</span>
      </header>

      <main className="mx-auto max-w-3xl space-y-16 px-4 pb-20 pt-2 sm:px-6">
        <StyleCard profile={profile} />
        <GardenSection profile={profile} />
        <Alerts profile={profile} />
        <Missions profile={profile} />
        <GamesTeaser name={profile.name} />
        <Trail />
        <Offer name={profile.name} />
        <section>
          <h2 className="mb-5 font-display text-2xl font-medium">Dúvidas sobre o Membro Fundador</h2>
          <Faq items={OFFER_FAQ} />
        </section>
      </main>
      <Footer />
    </>
  );
}

function StyleCard({ profile }: { profile: Profile }) {
  const style = PLAY_STYLES[profile.style];
  return (
    <section className="space-y-5">
      <div className="reveal text-center">
        <Eyebrow>Resultado desbloqueado</Eyebrow>
        <h1 className="mt-2 font-display text-[2.2rem] font-medium leading-[1.05] text-balance">
          Conheça o estilo de brincar de {profile.name}
        </h1>
      </div>

      <div className="reveal mx-auto max-w-sm [perspective:1000px]" style={{ ["--d" as string]: "150ms" }}>
        <article
          className={`relative rotate-[-1.5deg] overflow-hidden rounded-[32px] border-[6px] border-card bg-gradient-to-br ${style.bg} p-6 shadow-[0_30px_60px_-25px_rgb(30_51_41/0.55)]`}
        >
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-ink/70">
            <span>Estilo de brincar</span>
            <span>{profile.ageLabel}</span>
          </div>
          <div className="mt-5 grid place-items-center">
            <div className="grid size-32 animate-float place-items-center rounded-full bg-card text-7xl shadow-xl">
              {style.emoji}
            </div>
          </div>
          <p className="mt-5 text-center font-display text-lg">{profile.name} é</p>
          <h2 className="text-center font-display text-4xl font-semibold">{style.name}</h2>
          <p className="mt-1 text-center text-ink-soft">{style.tagline}</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-[20px] bg-card/80 p-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-moss">⚡ Superpoderes</p>
              {profile.strengths.map((k) => (
                <p key={k} className="mt-1 text-sm font-semibold leading-tight">
                  {PILLARS[k].label}
                </p>
              ))}
            </div>
            <div className="rounded-[20px] bg-card/80 p-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-clay">🎯 Próximas flores</p>
              {profile.focus.map((k) => (
                <p key={k} className="mt-1 text-sm font-semibold leading-tight">
                  {PILLARS[k].label}
                </p>
              ))}
            </div>
          </div>
        </article>
      </div>

      <div className="reveal mx-auto flex max-w-md items-start gap-3 rounded-[24px] bg-card p-4" style={{ ["--d" as string]: "300ms" }}>
        <Mascot mood="love" className="size-14 shrink-0" />
        <p className="leading-relaxed">
          <b>Dica para o estilo {style.name}:</b> {style.tip}
        </p>
      </div>
      <p className="text-center text-xs text-ink-soft">ⓘ É um jeito divertido de olhar para o brincar — não é diagnóstico.</p>
    </section>
  );
}

function growthOf(profile: Profile, key: PillarKey): GrowthStage {
  const p = profile.pillars.find((x) => x.key === key)!;
  return STAGES[p.stage].growth;
}

function GardenSection({ profile }: { profile: Profile }) {
  const stages = Object.fromEntries(profile.pillars.map((p) => [p.key, STAGES[p.stage].growth])) as Record<
    PillarKey,
    GrowthStage
  >;
  return (
    <section className="space-y-5">
      <div>
        <Eyebrow>O jardim de {profile.name}</Eyebrow>
        <h2 className="mt-2 font-display text-3xl font-medium leading-tight">Cada área do desenvolvimento é uma planta.</h2>
        <p className="mt-2 text-ink-soft">
          No app, cada brincadeira que vocês fazem rega o jardim — e você vê as flores abrindo.
        </p>
      </div>
      <div className="overflow-hidden rounded-[32px] shadow-[0_20px_50px_-30px_rgb(30_51_41/0.6)]">
        <GardenScene stages={stages} className="block w-full" />
      </div>
      <ul className="space-y-2.5">
        {profile.pillars.map((p) => (
          <li key={p.key} className="flex items-center gap-3 rounded-[20px] bg-card p-3 pr-4">
            <Plant pillar={p.key} stage={growthOf(profile, p.key)} className="h-14 w-10 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold leading-tight">{PILLARS[p.key].label}</p>
              <p className="text-xs text-ink-soft">{PILLAR_PLANT[p.key].name}</p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                p.stage === "flor" ? "bg-sage-soft text-moss" : p.stage === "broto" ? "bg-butter/50" : "bg-clay-soft text-clay-deep"
              }`}
            >
              {STAGES[p.stage].label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Alerts({ profile }: { profile: Profile }) {
  const strong = profile.flags.filter((f) => f.strong);
  const visible = profile.hasDiagnosis ? strong : profile.flags;

  if (profile.hasDiagnosis && !visible.length) {
    return (
      <section className="rounded-[24px] bg-sage-soft p-6">
        <h2 className="font-display text-xl font-medium">Leve este resultado para a equipe de {profile.name}</h2>
        <p className="mt-2 leading-relaxed text-ink-soft">
          As brincadeiras funcionam melhor alinhadas com quem já acompanha {profile.name}. Mostre para a fono ou
          terapeuta e peça a opinião delas.
        </p>
      </section>
    );
  }
  if (!visible.length) return null;

  return (
    <section className="rounded-[24px] border-2 border-clay/30 bg-clay-soft/40 p-6">
      <h2 className="font-display text-xl font-medium">💬 Pontos para conversar com um profissional</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        Isto não é um diagnóstico. São sinais que, segundo os marcos do desenvolvimento, merecem ser comentados com
        o pediatra ou uma fonoaudióloga. Começar as brincadeiras não substitui essa conversa — e não precisa esperar
        por ela.
      </p>
      <ul className="mt-4 space-y-3">
        {visible.map((f) => (
          <li key={f.id} className="flex gap-3 leading-relaxed">
            <span className={`mt-2 size-2 shrink-0 rounded-full ${f.strong ? "bg-clay" : "bg-ink-soft"}`} />
            <span className={f.strong ? "font-semibold" : ""}>{f.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function fillName(text: string, name: string) {
  return text.replaceAll("{nome}", name);
}

function Missions({ profile }: { profile: Profile }) {
  return (
    <section className="space-y-6">
      <div>
        <Eyebrow>🎁 Presente: suas 2 primeiras missões</Eyebrow>
        <h2 className="mt-2 font-display text-3xl font-medium leading-tight">
          Para fazer crescer {PILLAR_PLANT[profile.focus[0]].name.toLowerCase()} e{" "}
          {PILLAR_PLANT[profile.focus[1]].name.toLowerCase()}
        </h2>
        <p className="mt-2 text-ink-soft">Brincadeiras da vida real, sem tela, com o que você tem em casa.</p>
      </div>
      {profile.focus.map((key, i) => (
        <MissionCard key={key} n={i + 1} activity={ACTIVITIES[key]} pillar={key} name={profile.name} />
      ))}
    </section>
  );
}

function MissionCard({ n, activity, pillar, name }: { n: number; activity: Activity; pillar: PillarKey; name: string }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-line bg-card">
      <div className="flex items-center gap-3 bg-ink px-5 py-4 text-paper">
        <Plant pillar={pillar} stage={2} className="h-12 w-8 shrink-0" />
        <div className="flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-sage">Missão {n} · {PILLARS[pillar].label}</p>
          <h3 className="font-display text-xl">{activity.title}</h3>
        </div>
        <span className="rounded-full bg-butter px-2.5 py-1 text-xs font-extrabold text-ink">+50 🌱</span>
      </div>
      <div className="space-y-4 p-5">
        <p className="leading-relaxed text-ink-soft">{fillName(activity.why, name)}</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-paper-2 px-3 py-1">⏱️ {activity.minutes} min</span>
          <span className="rounded-full bg-paper-2 px-3 py-1">🧺 {fillName(activity.material, name)}</span>
        </div>
        <ol className="space-y-3">
          {activity.steps.map((s, i) => (
            <li key={i} className="flex gap-3 leading-relaxed">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sage-soft text-sm font-bold text-moss">
                {i + 1}
              </span>
              {fillName(s, name)}
            </li>
          ))}
        </ol>
        <p className="rounded-[18px] bg-butter/30 p-4 text-sm leading-relaxed">
          <b>👀 O que observar:</b> {fillName(activity.observe, name)}
        </p>
      </div>
    </article>
  );
}

function GamesTeaser({ name }: { name: string }) {
  return (
    <section className="space-y-5">
      <div>
        <Eyebrow>Jogos a dois</Eyebrow>
        <h2 className="mt-2 font-display text-3xl font-medium leading-tight">E quando a tela aparecer, que seja juntos.</h2>
        <p className="mt-2 text-ink-soft">
          Jogos de 2 a 3 minutos para jogar <b>com</b> seu filho — cada um com uma pausa que convida a olhar, apontar e
          imitar. No máximo 5 minutos por dia.
        </p>
      </div>
      <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {GAMES.filter((g) => g.kind === "jogo").map((g) => (
          <div key={g.slug} className={`w-44 shrink-0 snap-start rounded-[26px] ${g.bg} p-4`}>
            <div className="grid size-16 place-items-center rounded-2xl bg-card text-4xl shadow-sm">{g.emoji}</div>
            <h3 className="mt-3 font-display text-lg leading-tight">{g.name}</h3>
            <p className="mt-1 text-xs leading-snug text-ink-soft">{g.desc}</p>
          </div>
        ))}
      </div>
      <Link
        href="/app/jogos/cade"
        className="flex items-center justify-between rounded-[24px] bg-ink p-5 text-paper transition hover:bg-ink/90"
      >
        <span>
          <span className="block text-xs font-bold uppercase tracking-[0.16em] text-butter">Grátis agora</span>
          <span className="font-display text-xl">Jogar “Cadê o Bicho?” com {name}</span>
        </span>
        <span className="grid size-12 place-items-center rounded-full bg-butter text-2xl">▶</span>
      </Link>
    </section>
  );
}

function Trail() {
  const days = [
    { d: 1, e: "🫧", done: true },
    { d: 2, e: "🍌", done: true },
    { d: 3, e: "🎵" },
    { d: 4, e: "🛁" },
    { d: 5, e: "🙈" },
    { d: 6, e: "🧺" },
    { d: 7, e: "🏆" },
  ];
  return (
    <section className="relative overflow-hidden rounded-[32px] bg-sage-soft p-6">
      <Eyebrow>A trilha de 30 dias</Eyebrow>
      <h2 className="mt-2 font-display text-2xl font-medium">Uma missão por dia. O jardim cresce junto.</h2>
      <div className="mt-6 flex flex-col items-center gap-3">
        {days.map((day, i) => (
          <div
            key={day.d}
            className="flex items-center"
            style={{ transform: `translateX(${Math.round(Math.sin(i * 1.1) * 70)}px)` }}
          >
            <div
              className={`grid size-16 place-items-center rounded-full text-2xl shadow-[0_6px_0_-1px_rgb(30_51_41/0.25)] ${
                day.done ? "bg-moss" : i === 2 ? "bg-butter ring-4 ring-butter/40" : "bg-card opacity-70"
              }`}
            >
              {day.done ? "✓" : i > 2 ? "🔒" : day.e}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex h-1/3 items-end justify-center bg-gradient-to-t from-sage-soft to-transparent p-6">
        <a href="#fundador" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper">
          🔓 Liberar a trilha completa
        </a>
      </div>
    </section>
  );
}

function Offer({ name }: { name: string }) {
  const perMonth = OFFER.founderPrice / 12;
  const items = [
    `Trilha diária de missões para ${name}, que se ajusta ao progresso`,
    "Jogos a dois para fazer juntos (com limite de tela)",
    "O jardim que cresce, conquistas e álbum de figurinhas",
    "Retorno sobre 2 vídeos por semana, revisado por fonoaudióloga no beta",
    "Relatório mensal para levar ao pediatra ou à terapeuta",
  ];
  return (
    <section id="fundador" className="scroll-mt-6">
      <div className="relative overflow-hidden rounded-[32px] bg-ink p-7 text-paper sm:p-10">
        <Mascot mood="love" className="absolute -right-4 -top-2 size-28 rotate-12 opacity-90" />
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-butter">Pré-venda · Membro Fundador</p>
        <h2 className="mt-3 max-w-[85%] font-display text-3xl font-medium leading-tight text-balance sm:text-4xl">
          Garanta o app completo para {name} com preço de fundador.
        </h2>
        <p className="mt-3 leading-relaxed text-paper/75">
          O {BRAND.name} está em construção, com acesso previsto para {OFFER.betaLaunch}. Quem entra agora ajuda a
          construir o app e paga menos no primeiro ano.
          {OFFER.spots && <> Vagas do beta limitadas a {OFFER.spots} famílias.</>}
        </p>

        <ul className="mt-6 space-y-3">
          {items.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed">
              <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-moss text-[11px]">✓</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-[24px] bg-paper p-6 text-ink">
          <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
            <span className="font-display text-5xl font-semibold">{brl(OFFER.founderPrice)}</span>
            <span className="pb-2 text-ink-soft">
              no 1º ano · <s>{brl(OFFER.regularPrice)}</s>
            </span>
          </div>
          <p className="mt-1 text-sm text-ink-soft">Equivale a {brl(perMonth)} por mês. Pagamento único, parcelável no cartão.</p>
          <CheckoutButton label="Garantir minha vaga" className="mt-5" />
          <div className="mt-5 space-y-2 text-sm leading-relaxed text-ink-soft">
            <p>
              <b className="text-ink">Garantia de 7 dias:</b> se mudar de ideia, devolvemos 100% do valor.
            </p>
            <p>
              <b className="text-ink">Garantia de lançamento:</b> se o app não for liberado até {OFFER.refundIfNotLaunchedBy},
              você recebe tudo de volta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const OFFER_FAQ = [
  {
    q: "Quando eu começo a usar?",
    a: `O acesso ao beta está previsto para ${OFFER.betaLaunch}. Até lá, você já pode fazer as duas missões deste resultado e jogar o “Cadê o Bicho?”.`,
  },
  {
    q: "E depois do primeiro ano?",
    a: `Você escolhe se quer continuar. Se continuar, o preço será o da assinatura anual vigente (hoje ${brl(OFFER.regularPrice)}). O pagamento de fundador é único: não há renovação automática.`,
  },
  {
    q: "Mas o app não aumenta o tempo de tela?",
    a: "O centro do app são as missões da vida real, sem tela. Os jogos são para jogar junto com um adulto, duram 2 a 3 minutos e têm limite de 5 minutos por dia.",
  },
  {
    q: "Funciona para crianças com autismo?",
    a: "Sim, foi pensado para crianças com atraso de fala e para crianças autistas, sempre como complemento do acompanhamento profissional.",
  },
];
