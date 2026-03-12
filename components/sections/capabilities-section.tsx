'use client'

const caps = [
  { num: '01', icon: '👁', title: 'System Awareness', desc: 'Continuous observation across all connected systems. Orchex maintains a living model of your infrastructure state.' },
  { num: '02', icon: '📡', title: 'Signal Interpretation', desc: 'Raw data becomes meaning. Orchex reads through noise to surface what truly matters — before it becomes a crisis.' },
  { num: '03', icon: '🧭', title: 'Decision Guidance', desc: 'Context-aware recommendations that give engineering teams clarity — not more noise — at the critical moment.' },
  { num: '04', icon: '🏗', title: 'Infrastructure Intelligence', desc: 'Deep understanding of infrastructure topology, dependencies, and cascading risk patterns across the entire stack.' },
  { num: '05', icon: '⚙️', title: 'Adaptive Orchestration', desc: 'Systems that respond to themselves. Orchex coordinates workflows intelligently, adapting to real-time system state.' },
  { num: '06', icon: '💡', title: 'Engineering Insight', desc: 'Patterns surface. Bottlenecks become visible. Orchex transforms operational data into engineering advantage.' },
]

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" className="ox-cap-section" style={{ padding: '140px 60px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div className="ox-caps-header">
        <div className="reveal">
          <div style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: 10, letterSpacing: '0.3em',
            color: '#00d4ff', textTransform: 'uppercase',
            marginBottom: 20,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ display: 'block', width: 24, height: 1, background: '#00d4ff' }} />
            03 — Core Capabilities
          </div>
          <h2 style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 800,
            lineHeight: 1.05, letterSpacing: '-0.02em',
          }}>
            Six dimensions<br />of intelligence.
          </h2>
        </div>
        <p className="reveal" style={{
          color: '#64748b', fontSize: 17, lineHeight: 1.8,
          fontWeight: 300, transitionDelay: '0.15s',
        }}>
          Every module is designed to work in concert — an interconnected intelligence layer that understands context, interprets signals, and guides action.
        </p>
      </div>

      {/* Grid */}
      <div className="ox-grid-3">
        {caps.map((cap, i) => (
          <div
            key={i}
            className="cap-card reveal"
            style={{
              background: '#050c14', padding: '44px 36px',
              position: 'relative', overflow: 'hidden',
              transition: 'transform 0.4s',
              transitionDelay: `${(i % 3) * 0.1}s`,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.transform = 'translateY(-4px)'
              const after = el.querySelector('.cap-after') as HTMLElement
              if (after) after.style.opacity = '1'
              const iconWrap = el.querySelector('.cap-icon-wrap') as HTMLElement
              if (iconWrap) iconWrap.style.borderColor = 'rgba(0,212,255,0.5)'
              const glow = el.querySelector('.cap-glow') as HTMLElement
              if (glow) glow.style.opacity = '1'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.transform = 'translateY(0)'
              const after = el.querySelector('.cap-after') as HTMLElement
              if (after) after.style.opacity = '0'
              const iconWrap = el.querySelector('.cap-icon-wrap') as HTMLElement
              if (iconWrap) iconWrap.style.borderColor = 'rgba(0,212,255,0.2)'
              const glow = el.querySelector('.cap-glow') as HTMLElement
              if (glow) glow.style.opacity = '0'
            }}
          >
            <div className="cap-after" style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(0,212,255,0.05), rgba(168,85,247,0.05))',
              opacity: 0, transition: 'opacity 0.4s', pointerEvents: 'none',
            }} />
            <span style={{
              position: 'absolute', top: 20, right: 24,
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: 10, color: 'rgba(0,212,255,0.3)', letterSpacing: '0.1em',
            }}>
              {cap.num}
            </span>
            <div className="cap-icon-wrap" style={{
              width: 52, height: 52,
              border: '1px solid rgba(0,212,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 28, transition: 'border-color 0.3s',
            }}>
              <span style={{ fontSize: 22 }}>{cap.icon}</span>
            </div>
            <div style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 20, fontWeight: 700, marginBottom: 14, letterSpacing: '-0.01em',
            }}>
              {cap.title}
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#64748b', fontWeight: 300 }}>
              {cap.desc}
            </p>
            <div className="cap-glow" style={{
              position: 'absolute', bottom: -20, right: -20,
              width: 100, height: 100, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,212,255,0.15), transparent 70%)',
              opacity: 0, transition: 'opacity 0.4s', pointerEvents: 'none',
            }} />
          </div>
        ))}
      </div>
    </section>
  )
}
