'use client'

import { useEffect, useRef } from 'react'

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0
    const mouse = { x: -999, y: -999 }
    const NODE_COUNT = 80

    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      r: Math.random() * 2.5 + 0.5,
      color: Math.random() > 0.7 ? '#a855f7' : '#00d4ff',
      pulse: Math.random() * Math.PI * 2,
    }))

    const resize = () => {
      W = canvas.width = canvas.offsetWidth || window.innerWidth
      H = canvas.height = canvas.offsetHeight || window.innerHeight
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    document.addEventListener('mousemove', onMove)

    let rafId: number
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const grad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, W*0.7)
      grad.addColorStop(0, 'rgba(0,30,60,0.3)')
      grad.addColorStop(1, 'rgba(2,4,8,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > 1) n.vx *= -1
        if (n.y < 0 || n.y > 1) n.vy *= -1
        n.pulse += 0.02
      })

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = (a.x - b.x) * W, dy = (a.y - b.y) * H
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 180) {
            const alpha = (1 - dist/180) * 0.25
            const lg = ctx.createLinearGradient(a.x*W, a.y*H, b.x*W, b.y*H)
            lg.addColorStop(0, `rgba(0,212,255,${alpha})`)
            lg.addColorStop(1, `rgba(168,85,247,${alpha})`)
            ctx.beginPath()
            ctx.strokeStyle = lg
            ctx.lineWidth = 0.5
            ctx.moveTo(a.x*W, a.y*H)
            ctx.lineTo(b.x*W, b.y*H)
            ctx.stroke()
          }
        }
      }

      nodes.forEach(n => {
        const px = n.x * W, py = n.y * H
        const pf = 0.6 + Math.sin(n.pulse) * 0.4
        const mdx = mouse.x - px, mdy = mouse.y - py
        const mdist = Math.sqrt(mdx*mdx + mdy*mdy)
        const extra = mdist < 120 ? (1 - mdist/120) : 0
        const glow = ctx.createRadialGradient(px, py, 0, px, py, (n.r + 8) * pf)
        const rgb = n.color === '#a855f7' ? '168,85,247' : '0,212,255'
        glow.addColorStop(0, `rgba(${rgb},${0.4 + extra * 0.6})`)
        glow.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.beginPath()
        ctx.arc(px, py, (n.r + 8) * pf, 0, Math.PI*2)
        ctx.fillStyle = glow
        ctx.fill()
        ctx.beginPath()
        ctx.arc(px, py, n.r * pf, 0, Math.PI*2)
        ctx.fillStyle = n.color
        ctx.fill()
      })

      rafId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      document.removeEventListener('mousemove', onMove)
    }
  }, [])

  const eyebrowStyle: React.CSSProperties = {
    fontFamily: 'var(--font-space-mono), monospace',
    fontSize: 11, letterSpacing: '0.3em',
    color: '#00d4ff', textTransform: 'uppercase',
    marginBottom: 28,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
    opacity: 0, animation: 'heroReveal 1s 0.3s forwards',
  }

  return (
    <>
    <style>{`
      @media (max-width: 640px) {
        #hero-heading { font-size: 38px !important; }
        .hero-btn { font-size: 10px !important; padding: 12px 20px !important; }
      }
    `}</style>
    <section id="hero" style={{
      position: 'relative', height: '100vh', minHeight: 700,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }} />

      <div style={{
        position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px',
        animation: 'heroReveal 1.4s cubic-bezier(0.16,1,0.3,1) forwards',
        opacity: 0,
      }}>
        <div style={eyebrowStyle}>
          <span style={{ display: 'inline-block', width: 40, height: 1, background: '#00d4ff', opacity: 0.6 }} />
          Deep Intelligence Platform
          <span style={{ display: 'inline-block', width: 40, height: 1, background: '#00d4ff', opacity: 0.6 }} />
        </div>

        <h1 id="hero-heading" style={{
          fontFamily: 'var(--font-syne), sans-serif',
          fontSize: 'clamp(72px, 12vw, 160px)',
          fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 0.9,
          background: 'linear-gradient(135deg, #ffffff 0%, #00d4ff 40%, #a855f7 80%, #ffffff 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 40px rgba(0,212,255,0.3))',
          animation: 'heroReveal 1s 0.5s forwards', opacity: 0,
        }}>
          ORCHEX
        </h1>

        <p style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 300,
          color: 'rgba(226,232,240,0.65)', marginTop: 24, marginBottom: 52,
          letterSpacing: '0.04em', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto',
          animation: 'heroReveal 1s 0.7s forwards', opacity: 0,
        }}>
          Data engineering intelligence<br />for complex data systems.
        </p>

        <div style={{
          display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
          animation: 'heroReveal 1s 0.9s forwards', opacity: 0,
        }}>
          <a
            href="#cta"
            className="hero-btn"
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#020408',
              background: 'linear-gradient(135deg, #00d4ff, #3b82f6)',
              padding: '16px 36px', textDecoration: 'none',
              boxShadow: '0 0 30px rgba(0,212,255,0.3)',
              transition: 'all 0.3s',
              display: 'inline-block',
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
            Join Early Access
          </a>
          <a
            href="#vision"
            className="hero-btn"
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#e2e8f0', background: 'transparent',
              padding: '16px 36px', textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)', transition: 'all 0.3s',
              display: 'inline-block',
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
            See the Vision
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 40, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        color: '#64748b',
        fontFamily: 'var(--font-space-mono), monospace', fontSize: 10,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        animation: 'float 3s ease-in-out infinite',
      }}>
        <div style={{
          width: 1, height: 60,
          background: 'linear-gradient(180deg, transparent, #00d4ff)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
        <span>Scroll</span>
      </div>
    </section>
    </>
  )
}
