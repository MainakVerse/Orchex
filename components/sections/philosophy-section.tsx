'use client'

import { useEffect, useRef } from 'react'

const lines = ['Observe before acting.', 'Understand before changing.', 'Reason before executing.']

export default function PhilosophySection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Canvas background
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let W = 0, H = 0
    const resize = () => {
      const section = canvas.parentElement
      if (!section) return
      W = canvas.width = section.offsetWidth
      H = canvas.height = section.offsetHeight
    }
    window.addEventListener('resize', resize); resize()

    const streams = Array.from({ length: 40 }, () => ({
      x: Math.random(), y: Math.random(),
      speed: 0.00008 + Math.random() * 0.0001,
      width: 80 + Math.random() * 200,
      alpha: 0.03 + Math.random() * 0.06,
      color: Math.random() > 0.5 ? '0,212,255' : '168,85,247',
    }))

    let rafId: number
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      streams.forEach(s => {
        s.x += s.speed
        if (s.x > 1.2) s.x = -0.2
        const gx = s.x * W
        const grad = ctx.createLinearGradient(gx, 0, gx + s.width, 0)
        grad.addColorStop(0, `rgba(${s.color},0)`)
        grad.addColorStop(0.5, `rgba(${s.color},${s.alpha})`)
        grad.addColorStop(1, `rgba(${s.color},0)`)
        ctx.fillStyle = grad
        ctx.fillRect(gx, s.y * H - 1, s.width, 1.5)
      })
      rafId = requestAnimationFrame(draw)
    }
    draw()

    // Philosophy line cycling
    let currentIdx = 0
    const activateLine = () => {
      lineRefs.current.forEach((l, i) => {
        if (!l) return
        if (i === currentIdx) {
          l.style.color = 'white'
          l.style.textShadow = '0 0 60px rgba(0,212,255,0.4)'
        } else {
          l.style.color = 'rgba(226,232,240,0.15)'
          l.style.textShadow = 'none'
        }
      })
      currentIdx = (currentIdx + 1) % lines.length
    }
    activateLine()
    const interval = setInterval(activateLine, 2200)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      clearInterval(interval)
    }
  }, [])

  return (
    <section id="philosophy" style={{
      position: 'relative', padding: '200px 60px',
      textAlign: 'center', overflow: 'hidden',
      maxWidth: '100%',
    }}>
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4,
      }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="reveal" style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: 10, letterSpacing: '0.3em',
          color: '#a855f7', textTransform: 'uppercase',
          marginBottom: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
        }}>
          <span style={{ display: 'block', width: 40, height: 1, background: '#a855f7', opacity: 0.5 }} />
          Philosophy
          <span style={{ display: 'block', width: 40, height: 1, background: '#a855f7', opacity: 0.5 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {lines.map((line, i) => (
            <div
              key={i}
              ref={el => { lineRefs.current[i] = el }}
              className="reveal"
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'rgba(226,232,240,0.15)',
                transition: 'color 0.5s, text-shadow 0.5s',
                cursor: 'default',
                transitionDelay: `${i * 0.1 + 0.1}s`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'rgba(226,232,240,0.9)'
                e.currentTarget.style.textShadow = '0 0 40px rgba(0,212,255,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(226,232,240,0.15)'
                e.currentTarget.style.textShadow = 'none'
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
