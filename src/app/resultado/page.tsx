"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useSyncExternalStore } from "react";
import { Logo, SproutIcon } from "@/components/Brand";
import { CheckoutButton } from "@/components/CheckoutButton";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/ui";
import { ACTIVITIES, PLAN_PREVIEW, type Activity } from "@/lib/activities";
import { BRAND, OFFER, brl } from "@/lib/config";
import { computeProfile, PILLARS, STAGES, type Profile, type Stage } from "@/lib/quiz";
import { loadQuiz } from "@/lib/storage";
import { track } from "@/lib/tracking";

const subscribe = () => () => {};
const readQuiz = () => {
  const saved = loadQuiz();
  return saved ? JSON.stringify(saved) : "";
};

export default function ResultPage() {
  const router = useRouter();
  const raw = useSyncExternalStore(subscribe, readQuiz, () => null);
  const profile = useMemo(() => (raw ? computeProfile(JSON.parse(raw).answers) : null), [raw]);

  useEffect(() => {
    if (raw === "") router.replace("/quiz");
    if (raw) track("ViewContent", { content_name: "resultado" });
  }, [raw, router]);

  if (!profile) return <div className="min-h-dvh" />;

  return (
    <>
      <header className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo />
        <a href="#fundador" className="text-sm font-semibold text-clay underline-offset-4 hover:underline">
          Garantir vaga no beta
        </a>
      </header>

      <main className="mx-auto max-w-3xl space-y-14 px-4 pb-20 pt-4 sm:px-6">
        <Hero profile={profile} />
        <Pillars profile={profile} />
        <Alerts profile={profile} />
        <FirstActivities profile={profile} />
        <PlanPreview />
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

function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="reveal space-y-4">
      <Eyebrow>Perfil de Comunicação</Eyebrow>
      <h1 className="font-display text-[2.4rem] font-medium leading-[1.05] tracking-[-0.01em] text-balance sm:text-5xl">
        {profile.name} tem muito para <em className="text-moss">florescer</em>.
      </h1>
      <p className="text-lg leading-relaxed text-ink-soft">
        {profile.ageLabel && <>Faixa: {profile.ageLabel.toLowerCase()}. </>}
        Este é um retrato de como {profile.name} se comunica hoje, para escolher por onde começar as brincadeiras.
      </p>
      <p className="inline-flex items-center gap-2 rounded-full bg-paper-2 px-3.5 py-1.5 text-xs font-semibold text-ink-soft">
        ⓘ Não é diagnóstico nem avaliação clínica
      </p>
    </section>
  );
}

const STAGE_STYLE: Record<Stage, { bar: string; chip: string }> = {
  semente: { bar: "bg-clay", chip: "bg-clay-soft text-clay-deep" },
  broto: { bar: "bg-butter", chip: "bg-butter/40 text-ink" },
  flor: { bar: "bg-moss", chip: "bg-sage-soft text-moss" },
};

function Pillars({ profile }: { profile: Profile }) {
  return (
    <section className="rounded-[28px] border border-line bg-card p-5 sm:p-7">
      <div className="space-y-5">
        {profile.pillars.map((p, i) => (
          <div key={p.key} className="reveal" style={{ ["--d" as string]: `${i * 90}ms` }}>
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-semibold">{PILLARS[p.key].label}</h3>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${STAGE_STYLE[p.stage].chip}`}>
                {STAGES[p.stage].label}
              </span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-paper-2">
              <div
                className={`h-full rounded-full ${STAGE_STYLE[p.stage].bar} origin-left animate-grow`}
                style={{ width: `${Math.max(8, Math.round(p.score * 100))}%`, animationDelay: `${200 + i * 90}ms` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1 border-t border-line pt-4 text-xs text-ink-soft">
        {(Object.keys(STAGES) as Stage[]).map((s) => (
          <span key={s}>
            <b className="text-ink">{STAGES[s].label}</b> · {STAGES[s].hint}
          </span>
        ))}
      </div>
    </section>
  );
}

function Alerts({ profile }: { profile: Profile }) {
  const strong = profile.flags.filter((f) => f.strong);
  const visible = profile.hasDiagnosis ? strong : profile.flags;

  if (profile.hasDiagnosis && !visible.length) {
    return (
      <section className="rounded-[24px] bg-sage-soft p-6">
        <h2 className="font-display text-xl font-medium">Leve este perfil para a equipe de {profile.name}</h2>
        <p className="mt-2 leading-relaxed text-ink-soft">
          O plano de brincadeiras funciona melhor alinhado com quem já acompanha {profile.name}. Mostre o perfil
          e as brincadeiras para a fono ou terapeuta e peça a opinião delas.
        </p>
      </section>
    );
  }
  if (!visible.length) return null;

  return (
    <section className="rounded-[24px] border-2 border-clay/30 bg-clay-soft/40 p-6">
      <h2 className="font-display text-xl font-medium">Pontos para conversar com um profissional</h2>
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

function FirstActivities({ profile }: { profile: Profile }) {
  return (
    <section className="space-y-6">
      <div>
        <Eyebrow>Por onde começar</Eyebrow>
        <h2 className="mt-2 font-display text-3xl font-medium leading-tight">
          Foco em {PILLARS[profile.focus[0]].label.toLowerCase()} e {PILLARS[profile.focus[1]].label.toLowerCase()}
        </h2>
        <p className="mt-2 text-ink-soft">
          Duas brincadeiras para você começar hoje — presentes do {BRAND.name}.
        </p>
      </div>
      {profile.focus.map((key, i) => (
        <ActivityCard key={key} n={i + 1} activity={ACTIVITIES[key]} pillar={PILLARS[key].label} name={profile.name} />
      ))}
    </section>
  );
}

function ActivityCard({ n, activity, pillar, name }: { n: number; activity: Activity; pillar: string; name: string }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-line bg-card">
      <div className="flex items-center justify-between bg-ink px-6 py-4 text-paper">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-sage">Dia {n} · {pillar}</span>
        <span className="text-sm text-paper/70">{activity.minutes} min</span>
      </div>
      <div className="space-y-4 p-6">
        <h3 className="font-display text-2xl font-medium">{activity.title}</h3>
        <p className="leading-relaxed text-ink-soft">{fillName(activity.why, name)}</p>
        <p className="text-sm">
          <b>Material:</b> {fillName(activity.material, name)}
        </p>
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
        <p className="rounded-[18px] bg-paper-2 p-4 text-sm leading-relaxed">
          <b>👀 O que observar:</b> {fillName(activity.observe, name)}
        </p>
      </div>
    </article>
  );
}

function PlanPreview() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-line bg-card p-6">
      <h2 className="font-display text-xl font-medium">Os próximos 28 dias do plano</h2>
      <ul className="mt-4 space-y-2.5 select-none blur-[3px]" aria-hidden>
        {PLAN_PREVIEW.map((item) => (
          <li key={item} className="rounded-2xl bg-paper px-4 py-3 text-ink-soft">
            {item}
          </li>
        ))}
      </ul>
      <div className="absolute inset-x-0 bottom-0 flex h-2/3 items-end justify-center bg-gradient-to-t from-card via-card/90 to-transparent p-6">
        <a href="#fundador" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper">
          🔒 Disponível no app · ver acesso de fundador
        </a>
      </div>
    </section>
  );
}

function Offer({ name }: { name: string }) {
  const perMonth = OFFER.founderPrice / 12;
  const items = [
    `Plano diário personalizado para ${name}, que se ajusta ao progresso`,
    "Retorno sobre 2 vídeos por semana, revisado por fonoaudióloga no beta",
    "Biblioteca com dezenas de brincadeiras para a rotina",
    "Relatório mensal para levar ao pediatra ou à terapeuta",
    "Preço de fundador garantido e canal direto para sugerir melhorias",
  ];
  return (
    <section id="fundador" className="scroll-mt-6">
      <div className="relative overflow-hidden rounded-[32px] bg-ink p-7 text-paper sm:p-10">
        <SproutIcon className="absolute -right-6 -top-6 size-40 rotate-12 text-paper opacity-10" />
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-butter">Pré-venda · Membro Fundador</p>
        <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-balance sm:text-4xl">
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
          <p className="mt-1 text-sm text-ink-soft">
            Equivale a {brl(perMonth)} por mês. Pagamento único, parcelável no cartão.
          </p>
          <CheckoutButton label="Garantir minha vaga" className="mt-5" />
          <div className="mt-5 space-y-2 text-sm leading-relaxed text-ink-soft">
            <p>
              <b className="text-ink">Garantia de 7 dias:</b> se mudar de ideia, devolvemos 100% do valor.
            </p>
            <p>
              <b className="text-ink">Garantia de lançamento:</b> se o app não for liberado até{" "}
              {OFFER.refundIfNotLaunchedBy}, você recebe tudo de volta.
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
    a: `O acesso ao beta está previsto para ${OFFER.betaLaunch}. Até lá, você já pode usar as duas brincadeiras deste perfil e vai receber novidades da construção do app.`,
  },
  {
    q: "E depois do primeiro ano?",
    a: `Você escolhe se quer continuar. Se continuar, o preço será o da assinatura anual vigente (hoje ${brl(OFFER.regularPrice)}). O pagamento de fundador é único: não há renovação automática.`,
  },
  {
    q: "Funciona para crianças com autismo?",
    a: "Sim, o plano foi pensado para crianças com atraso de fala e para crianças autistas, sempre como complemento do acompanhamento profissional.",
  },
  {
    q: "Preciso filmar meu filho?",
    a: "Não. O vídeo é opcional. Se você quiser enviar, ele fica guardado de forma privada e é apagado depois de 30 dias.",
  },
];
