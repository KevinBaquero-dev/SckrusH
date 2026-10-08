export type Project = {
  id: string;
  name: string;
  description: string;
  stack: string[];
  url?: string;
  repo?: string;
  image?: string;
  accent: string;
  size: "large" | "small";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id:          "nexus",
    name:        "Nexus",
    description: "Pulseras NFC que abren un perfil: redes en un carrusel 3D de tarjetas, modo «abrir directo» e información de emergencia siempre visible. Varios perfiles por cuenta, login sin contraseña y contador de escaneos.",
    stack:       ["Next.js 16", "TypeScript", "Drizzle", "PostgreSQL", "Vercel Blob", "Resend"],
    url:         "https://nexus.sckrush.com",
    image:       "/nexus.jpg",
    accent:      "#A78BFA",
    size:        "large",
    featured:    true,
  },
  {
    id:          "cobraia",
    name:        "CobraIA",
    description: "SaaS de cartera que vive en Telegram. Facturas y cotizaciones en PDF, abonos, deudas con clientes y proveedores y estados de cuenta, todo pedido en lenguaje natural. Multi-empresa, con registro y prueba de 7 días automáticos.",
    stack:       ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "Claude Sonnet", "Telegraf", "ExcelJS"],
    url:         "https://t.me/CobraIA_bot",
    image:       "/cobraia.jpg",
    accent:      "#00C896",
    size:        "large",
  },
  {
    id:          "cardinal",
    name:        "Cardinal",
    description: "Inventario multi-bodega para una perfumería. Entradas, salidas y traspasos desde el celular, roles por bodega, anulación con trazabilidad, PDF de disponibilidad para clientes y respaldo diario por correo.",
    stack:       ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "@react-pdf/renderer"],
    image:       "/cardinal.jpg",
    accent:      "#818CF8",
    size:        "small",
  },
  {
    id:          "sh-one",
    name:        "SH One",
    description: "Mi app personal, instalada en el iPhone: finanzas con proyección de saldo, créditos y metas de ahorro, agenda, notas y una bóveda con Face ID. Push, Atajos y un bot de Telegram como entradas, y un resumen cada domingo.",
    stack:       ["Python", "FastAPI", "SQLite", "HTMX", "PWA", "Web Push"],
    image:       "/sh-one.jpg",
    accent:      "#2DD4BF",
    size:        "large",
  },
  {
    id:          "laoficina",
    name:        "La Oficina",
    description: "POS e inventario para un bar: comandas por mesa, fiados con cobro por WhatsApp, cierre de caja en PDF y estadísticas con comparativas. Turnos que cruzan la medianoche.",
    stack:       ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Recharts"],
    image:       "/laoficina.jpg",
    accent:      "#F59E0B",
    size:        "small",
  },
];
