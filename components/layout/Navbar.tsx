'use client'

import { useEffect, useState } from 'react'
import Container from '@/components/layout/Container'
import { siteConfig } from '@/config/site'

const NAV_LINKS = [
  { label: 'About',      href: '#about'    },
  { label: 'Proyectos',  href: '#projects' },
  { label: 'Contacto',   href: '#contact'  },
]

const SCROLL_THRESHOLD = 60

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(8,8,8,0.80)' : 'transparent',
        backdropFilter: scrolled ? 'blur(4px)' : 'none',
      }}
    >
      <Container>
        <nav className="flex items-center justify-between py-5">
          {/* Logo */}
          <a
            href="#hero"
            className="font-mono text-sm text-[var(--text-primary)] hover:text-white transition-colors duration-200"
          >
            {siteConfig.name}
          </a>

          {/* Links — gap only, no separator characters */}
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
        </nav>
      </Container>
    </header>
  )
}
