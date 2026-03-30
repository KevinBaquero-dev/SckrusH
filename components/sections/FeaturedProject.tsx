'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { projects } from '@/lib/data/projects'

const featured = projects.find(p => p.featured)!

// ─── Animation variants ───────────────────────────────────────────────────────

const contentVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const clipTitleVariants = {
  hidden:  { y: '105%' },
  visible: { y: '0%', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FeaturedProject() {
  const sectionRef = useRef<HTMLElement>(null)

  // Parallax: image moves slightly slower than scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-12px', '12px'])

  return (
    <section
      ref={sectionRef}
      id="featured"
      className="relative overflow-hidden bg-[var(--surface)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] min-h-[85vh]">

        {/* ── Left: text content ──────────────────────────────────── */}
        <motion.div
          className="flex flex-col justify-center pl-container pr-8 lg:pr-16 py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={contentVariants}
        >
          {/* Section label */}
          <motion.p
            variants={itemVariants}
            className="font-mono text-sm text-[var(--text-muted)] mb-6"
          >
            {'> proyecto destacado'}
          </motion.p>

          {/* Project name */}
          <div className="overflow-hidden mb-6">
            <motion.h2
              variants={clipTitleVariants}
              className="font-mono text-[clamp(2.5rem,4.5vw,4.5rem)] tracking-tight leading-none text-[var(--text-primary)]"
            >
              {featured.name}
            </motion.h2>
          </div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-lg leading-relaxed text-[var(--text-secondary)] max-w-[36ch] mb-5"
          >
            {featured.description}
          </motion.p>

          {/* Stack pills */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-9">
            {featured.stack.map(tech => (
              <span
                key={tech}
                className="font-mono text-xs px-3 py-1.5 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-secondary)]"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex items-center gap-6">
            {featured.url && (
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative font-mono text-sm text-[var(--text-primary)]"
              >
                ver proyecto →
                <span className="absolute -bottom-px left-0 h-px w-0 bg-[var(--accent)] transition-[width] duration-300 ease-out group-hover:w-full" />
              </a>
            )}
            {featured.repo && (
              <a
                href={featured.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative font-mono text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors duration-200"
              >
                ver código
                <span className="absolute -bottom-px left-0 h-px w-0 bg-[var(--text-muted)] transition-[width] duration-300 ease-out group-hover:w-full" />
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* ── Right: visual / mockup ──────────────────────────────── */}
        <div className="relative flex items-center overflow-hidden">
          {/* Project-specific accent glow — stays within right column */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 w-1/2 h-1/2 z-10"
            style={{
              background: `radial-gradient(ellipse at bottom left, ${featured.accent}18 0%, transparent 60%)`,
            }}
          />

          {/* Mockup with parallax */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' as const }}
            className="relative w-[108%] py-16 lg:py-24"
          >
            {featured.image ? (
              <div
                className="relative w-full aspect-[4/3] rounded-l-[var(--radius-lg)] overflow-hidden"
                style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.55)' }}
              >
                <Image
                  src={featured.image}
                  alt={`Mockup de ${featured.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-top"
                />
              </div>
            ) : (
              // Placeholder — replace with real image when available
              <div
                className="w-full aspect-[4/3] rounded-l-[var(--radius-lg)]"
                style={{
                  background: `linear-gradient(135deg, var(--surface-2) 0%, ${featured.accent}0d 100%)`,
                  boxShadow: '0 32px 80px rgba(0,0,0,0.55)',
                }}
              />
            )}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
