'use client'

import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'

// ─── Data ─────────────────────────────────────────────────────────────────────

const STRENGTHS = [
  { label: 'Full Stack',    description: 'del backend hasta la UI, sin gaps' },
  { label: 'Product Sense', description: 'entiendo qué construir, no solo cómo' },
  { label: 'Autonomía',     description: 'de la idea al deploy, sin microgestión' },
]

const STATS = [
  { value: '12',          label: 'proyectos llevados\na producción', accent: true  },
  { value: 'Full Stack',  label: 'frontend · backend\n· DevOps',     accent: false },
  { value: 'Open Source', label: 'contribuidor\nactivo',              accent: false },
]

// 8 rows × 12 cols — predefined activity levels (0–5)
// 5 = outlier bright cell, used sparingly to break uniformity
const GRID_DATA: number[][] = [
  [0, 1, 2, 1, 3, 2, 4, 3, 2, 1, 0, 1],
  [1, 2, 1, 3, 2, 4, 5, 4, 3, 2, 1, 0],
  [0, 1, 3, 2, 4, 3, 2, 4, 2, 3, 2, 1],
  [2, 1, 2, 4, 3, 2, 4, 3, 4, 2, 1, 2],
  [1, 2, 1, 3, 4, 3, 3, 2, 5, 4, 2, 1],
  [0, 1, 2, 2, 3, 5, 2, 3, 2, 3, 3, 2],
  [1, 0, 1, 1, 2, 3, 1, 2, 3, 2, 1, 1],
  [0, 1, 0, 2, 1, 2, 0, 1, 2, 1, 0, 0],
]

const OPACITY_MAP: Record<number, string> = {
  0: 'rgba(255,255,255,0.04)',
  1: 'rgba(232,255,71,0.10)',
  2: 'rgba(232,255,71,0.22)',
  3: 'rgba(232,255,71,0.40)',
  4: 'rgba(232,255,71,0.60)',
  5: 'rgba(232,255,71,0.88)',
}

// ─── Animation variants ───────────────────────────────────────────────────────

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const columnVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden:   { opacity: 0, y: 16 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

// Each grid column fades in left → right
const gridColVariants = {
  hidden:   { opacity: 0 },
  visible:  (col: number) => ({
    opacity: 1,
    transition: { duration: 0.35, delay: col * 0.04, ease: 'easeOut' as const },
  }),
}

// ─── Activity grid (right column visual) ─────────────────────────────────────

function ActivityGrid() {
  return (
    <motion.div
      className="flex gap-[3px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ hidden: {}, visible: {} }}
    >
      {GRID_DATA[0].map((_, col) => (
        <motion.div
          key={col}
          custom={col}
          variants={gridColVariants}
          className="flex flex-col gap-[3px]"
        >
          {GRID_DATA.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="w-[7px] h-[7px] rounded-[1px]"
              style={{ backgroundColor: OPACITY_MAP[row[col]] }}
            />
          ))}
        </motion.div>
      ))}
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <section id="about" className="section">
      <Container>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-16 lg:gap-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          {/* Left column */}
          <motion.div variants={columnVariants} className="flex flex-col gap-12">
            {/* Section label */}
            <motion.p
              variants={itemVariants}
              className="font-mono text-sm text-[var(--text-muted)]"
            >
              {'> sobre mí'}
            </motion.p>

            {/* Narrative */}
            <motion.div variants={itemVariants} className="space-y-3">
              <p className="font-sans text-lg leading-relaxed text-[var(--text-primary)]">
                Construyo productos desde cero.
              </p>
              <p className="font-sans text-lg leading-relaxed text-[var(--text-secondary)]">
                No solo el código — la lógica detrás de cada decisión.
              </p>
            </motion.div>

            {/* Strengths */}
            <div className="space-y-6">
              {STRENGTHS.map(({ label, description }) => (
                <motion.div
                  key={label}
                  variants={itemVariants}
                  className="flex items-baseline gap-3"
                >
                  <span className="font-mono text-sm text-[var(--text-primary)] w-32 shrink-0">
                    {label}
                  </span>
                  <span className="font-mono text-sm text-[var(--text-muted)]">·</span>
                  <span className="font-sans text-sm text-[var(--text-secondary)]">
                    {description}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-10 pt-8 border-t border-[var(--border)]"
            >
              {STATS.map(({ value, label, accent }) => (
                <div key={value}>
                  <div
                    className={`font-mono leading-none ${
                      accent
                        ? 'text-4xl text-[var(--accent)]'
                        : 'text-xl text-[var(--text-primary)]'
                    }`}
                  >
                    {value}
                  </div>
                  <div className="font-sans text-xs text-[var(--text-muted)] mt-2 leading-relaxed whitespace-pre-line">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column: activity grid — desktop only */}
          <div className="hidden lg:flex items-center justify-end">
            <ActivityGrid />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
