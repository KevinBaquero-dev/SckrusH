import Container from '@/components/layout/Container'
import { siteConfig } from '@/config/site'

export default function Footer() {
  const year = new Date().getFullYear()
  const { github, linkedin } = siteConfig.socials

  const links = [
    { href: github,   label: 'GitHub'   },
    { href: linkedin, label: 'LinkedIn' },
  ].filter(l => l.href)

  return (
    <footer className="border-t border-[var(--border)]">
      <Container>
        <div className="flex items-center justify-between py-8">
          {/* Copyright */}
          <p className="font-sans text-xs text-[var(--text-muted)]">
            © {year} {siteConfig.name}
          </p>

          {/* Social links */}
          {links.length > 0 && (
            <div className="flex items-center gap-6">
              {links.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>
    </footer>
  )
}
