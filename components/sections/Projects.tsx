'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/components/layout/Container'
import { projects, type Project } from '@/lib/data/projects'

// ─── Data setup ───────────────────────────────────────────────────────────────

const displayProjects = projects.filter(p => !p.featured)
const largeProjects   = displayProjects.filter(p => p.size === 'large')
const smallProjects   = displayProjects.filter(p => p.size === 'small')
const rowCount        = Math.max(largeProjects.length, smallProjects.length)

type ProjectRow = { large: Project | null; small: Project | null }

const rows: ProjectRow[] = Array.from({ length: rowCount }, (_, i) => ({
  large: largeProjects[i] ?? null,
  small: smallProjects[i] ?? null,
}))

const SHOW_VIEW_ALL = displayProjects.length > 4

// ─── Animation variants ───────────────────────────────────────────────────────

const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

// ─── Project modal ────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [textVisible, setTextVisible] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9000] md:flex md:items-center md:justify-center md:p-10"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* Panel — full-screen on mobile, 16/9 centered on desktop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
        onClick={e => { e.stopPropagation(); setTextVisible(v => !v) }}
        className="absolute inset-0 md:relative md:inset-auto md:w-full md:max-w-5xl md:aspect-[16/9] md:rounded-[var(--radius-lg)] overflow-hidden"
      >

        {/* Image */}
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-contain object-center md:object-cover md:object-top"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, var(--surface-2) 0%, ${project.accent}18 100%)`,
            }}
          />
        )}

        {/* Overlay + content — animated */}
        <AnimatePresence>
          {textVisible && (
            <motion.div
              key="text-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              {/* Gradient bottom→top on mobile, left→right on desktop */}
              <div
                className="absolute inset-0 md:hidden"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.15) 65%, transparent 85%)',
                }}
              />
              <div
                className="absolute inset-0 hidden md:block"
                style={{
                  background: 'linear-gradient(to right, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.80) 28%, rgba(0,0,0,0.35) 55%, transparent 78%)',
                }}
              />

              {/* Content: bottom on mobile, left-center on desktop */}
              <div className="absolute inset-0 flex items-end md:items-center">
                <div className="w-full md:w-[52%] px-6 md:px-12 pb-12 md:py-8 flex flex-col gap-3 md:gap-4">
                  <p className="font-mono text-xs text-white/40">{'> proyecto'}</p>

                  <h2
                    className="font-mono tracking-tight leading-none text-white"
                    style={{ fontSize: 'clamp(1.6rem, 5vw, 3rem)' }}
                  >
                    {project.name}
                  </h2>

                  <p className="font-sans text-sm leading-relaxed text-white/70">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map(tech => (
                      <span
                        key={tech}
                        className="font-mono text-xs px-2.5 py-1 rounded-[var(--radius-sm)]"
                        style={{
                          border: '1px solid rgba(255,255,255,0.15)',
                          background: 'rgba(255,255,255,0.07)',
                          color: 'rgba(255,255,255,0.65)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Close button */}
        <button
          onClick={e => { e.stopPropagation(); onClose() }}
          aria-label="Cerrar"
          className="absolute top-4 right-4 font-mono text-sm text-white/40 hover:text-white transition-colors duration-200 w-8 h-8 flex items-center justify-center z-10"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  )
}

// ─── Large card ───────────────────────────────────────────────────────────────

function CardLarge({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0 }}
      variants={cardVariants}
      onClick={onOpen}
      className="group relative overflow-hidden rounded-[var(--radius-md)] cursor-pointer"
    >
      <div className="aspect-[16/10] overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 58vw"
            className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div
            className="w-full h-full transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, var(--surface-2) 0%, ${project.accent}0f 100%)`,
            }}
          />
        )}
      </div>

      <div
        className="absolute inset-0 transition-opacity duration-[400ms] group-hover:opacity-[0.78]"
        style={{
          background:
            'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.25) 55%, transparent 100%)',
        }}
      />

      <div
        className="absolute inset-0 rounded-[var(--radius-md)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${project.accent}30` }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
        <h3 className="font-mono text-xl text-[var(--text-primary)] leading-tight mb-1.5">
          {project.name}
        </h3>
        <p className="font-sans text-sm text-[var(--text-secondary)] line-clamp-1 mb-3">
          {project.description}
        </p>
        <p className="font-mono text-xs text-[var(--text-muted)]">
          {project.stack.join(' · ')}
        </p>
      </div>
    </motion.article>
  )
}

// ─── Small card ───────────────────────────────────────────────────────────────

function CardSmall({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0 }}
      variants={cardVariants}
      onClick={onOpen}
      className="group flex flex-col justify-center h-full py-6 lg:py-8 cursor-pointer"
    >
      {project.image && (
        <div className="relative w-full aspect-[16/9] rounded-[var(--radius-sm)] overflow-hidden mb-4">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover object-top transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-mono text-lg text-[var(--text-primary)] leading-tight">
          {project.name}
        </h3>
        <span className="font-mono text-sm text-[var(--text-muted)] opacity-0 -translate-x-[2px] transition-all duration-200 group-hover:opacity-85 group-hover:translate-x-0 shrink-0 mt-0.5">
          →
        </span>
      </div>

      <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-4">
        {project.description}
      </p>

      <p className="font-mono text-xs text-[var(--text-muted)] mb-5">
        {project.stack.join(' · ')}
      </p>

      <div className="relative h-px">
        <div className="absolute inset-0 bg-[var(--border)]" />
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ backgroundColor: project.accent }}
        />
      </div>
    </motion.article>
  )
}

// ─── Row ──────────────────────────────────────────────────────────────────────

function ProjectRow({
  row,
  index,
  onOpen,
}: {
  row: ProjectRow
  index: number
  onOpen: (p: Project) => void
}) {
  const largeOnLeft = index % 2 === 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
      {row.large && row.small ? (
        largeOnLeft ? (
          <>
            <div className="lg:col-span-7"><CardLarge project={row.large} onOpen={() => onOpen(row.large!)} /></div>
            <div className="lg:col-span-5"><CardSmall project={row.small} onOpen={() => onOpen(row.small!)} /></div>
          </>
        ) : (
          <>
            <div className="lg:col-span-5"><CardSmall project={row.small} onOpen={() => onOpen(row.small!)} /></div>
            <div className="lg:col-span-7"><CardLarge project={row.large} onOpen={() => onOpen(row.large!)} /></div>
          </>
        )
      ) : row.large ? (
        <div className="lg:col-span-12"><CardLarge project={row.large} onOpen={() => onOpen(row.large!)} /></div>
      ) : row.small ? (
        <div className="lg:col-span-5"><CardSmall project={row.small} onOpen={() => onOpen(row.small!)} /></div>
      ) : null}
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  // ESC to close + body scroll lock
  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [selected])

  return (
    <section id="projects" className="section">
      <Container>
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-mono text-sm text-[var(--text-muted)]">{'> proyectos'}</p>
          {SHOW_VIEW_ALL && (
            <a
              href="#"
              className="group relative font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors duration-200"
            >
              ver todos →
              <span className="absolute -bottom-px left-0 h-px w-0 bg-[var(--text-muted)] transition-[width] duration-300 ease-out group-hover:w-full" />
            </a>
          )}
        </motion.div>

        {/* Project rows */}
        <div className="flex flex-col gap-6">
          {rows.map((row, i) => (
            <ProjectRow key={i} row={row} index={i} onOpen={setSelected} />
          ))}
        </div>
      </Container>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
