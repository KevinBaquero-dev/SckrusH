'use client'

import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import { siteConfig } from '@/config/site'

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

// ─── Terminal window data ─────────────────────────────────────────────────────

type TLine =
  | { type: 'cmd';    text: string }
  | { type: 'out';    text: string }
  | { type: 'gap' }
  | { type: 'cursor' }

const TERMINAL_LINES: TLine[] = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: `${siteConfig.name} (${siteConfig.alias})` },
  { type: 'out', text: 'Full Stack Developer · Bogotá, CO' },
  { type: 'gap' },
  { type: 'cmd', text: 'uptime' },
  { type: 'out', text: '5+ años construyendo productos' },
  { type: 'gap' },
  { type: 'cmd', text: 'cat motto.txt' },
  { type: 'out', text: 'No escribo código.' },
  { type: 'out', text: 'Diseño la experiencia.' },
  { type: 'gap' },
  { type: 'cursor' },
]

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

const terminalLineVariants = {
  hidden:  { opacity: 0, y: 6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: i * 0.07, ease: 'easeOut' as const },
  }),
}

// ─── Terminal window ──────────────────────────────────────────────────────────

function TerminalWindow() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ hidden: {}, visible: {} }}
      className="w-full rounded-[var(--radius-md)] overflow-hidden border border-[var(--border)]"
      style={{ background: 'var(--surface-2)' }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]"
        style={{ background: 'rgba(255,255,255,0.02)' }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="font-mono text-xs text-[var(--text-muted)] ml-2 select-none">
          bash
        </span>
      </div>

      {/* Content */}
      <div className="px-5 py-5 space-y-1.5">
        {TERMINAL_LINES.map((line, i) => {
          if (line.type === 'gap') {
            return <div key={i} className="h-2" />
          }
          if (line.type === 'cursor') {
            return (
              <motion.div
                key={i}
                custom={i}
                variants={terminalLineVariants}
                className="flex items-center gap-2 font-mono text-sm"
              >
                <span className="text-[var(--accent)] select-none">$</span>
                <span
                  className="inline-block w-[9px] h-[15px] bg-[var(--accent)]"
                  style={{ animation: 'blink 1.1s step-end infinite' }}
                />
              </motion.div>
            )
          }
          return (
            <motion.p
              key={i}
              custom={i}
              variants={terminalLineVariants}
              className={`font-mono text-sm leading-relaxed ${
                line.type === 'cmd'
                  ? 'text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] pl-5'
              }`}
            >
              {line.type === 'cmd' && (
                <span className="text-[var(--accent)] mr-2 select-none">$</span>
              )}
              {line.text}
            </motion.p>
          )
        })}
      </div>
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

          {/* Right column: terminal window */}
          <div className="hidden lg:flex items-center">
            <TerminalWindow />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
