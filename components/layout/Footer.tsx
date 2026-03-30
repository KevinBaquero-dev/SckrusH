import Container from '@/components/layout/Container'
import { siteConfig } from '@/config/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border)]">
      <Container>
        <div className="flex items-center justify-between py-8">
          <p className="font-sans text-xs text-[var(--text-muted)]">
            © {year} {siteConfig.name}
          </p>
          <p className="font-sans text-xs text-[var(--text-muted)]">
            Convierte tus ideas en un producto real...{' '}
            <a
              href={siteConfig.socials.email}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
            >
              contáctame.
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}
