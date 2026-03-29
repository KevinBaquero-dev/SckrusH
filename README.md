# SckrusH — Personal Portfolio

Personal portfolio and blog for the **SckrusH** developer brand.

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui**
- **Framer Motion**
- **Geist Sans + Geist Mono**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Structure

```
app/              # Next.js App Router pages and layout
components/
  sections/       # Page sections (Hero, About, Projects, etc.)
  layout/         # Navbar, Footer
  ui/             # Reusable UI components
  animations/     # Animation wrappers
config/
  site.ts         # Site metadata, socials, tagline
lib/
  data/           # Projects and stack data
hooks/            # Custom React hooks
```

## Design

Dark theme portfolio with a **Terminal Aesthetic** concept.
Accent color: `#E8FF47` (electric lime).
Fonts: Geist Mono (headings) + Geist Sans (body).

See `CLAUDE.md` for full design decisions, component specs, and development status.
