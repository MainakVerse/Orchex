'use client'

export default function CTASection() {
  return (
    <section id="cta" style={{
      padding: '200px 60px', textAlign: 'center',
      position: 'relative', overflow: 'hidden',
      maxWidth: 1400, margin: '0 auto',
    }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 800, height: 800, pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, rgba(168,85,247,0.04) 40%, transparent 70%)',
      }} />

      <div className="reveal" style={{
        fontFamily: 'var(--font-space-mono), monospace',
        fontSize: 11, letterSpacing: '0.25em',
        color: '#00d4ff', textTransform: 'uppercase', marginBottom: 32,
      }}>
        The Future Is Intelligent
      </div>

      <h2 className="reveal" style={{
        fontFamily: 'var(--font-syne), sans-serif',
        fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 800,
        lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 20,
        transitionDelay: '0.1s',
      }}>
        The future of<br />
        <span style={{
          background: 'linear-gradient(90deg, #00d4ff, #a855f7)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          engineering systems
        </span>
        <br />
        is intelligent.
      </h2>

      <p className="reveal" style={{
        color: '#64748b', fontSize: 18, marginBottom: 56, fontWeight: 300,
        transitionDelay: '0.2s',
      }}>
        Join the journey.
      </p>

      <div className="reveal" style={{
        display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
        transitionDelay: '0.3s',
      }}>
        <a
          href="#"
          style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#020408',
            background: 'linear-gradient(135deg, #00d4ff, #3b82f6)',
            padding: '16px 36px', textDecoration: 'none',
            boxShadow: '0 0 30px rgba(0,212,255,0.3)',
            transition: 'all 0.3s', display: 'inline-block',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 0 50px rgba(0,212,255,0.5)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 0 30px rgba(0,212,255,0.3)'
          }}
        >
          Request Early Access
        </a>
        <a
          href="#"
          style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#e2e8f0', background: 'transparent',
            padding: '16px 36px', textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)', transition: 'all 0.3s', display: 'inline-block',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#00d4ff'
            e.currentTarget.style.color = '#00d4ff'
            e.currentTarget.style.background = 'rgba(0,212,255,0.05)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
            e.currentTarget.style.color = '#e2e8f0'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          Follow the Build
        </a>
      </div>
    </section>
  )
}
