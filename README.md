# SckrusH — Portfolio

Portfolio personal de Kevin Baquero. Construido con Next.js, Tailwind CSS y Framer Motion.

## Stack

| Tecnología    | Versión  | Rol                    |
|---------------|----------|------------------------|
| Next.js       | 16.2.1   | Framework (App Router) |
| React         | 19.2.4   | UI                     |
| TypeScript    | ^5       | Tipado                 |
| Tailwind CSS  | ^4       | Estilos                |
| Framer Motion | ^12      | Animaciones            |
| Geist         | next/font| Tipografía             |

## Desarrollo local

```bash
npm install
npm run dev
# http://localhost:3011
```

## Estructura

```
app/                    # App Router (layout, page, globals.css, favicon)
components/
  layout/               # Navbar, Footer, Container
  sections/             # Hero, About, FeaturedProject, Projects, Stack, Contact
config/
  site.ts               # nombre, url, socials, tagline
lib/
  data/
    projects.ts         # datos de proyectos
    stack.ts            # categorías del stack técnico
hooks/
  useTypewriter.ts      # efecto typewriter con jitter
```

## Contenido

Para actualizar proyectos: `lib/data/projects.ts`
Para actualizar el stack: `lib/data/stack.ts`
Para actualizar socials/email/url: `config/site.ts`

## Deploy

Desplegado en Vercel. Dominio: [sckrush.com](https://sckrush.com)
