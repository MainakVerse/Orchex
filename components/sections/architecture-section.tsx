'use client'

import { useEffect, useRef, useState } from 'react'

type NodeType = 'orchex' | 'db' | 'platform' | 'stream'

interface NodeDef {
  label: string
  type: NodeType
  color: string
  r: number
  logo: string
}

interface NodePos extends NodeDef {
  x: number
  y: number
}

/* ── node definitions ── */
const NODE_DEFS: NodeDef[] = [
  { label: 'ORCHEX',     type: 'orchex',   color: '#00d4ff', r: 30, logo: '/logo.png' },
  // ring 1 — core databases
  { label: 'MongoDB',    type: 'db',       color: '#a855f7', r: 22, logo: 'https://cdn.simpleicons.org/mongodb/ffffff' },
  { label: 'Snowflake',  type: 'db',       color: '#a855f7', r: 22, logo: 'https://cdn.simpleicons.org/snowflake/ffffff' },
  { label: 'Supabase',   type: 'db',       color: '#a855f7', r: 22, logo: 'https://cdn.simpleicons.org/supabase/ffffff' },
  { label: 'Neon',       type: 'db',       color: '#a855f7', r: 22, logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M4 20V4h4l8 12V4h4v16h-4L8 8v12H4z' fill='%2300E59B'/%3E%3C/svg%3E" },
  // ring 2 — data platforms
  { label: 'PostgreSQL', type: 'platform', color: '#3b82f6', r: 20, logo: 'https://cdn.simpleicons.org/postgresql/ffffff' },
  { label: 'Cassandra',  type: 'platform', color: '#3b82f6', r: 20, logo: 'https://cdn.simpleicons.org/apachecassandra/ffffff' },
  { label: 'Redis',      type: 'platform', color: '#3b82f6', r: 20, logo: 'https://cdn.simpleicons.org/redis/ffffff' },
  { label: 'GraphQL',    type: 'platform', color: '#3b82f6', r: 20, logo: 'https://cdn.simpleicons.org/graphql/ffffff' },
  // ring 3 — streams & tools
  { label: 'Kafka',      type: 'stream',   color: '#10b981', r: 18, logo: 'https://cdn.simpleicons.org/apachekafka/ffffff' },
  { label: 'Excel',      type: 'stream',   color: '#10b981', r: 18, logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='2' fill='%23217346'/%3E%3Cpath d='M6 6l3.5 5.5L6 17h2.5l2-3.5 2 3.5H15l-3.5-5.5L15 6h-2.5l-2 3.5L8.5 6H6z' fill='white'/%3E%3C/svg%3E" },
  { label: 'Firebase',   type: 'stream',   color: '#10b981', r: 18, logo: 'https://cdn.simpleicons.org/firebase/ffffff' },
  { label: 'ClickHouse', type: 'stream',   color: '#10b981', r: 18, logo: 'https://cdn.simpleicons.org/clickhouse/ffffff' },
  { label: 'BigQuery',   type: 'stream',   color: '#10b981', r: 18, logo: 'https://cdn.simpleicons.org/googlebigquery/ffffff' },
]

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}

const legendItems = [
  { color: '#00d4ff', label: 'Orchex Intelligence' },
  { color: '#a855f7', label: 'Databases' },
  { color: '#3b82f6', label: 'Data Platforms' },
  { color: '#10b981', label: 'Streams & Tools' },
]

export default function ArchitectureSection() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const posRef     = useRef<NodePos[]>([])
  const hoveredRef = useRef(-1)

  const [domPositions, setDomPositions] = useState<NodePos[]>([])
  const [hoveredNode, setHoveredNode]   = useState(-1)

  const onEnter = (i: number) => { hoveredRef.current = i; setHoveredNode(i) }
  const onLeave = ()          => { hoveredRef.current = -1; setHoveredNode(-1) }

  /* ── canvas: background, grid, lines ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0, animFrame = 0, rafId: number

    const layout = () => {
      const cx = W / 2, cy = H / 2
      const positions: NodePos[] = []
      positions[0] = { ...NODE_DEFS[0], x: cx, y: cy }
      const rings  = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12, 13]]
      const radii  = [H * 0.22, H * 0.40, H * 0.54]
      rings.forEach((ring, ri) =>
        ring.forEach((ni, i) => {
          const angle = (i / ring.length) * Math.PI * 2 - Math.PI * 0.5 + ri * 0.3
          positions[ni] = {
            ...NODE_DEFS[ni],
            x: cx + Math.cos(angle) * radii[ri],
            y: cy + Math.sin(angle) * radii[ri],
          }
        })
      )
      posRef.current = positions
      setDomPositions([...positions])
    }

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
      layout()
    }
    window.addEventListener('resize', resize)
    resize()

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      animFrame++
      const t  = animFrame * 0.01
      const hv = hoveredRef.current
      const ps = posRef.current
      if (!ps.length) { rafId = requestAnimationFrame(draw); return }

      /* dark fill */
      ctx.fillStyle = 'rgba(0,10,25,0.35)'
      ctx.fillRect(0, 0, W, H)

      /* grid dots */
      for (let gx = 40; gx < W; gx += 60)
        for (let gy = 40; gy < H; gy += 60) {
          ctx.beginPath()
          ctx.arc(gx, gy, 1, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(0,212,255,0.06)'
          ctx.fill()
        }

      /* ambient glow behind each node */
      ps.forEach((p, i) => {
        const isHov = hv === i || hv === 0
        const glowR = p.r * (isHov ? 4.5 : 3)
        const glow  = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR)
        const rgb   = hexToRgb(p.color)
        glow.addColorStop(0, `rgba(${rgb},${isHov ? 0.35 : (p.type === 'orchex' ? 0.28 : 0.12)})`)
        glow.addColorStop(1, `rgba(${rgb},0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()
      })

      /* connection lines + pulse dots */
      const orchex = ps[0]
      for (let i = 1; i < ps.length; i++) {
        const p       = ps[i]
        const isHov   = hv === i || hv === 0
        const alpha   = isHov ? 0.7 : 0.18
        const lineW   = isHov ? 1.5 : 0.6
        const dx      = p.x - orchex.x
        const dy      = p.y - orchex.y
        const pulsePos = (t * 0.45 + i * 0.15) % 1

        const grad = ctx.createLinearGradient(orchex.x, orchex.y, p.x, p.y)
        grad.addColorStop(0, `rgba(0,212,255,${alpha})`)
        grad.addColorStop(1, `rgba(${hexToRgb(p.color)},${alpha * 0.5})`)

        ctx.beginPath()
        ctx.strokeStyle = grad
        ctx.lineWidth   = lineW
        ctx.setLineDash(isHov ? [] : [4, 8])
        ctx.moveTo(orchex.x, orchex.y)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
        ctx.setLineDash([])

        if (!isHov) {
          ctx.beginPath()
          ctx.arc(
            orchex.x + dx * pulsePos,
            orchex.y + dy * pulsePos,
            2.5, 0, Math.PI * 2
          )
          ctx.fillStyle = 'rgba(0,212,255,0.85)'
          ctx.fill()
        }
      }

      rafId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section id="architecture" style={{ padding: '140px 60px', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ marginBottom: 80 }}>
        <div className="reveal" style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: 10, letterSpacing: '0.3em',
          color: '#00d4ff', textTransform: 'uppercase', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ display: 'block', width: 24, height: 1, background: '#00d4ff' }} />
          05 — Architecture
        </div>
        <h2 className="reveal" style={{
          fontFamily: 'var(--font-syne), sans-serif',
          fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 800,
          lineHeight: 1.05, letterSpacing: '-0.02em',
          transitionDelay: '0.1s',
        }}>
          The intelligence layer.
        </h2>
        <p className="reveal" style={{
          color: '#64748b', marginTop: 16, fontSize: 16, maxWidth: 500,
          transitionDelay: '0.2s',
        }}>
          Hover any node to explore how Orchex connects across your data stack.
        </p>
      </div>

      {/* ── canvas + DOM overlay ── */}
      <div className="reveal arch-canvas-wrap" style={{
        position: 'relative', width: '100%', height: 560,
        border: '1px solid rgba(0,212,255,0.12)',
        background: 'rgba(0,20,40,0.4)',
        backdropFilter: 'blur(4px)',
        overflow: 'hidden',
      }}>
        {/* background canvas */}
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />

        {/* DOM nodes with logos */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {domPositions.map((node, i) => {
            const isHov = hoveredNode === i || (hoveredNode === 0 && i === 0)
            const rgb   = hexToRgb(node.color)
            const diam  = node.r * 2
            return (
              <div
                key={node.label}
                onMouseEnter={() => onEnter(i)}
                onMouseLeave={onLeave}
                style={{
                  position: 'absolute',
                  left: node.x, top: node.y,
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'all',
                  cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  zIndex: node.type === 'orchex' ? 10 : 1,
                }}
              >
                {/* node circle */}
                <div style={{
                  width: diam, height: diam,
                  borderRadius: '50%',
                  border: `${isHov ? 1.5 : 1}px solid rgba(${rgb}, ${isHov ? 0.9 : 0.35})`,
                  background: node.type === 'orchex'
                    ? `radial-gradient(circle at 38% 32%, rgba(180,245,255,0.9), rgba(0,170,210,0.8) 50%, rgba(0,80,140,0.7))`
                    : `rgba(${rgb}, ${isHov ? 0.22 : 0.12})`,
                  boxShadow: isHov
                    ? `0 0 18px rgba(${rgb},0.6), 0 0 36px rgba(${rgb},0.25)`
                    : node.type === 'orchex'
                    ? '0 0 30px rgba(0,212,255,0.4)'
                    : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  transform: `scale(${isHov ? 1.15 : 1})`,
                  overflow: 'hidden',
                  backdropFilter: 'blur(2px)',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={node.logo}
                    alt={node.label}
                    style={{
                      width: node.type === 'orchex' ? '78%' : '62%',
                      height: node.type === 'orchex' ? '78%' : '62%',
                      objectFit: 'contain',
                      filter: isHov && node.type !== 'orchex'
                        ? `drop-shadow(0 0 4px rgba(${rgb},0.8))`
                        : 'none',
                      transition: 'filter 0.3s',
                    }}
                  />
                </div>

                {/* label */}
                {node.type !== 'orchex' && (
                  <div style={{
                    marginTop: 7,
                    fontFamily: 'var(--font-space-mono), monospace',
                    fontSize: 9, letterSpacing: '0.05em',
                    color: isHov ? node.color : 'rgba(100,116,139,0.8)',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.3s',
                    textTransform: 'uppercase',
                  }}>
                    {node.label}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* legend */}
      <div className="reveal" style={{ display: 'flex', gap: 32, marginTop: 32, flexWrap: 'wrap' }}>
        {legendItems.map(({ color, label }) => (
          <div key={label} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: 11, letterSpacing: '0.05em', color: '#64748b',
          }}>
            <div style={{
              width: 10, height: 10, borderRadius: '50%',
              background: color, boxShadow: `0 0 8px ${color}`,
            }} />
            {label}
          </div>
        ))}
      </div>
    </section>
  )
}
