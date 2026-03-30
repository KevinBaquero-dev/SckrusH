'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
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

const rowVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

// ─── Large card ───────────────────────────────────────────────────────────────

function CardLarge({ project }: { project: Project }) {
  return (
    <motion.article
      variants={cardVariants}
      className="group relative overflow-hidden rounded-[var(--radius-md)] cursor-pointer"
    >
      {/* Background image or placeholder */}
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

      {/* Overlay — lightens slightly on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-[400ms] group-hover:opacity-[0.78]"
        style={{
          background:
            'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.25) 55%, transparent 100%)',
        }}
      />

      {/* Inner border glow — project accent */}
      <div
        className="absolute inset-0 rounded-[var(--radius-md)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${project.accent}30` }}
      />

      {/* Text */}
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

function CardSmall({ project }: { project: Project }) {
  return (
    <motion.article
      variants={cardVariants}
      className="group flex flex-col justify-center h-full py-6 lg:py-8 cursor-pointer"
    >
      {/* Title + arrow */}
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

      {/* Bottom border — transitions to project accent on hover */}
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

function ProjectRow({ row, index }: { row: ProjectRow; index: number }) {
  const largeOnLeft = index % 2 === 0

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={rowVariants}
    >
      {row.large && row.small ? (
        largeOnLeft ? (
          <>
            <div className="lg:col-span-7"><CardLarge project={row.large} /></div>
            <div className="lg:col-span-5"><CardSmall project={row.small} /></div>
          </>
        ) : (
          <>
            <div className="lg:col-span-5"><CardSmall project={row.small} /></div>
            <div className="lg:col-span-7"><CardLarge project={row.large} /></div>
          </>
        )
      ) : row.large ? (
        <div className="lg:col-span-12"><CardLarge project={row.large} /></div>
      ) : row.small ? (
        <div className="lg:col-span-5"><CardSmall project={row.small} /></div>
      ) : null}
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Projects() {
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
            <ProjectRow key={i} row={row} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
