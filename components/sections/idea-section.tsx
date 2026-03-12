'use client'

import { useState, useEffect } from 'react'
import { useIsMobile } from '@/components/ui/use-mobile'

type OrbitId = 'data' | 'process' | 'intelligence'

const ORBITS: Record<OrbitId, {
  label: string
  color: string
  rgb: string
  borderDefault: string
  borderHot: string
  dotGlow: string
  shadowHot: string
  desc: string
  info: string
}> = {
  data: {
    label: 'DATA',
    color: '#00d4ff',
    rgb: '0,212,255',
    borderDefault: 'rgba(0,212,255,0.28)',
    borderHot:    'rgba(0,212,255,0.9)',
    dotGlow:      '0 0 20px #00d4ff, 0 0 44px rgba(0,212,255,0.7)',
    shadowHot:    '0 0 28px 6px rgba(0,212,255,0.28)',
    desc: 'All data streams, databases and pipelines observed in real-time across your entire infrastructure.',
    info: 'The DATA axis represents every source of information in your engineering ecosystem — databases, event streams, message queues, and data pipelines. Orchex continuously monitors these signals without disruption, creating a unified observability layer that spans PostgreSQL, Kafka, Snowflake, Redis, and beyond. Rather than sampling or polling, Orchex builds a living map of your data topology — understanding not just what the data is, but how it moves, where it stalls, and when patterns deviate. This layer becomes the foundation for every intelligent decision Orchex makes.',
  },
  process: {
    label: 'PROCESS',
    color: '#a855f7',
    rgb: '168,85,247',
    borderDefault: 'rgba(168,85,247,0.22)',
    borderHot:    'rgba(168,85,247,0.9)',
    dotGlow:      '0 0 20px #a855f7, 0 0 44px rgba(168,85,247,0.7)',
    shadowHot:    '0 0 28px 6px rgba(168,85,247,0.28)',
    desc: 'Workflows, orchestration and execution paths continuously monitored and intelligently guided.',
    info: 'The PROCESS axis tracks the orchestration layer — how work flows through your systems. From Kubernetes pods to CI/CD pipelines, from Terraform provisioning runs to microservice call chains, Orchex traces the full lifecycle of every engineering process. It detects bottlenecks before they become incidents, identifies inefficient execution patterns, and surfaces hidden dependencies between services. When something fails, Orchex already knows the upstream cause. When a process slows, it pinpoints the constraint. Process intelligence transforms reactive debugging into proactive guidance.',
  },
  intelligence: {
    label: 'INTELLIGENCE',
    color: '#00fff0',
    rgb: '0,255,240',
    borderDefault: 'rgba(0,255,240,0.18)',
    borderHot:    'rgba(0,255,240,0.9)',
    dotGlow:      '0 0 20px #00fff0, 0 0 44px rgba(0,255,240,0.7)',
    shadowHot:    '0 0 28px 6px rgba(0,255,240,0.28)',
    desc: 'The reasoning layer that interprets every signal, decides on action, and guides engineering decisions.',
    info: 'The INTELLIGENCE axis is where Orchex transcends monitoring. Raw data and process signals are synthesized into context — a deep, evolving understanding of your system\'s intent, health, and trajectory. Orchex applies reasoning models trained on engineering patterns to correlate events across time and topology, predict emerging failures, and recommend actions with confidence scores. It does not just alert you to problems — it understands them. This is the layer that makes Orchex a thinking partner rather than a passive dashboard.',
  },
}

/* ── Typewriter hook ── */
function useTypewriter(text: string, speed = 16) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    setDisplayed('')
    if (!text) return
    let i = 0
    const timer = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(timer)
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])
  return displayed
}

function AxisLabel({
  id, active, onEnter, onLeave, onClick, style,
}: {
  id: OrbitId
  active: boolean
  onEnter: () => void
  onLeave: () => void
  onClick: () => void
  style?: React.CSSProperties
}) {
  const o = ORBITS[id]
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        position: 'absolute',
        display: 'flex', alignItems: 'center', gap: 8,
        fontFamily: 'var(--font-space-mono), monospace',
        fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
        color: active ? o.color : '#64748b',
        cursor: 'pointer',
        transition: 'color 0.35s',
        userSelect: 'none',
        zIndex: 20,
        ...style,
      }}
    >
      <div style={{
        width: 7, height: 7, borderRadius: '50%',
        background: o.color,
        boxShadow: active ? `0 0 10px ${o.color}, 0 0 20px ${o.color}` : 'none',
        transition: 'box-shadow 0.35s',
        flexShrink: 0,
      }} />
      {o.label}
    </div>
  )
}

/* ── Mobile orbit cards ── */
function MobileOrbitCards() {
  const [activeCard, setActiveCard] = useState<OrbitId | null>(null)
  const typewritten = useTypewriter(activeCard ? ORBITS[activeCard].info : '')
  const ids: OrbitId[] = ['data', 'process', 'intelligence']

  return (
    <div style={{ width: '100%' }}>
      {/* Tab row */}
      <div style={{ display: 'flex', gap: 1, marginBottom: 16 }}>
        {ids.map(id => {
          const o = ORBITS[id]
          const isActive = activeCard === id
          return (
            <button
              key={id}
              onClick={() => setActiveCard(prev => prev === id ? null : id)}
              style={{
                flex: 1,
                padding: '14px 8px',
                background: isActive ? `rgba(${o.rgb},0.12)` : 'rgba(0,10,25,0.6)',
                border: `1px solid ${isActive ? o.color : 'rgba(255,255,255,0.08)'}`,
                borderBottom: isActive ? `2px solid ${o.color}` : '1px solid rgba(255,255,255,0.08)',
                color: isActive ? o.color : '#64748b',
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: 9, letterSpacing: '0.18em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: o.color,
                boxShadow: isActive ? `0 0 8px ${o.color}` : 'none',
                flexShrink: 0,
              }} />
              {o.label}
            </button>
          )
        })}
      </div>

      {/* Description cards */}
      {ids.map(id => {
        const o = ORBITS[id]
        return (
          <div key={id} style={{
            display: activeCard === id ? 'block' : 'none',
            marginBottom: 16,
          }}>
            {/* Short desc */}
            <p style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: 14, lineHeight: 1.7, color: o.color,
              marginBottom: 16,
            }}>
              {o.desc}
            </p>
            {/* Info box */}
            <div style={{
              padding: '20px',
              border: `1px solid ${o.color}`,
              boxShadow: `0 0 24px rgba(${o.rgb},0.15), inset 0 0 24px rgba(${o.rgb},0.03)`,
              background: 'rgba(2,4,8,0.92)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, ${o.color}, rgba(${o.rgb},0.2))`,
              }} />
              <div style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: 9, letterSpacing: '0.3em',
                color: o.color, textTransform: 'uppercase',
                marginBottom: 10, opacity: 0.85,
              }}>
                {o.label} — Axis Definition
              </div>
              <p style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: 13, lineHeight: 1.75, fontWeight: 300,
                color: 'rgba(226,232,240,0.82)', margin: 0, minHeight: 60,
              }}>
                {typewritten}
                <span style={{
                  display: 'inline-block',
                  width: 1.5, height: '1em',
                  background: o.color,
                  marginLeft: 2, verticalAlign: 'text-bottom',
                  animation: 'scrollPulse 0.7s ease-in-out infinite',
                }} />
              </p>
            </div>
          </div>
        )
      })}

      {!activeCard && (
        <p style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: 9, letterSpacing: '0.2em', color: '#64748b',
          textTransform: 'uppercase', textAlign: 'center', marginTop: 8,
        }}>
          Tap an axis to explore
        </p>
      )}
    </div>
  )
}

export default function IdeaSection() {
  const isMobile = useIsMobile()
  const [hovered, setHovered] = useState<OrbitId | null>(null)
  const [activeOrbit, setActiveOrbit] = useState<OrbitId | null>(null)

  /* typewriter */
  const typewritten = useTypewriter(activeOrbit ? ORBITS[activeOrbit].info : '')

  const enter = (id: OrbitId) => setHovered(id)
  const leave = () => setHovered(null)
  const hot   = (id: OrbitId) => hovered === id
  const lit   = (id: OrbitId) => hot(id) || activeOrbit === id
  const o     = (id: OrbitId) => ORBITS[id]

  const handleOrbitClick = (id: OrbitId) =>
    setActiveOrbit(prev => (prev === id ? null : id))

  /* shared orbit dot */
  const dot = (id: OrbitId, size: number, shadowDefault: string): React.CSSProperties => ({
    position: 'absolute',
    top: -(size / 2),
    left: '50%',
    transform: 'translateX(-50%)',
    width:  hot(id) ? size + 4 : size,
    height: hot(id) ? size + 4 : size,
    borderRadius: '50%',
    background: `radial-gradient(circle, #ffffff 0%, ${o(id).color} 60%)`,
    boxShadow: hot(id) ? o(id).dotGlow : shadowDefault,
    transition: 'width 0.35s, height 0.35s, box-shadow 0.35s, top 0.35s',
  })

  const shifted = !!activeOrbit

  return (
    <section id="idea" style={{
      textAlign: 'center', padding: '160px 60px 100px',
      maxWidth: 1400, margin: '0 auto',
    }}>
      {/* section tag */}
      <div className="reveal" style={{
        fontFamily: 'var(--font-space-mono), monospace',
        fontSize: 10, letterSpacing: '0.3em', color: '#00d4ff',
        textTransform: 'uppercase', marginBottom: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
      }}>
        02 — The Idea
      </div>

      {/* headline */}
      <h2 className="reveal" style={{
        fontFamily: 'var(--font-syne), sans-serif',
        fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 800,
        letterSpacing: '-0.02em', lineHeight: 1.05,
        maxWidth: 900, margin: '0 auto 24px',
      }}>
        What if systems could{' '}
        <span style={{
          background: 'linear-gradient(90deg, #00d4ff, #a855f7)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.5))',
        }}>reason?</span>
      </h2>

      {/* description */}
      <p className="reveal" style={{
        color: '#64748b', fontSize: 'clamp(15px, 2vw, 19px)', lineHeight: 1.8,
        maxWidth: 600, margin: '0 auto 70px',
        transitionDelay: '0.15s',
      }}>
        Orchex introduces a new layer of data engineering intelligence. A thinking layer that sits above
        your infrastructure — observing, interpreting, and guiding with precision.
      </p>

      {/* ── Mobile: orbit cards ── */}
      {isMobile && (
        <div className="reveal" style={{ transitionDelay: '0.3s' }}>
          <MobileOrbitCards />
        </div>
      )}

      {/* ── Desktop: interactive orbital ── */}
      {!isMobile && (
        <div className="reveal" style={{
          position: 'relative', height: 720,
          transitionDelay: '0.3s', overflow: 'visible',
        }}>

          {/* ── ORBITAL WRAPPER — shifts left when an orbit is active ── */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: 800, height: 720,
            marginLeft: -400,
            transform: shifted ? 'translateX(-170px)' : 'translateX(0)',
            transition: 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>

            {/* PROCESS label — LEFT */}
            <AxisLabel id="process" active={lit('process')}
              onEnter={() => enter('process')} onLeave={leave}
              onClick={() => handleOrbitClick('process')}
              style={{ left: 0, top: '50%', transform: 'translateY(-50%)' }}
            />

            {/* DATA label — RIGHT */}
            <AxisLabel id="data" active={lit('data')}
              onEnter={() => enter('data')} onLeave={leave}
              onClick={() => handleOrbitClick('data')}
              style={{ right: 0, top: '50%', transform: 'translateY(-50%)' }}
            />

            {/* INTELLIGENCE label — TOP */}
            <AxisLabel id="intelligence" active={lit('intelligence')}
              onEnter={() => enter('intelligence')} onLeave={leave}
              onClick={() => handleOrbitClick('intelligence')}
              style={{ top: 0, left: '50%', transform: 'translateX(-50%)' }}
            />

            {/* connector lines */}
            <div style={{
              position: 'absolute', left: 68, top: '50%',
              width: 22, height: 1,
              background: `linear-gradient(90deg, ${lit('process') ? 'rgba(168,85,247,0.6)' : 'rgba(168,85,247,0.15)'}, transparent)`,
              transition: 'background 0.35s',
            }} />
            <div style={{
              position: 'absolute', right: 40, top: '50%',
              width: 22, height: 1,
              background: `linear-gradient(90deg, transparent, ${lit('data') ? 'rgba(0,212,255,0.6)' : 'rgba(0,212,255,0.15)'})`,
              transition: 'background 0.35s',
            }} />
            <div style={{
              position: 'absolute', left: '50%', top: 20,
              width: 1, height: 20,
              background: `linear-gradient(180deg, ${lit('intelligence') ? 'rgba(0,255,240,0.6)' : 'rgba(0,255,240,0.15)'}, transparent)`,
              transition: 'background 0.35s',
            }} />

            {/* ── PERSPECTIVE CONTAINER (620 × 620) ── */}
            <div style={{
              position: 'absolute', top: 50, left: 90,
              width: 620, height: 620,
              perspective: '1100px',
            }}>

              {/* ORBIT 1: DATA — flat horizontal ring */}
              <div
                onMouseEnter={() => enter('data')}
                onMouseLeave={leave}
                onClick={() => handleOrbitClick('data')}
                style={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: 590, height: 590,
                  transform: 'translate(-50%,-50%) rotateX(72deg)',
                  borderRadius: '50%',
                  border: `${lit('data') ? '1.5px' : '1px'} solid ${lit('data') ? o('data').borderHot : o('data').borderDefault}`,
                  boxShadow: lit('data') ? o('data').shadowHot : 'none',
                  transition: 'border-color 0.35s, border-width 0.35s, box-shadow 0.35s',
                  cursor: 'pointer',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', animation: 'orbitSpin 11s linear infinite' }}>
                  <div style={dot('data', 14, '0 0 14px #00d4ff, 0 0 28px rgba(0,212,255,0.5)')} />
                </div>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', animation: 'orbitSpin 11s linear infinite', animationDelay: '-5.5s' }}>
                  <div style={{
                    position: 'absolute', top: -4, left: '50%',
                    transform: 'translateX(-50%)',
                    width: hot('data') ? 10 : 7, height: hot('data') ? 10 : 7,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #fff 0%, #00d4ff 70%)',
                    boxShadow: hot('data') ? '0 0 12px #00d4ff' : '0 0 6px rgba(0,212,255,0.4)',
                    transition: 'all 0.35s',
                  }} />
                </div>
              </div>

              {/* ORBIT 2: PROCESS — vertical standing ring */}
              <div
                onMouseEnter={() => enter('process')}
                onMouseLeave={leave}
                onClick={() => handleOrbitClick('process')}
                style={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: 450, height: 450,
                  transform: 'translate(-50%,-50%) rotateY(72deg)',
                  borderRadius: '50%',
                  border: `${lit('process') ? '1.5px' : '1px'} solid ${lit('process') ? o('process').borderHot : o('process').borderDefault}`,
                  boxShadow: lit('process') ? o('process').shadowHot : 'none',
                  transition: 'border-color 0.35s, border-width 0.35s, box-shadow 0.35s',
                  cursor: 'pointer',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', animation: 'orbitSpin 16s linear infinite reverse' }}>
                  <div style={dot('process', 13, '0 0 14px #a855f7, 0 0 28px rgba(168,85,247,0.5)')} />
                </div>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', animation: 'orbitSpin 16s linear infinite reverse', animationDelay: '-8s' }}>
                  <div style={{
                    position: 'absolute', top: -4, left: '50%',
                    transform: 'translateX(-50%)',
                    width: hot('process') ? 9 : 7, height: hot('process') ? 9 : 7,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #fff 0%, #a855f7 70%)',
                    boxShadow: hot('process') ? '0 0 12px #a855f7' : '0 0 6px rgba(168,85,247,0.4)',
                    transition: 'all 0.35s',
                  }} />
                </div>
              </div>

              {/* ORBIT 3: INTELLIGENCE — 45° diagonal ring */}
              <div
                onMouseEnter={() => enter('intelligence')}
                onMouseLeave={leave}
                onClick={() => handleOrbitClick('intelligence')}
                style={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: 400, height: 400,
                  transform: 'translate(-50%,-50%) rotateX(55deg) rotateZ(45deg)',
                  borderRadius: '50%',
                  border: `${lit('intelligence') ? '1.5px' : '1px'} solid ${lit('intelligence') ? o('intelligence').borderHot : o('intelligence').borderDefault}`,
                  boxShadow: lit('intelligence') ? o('intelligence').shadowHot : 'none',
                  transition: 'border-color 0.35s, border-width 0.35s, box-shadow 0.35s',
                  cursor: 'pointer',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', animation: 'orbitSpin 7s linear infinite' }}>
                  <div style={dot('intelligence', 11, '0 0 12px #00fff0, 0 0 24px rgba(0,255,240,0.5)')} />
                </div>
              </div>

              {/* ── CENTER ORB ── */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                width: 270, height: 270, borderRadius: '50%',
                transform: 'translate(-50%,-50%)',
                animation: 'orbPulse3D 3.5s ease-in-out infinite',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 10,
                background: `
                  radial-gradient(circle at 32% 26%, rgba(255,255,255,0.70)  0%,  transparent 22%),
                  radial-gradient(circle at 40% 34%, rgba(180,245,255,0.55)  0%,  transparent 52%),
                  radial-gradient(circle at 72% 74%, rgba(0,20,50,0.75)      0%,  transparent 55%),
                  radial-gradient(circle at 50% 50%, rgba(0,190,220,0.80)    0%,  rgba(0,80,140,0.70) 55%, rgba(0,30,70,0.90) 100%),
                  radial-gradient(circle at 78% 78%, rgba(168,85,247,0.25)   0%,  transparent 45%)
                `,
              }}>
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: 'radial-gradient(circle at 68% 70%, transparent 54%, rgba(0,212,255,0.18) 70%, transparent 80%)',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', top: '11%', left: '20%',
                  width: '28%', height: '20%', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.90) 0%, transparent 100%)',
                  filter: 'blur(8px)', pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', bottom: '12%', right: '14%',
                  width: '30%', height: '24%', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 100%)',
                  filter: 'blur(10px)', pointerEvents: 'none',
                }} />
                <span style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontWeight: 800, fontSize: 20, letterSpacing: '0.18em',
                  color: 'rgba(255,255,255,0.92)',
                  textShadow: '0 0 12px rgba(0,212,255,0.6), 0 2px 4px rgba(0,0,0,0.5)',
                  position: 'relative', zIndex: 1, userSelect: 'none',
                }}>
                  ORCHEX
                </span>
              </div>

              {/* ambient glow behind orb */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 340, height: 340, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)',
                filter: 'blur(24px)', pointerEvents: 'none', zIndex: 5,
              }} />
            </div>{/* /perspective container */}

            {/* DESCRIPTION */}
            <div style={{
              position: 'absolute', bottom: 0, left: '50%',
              transform: 'translateX(-50%)',
              width: 460, textAlign: 'center', minHeight: 48,
            }}>
              {(['data', 'process', 'intelligence'] as OrbitId[]).map(id => (
                <p key={id} style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: 14, lineHeight: 1.7, fontWeight: 300,
                  color: ORBITS[id].color,
                  opacity: hovered === id && !activeOrbit ? 1 : 0,
                  transform: hovered === id && !activeOrbit ? 'translateY(0)' : 'translateY(6px)',
                  transition: 'opacity 0.35s, transform 0.35s',
                  pointerEvents: 'none',
                }}>
                  {ORBITS[id].desc}
                </p>
              ))}
              <p style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: 10, letterSpacing: '0.2em', color: '#64748b',
                textTransform: 'uppercase',
                opacity: hovered || activeOrbit ? 0 : 0.7,
                transition: 'opacity 0.35s',
              }}>
                Hover an axis to explore · Click to expand
              </p>
            </div>
          </div>{/* /orbital wrapper */}

          {/* INFO PANEL */}
          {activeOrbit && (
            <div
              key={activeOrbit}
              style={{
                position: 'absolute',
                top: '50%',
                left: 'calc(50% + 238px)',
                display: 'flex',
                alignItems: 'center',
                gap: 0,
                width: 380,
                animation: 'panelIn 0.5s ease forwards',
              }}
            >
              {/* Animated neon pointer line */}
              <div style={{
                flexShrink: 0, width: 56, height: 2,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(90deg, rgba(${ORBITS[activeOrbit].rgb},0.3), ${ORBITS[activeOrbit].color})`,
                  animation: 'lineGrow 0.45s ease forwards',
                }} />
              </div>
              {/* dot at junction */}
              <div style={{
                flexShrink: 0,
                width: 8, height: 8, borderRadius: '50%',
                background: ORBITS[activeOrbit].color,
                boxShadow: `0 0 10px ${ORBITS[activeOrbit].color}, 0 0 22px ${ORBITS[activeOrbit].color}`,
                marginRight: 12, marginLeft: -1,
              }} />

              {/* Neon info box */}
              <div style={{
                flex: 1,
                padding: '20px 22px 16px',
                border: `1px solid ${ORBITS[activeOrbit].color}`,
                boxShadow: `
                  0 0 24px rgba(${ORBITS[activeOrbit].rgb},0.22),
                  0 0 60px rgba(${ORBITS[activeOrbit].rgb},0.08),
                  inset 0 0 24px rgba(${ORBITS[activeOrbit].rgb},0.04)
                `,
                background: 'rgba(2,4,8,0.92)',
                backdropFilter: 'blur(14px)',
                position: 'relative',
                borderRadius: 2,
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, ${ORBITS[activeOrbit].color}, rgba(${ORBITS[activeOrbit].rgb},0.2))`,
                }} />
                <div style={{
                  fontFamily: 'var(--font-space-mono), monospace',
                  fontSize: 9, letterSpacing: '0.3em',
                  color: ORBITS[activeOrbit].color,
                  textTransform: 'uppercase',
                  marginBottom: 10, opacity: 0.85,
                }}>
                  {ORBITS[activeOrbit].label} — AXIS DEFINITION
                </div>
                <p style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: 12.5, lineHeight: 1.75, fontWeight: 300,
                  color: 'rgba(226,232,240,0.82)',
                  margin: 0, minHeight: 170, textAlign: 'left',
                }}>
                  {typewritten}
                  <span style={{
                    display: 'inline-block',
                    width: 1.5, height: '1em',
                    background: ORBITS[activeOrbit].color,
                    marginLeft: 2, verticalAlign: 'text-bottom',
                    animation: 'scrollPulse 0.7s ease-in-out infinite',
                  }} />
                </p>
                <div
                  onClick={() => setActiveOrbit(null)}
                  style={{
                    marginTop: 14,
                    fontFamily: 'var(--font-space-mono), monospace',
                    fontSize: 9, letterSpacing: '0.2em',
                    color: '#64748b', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = ORBITS[activeOrbit].color }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#64748b' }}
                >
                  [ Click orbit again to close ]
                </div>
              </div>
            </div>
          )}

        </div>
      )}{/* /desktop orbital */}

    </section>
  )
}
