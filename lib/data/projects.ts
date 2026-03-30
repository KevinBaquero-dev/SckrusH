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
    id:          "cobraia",
    name:        "CobraIA",
    description: "SaaS de gestión financiera inteligente vía Telegram. Crea facturas, registra pagos y consulta deudas con lenguaje natural — sin apps, sin formularios.",
    stack:       ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "Claude Sonnet", "Telegram Bot"],
    repo:        "https://github.com/KevinBaquero-dev/cobraia",
    accent:      "#E8FF47",
    size:        "large",
    featured:    true,
  },
  {
    id:          "project-2",
    name:        "Project Two",
    description: "Short description of what this project does.",
    stack:       ["React", "Node.js", "PostgreSQL"],
    accent:      "#7DF9FF",
    size:        "small",
  },
  {
    id:          "project-3",
    name:        "Project Three",
    description: "Short description of what this project does.",
    stack:       ["TypeScript", "Prisma", "tRPC"],
    accent:      "#FF6B6B",
    size:        "small",
  },
  {
    id:          "project-4",
    name:        "Project Four",
    description: "Short description of what this project does and why it matters.",
    stack:       ["Next.js", "Supabase", "Framer Motion"],
    accent:      "#A78BFA",
    size:        "large",
  },
];
