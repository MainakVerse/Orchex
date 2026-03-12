const LINKS = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms',   href: '/terms'   },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-space-mono), monospace',
    fontSize: 10, color: '#64748b', textDecoration: 'none',
    letterSpacing: '0.1em', textTransform: 'uppercase',
    transition: 'color 0.3s',
  }

  return (
    <footer className="ox-footer" style={{
      borderTop: '1px solid rgba(0,212,255,0.08)',
      padding: '40px 60px',
      maxWidth: 1400, margin: '0 auto',
    }}>
      <div className="ox-footer-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Orchex" style={{ width: 22, height: 22, objectFit: 'contain' }} />
          <div style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 16, fontWeight: 800, letterSpacing: '0.2em',
            background: 'linear-gradient(90deg, #00d4ff, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textTransform: 'uppercase',
          }}>
            Orchex
          </div>
        </div>

        <div style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: 10, color: '#64748b', letterSpacing: '0.1em',
        }}>
          © 2026 Orchex. Data Engineering Intelligence.
        </div>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {LINKS.map(({ label, href }) => (
            <a key={label} href={href} style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
