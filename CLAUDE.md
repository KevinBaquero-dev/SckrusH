@AGENTS.md

# CLAUDE.md — SckrusH Portfolio

## Reglas generales

- **Nunca agregar co-autoría** en commits. Los commits solo llevan el nombre del usuario, sin mención de Claude ni Anthropic.
- Idioma de código: **inglés** (variables, funciones, componentes, comentarios técnicos)
- Idioma de comunicación con el usuario: **español**
- Confirmar cambios visuales importantes con el usuario antes de continuar al siguiente paso

## Flujo de trabajo

```
Usuario (logística) → Gemini (prompt engineer) → Claude Code (desarrollo)
```

Gemini recibe instrucciones del usuario en lenguaje natural, las reescribe como prompts técnicos precisos y los pasa a Claude. El archivo `GEMINI_PROMPT_GUIDE.md` en la raíz define cómo debe operar Gemini.

## Stack del proyecto

| Tecnología       | Versión    | Rol                          |
|------------------|------------|------------------------------|
| Next.js          | 16.2.1     | Framework (App Router)       |
| React            | 19.2.4     | UI                           |
| TypeScript       | ^5         | Tipado                       |
| Tailwind CSS     | ^4         | Estilos                      |
| shadcn/ui        | ^4.1.1     | Componentes base             |
| Framer Motion    | ^12        | Animaciones                  |
| Geist Sans/Mono  | next/font  | Tipografía                   |

## Identidad visual — decisiones tomadas

### Paleta de colores

| Rol              | Valor                       |
|------------------|-----------------------------|
| Fondo base       | `#080808`                   |
| Superficie       | `#111111`                   |
| Superficie 2     | `#1a1a1a`                   |
| Texto principal  | `#F0F0F0`                   |
| Texto secundario | `#888888`                   |
| Texto muted      | `#444444`                   |
| **Accent**       | **`#E8FF47`** (lima eléctrico) |
| Accent glow      | `rgba(232, 255, 71, 0.15)`  |
| Borde            | `rgba(255, 255, 255, 0.07)` |

### Tipografía

- **Display / Headings:** Geist Mono (`--font-geist-mono`)
- **Body / UI:** Geist Sans (`--font-geist-sans`)

### Concepto diferenciador: "Terminal Aesthetic"

El portfolio se siente como una interfaz siendo construida en tiempo real. No es una terminal real — es un lenguaje visual y un ritmo de entrada. Vive en:
- El hero: `> SckrusH_` se escribe letra por letra al cargar
- Labels de sección con prefijo: `> about`, `> projects`, `> contact`
- Cursor custom: guion bajo `_` que parpadea cuando el mouse está estático
- Stack tooltips tipo output: `$ using Next.js since 2021`

### Tagline del Hero

```
> SckrusH_

I don't just write code.
I engineer the experience.
```

Subtítulo opcional:
```
Building interfaces that think before they speak.
```

CTA: `explore work ↓` — texto plano, sin botón, underline animado en hover

### Regla del accent color

El accent `#E8FF47` aparece **solo donde el usuario necesita orientación o hay una acción disponible**:
- Cursor `_` parpadeante
- Underline del CTA en Hero al hover
- Punto activo en navegación
- Glow de Featured Project (opacity: 0.15)
- Números grandes en About (stats)

**Nunca** en: párrafos, backgrounds de sección, borders generalizados, ni más de un elemento por sección.

## Micro-interacciones definidas

1. **Cursor `_` en reposo** — después de 2s sin mover el mouse, el cursor custom se transforma en `_` parpadeante
2. **Title scramble en project cards** — al hover el título hace efecto scramble 300ms antes de resolverse
3. **Section labels reactivos** — el prefijo `>` de cada sección tiene cursor parpadeante al entrar al viewport (1.5s, luego desaparece)

## Animaciones — qué va y qué no

| Animación                       | Estado      |
|---------------------------------|-------------|
| Stagger de letras en Hero       | Sí          |
| Cursor con lag                  | Sí          |
| Text reveal línea por línea     | Solo heading (no párrafos) |
| Cards en cascada en Projects    | Sí          |
| Glow en hover de cards          | Sí          |
| Parallax en Featured Project    | Sí          |
| Línea dibujada en Process       | Eliminada   |
| Stagger radial en Stack         | Simplificado a lineal |
| Botón magnético en Contact      | Sí          |
| Smooth scroll global            | Sí (CSS nativo) |

**Regla:** si la animación desaparece y la sección sigue funcionando igual, se elimina.

## Secciones y orden

```
1. Hero
2. About
3. Featured Project
4. Projects
5. Stack
6. Process (opcional — solo si hay contenido real)
7. Contact
```

### Hero
- Tagline terminal aesthetic (ver arriba)
- Fondo: gradiente radial oscuro + noise texture

### About
- Layout asimétrico 60/40
- Stats en una fila: `05+ años · 12 proyectos · Full Stack · Open Source`
- Números grandes, texto pequeño debajo

### Featured Project
- Layout pantalla completa horizontal (100% ancho)
- Izquierda: label, nombre grande, descripción, stack pills, CTA doble
- Derecha: mockup/screenshot con parallax sutil y glow del color del proyecto

### Projects
- Layout editorial asimétrico (no grid uniforme)
- Cards grandes: imagen de fondo, descripción en hover
- Cards pequeñas: nombre + stack + flecha, sin imagen
- Cada card tiene su propio `accent` color (definido en `lib/data/projects.ts`)

### Stack
- Grid por categorías (Frontend, Backend, Tools, Design)
- Cada ícono con nivel: `Next.js · experto`
- Stagger de entrada lineal izquierda a derecha

### Contact
- Heading invitación + línea secundaria
- CTA único
- Social links en fila horizontal, solo íconos

## Estructura de archivos

```
app/
  globals.css          # tokens, dark base, noise, scrollbar, tipografía
  layout.tsx           # Geist fonts, metadata, noise layer
  page.tsx             # ensambla secciones

components/
  sections/
    Hero.tsx
    About.tsx
    FeaturedProject.tsx
    Projects.tsx
    Stack.tsx
    Contact.tsx
  layout/
    Navbar.tsx
    Footer.tsx
  animations/          # wrappers de animación (FadeIn, RevealText, ParallaxWrapper)
  ui/                  # componentes reutilizables (GlowCard, GradientText, MagneticButton, etc.)

config/
  site.ts              # nombre, tagline, socials, url

lib/
  data/
    projects.ts        # tipo Project + array con accent colors por proyecto
    stack.ts           # tipo StackItem + categorías
  utils.ts             # cn() y helpers

hooks/
  useMousePosition.ts  # cursor y efecto magnético
  useScrollProgress.ts # progreso de scroll global
```

## Estado actual del proyecto

- [x] Proyecto Next.js inicializado (App Router + TypeScript + Tailwind v4)
- [x] shadcn/ui configurado
- [x] framer-motion instalado
- [x] `globals.css` con tokens de diseño completos
- [x] `layout.tsx` configurado con fuentes y metadata
- [x] `config/site.ts` con datos del sitio
- [x] `lib/data/projects.ts` y `stack.ts` con tipos y placeholders
- [x] Todos los section components creados como placeholders
- [x] `Navbar.tsx` y `Footer.tsx` como placeholders
- [ ] Hero — siguiente paso
- [ ] About
- [ ] Featured Project
- [ ] Projects
- [ ] Stack
- [ ] Contact
- [ ] Navbar / Footer
- [ ] Animaciones y micro-interacciones
- [ ] Cursor custom
- [ ] Deploy

## Siguiente paso

Implementar la sección **Hero** completa:
- Efecto typewriter `> SckrusH_`
- Tagline con stagger
- CTA `explore work ↓`
- Fondo con gradiente radial
- Sin animaciones de scroll aún (solo entrada)
