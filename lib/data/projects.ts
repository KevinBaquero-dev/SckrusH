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
  // Replace with real projects
  {
    id: "project-1",
    name: "Project One",
    description: "Short description of what this project does and why it matters.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    accent: "#E8FF47",
    size: "large",
    featured: true,
  },
  {
    id: "project-2",
    name: "Project Two",
    description: "Short description of what this project does.",
    stack: ["React", "Node.js", "PostgreSQL"],
    accent: "#7DF9FF",
    size: "small",
  },
  {
    id: "project-3",
    name: "Project Three",
    description: "Short description of what this project does.",
    stack: ["TypeScript", "Prisma", "tRPC"],
    accent: "#FF6B6B",
    size: "small",
  },
  {
    id: "project-4",
    name: "Project Four",
    description: "Short description of what this project does and why it matters.",
    stack: ["Next.js", "Supabase", "Framer Motion"],
    accent: "#A78BFA",
    size: "large",
  },
];
