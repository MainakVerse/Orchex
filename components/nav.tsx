'use client'

import { useEffect, useRef, useState } from 'react'

const NAV_LINKS = [
  ['#problem',      'Problem'],
  ['#capabilities', 'Capabilities'],
  ['#architecture', 'Architecture'],
  ['#vision',       'Vision'],
] as const

export default function Nav() {
  const navRef     = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)

  /* Scroll-based nav background */
  useEffect(() => {
    const onScroll = () => {
      const nav = navRef.current
      if (!nav) return
      if (window.scrollY > 60) {
        nav.style.background = 'rgba(2,4,8,0.98)'
        nav.style.borderBottomColor = 'rgba(0,212,255,0.12)'
      } else {
        nav.style.background = 'linear-gradient(180deg, rgba(2,4,8,0.95) 0%, transparent 100%)'
        nav.style.borderBottomColor = 'rgba(0,212,255,0.06)'
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-space-mono), monospace',
    fontSize: 11, letterSpacing: '0.12em',
    color: '#64748b', textDecoration: 'none',
    textTransform: 'uppercase', transition: 'color 0.3s',
  }

  return (
    <>
      {/* ── Main nav bar ── */}
      <nav
        ref={navRef}
        className="ox-nav"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '24px 60px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'linear-gradient(180deg, rgba(2,4,8,0.95) 0%, transparent 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0,212,255,0.06)',
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Orchex" style={{ width: 28, height: 28, objectFit: 'contain' }} />
          <div style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 22, fontWeight: 800, letterSpacing: '0.15em',
            background: 'linear-gradient(90deg, #00d4ff, #a855f7)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            textTransform: 'uppercase',
          }}>
            Orchex
          </div>
        </div>

        {/* Desktop links */}
        <div className="nav-links-desktop" style={{ gap: 40 }}>
          {NAV_LINKS.map(([href, label]) => (
            <a key={href} href={href} style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          className="nav-cta-desktop"
          href="#cta"
          style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: 11, letterSpacing: '0.12em', color: '#00d4ff',
            textDecoration: 'none', border: '1px solid #00d4ff',
            padding: '10px 22px', textTransform: 'uppercase',
            transition: 'all 0.3s', position: 'relative',
            overflow: 'hidden', display: 'inline-block',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget
            el.style.color = '#020408'
            el.style.background = '#00d4ff'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.color = '#00d4ff'
            el.style.background = 'transparent'
          }}
        >
          Early Access
        </a>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer' }}
        >
          <span style={{ display: 'block', width: 24, height: 2, background: '#00d4ff', transition: 'all 0.3s' }} />
          <span style={{ display: 'block', width: 18, height: 2, background: '#00d4ff', transition: 'all 0.3s' }} />
          <span style={{ display: 'block', width: 24, height: 2, background: '#00d4ff', transition: 'all 0.3s' }} />
        </button>
      </nav>

      {/* ── Overlay ── */}
      <div
        className={`nav-overlay${open ? ' open' : ''}`}
        onClick={() => setOpen(false)}
      />

      {/* ── Slide-in drawer (from left) ── */}
      <div className={`nav-drawer${open ? ' open' : ''}`}>
        {/* Drawer header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Orchex" style={{ width: 22, height: 22, objectFit: 'contain' }} />
            <div style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 18, fontWeight: 800, letterSpacing: '0.15em',
              background: 'linear-gradient(90deg, #00d4ff, #a855f7)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase',
            }}>
              Orchex
            </div>
          </div>
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{
              background: 'none', border: '1px solid rgba(0,212,255,0.25)',
              color: '#00d4ff', width: 32, height: 32,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: 18, transition: 'all 0.2s',
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>

        {/* Drawer links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {NAV_LINKS.map(([href, label], i) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: 12, letterSpacing: '0.18em',
                color: '#64748b', textDecoration: 'none',
                textTransform: 'uppercase',
                padding: '14px 0',
                borderBottom: '1px solid rgba(0,212,255,0.06)',
                display: 'flex', alignItems: 'center', gap: 12,
                transition: 'color 0.3s',
                animationDelay: `${i * 0.06 + 0.1}s`,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
            >
              <span style={{ color: 'rgba(0,212,255,0.3)', fontSize: 9, letterSpacing: '0.1em' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {label}
            </a>
          ))}
        </nav>

        {/* Drawer CTA */}
        <a
          href="#cta"
          onClick={() => setOpen(false)}
          style={{
            marginTop: 32,
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: 11, letterSpacing: '0.12em',
            color: '#020408', textDecoration: 'none',
            background: 'linear-gradient(135deg, #00d4ff, #3b82f6)',
            padding: '14px 24px', textTransform: 'uppercase',
            display: 'block', textAlign: 'center',
            boxShadow: '0 0 24px rgba(0,212,255,0.3)',
          }}
        >
          Early Access
        </a>

        {/* Decorative corner accent */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          width: '100%', height: 2,
          background: 'linear-gradient(90deg, #00d4ff, #a855f7, transparent)',
          opacity: 0.4,
        }} />
      </div>
    </>
  )
}
