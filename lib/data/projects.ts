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
    image:       "/cobraia.png",
    accent:      "#E8FF47",
    size:        "large",
    featured:    true,
  },
  {
    id:          "shadow",
    name:        "Shadow",
    description: "Asistente IA personal que corre en tu PC. Responde a tu voz, acepta comandos por Telegram y monitorea tu máquina de forma autónoma — impulsado por Claude.",
    stack:       ["Python", "Claude Sonnet", "ElevenLabs", "ChromaDB", "Telegram", "OpenClaw"],
    accent:      "#60A5FA",
    size:        "large",
  },
  {
    id:          "mivida",
    name:        "MiVida",
    description: "PWA de gestión de vida personal. Tareas en Kanban, hábitos, finanzas, calendario y Pomodoro — multi-usuario, personalizable e instalable en móvil.",
    stack:       ["React", "Supabase", "Framer Motion", "PWA", "PostgreSQL"],
    url:         "https://mi-vida-7zqa.vercel.app/",
    repo:        "https://github.com/KevinBaquero-dev/MiVida",
    accent:      "#F472B6",
    size:        "large",
  },
  {
    id:          "inventario-jardin",
    name:        "Inventario Jardín",
    description: "Sistema de inventario para jardín infantil con API REST y panel administrativo.",
    stack:       ["Node.js", "Express", "TypeScript", "PostgreSQL", "Prisma"],
    accent:      "#4ADE80",
    size:        "small",
  },
  {
    id:          "edugestion",
    name:        "EduGestión",
    description: "Plataforma para colegios que automatiza la generación de boletines. Profesores ingresan notas por materia, el sistema calcula promedios, rankings de salón y observaciones — listo al cierre de cada periodo.",
    stack:       ["Next.js", "TypeScript", "Supabase", "Prisma", "@react-pdf/renderer"],
    accent:      "#FB923C",
    size:        "small",
  },
];
