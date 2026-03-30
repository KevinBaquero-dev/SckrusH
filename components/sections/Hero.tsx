'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import { useTypewriter } from '@/hooks/useTypewriter'

const TITLE = '> SckrusH'

const TAGLINES = [
  'Solución a verdaderos problemas.',
  'Ahorra tiempo con Software.',
]

const taglineVariants = {
  hidden: { y: '105%' },
  visible: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.65,
      delay: 0.075 + i * 0.12,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
}

export default function Hero() {
  const { displayed, done: typingDone } = useTypewriter({
    text: TITLE,
    speed: 75,
    startDelay: 150,
    jitter: 40, // ±40ms variation, biased slightly slow
  })

  // Short pause before cursor starts blinking — feels like it "settles"
  const [blinkReady, setBlinkReady] = useState(false)
  useEffect(() => {
    if (!typingDone) return
    const t = setTimeout(() => setBlinkReady(true), 220)
    return () => clearTimeout(t)
  }, [typingDone])

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-center overflow-hidden"
    >
      {/* Subtle accent glow from top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(232,255,71,0.055) 0%, transparent 65%)',
        }}
      />

      <Container className="relative z-10 py-24 md:py-32">
        {/* Title: typewriter + cursor */}
        <div className="mb-10">
          <span className="font-mono text-[clamp(3rem,8vw,7rem)] tracking-tight leading-none">
            {/* '>' rendered slightly muted and closer to the name */}
            {displayed.startsWith('>') && (
              <span className="text-[var(--text-secondary)] mr-[0.2em]">{'>'}</span>
            )}
            <span className="text-[var(--text-primary)]">
              {displayed.startsWith('> ')
                ? displayed.slice(2)
                : displayed.startsWith('>')
                  ? ''
                  : displayed}
            </span>
            <span
              className="inline-block text-[var(--accent)]"
              style={{
                animation: blinkReady ? 'blink 1.1s step-end infinite' : 'none',
              }}
            >
              _
            </span>
          </span>
        </div>

        {/* Tagline: line-by-line reveal */}
        <div className="mb-10">
          {TAGLINES.map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.p
                custom={i}
                initial="hidden"
                animate={typingDone ? 'visible' : 'hidden'}
                variants={taglineVariants}
                className="font-mono text-[clamp(1.5rem,4vw,2.5rem)] leading-tight text-[var(--text-primary)]"
              >
                {line}
              </motion.p>
            </div>
          ))}
        </div>

        {/* Subtitle: t≈1300ms */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={typingDone ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.475 }}
          className="font-sans text-base text-[var(--text-secondary)] mb-14 max-w-sm"
        >
          Sistemas construidos con intención.
        </motion.p>

        {/* CTA: t≈1400ms (moved from 0.775 → 0.575) */}
        <motion.a
          href="#projects"
          initial={{ opacity: 0 }}
          animate={typingDone ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.575 }}
          className="group relative inline-flex items-baseline gap-1 font-mono text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
        >
          <span>ver proyectos</span>
          {/* Arrow moves 75ms after underline starts */}
          <span className="inline-block transition-transform duration-200 delay-75 group-hover:translate-y-0.5">
            ↓
          </span>
          {/* Underline leads, grows immediately on hover */}
          <span className="absolute -bottom-px left-0 h-px w-0 bg-[var(--accent)] transition-[width] duration-300 ease-out group-hover:w-full" />
        </motion.a>
      </Container>
    </section>
  )
}
