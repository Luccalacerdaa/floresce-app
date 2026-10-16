import Link from "next/link";
import { Logo, SproutIcon } from "@/components/Brand";
import { Footer } from "@/components/Footer";
import { buttonStyles } from "@/components/ui";
import { BRAND, OFFER } from "@/lib/config";

export const metadata = { title: `Bem-vindo(a), Membro Fundador · ${BRAND.name}` };

// Página de retorno do checkout. O evento Purchase do Pixel deve ser disparado pela
// integração do gateway (Kirvano), que conhece o valor real — não aqui, para não contar em dobro.
export default function ThanksPage() {
  return (
    <>
      <header className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
        <Logo />
      </header>
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-10 text-center sm:px-6">
        <div className="mx-auto grid size-24 place-items-center rounded-full bg-butter/60">
          <SproutIcon className="size-14 animate-sway text-ink" />
        </div>
        <h1 className="reveal mt-8 font-display text-4xl font-medium leading-tight text-balance">
          Bem-vindo(a), Membro Fundador.
        </h1>
        <p className="reveal mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink-soft" style={{ ["--d" as string]: "100ms" }}>
          Obrigado por acreditar no {BRAND.name} desde o começo. Você vai construir esse app com a gente.
        </p>

        <ol className="mt-10 space-y-3 text-left">
          {[
            "Confira seu e-mail: o comprovante do pagamento chega por lá.",
            `O acesso ao beta está previsto para ${OFFER.betaLaunch}. Você recebe o convite por e-mail e WhatsApp.`,
            "Enquanto isso, comece pelas duas brincadeiras do perfil — 10 minutos por dia já contam.",
          ].map((item, i) => (
            <li key={item} className="flex gap-4 rounded-[20px] bg-card p-5 leading-relaxed">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sage-soft font-bold text-moss">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {OFFER.foundersGroupUrl && (
            <a href={OFFER.foundersGroupUrl} className={buttonStyles.primary}>
              Entrar no grupo dos fundadores
            </a>
          )}
          <Link href="/resultado" className={buttonStyles.ghost}>
            Ver as brincadeiras de novo
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
