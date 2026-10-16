// Tudo que muda entre testes (nome, preço, links) fica aqui ou no .env.local.

export const BRAND = {
  name: "Floresce",
  promise: "Brincadeiras de 10 minutos que estimulam a fala e a conexão em casa",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
};

export const OFFER = {
  founderPrice: 197,
  regularPrice: 397,
  monthlyPrice: 49.9,
  betaLaunch: "dezembro de 2026",
  // Se o beta não sair até esta data, o Membro Fundador recebe 100% de volta.
  refundIfNotLaunchedBy: "31 de janeiro de 2027",
  checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_URL ?? "",
  // Só mostre um número de vagas se ele for real.
  spots: Number(process.env.NEXT_PUBLIC_FOUNDER_SPOTS) || null,
  foundersGroupUrl: process.env.NEXT_PUBLIC_FOUNDERS_GROUP_URL ?? "",
};

export const CONSENT_VERSION = "2026-10-16";

export function brl(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
