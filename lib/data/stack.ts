export type StackItem = {
  name: string;
  level: "experto" | "avanzado" | "intermedio";
  category: "Frontend" | "Backend" | "Tools" | "Design";
};

export const stack: StackItem[] = [
  { name: "Next.js",        level: "experto",    category: "Frontend" },
  { name: "React",          level: "experto",    category: "Frontend" },
  { name: "TypeScript",     level: "experto",    category: "Frontend" },
  { name: "Tailwind CSS",   level: "experto",    category: "Frontend" },
  { name: "Framer Motion",  level: "avanzado",   category: "Frontend" },
  { name: "Node.js",        level: "avanzado",   category: "Backend" },
  { name: "PostgreSQL",     level: "avanzado",   category: "Backend" },
  { name: "Prisma",         level: "avanzado",   category: "Backend" },
  { name: "Git",            level: "experto",    category: "Tools" },
  { name: "Figma",          level: "avanzado",   category: "Design" },
];
