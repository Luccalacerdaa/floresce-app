// Rede local de profissionais especializados (protótipo).
// Em produção: geolocalização real + backend com busca por cidade/convênio.
export type Specialty = "fono" | "to" | "psico" | "neuro" | "pediatra" | "musicoterapia";

export const SPECIALTIES: Record<Specialty, { label: string; emoji: string; about: string }> = {
  fono: { label: "Fonoaudiologia", emoji: "🗣️", about: "Avaliação e terapia de fala, linguagem e comunicação." },
  to: { label: "Terapia Ocupacional", emoji: "🖐️", about: "Sensorial, coordenação motora fina e atividades da vida diária." },
  psico: { label: "Psicologia / ABA", emoji: "🧠", about: "Comportamento, regulação emocional e habilidades sociais." },
  neuro: { label: "Neuropediatria", emoji: "⚕️", about: "Diagnóstico e acompanhamento neurológico." },
  pediatra: { label: "Pediatria do Desenvolvimento", emoji: "👶", about: "Marcos do desenvolvimento e encaminhamentos." },
  musicoterapia: { label: "Musicoterapia", emoji: "🎵", about: "Uso da música para estimulação sensorial e comunicativa." },
};

export type Professional = {
  id: string;
  name: string;
  specialty: Specialty;
  city: string;
  state: string;
  crm?: string;
  phone?: string;
  instagram?: string;
  acceptsPlan?: boolean;
  rating: number; // 0-5, protótipo
  reviewCount: number;
  bio: string;
  tags: string[];
};

// Dados fictícios para o protótipo — substituir por API real em produção.
export const PROFESSIONALS: Professional[] = [
  {
    id: "p1",
    name: "Dra. Ana Clara Mendes",
    specialty: "fono",
    city: "São Paulo",
    state: "SP",
    crm: "CRFa 12345",
    phone: "(11) 99999-0001",
    instagram: "@draanaclara.fono",
    acceptsPlan: true,
    rating: 4.9,
    reviewCount: 87,
    bio: "Especialista em atraso de fala e TEA nível 1-2. Abordagem naturalista e centrada na família.",
    tags: ["TEA", "Atraso de fala", "Naturalista"],
  },
  {
    id: "p2",
    name: "Dr. Rafael Oliveira",
    specialty: "neuro",
    city: "São Paulo",
    state: "SP",
    crm: "CRM 98765",
    phone: "(11) 99999-0002",
    acceptsPlan: false,
    rating: 4.8,
    reviewCount: 124,
    bio: "Neuropediatra com foco em desenvolvimento infantil e diagnóstico precoce de TEA.",
    tags: ["Diagnóstico", "TEA", "Desenvolvimento"],
  },
  {
    id: "p3",
    name: "Carolina Santos, TO",
    specialty: "to",
    city: "Rio de Janeiro",
    state: "RJ",
    crm: "CREFITO 54321",
    phone: "(21) 99999-0003",
    instagram: "@carol.to.infantil",
    acceptsPlan: true,
    rating: 4.7,
    reviewCount: 56,
    bio: "Integração sensorial e regulação. Atendimento domiciliar e em clínica.",
    tags: ["Sensorial", "Regulação", "Domiciliar"],
  },
  {
    id: "p4",
    name: "Dra. Marina Costa",
    specialty: "psico",
    city: "Belo Horizonte",
    state: "MG",
    crm: "CRP 11111",
    phone: "(31) 99999-0004",
    acceptsPlan: true,
    rating: 4.9,
    reviewCount: 93,
    bio: "Psicóloga infantil especializada em ABA naturalista e orientação parental.",
    tags: ["ABA", "Parentalidade", "TEA"],
  },
  {
    id: "p5",
    name: "Dr. Pedro Almeida",
    specialty: "pediatra",
    city: "Curitiba",
    state: "PR",
    crm: "CRM 22222",
    phone: "(41) 99999-0005",
    acceptsPlan: false,
    rating: 4.6,
    reviewCount: 201,
    bio: "Pediatra do desenvolvimento. Acompanhamento de marcos e encaminhamentos precoces.",
    tags: ["Marcos", "Prevenção", "Encaminhamento"],
  },
  {
    id: "p6",
    name: "Lucas Ferreira, MT",
    specialty: "musicoterapia",
    city: "Porto Alegre",
    state: "RS",
    crm: "CBMT 33333",
    instagram: "@lucas.musicoterapia",
    acceptsPlan: true,
    rating: 4.8,
    reviewCount: 42,
    bio: "Musicoterapeuta com experiência em TEA e estimulação de linguagem através da música.",
    tags: ["Música", "TEA", "Linguagem"],
  },
];

export function professionalsBySpecialty(s: Specialty): Professional[] {
  return PROFESSIONALS.filter((p) => p.specialty === s);
}

export function searchProfessionals(query: string): Professional[] {
  const q = query.toLowerCase();
  if (!q) return PROFESSIONALS;
  return PROFESSIONALS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.bio.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}