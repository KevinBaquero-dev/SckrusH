'use client'

import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import { stackCategories, type StackCategory, type StackItem } from '@/lib/data/stack'

// ─── Animation variants ───────────────────────────────────────────────────────

// Grid staggers columns; each column staggers its items
const gridVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const columnVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
}

// ─── Stack item ───────────────────────────────────────────────────────────────

function StackItemRow({ item }: { item: StackItem }) {
  return (
    <motion.div variants={itemVariants} className="group space-y-0.5">
      <p className="font-mono text-sm text-[var(--text-primary)] opacity-100 [@media(hover:hover)]:opacity-[0.85] [@media(hover:hover)]:group-hover:opacity-100 transition-opacity duration-150 leading-tight">
        {item.name}
      </p>
      {item.descriptor && (
        <p className="font-sans text-xs text-[var(--text-muted)] leading-snug">
          {item.descriptor}
        </p>
      )}
    </motion.div>
  )
}

// ─── Category column ──────────────────────────────────────────────────────────

function CategoryColumn({ category }: { category: StackCategory }) {
  return (
    <motion.div
      variants={columnVariants}
      className={category.aiLayer ? 'border-t border-[var(--border)] pt-6' : ''}
    >
      {/* Category label */}
      <motion.p
        variants={itemVariants}
        className="font-mono text-xs tracking-wider uppercase text-[var(--text-muted)] mb-5"
      >
        {category.label}
      </motion.p>

      {/* Category-level descriptor — AI Workflow only */}
      {category.categoryDescriptor && (
        <motion.p
          variants={itemVariants}
          className="font-sans text-xs text-[var(--text-secondary)] italic leading-relaxed mb-5"
        >
          {category.categoryDescriptor}
        </motion.p>
      )}

      {/* Items */}
      <div className="space-y-4">
        {category.items.map(item => (
          <StackItemRow key={item.name} item={item} />
        ))}
      </div>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Stack() {
  return (
    <section id="stack" className="section">
      <Container>
        {/* Label */}
        <motion.p
          className="font-mono text-sm text-[var(--text-muted)] mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4 }}
        >
          {'> stack'}
        </motion.p>

        {/* Categories grid — staggers columns on entry */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={gridVariants}
        >
          {stackCategories.map(category => (
            <CategoryColumn key={category.id} category={category} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
