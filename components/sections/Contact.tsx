'use client'

import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import Magnetic from '@/components/ui/Magnetic'
import { siteConfig } from '@/config/site'

// ─── Animation variants ───────────────────────────────────────────────────────

const itemVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

// Clip-up reveal — text emerges from behind a mask
const clipLineVariants = {
  hidden:  { y: '105%' },
  visible: (delay: number) => ({
    y: '0%',
    transition: { duration: 0.82, ease: [0.16, 1, 0.3, 1] as const, delay },
  }),
}

const fadeVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const lineVariants = {
  hidden:  { width: 0, opacity: 0 },
  visible: { width: '3rem', opacity: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}

// ─── Social link ──────────────────────────────────────────────────────────────

function SocialLink({ href, label }: { href: string; label: string }) {
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors duration-200"
    >
      {label}
    </a>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Contact() {
  const { email, github, whatsapp, instagram, facebook, tiktok } = siteConfig.socials

  const socialLinks = [
    { href: whatsapp,  label: 'WhatsApp'  },
    { href: instagram, label: 'Instagram' },
    { href: facebook,  label: 'Facebook'  },
    { href: tiktok,    label: 'TikTok'    },
    { href: github,    label: 'GitHub'    },
  ].filter(s => s.href)

  return (
    <section id="contact" className="section pt-24 pb-36">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Label */}
          <motion.p
            variants={fadeVariants}
            className="font-mono text-sm text-[var(--text-muted)] mb-10"
          >
            {'> contacto'}
          </motion.p>

          {/* Heading — two lines, clip-up reveal */}
          <div className="max-w-2xl mb-10">
            <div className="overflow-hidden">
              <motion.h2
                variants={clipLineVariants}
                custom={0.04}
                className="font-mono text-[clamp(2rem,5vw,3.75rem)] tracking-tight leading-[1.1] text-[var(--text-primary)]"
              >
                ¿Tienes un proyecto
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                variants={clipLineVariants}
                custom={0.14}
                className="font-mono text-[clamp(2rem,5vw,3.75rem)] tracking-tight leading-[1.1] text-[var(--text-primary)]"
              >
                que vale la pena construir?
              </motion.h2>
            </div>
          </div>

          {/* CTA — email */}
          <motion.div variants={fadeVariants} className="mb-16">
            <Magnetic>
              <a
                href={email}
                className="group relative inline-block font-mono text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                {email.replace('mailto:', '')}
                <span className="absolute -bottom-px left-0 h-px w-0 bg-[var(--accent)] transition-[width] duration-300 ease-out group-hover:w-full" />
              </a>
            </Magnetic>
          </motion.div>

          {/* Separator */}
          <motion.div
            variants={lineVariants}
            className="h-px bg-[var(--border)] mb-8"
          />

          {/* Social links */}
          {socialLinks.length > 0 && (
            <motion.div variants={fadeVariants} className="flex items-center gap-4">
              {socialLinks.map((s, i) => (
                <span key={s.label} className="flex items-center gap-4">
                  <SocialLink href={s.href} label={s.label} />
                  {i < socialLinks.length - 1 && (
                    <span className="font-mono text-xs text-[var(--text-muted)] select-none">·</span>
                  )}
                </span>
              ))}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
