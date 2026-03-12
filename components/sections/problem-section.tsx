'use client'

const symptoms = [
  { icon: '⚡', text: 'Broken pipelines cascade silently until systems collapse' },
  { icon: '🔀', text: 'Fragmented tools producing conflicting signals' },
  { icon: '🔥', text: 'Engineers firefighting rather than building' },
  { icon: '🌫', text: 'No system-level awareness or reasoning layer' },
  { icon: '📉', text: 'Decisions made on incomplete, noisy context' },
]

export default function ProblemSection() {
  return (
    <section id="problem" className="ox-problem-section" style={{
      position: 'relative', padding: '160px 60px 140px',
      maxWidth: 1400, margin: '0 auto',
    }}>
      <div className="reveal" style={{
        fontFamily: 'var(--font-space-mono), monospace',
        fontSize: 10, letterSpacing: '0.3em',
        color: '#00d4ff', textTransform: 'uppercase',
        marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ display: 'block', width: 24, height: 1, background: '#00d4ff' }} />
        01 — The Problem
      </div>

      <div className="ox-grid-2" style={{ marginTop: 20 }}>
        <div className="reveal">
          <h2 style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 700,
            lineHeight: 1.1, letterSpacing: '-0.02em', color: '#e2e8f0',
          }}>
            Modern systems are powerful.<br />
            But they&apos;re{' '}
            <em style={{ fontStyle: 'normal', color: 'transparent', WebkitTextStroke: '1px rgba(0,212,255,0.5)' }}>
              not intelligent.
            </em>
          </h2>
          <p style={{ marginTop: 28, color: '#64748b', fontSize: 17, lineHeight: 1.8, fontWeight: 300 }}>
            Engineering teams are drowning in signal noise. Powerful tools exist in isolation — disconnected, unreasoning, requiring constant human firefighting.
          </p>
        </div>

        <div className="symptom reveal" style={{ display: 'flex', flexDirection: 'column', gap: 16, transitionDelay: '0.15s' }}>
          {symptoms.map((s, i) => (
            <div
              key={i}
              className="symptom"
              style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '20px 24px',
                background: 'rgba(0,212,255,0.04)',
                border: '1px solid rgba(0,212,255,0.12)',
                backdropFilter: 'blur(10px)',
                position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(0,212,255,0.3)'
                const bar = el.querySelector('.symptom-bar') as HTMLElement
                if (bar) bar.style.opacity = '1'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(0,212,255,0.12)'
                const bar = el.querySelector('.symptom-bar') as HTMLElement
                if (bar) bar.style.opacity = '0'
              }}
            >
              <div className="symptom-bar" style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 2,
                background: 'linear-gradient(180deg, #00d4ff, #a855f7)',
                opacity: 0, transition: 'opacity 0.3s',
              }} />
              <div style={{ width: 36, height: 36, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                {s.icon}
              </div>
              <div style={{ fontSize: 14, color: '#e2e8f0', opacity: 0.8, fontWeight: 300, letterSpacing: '0.01em' }}>
                {s.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
