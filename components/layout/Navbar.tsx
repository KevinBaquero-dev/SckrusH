'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/components/layout/Container'
import { siteConfig } from '@/config/site'

const NAV_LINKS = [
  { label: 'About',      href: '#about'    },
  { label: 'Proyectos',  href: '#projects' },
  { label: 'Contacto',   href: '#contact'  },
]

const SCROLL_THRESHOLD = 60

const menuVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: 'easeOut' as const } },
  exit:    { opacity: 0, transition: { duration: 0.15, ease: 'easeIn' as const } },
}

const listVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' as const } },
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-300"
        style={{
          backgroundColor: scrolled || menuOpen ? 'rgba(8,8,8,0.95)' : 'transparent',
          backdropFilter:   scrolled || menuOpen ? 'blur(4px)' : 'none',
        }}
      >
        <Container>
          <nav className="flex items-center justify-between py-5">
            {/* Logo */}
            <a
              href="#hero"
              onClick={closeMenu}
              className="font-mono text-sm text-[var(--text-primary)] hover:text-white transition-colors duration-200"
            >
              {siteConfig.name}
            </a>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative font-mono text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                  >
                    {link.label}
                    <span className="absolute -bottom-px left-0 h-px w-0 bg-[var(--accent)] transition-[width] duration-300 ease-out group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 shrink-0"
            >
              <span
                className="block h-px bg-[var(--text-secondary)] transition-all duration-300 origin-center"
                style={{
                  transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block h-px bg-[var(--text-secondary)] transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block h-px bg-[var(--text-secondary)] transition-all duration-300 origin-center"
                style={{
                  transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </nav>
        </Container>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 flex flex-col pt-[72px] md:hidden"
            style={{ backgroundColor: 'rgba(8,8,8,0.97)' }}
          >
            <Container>
              <motion.ul
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col pt-10 pb-8"
              >
                {NAV_LINKS.map((link, i) => (
                  <motion.li key={link.href} variants={itemVariants}>
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="group flex items-center justify-between py-5 border-b border-[var(--border)]"
                    >
                      <span className="font-mono text-2xl text-[var(--text-primary)]">
                        {link.label}
                      </span>
                      <span className="font-mono text-sm text-[var(--text-muted)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        →
                      </span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Footer hint */}
              <motion.p
                variants={itemVariants}
                className="font-mono text-xs text-[var(--text-muted)] pt-2"
              >
                {'> ' + siteConfig.name + '_'}
              </motion.p>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
