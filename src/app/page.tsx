import Link from "next/link";
import { Mascot } from "@/components/art/Mascot";
import { Logo } from "@/components/Brand";
import { Faq } from "@/components/Faq";
import { FeedbackMock } from "@/components/FeedbackMock";
import { Footer } from "@/components/Footer";
import { PhoneMock } from "@/components/PhoneMock";
import { TrackOnView } from "@/components/TrackOnView";
import { Arrow, CtaLink, Eyebrow } from "@/components/ui";
import { WeekDots } from "@/components/WeekDots";
import { BRAND, OFFER, brl } from "@/lib/config";
import { GAMES, SCREEN_LIMIT_MIN } from "@/lib/games";
import { PLAY_STYLES, QUESTION_COUNT } from "@/lib/quiz";

const FAQ = [
  {
    q: "Para quem é?",
    a: "Para pais e cuidadores de crianças de 1 a 6 anos que falam pouco, ainda não falam ou têm diagnóstico de autismo ou atraso de linguagem — e querem saber o que fazer em casa.",
  },
  {
    q: `O ${BRAND.name} substitui a terapia?`,
    a: "Não. Ele foi pensado para as horas em casa, entre uma sessão e outra. Você pode levar o relatório para a equipe que acompanha o seu filho.",
  },
  {
    q: "O app não aumenta o tempo de tela?",
    a: `O centro do app são missões da vida real, sem tela. Os jogos são para jogar junto com um adulto, duram 2 a 3 minutos e têm limite de ${SCREEN_LIMIT_MIN} minutos por dia — e terminam mandando vocês para a brincadeira de verdade.`,
  },
  {
    q: "O quiz é um diagnóstico?",
    a: "Não. É um jeito divertido de conhecer o estilo de brincar do seu filho e escolher por onde começar. Só profissionais de saúde fazem avaliação e diagnóstico.",
  },
  {
    q: "Quanto custa?",
    a: `O quiz, as duas primeiras missões e um jogo são grátis. O app completo terá assinatura de ${brl(OFFER.monthlyPrice)} por mês ou ${brl(OFFER.regularPrice)} por ano. Membros Fundadores pagam ${brl(OFFER.founderPrice)} no primeiro ano.`,
  },
];

export default function Home() {
  return (
    <>
      <TrackOnView event="ViewContent" params={{ content_name: "landing" }} />

      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo />
        <Link href="/quiz" className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper">
          Fazer o quiz
        </Link>
      </header>

      <main className="overflow-x-clip">
        {/* Hero */}
        <section className="relative">
          <div className="absolute inset-x-0 top-0 -z-10 h-[90%] bg-[radial-gradient(ellipse_at_top_right,var(--color-sky-soft),transparent_55%),radial-gradient(ellipse_at_bottom_left,var(--color-clay-soft),transparent_50%)]" />
          <div className="mx-auto grid max-w-6xl gap-14 px-4 pb-20 pt-6 sm:px-6 md:grid-cols-[1.15fr_1fr] md:items-center md:pt-14">
            <div className="space-y-6">
              <div className="reveal inline-flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-sm font-semibold shadow-sm">
                🌱 Para pais de crianças de 1 a 6 anos
              </div>
              <h1
                className="reveal font-display text-[2.7rem] font-medium leading-[1.02] tracking-[-0.02em] text-balance sm:text-6xl lg:text-7xl"
                style={{ ["--d" as string]: "80ms" }}
              >
                A terapia dura 2 horas por semana. <em className="text-clay">As outras 166</em> são com você.
              </h1>
              <p className="reveal max-w-lg text-lg leading-relaxed text-ink-soft" style={{ ["--d" as string]: "160ms" }}>
                Missões de 10 minutos, jogos para fazer <b className="text-ink">juntos</b> e um jardim que cresce a cada
                brincadeira — para estimular a fala e a conexão em casa.
              </p>
              <div className="reveal space-y-3" style={{ ["--d" as string]: "240ms" }}>
                <CtaLink href="/quiz" className="w-full sm:w-auto">
                  Descobrir o estilo do meu filho <Arrow />
                </CtaLink>
                <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-soft">
                  <span>🎮 Quiz em 5 fases</span>
                  <span>⏱️ 3 minutos</span>
                  <span>🎁 2 missões grátis</span>
                </p>
              </div>
            </div>
            <div className="reveal py-6" style={{ ["--d" as string]: "200ms" }}>
              <PhoneMock />
            </div>
          </div>
        </section>

        {/* 166 horas */}
        <section className="bg-ink text-paper">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sage">Faça as contas</p>
              <h2 className="font-display text-4xl font-medium leading-tight">
                Cada bolinha é uma hora da semana do seu filho.
              </h2>
              <p className="text-lg leading-relaxed text-paper/75">
                As duas laranjas são a terapia. Todas as outras acontecem em casa — no banho, na comida, no chão da sala.
                É ali que o {BRAND.name} entra: transformando momentos que já existem em oportunidades de aprender.
              </p>
            </div>
            <div className="text-ink">
              <WeekDots />
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <Eyebrow>Como funciona</Eyebrow>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-medium leading-tight text-balance">
              Parece um jogo. É desenvolvimento de verdade.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <HowCard n="1" title="Descubra o estilo de brincar" bg="bg-lavender/35" visual={<StyleFan />}>
              Um quiz em 5 fases mostra como seu filho brinca, os superpoderes dele e por onde começar.
            </HowCard>
            <HowCard n="2" title="Uma missão por dia, sem tela" bg="bg-butter/45" visual={<MissionVisual />}>
              Brincadeiras de 10 minutos com o que você tem em casa, com passo a passo e o que observar.
            </HowCard>
            <HowCard n="3" title="Veja o jardim crescer" bg="bg-sage-soft" visual={<GrowVisual />}>
              Cada missão rega uma planta. Sementes, sequência de dias, medalhas e um álbum de figurinhas.
            </HowCard>
          </div>
        </section>

        {/* Jogos a dois */}
        <section className="bg-sky-soft/70">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-end">
              <div>
                <Eyebrow>Jogos a dois</Eyebrow>
                <h2 className="mt-3 font-display text-4xl font-medium leading-tight">
                  Quando a tela aparecer, que seja juntos.
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-ink-soft">
                Jogos de 3 minutos para jogar <b className="text-ink">com</b> seu filho no colo. Cada um tem uma pausa
                que convida a olhar, apontar e imitar — e termina mandando vocês para a brincadeira de verdade. Limite de{" "}
                {SCREEN_LIMIT_MIN} minutos por dia.
              </p>
            </div>
            <div className="-mx-4 mt-10 flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0">
              {GAMES.map((g, i) => (
                <div
                  key={g.slug}
                  className={`w-52 shrink-0 snap-start rounded-[28px] ${g.bg} border-4 border-card p-5 shadow-[0_14px_30px_-20px_rgb(30_51_41/0.6)] sm:w-auto ${
                    i % 2 ? "sm:translate-y-6" : ""
                  }`}
                >
                  <div className="grid size-20 animate-float place-items-center rounded-[22px] bg-card text-5xl shadow-sm" style={{ animationDelay: `${i * 0.4}s` }}>
                    {g.emoji}
                  </div>
                  <h3 className="mt-4 font-display text-xl leading-tight">{g.name}</h3>
                  <p className="mt-1.5 text-sm leading-snug text-ink-soft">{g.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <CtaLink href="/app/jogos/cade" variant="dark">
                ▶ Jogar “Cadê o Bicho?”
              </CtaLink>
            </div>
          </div>
        </section>

        {/* Estilos de brincar */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <Eyebrow>Qual é o do seu filho?</Eyebrow>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-medium leading-tight text-balance">
              Toda criança tem um jeito de brincar. Cada jeito tem um caminho.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Object.values(PLAY_STYLES).map((style, i) => (
              <div
                key={style.name}
                className={`rounded-[28px] border-[5px] border-card bg-gradient-to-br ${style.bg} p-5 text-center shadow-[0_20px_40px_-25px_rgb(30_51_41/0.6)] ${
                  i % 2 ? "rotate-[2deg]" : "-rotate-[2deg]"
                }`}
              >
                <div className="mx-auto grid size-20 place-items-center rounded-full bg-card text-5xl shadow">{style.emoji}</div>
                <h3 className="mt-3 font-display text-xl leading-tight">{style.name}</h3>
                <p className="mt-1 text-sm text-ink-soft">{style.tagline}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <CtaLink href="/quiz">
              Descobrir o estilo do meu filho <Arrow />
            </CtaLink>
            <p className="mt-3 text-sm text-ink-soft">Grátis · {QUESTION_COUNT} perguntas em 5 fases</p>
          </div>
        </section>

        {/* Retorno por vídeo */}
        <section className="border-y border-line bg-card/60">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center">
            <FeedbackMock />
            <div className="space-y-5">
              <Eyebrow>“Será que estou fazendo certo?”</Eyebrow>
              <h2 className="font-display text-4xl font-medium leading-tight">
                Filme 1 minuto. Receba um retorno de quem entende.
              </h2>
              <p className="text-lg leading-relaxed text-ink-soft">
                Duas vezes por semana, você grava um trechinho da brincadeira e recebe: o que deu certo, um ajuste e o que
                tentar amanhã. No beta, cada retorno é revisado por fonoaudióloga.
              </p>
              <p className="text-sm text-ink-soft">🔒 Vídeos privados, apagados em 30 dias, nunca usados em anúncios.</p>
            </div>
          </div>
        </section>

        {/* Honestidade */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-8 rounded-[36px] bg-sage-soft p-7 sm:p-10 md:grid-cols-[auto_1fr] md:items-center">
            <Mascot mood="think" className="mx-auto w-28" />
            <div className="space-y-3 text-lg leading-relaxed text-ink-soft">
              <h2 className="font-display text-3xl font-medium text-ink">
                O que o {BRAND.name} <em>não</em> é.
              </h2>
              <p>
                Não é diagnóstico, não é tratamento e não substitui fono, terapeuta ocupacional ou médico. Se algo no quiz
                merecer atenção de um profissional, a gente te avisa com clareza. As brincadeiras seguem a ideia da{" "}
                <b className="text-ink">intervenção mediada pelos pais</b>, uma abordagem estudada há mais de 20 anos.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
          <h2 className="mb-6 font-display text-3xl font-medium">Perguntas frequentes</h2>
          <Faq items={FAQ} />
        </section>

        {/* CTA final */}
        <section className="px-4 pb-24 sm:px-6">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[40px] bg-gradient-to-br from-butter via-clay-soft to-pink px-6 py-14 text-center sm:px-12">
            <Mascot mood="love" className="mx-auto w-28 animate-float" />
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-balance">Comece hoje, com 10 minutos.</h2>
            <p className="mx-auto mt-3 max-w-md text-ink-soft">
              Faça o quiz, descubra o estilo de brincar e ganhe as duas primeiras missões.
            </p>
            <CtaLink href="/quiz" className="mt-7 w-full sm:w-auto">
              Começar o quiz grátis <Arrow />
            </CtaLink>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function HowCard({
  n,
  title,
  bg,
  visual,
  children,
}: {
  n: string;
  title: string;
  bg: string;
  visual: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-[32px] ${bg}`}>
      <div className="grid h-52 place-items-center p-5">{visual}</div>
      <div className="flex-1 bg-card/70 p-6">
        <span className="font-display text-sm font-semibold text-moss">Passo {n}</span>
        <h3 className="mt-1 font-display text-2xl leading-tight">{title}</h3>
        <p className="mt-2 leading-relaxed text-ink-soft">{children}</p>
      </div>
    </div>
  );
}

function StyleFan() {
  return (
    <div className="relative h-40 w-56">
      {Object.values(PLAY_STYLES).map((s, i) => (
        <div
          key={s.name}
          className={`absolute left-1/2 top-2 grid h-36 w-24 place-items-center rounded-2xl border-4 border-card bg-gradient-to-br ${s.bg} text-4xl shadow-lg`}
          style={{ transform: `translateX(-50%) rotate(${(i - 1.5) * 14}deg) translateX(${(i - 1.5) * 26}px)`, transformOrigin: "bottom center" }}
        >
          {s.emoji}
        </div>
      ))}
    </div>
  );
}

function MissionVisual() {
  return (
    <div className="w-60 -rotate-2 rounded-[22px] bg-ink p-4 text-paper shadow-xl">
      <div className="flex items-center gap-3">
        <span className="grid size-12 place-items-center rounded-xl bg-paper text-2xl">🫧</span>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-wider text-butter">Dia 1 · 10 min</p>
          <p className="font-display text-lg leading-tight">Bolhas com pausa</p>
        </div>
      </div>
      <div className="mt-3 space-y-1.5 text-[11px]">
        <p className="rounded-lg bg-paper/10 px-2 py-1.5">✓ Sente na altura dos olhos</p>
        <p className="rounded-lg bg-paper/10 px-2 py-1.5">✓ Sopre e curta junto</p>
        <p className="rounded-lg bg-butter/90 px-2 py-1.5 font-semibold text-ink">→ Pare e espere 5 segundos</p>
      </div>
    </div>
  );
}

function GrowVisual() {
  return (
    <div className="flex items-end gap-1">
      {["🌰", "🌱", "🌿", "🌷", "🌻"].map((e, i) => (
        <span
          key={e}
          className="animate-float"
          style={{ fontSize: `${28 + i * 10}px`, animationDelay: `${i * 0.3}s` }}
        >
          {e}
        </span>
      ))}
      <span className="ml-1 rounded-full bg-card px-2 py-1 text-xs font-bold shadow">+50 🌱</span>
    </div>
  );
}

