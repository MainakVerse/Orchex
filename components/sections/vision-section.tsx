'use client'

export default function VisionSection() {
  return (
    <section id="vision" style={{
      padding: '160px 60px', textAlign: 'center',
      maxWidth: 1400, margin: '0 auto',
    }}>
      <div className="reveal" style={{
        fontFamily: 'var(--font-space-mono), monospace',
        fontSize: 10, letterSpacing: '0.3em',
        color: '#00d4ff', textTransform: 'uppercase',
        marginBottom: 48,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
      }}>
        <span>06 — Early Vision</span>
      </div>

      <p className="reveal" style={{
        fontFamily: 'var(--font-syne), sans-serif',
        fontSize: 'clamp(24px, 3.5vw, 48px)', fontWeight: 400,
        lineHeight: 1.4, letterSpacing: '-0.01em',
        maxWidth: 800, margin: '0 auto',
        color: 'rgba(226,232,240,0.7)',
        transitionDelay: '0.1s',
      }}>
        Orchex is{' '}
        <strong style={{ color: '#e2e8f0', fontWeight: 700 }}>not another tool.</strong>
        <br />
        It is a{' '}
        <span style={{
          background: 'linear-gradient(90deg, #00d4ff, #a855f7)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          fontWeight: 700,
        }}>
          thinking layer
        </span>
        <br />
        for modern engineering systems.
      </p>
    </section>
  )
}
