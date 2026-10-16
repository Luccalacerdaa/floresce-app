import { after, NextResponse } from "next/server";

// Recebe o lead do quiz e grava no Supabase (tabela `leads`, ver supabase/schema.sql).
// Opcional: repassa para um webhook do n8n (ex.: mandar a brincadeira do dia no WhatsApp).

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type LeadBody = {
  parentName?: string;
  email?: string;
  whatsapp?: string;
  consent?: boolean;
  marketing?: boolean;
  website?: string;
  consentVersion?: string;
  answers?: Record<string, unknown>;
  profile?: { pillars?: unknown; focus?: unknown; flags?: unknown };
  utms?: Record<string, string>;
};

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: LeadBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "json inválido" }, { status: 400 });
  }

  // Robôs preenchem o campo escondido: fingimos sucesso e descartamos.
  if (body.website) return NextResponse.json({ ok: true });

  const email = str(body.email, 120).toLowerCase();
  const parentName = str(body.parentName, 60);
  if (!EMAIL.test(email) || parentName.length < 2 || body.consent !== true) {
    return NextResponse.json({ ok: false, error: "dados inválidos" }, { status: 400 });
  }
  if (!body.answers || typeof body.answers !== "object" || JSON.stringify(body.answers).length > 5000) {
    return NextResponse.json({ ok: false, error: "respostas inválidas" }, { status: 400 });
  }

  const answers = body.answers;
  const lead = {
    parent_name: parentName,
    email,
    whatsapp: str(body.whatsapp, 20).replace(/[^\d+]/g, "") || null,
    child_name: str(answers.nome, 40) || null,
    child_age: str(answers.idade, 10) || null,
    answers,
    profile: body.profile ?? null,
    flags: Array.isArray(body.profile?.flags) ? body.profile.flags.map(String).slice(0, 10) : [],
    utms: body.utms && typeof body.utms === "object" ? body.utms : {},
    marketing_opt_in: body.marketing === true,
    consent_version: str(body.consentVersion, 20) || "desconhecida",
    user_agent: str(req.headers.get("user-agent"), 300),
  };

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && key) {
    const res = await fetch(`${url}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(lead),
    });
    if (!res.ok) {
      console.error("[lead] erro no Supabase", res.status, await res.text());
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  } else {
    console.warn("[lead] Supabase não configurado — lead não foi salvo:", lead.email);
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    // Roda depois da resposta, sem atrasar a pessoa.
    after(() =>
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      }).catch((err) => console.error("[lead] erro no webhook", err)),
    );
  }

  return NextResponse.json({ ok: true });
}
