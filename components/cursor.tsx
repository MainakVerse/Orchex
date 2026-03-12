'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = mx - 5 + 'px'
        dotRef.current.style.top  = my - 5 + 'px'
      }
    }

    const animRing = () => {
      rx += (mx - rx - 18) * 0.12
      ry += (my - ry - 18) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px'
        ringRef.current.style.top  = ry + 'px'
      }
      rafId = requestAnimationFrame(animRing)
    }
    rafId = requestAnimationFrame(animRing)

    document.addEventListener('mousemove', onMove)

    const hoverTargets = document.querySelectorAll('a, button, .cap-card, .symptom')
    const enter = () => {
      if (dotRef.current) dotRef.current.style.transform = 'scale(2.5)'
      if (ringRef.current) {
        ringRef.current.style.transform = 'scale(1.5)'
        ringRef.current.style.borderColor = 'rgba(0,212,255,0.6)'
      }
    }
    const leave = () => {
      if (dotRef.current) dotRef.current.style.transform = 'scale(1)'
      if (ringRef.current) {
        ringRef.current.style.transform = 'scale(1)'
        ringRef.current.style.borderColor = 'rgba(0,212,255,0.4)'
      }
    }
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMove)
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          width: 10, height: 10,
          background: '#00d4ff',
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.1s ease',
          mixBlendMode: 'screen',
          boxShadow: '0 0 15px #00d4ff, 0 0 40px #00d4ff',
        }}
      />
      <div
        ref={ringRef}
        style={{
          width: 36, height: 36,
          border: '1px solid rgba(0,212,255,0.4)',
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'all 0.15s ease',
        }}
      />
    </>
  )
}
