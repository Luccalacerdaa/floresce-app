import { Logo, SproutIcon } from "@/components/Brand";
import { Faq } from "@/components/Faq";
import { FeedbackMock } from "@/components/FeedbackMock";
import { Footer } from "@/components/Footer";
import { TrackOnView } from "@/components/TrackOnView";
import { Arrow, CtaLink, Eyebrow } from "@/components/ui";
import { WeekDots } from "@/components/WeekDots";
import { BRAND, OFFER, brl } from "@/lib/config";
import { PILLARS, QUESTION_COUNT } from "@/lib/quiz";

const STEPS = [
  {
    n: "1",
    title: "Responda o quiz",
    text: "Em 3 minutos você recebe o Perfil de Comunicação do seu filho, com os pontos fortes e onde começar.",
  },
  {
    n: "2",
    title: "Brinque 10 minutos por dia",
    text: "Um plano diário com brincadeiras simples, feitas com o que você tem em casa, no banho, na comida, no chão da sala.",
  },
  {
    n: "3",
    title: "Filme 1 minuto e receba retorno",
    text: "Você grava um trechinho da brincadeira e recebe um retorno prático: o que deu certo, um ajuste e o que tentar amanhã.",
  },
];

const FAQ = [
  {
    q: "Para quem é?",
    a: "Para pais e cuidadores de crianças de 1 a 6 anos que falam pouco, ainda não falam ou têm diagnóstico de autismo ou atraso de linguagem — e querem saber o que fazer em casa.",
  },
  {
    q: `O ${BRAND.name} substitui a terapia?`,
    a: "Não. Ele foi pensado para as horas em casa, entre uma sessão e outra. Você pode levar o relatório para a equipe que acompanha o seu filho. Se ainda não houve avaliação, o perfil também mostra quando vale procurar um profissional.",
  },
  {
    q: "O quiz é um diagnóstico?",
    a: "Não. É um retrato da comunicação do seu filho hoje, para montar o plano de brincadeiras. Só profissionais de saúde podem fazer avaliação e diagnóstico.",
  },
  {
    q: "Quanto custa?",
    a: `O quiz e as primeiras brincadeiras são grátis. O app completo terá assinatura de ${brl(OFFER.monthlyPrice)} por mês ou ${brl(OFFER.regularPrice)} por ano. Quem entrar agora como Membro Fundador paga ${brl(OFFER.founderPrice)} no primeiro ano.`,
  },
  {
    q: "E os vídeos do meu filho?",
    a: "O envio de vídeo é opcional. Os vídeos ficam guardados de forma privada, são apagados depois de 30 dias e nunca são usados em anúncios.",
  },
];

export default function Home() {
  return (
    <>
      <TrackOnView event="ViewContent" params={{ content_name: "landing" }} />

      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo />
        <a href="/quiz" className="text-sm font-semibold text-clay underline-offset-4 hover:underline">
          Fazer o quiz
        </a>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-5xl gap-10 px-4 pb-16 pt-6 sm:px-6 md:grid-cols-[1.1fr_1fr] md:items-center md:pt-12">
          <div className="space-y-6">
            <div className="reveal" style={{ ["--d" as string]: "0ms" }}>
              <Eyebrow>Para pais de crianças de 1 a 6 anos</Eyebrow>
            </div>
            <h1
              className="reveal font-display text-[2.6rem] font-medium leading-[1.02] tracking-[-0.02em] text-balance sm:text-6xl"
              style={{ ["--d" as string]: "80ms" }}
            >
              A terapia dura 2 horas por semana. <em className="text-clay">As outras 166</em> são com você.
            </h1>
            <p
              className="reveal max-w-md text-lg leading-relaxed text-ink-soft"
              style={{ ["--d" as string]: "160ms" }}
            >
              Brincadeiras de 10 minutos por dia, um plano feito para o seu filho e retorno sobre o que você
              está fazendo — para estimular a fala e a conexão em casa.
            </p>
            <div className="reveal space-y-3" style={{ ["--d" as string]: "240ms" }}>
              <CtaLink href="/quiz" className="w-full sm:w-auto">
                Descobrir o perfil do meu filho <Arrow />
              </CtaLink>
              <p className="text-sm text-ink-soft">
                Grátis · 3 minutos · {QUESTION_COUNT} perguntas
              </p>
            </div>
          </div>
          <div className="reveal" style={{ ["--d" as string]: "200ms" }}>
            <WeekDots />
          </div>
        </section>

        {/* Como funciona */}
        <section className="border-y border-line bg-card/60">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <Eyebrow>Como funciona</Eyebrow>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-medium leading-tight sm:text-4xl">
              Você não precisa virar terapeuta. Precisa saber o que fazer amanhã.
            </h2>
            <ol className="mt-10 grid gap-5 md:grid-cols-3">
              {STEPS.map((step) => (
                <li key={step.n} className="rounded-[24px] border border-line bg-paper p-6">
                  <span className="font-display text-5xl font-semibold text-sage">{step.n}</span>
                  <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Retorno por vídeo */}
        <section className="mx-auto grid max-w-5xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center">
          <FeedbackMock />
          <div className="space-y-5">
            <Eyebrow>O diferencial</Eyebrow>
            <h2 className="font-display text-3xl font-medium leading-tight sm:text-4xl">
              Como se tivesse alguém do seu lado dizendo: “isso, agora espera um pouquinho”.
            </h2>
            <p className="text-lg leading-relaxed text-ink-soft">
              A maior dúvida dos pais é: “será que estou fazendo certo?”. No {BRAND.name}, você filma 1 minuto
              da brincadeira e recebe um retorno simples e acolhedor — revisado por fonoaudióloga durante o beta.
            </p>
            <ul className="space-y-2 text-ink-soft">
              {["Sem julgamento, sem termos difíceis", "Um ajuste por vez", "Vídeos privados, apagados em 30 dias"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3">
                    <SproutIcon className="size-5 shrink-0 text-moss" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
        </section>

        {/* Pilares */}
        <section className="bg-ink text-paper">
          <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sage">O que o plano trabalha</p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-medium leading-tight sm:text-4xl">
              A fala floresce de uma base. O plano cuida dela inteira.
            </h2>
            <div className="mt-10 grid gap-px overflow-hidden rounded-[24px] bg-paper/15 sm:grid-cols-2 lg:grid-cols-3">
              {Object.values(PILLARS).map((pillar) => (
                <div key={pillar.label} className="bg-ink p-6">
                  <h3 className="font-display text-xl">{pillar.label}</h3>
                  <p className="mt-2 leading-relaxed text-paper/70">{pillar.about}</p>
                </div>
              ))}
              <div className="grid place-items-center bg-clay p-6 text-center">
                <a href="/quiz" className="font-semibold underline-offset-4 hover:underline">
                  Ver o perfil do meu filho →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Honestidade */}
        <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <div className="grid gap-8 rounded-[32px] border border-line bg-card p-7 sm:p-10 md:grid-cols-[1fr_1.3fr]">
            <h2 className="font-display text-3xl font-medium leading-tight">
              O que o {BRAND.name} <em>não</em> é.
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                Não é diagnóstico, não é tratamento e não substitui fono, terapeuta ocupacional ou médico. Se algo
                no quiz merecer atenção de um profissional, a gente te avisa com clareza.
              </p>
              <p>
                É um apoio para as horas em casa — as que mais pesam, e para as quais quase ninguém te ensina o que
                fazer. As brincadeiras seguem a ideia da <b className="text-ink">intervenção mediada pelos pais</b>,
                uma abordagem estudada há mais de 20 anos.
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
          <div className="mx-auto max-w-3xl rounded-[32px] bg-clay-soft/70 px-6 py-12 text-center sm:px-12">
            <SproutIcon className="mx-auto size-12 animate-sway text-ink" />
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-balance sm:text-4xl">
              Comece hoje, com 10 minutos.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-ink-soft">
              Responda o quiz e receba de graça o perfil e as duas primeiras brincadeiras.
            </p>
            <CtaLink href="/quiz" className="mt-7 w-full sm:w-auto">
              Fazer o quiz grátis <Arrow />
            </CtaLink>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
