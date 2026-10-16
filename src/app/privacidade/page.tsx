import { Logo } from "@/components/Brand";
import { Footer } from "@/components/Footer";
import { BRAND, CONSENT_VERSION } from "@/lib/config";

export const metadata = { title: `Política de Privacidade · ${BRAND.name}` };

// Minuta. Revisar com advogado (LGPD, dados de criança e de saúde) antes de rodar tráfego.
export default function PrivacyPage() {
  const contact = BRAND.contactEmail ? (
    <a href={`mailto:${BRAND.contactEmail}`} className="font-semibold underline underline-offset-2">
      {BRAND.contactEmail}
    </a>
  ) : (
    "nossos canais de atendimento"
  );

  return (
    <>
      <header className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
        <Logo />
      </header>
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-8 sm:px-6">
        <h1 className="font-display text-4xl font-medium">Política de Privacidade</h1>
        <p className="mt-2 text-sm text-ink-soft">Versão {CONSENT_VERSION}</p>

        <div className="mt-8 space-y-8 leading-relaxed text-ink-soft [&_h2]:mb-2 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
          <section>
            <h2>Quem somos</h2>
            <p>
              O {BRAND.name} é um programa de orientação para pais e cuidadores de crianças pequenas. Não fazemos
              diagnóstico nem tratamento.
            </p>
          </section>
          <section>
            <h2>Quais dados coletamos</h2>
            <ul>
              <li>Seus dados: nome, e-mail e, se você informar, WhatsApp.</li>
              <li>
                Dados sobre a criança: primeiro nome ou apelido, faixa de idade e as respostas do quiz sobre
                comunicação, brincadeira e rotina.
              </li>
              <li>Dados de navegação: origem do acesso (como parâmetros de campanha) e tipo de navegador.</li>
            </ul>
          </section>
          <section>
            <h2>Por que coletamos</h2>
            <ul>
              <li>Gerar o Perfil de Comunicação e o plano de brincadeiras.</li>
              <li>Enviar o resultado e, se você autorizar, dicas e novidades.</li>
              <li>Melhorar o quiz e medir o desempenho das nossas campanhas.</li>
            </ul>
          </section>
          <section>
            <h2>Dados de crianças</h2>
            <p>
              Tratamos dados de crianças apenas com o consentimento específico de um dos pais ou responsável legal,
              e somente para as finalidades acima, como prevê o art. 14 da Lei Geral de Proteção de Dados (LGPD).
              Coletamos o mínimo necessário: não pedimos sobrenome, documento, foto ou endereço da criança.
            </p>
          </section>
          <section>
            <h2>Com quem compartilhamos</h2>
            <p>
              Não vendemos seus dados. Usamos fornecedores que nos ajudam a operar o serviço (hospedagem, banco de
              dados, envio de e-mail e mensagens, pagamento e medição de anúncios), sempre sob contrato e apenas no
              necessário. As respostas sobre a criança não são enviadas para plataformas de anúncio.
            </p>
          </section>
          <section>
            <h2>Por quanto tempo guardamos</h2>
            <p>
              Enquanto você mantiver relação com o {BRAND.name} ou até você pedir a exclusão. Vídeos enviados no
              app, quando existirem, serão apagados automaticamente após 30 dias.
            </p>
          </section>
          <section>
            <h2>Seus direitos</h2>
            <p>
              Você pode pedir acesso, correção, exclusão dos dados e revogar o consentimento a qualquer momento,
              pelo contato {contact}.
            </p>
          </section>
          <section>
            <h2>Segurança</h2>
            <p>
              Os dados ficam em ambiente protegido, com acesso restrito à equipe que precisa deles para operar o
              serviço.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
