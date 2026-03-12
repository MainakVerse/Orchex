'use client'

import { useState, useEffect } from 'react'

const WORD    = ['O', 'R', 'C', 'H', 'E', 'X']
const TAGLINE = 'INTELLIGENCE LAYER — INITIALIZING'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase]           = useState(0)
  const [litCount, setLitCount]     = useState(0)
  const [tagline, setTagline]       = useState('')
  const [progress, setProgress]     = useState(0)
  const [exiting, setExiting]       = useState(false)

  /* ── phase timeline ── */
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 120),   // orb bloom
      setTimeout(() => setPhase(2), 1050),  // letters
      setTimeout(() => setPhase(3), 1900),  // tagline
      setTimeout(() => setPhase(4), 3300),  // bar fills + hold
      setTimeout(() => setExiting(true), 3900),
      setTimeout(() => onComplete(), 4700),
    ]
    return () => t.forEach(clearTimeout)
  }, [onComplete])

  /* ── progress bar ── */
  useEffect(() => {
    const targets: [number, number][] = [[0, 0], [120, 18], [1050, 48], [1900, 72], [3300, 100]]
    const timers = targets.map(([delay, val]) =>
      setTimeout(() => setProgress(val), delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  /* ── letter-by-letter ORCHEX ── */
  useEffect(() => {
    if (phase < 2) return
    let i = 0
    const timer = setInterval(() => {
      i++
      setLitCount(i)
      if (i >= WORD.length) clearInterval(timer)
    }, 85)
    return () => clearInterval(timer)
  }, [phase])

  /* ── tagline typewriter ── */
  useEffect(() => {
    if (phase < 3) return
    let i = 0
    const timer = setInterval(() => {
      i++
      setTagline(TAGLINE.slice(0, i))
      if (i >= TAGLINE.length) clearInterval(timer)
    }, 36)
    return () => clearInterval(timer)
  }, [phase])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#020408',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: exiting ? 0 : 1,
      transition: exiting ? 'opacity 0.85s cubic-bezier(0.4,0,0.2,1)' : 'none',
      pointerEvents: exiting ? 'none' : 'all',
      overflow: 'hidden',
    }}>

      {/* ── Background dot grid ── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(0,212,255,0.055) 1px, transparent 1px)',
        backgroundSize: '52px 52px',
        opacity: phase >= 1 ? 1 : 0,
        transition: 'opacity 1.4s ease',
        pointerEvents: 'none',
      }} />

      {/* ── Deep radial bloom behind orb ── */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: phase >= 1 ? 700 : 0,
        height: phase >= 1 ? 700 : 0,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.055) 0%, rgba(168,85,247,0.025) 40%, transparent 70%)',
        transition: 'width 1.2s ease, height 1.2s ease',
        pointerEvents: 'none',
      }} />

      {/* ── Orb + circular progress ring (co-located so ring tracks the ball) ── */}
      <div style={{
        position: 'relative', zIndex: 4,
        width: 160, height: 160,
        flexShrink: 0,
        marginBottom: 40,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* SVG circular progress — circumference = 2π × 70 ≈ 439.82 */}
        <svg
          width="160" height="160"
          viewBox="0 0 160 160"
          style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
        >
          <defs>
            <linearGradient id="cpGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          {/* track */}
          <circle
            cx="80" cy="80" r="70"
            fill="none"
            stroke="rgba(0,212,255,0.08)"
            strokeWidth="1.5"
          />
          {/* progress arc */}
          <circle
            cx="80" cy="80" r="70"
            fill="none"
            stroke="url(#cpGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="439.82"
            strokeDashoffset={439.82 * (1 - progress / 100)}
            style={{ transition: 'stroke-dashoffset 1s ease', filter: 'drop-shadow(0 0 4px rgba(0,212,255,0.7))' }}
          />
        </svg>

        {/* Centre orb */}
        <div style={{
          width:  phase >= 1 ? 118 : 5,
          height: phase >= 1 ? 118 : 5,
          borderRadius: '50%',
          background: `
            radial-gradient(circle at 32% 26%, rgba(255,255,255,0.70)  0%,  transparent 22%),
            radial-gradient(circle at 40% 34%, rgba(180,245,255,0.55)  0%,  transparent 52%),
            radial-gradient(circle at 72% 74%, rgba(0,20,50,0.75)      0%,  transparent 55%),
            radial-gradient(circle at 50% 50%, rgba(0,190,220,0.80)    0%,  rgba(0,80,140,0.70) 55%, rgba(0,30,70,0.90) 100%),
            radial-gradient(circle at 78% 78%, rgba(168,85,247,0.22)   0%,  transparent 45%)
          `,
          boxShadow: phase >= 1 ? `
            0 0 44px rgba(0,212,255,0.95),
            0 0 90px rgba(0,212,255,0.55),
            0 0 170px rgba(0,212,255,0.25),
            0 0 260px rgba(0,212,255,0.10),
            inset 0 0 34px rgba(0,150,200,0.45)
          ` : 'none',
          transition: 'width 0.85s cubic-bezier(0.34,1.56,0.64,1), height 0.85s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.85s ease',
          position: 'relative',
        }}>
          {/* specular highlight */}
          <div style={{
            position: 'absolute', top: '10%', left: '18%',
            width: '30%', height: '22%', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 100%)',
            filter: 'blur(7px)', pointerEvents: 'none',
          }} />
        </div>
      </div>

      {/* ── ORCHEX letters ── */}
      <div style={{
        display: 'flex', gap: 4,
        marginBottom: 18,
        height: 72,
        alignItems: 'center',
      }}>
        {WORD.map((char, i) => (
          <span
            key={char + i}
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 58, fontWeight: 800,
              letterSpacing: '0.04em',
              color: i < litCount ? '#e2e8f0' : 'rgba(226,232,240,0.06)',
              textShadow: i < litCount
                ? '0 0 18px rgba(0,212,255,0.9), 0 0 50px rgba(0,212,255,0.45)'
                : 'none',
              animation: i < litCount ? `letterIn 0.25s ease forwards` : 'none',
              transition: 'color 0.2s ease, text-shadow 0.2s ease',
              display: 'inline-block',
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* ── Tagline ── */}
      <div style={{
        fontFamily: 'var(--font-space-mono), monospace',
        fontSize: 10, letterSpacing: '0.32em',
        color: '#00d4ff', textTransform: 'uppercase',
        height: 20,
        opacity: phase >= 3 ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}>
        {tagline}
        {phase >= 3 && tagline.length < TAGLINE.length && (
          <span style={{
            display: 'inline-block', width: 1.5, height: '1em',
            background: '#00d4ff', marginLeft: 2, verticalAlign: 'text-bottom',
            animation: 'scrollPulse 0.7s ease-in-out infinite',
          }} />
        )}
      </div>

      {/* ── Progress bar ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 2,
        background: 'rgba(0,212,255,0.07)',
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #00d4ff, #a855f7)',
          boxShadow: '0 0 10px rgba(0,212,255,0.8)',
          transition: 'width 1s ease',
        }} />
      </div>

      {/* ── Corner scan lines (decorative) ── */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(corner => {
        const isTop    = corner.startsWith('top')
        const isLeft   = corner.endsWith('left')
        return (
          <div key={corner} style={{
            position: 'absolute',
            top:    isTop    ? 24 : undefined,
            bottom: !isTop   ? 24 : undefined,
            left:   isLeft   ? 24 : undefined,
            right:  !isLeft  ? 24 : undefined,
            width: 32, height: 32,
            borderTop:    isTop    ? '1px solid rgba(0,212,255,0.3)' : undefined,
            borderBottom: !isTop   ? '1px solid rgba(0,212,255,0.3)' : undefined,
            borderLeft:   isLeft   ? '1px solid rgba(0,212,255,0.3)' : undefined,
            borderRight:  !isLeft  ? '1px solid rgba(0,212,255,0.3)' : undefined,
            opacity: phase >= 1 ? 1 : 0,
            transition: 'opacity 0.8s ease 0.2s',
          }} />
        )
      })}

    </div>
  )
}
