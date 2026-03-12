'use client'

import { useState } from 'react'
import Link from 'next/link'

type Field = 'name' | 'email' | 'subject' | 'message'
type FormState = Record<Field, string>
type Status = 'idle' | 'sending' | 'sent' | 'error'

const SUBJECTS = [
  'Early Access Request',
  'Partnership Enquiry',
  'Press & Media',
  'Technical Question',
  'General Enquiry',
]

export default function ContactPage() {
  const [form, setForm]     = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [focused, setFocused] = useState<Field | null>(null)

  const set = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    /* Replace with real API call when backend is ready */
    await new Promise(r => setTimeout(r, 1400))
    setStatus('sent')
  }

  const inputBase: React.CSSProperties = {
    width: '100%', background: 'rgba(0,212,255,0.03)',
    border: '1px solid rgba(0,212,255,0.12)',
    color: '#e2e8f0', padding: '14px 18px',
    fontFamily: 'var(--font-dm-sans), sans-serif',
    fontSize: 14, outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    boxSizing: 'border-box',
    borderRadius: 2,
  }

  const focusStyle = (field: Field): React.CSSProperties =>
    focused === field
      ? { borderColor: '#00d4ff', boxShadow: '0 0 0 3px rgba(0,212,255,0.08)' }
      : {}

  return (
    <div style={{ background: '#020408', color: '#e2e8f0', minHeight: '100vh' }}>
      {/* Top bar */}
      <div className="ox-inner-topbar" style={{
        borderBottom: '1px solid rgba(0,212,255,0.08)',
        padding: '20px 60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        maxWidth: 1400, margin: '0 auto',
      }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-syne), sans-serif',
          fontSize: 18, fontWeight: 800, letterSpacing: '0.2em',
          background: 'linear-gradient(90deg, #00d4ff, #a855f7)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          textTransform: 'uppercase', textDecoration: 'none',
        }}>
          Orchex
        </Link>
        <Link href="/" style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: 10, letterSpacing: '0.2em', color: '#64748b',
          textTransform: 'uppercase', textDecoration: 'none',
          transition: 'color 0.3s',
        }}
          onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
          onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
        >
          ← Back
        </Link>
      </div>

      <div className="ox-inner-content" style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 60px 120px' }}>
        <div className="ox-contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>

          {/* Left — info */}
          <div>
            <div style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: 10, letterSpacing: '0.3em', color: '#00d4ff',
              textTransform: 'uppercase', marginBottom: 24,
            }}>
              Get in Touch
            </div>
            <h1 style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800,
              letterSpacing: '-0.02em', lineHeight: 1.05,
              marginBottom: 24,
            }}>
              Let&apos;s build<br />
              <span style={{
                background: 'linear-gradient(90deg, #00d4ff, #a855f7)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                something intelligent.
              </span>
            </h1>
            <p style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: 15, lineHeight: 1.8, fontWeight: 300,
              color: 'rgba(226,232,240,0.6)', marginBottom: 52,
            }}>
              Whether you&apos;re interested in early access, a partnership, or just want to talk
              data engineering intelligence — we&apos;re listening.
            </p>

            {/* Contact details */}
            {[
              { label: 'General',     value: 'hello@orchex.ai' },
              { label: 'Press',       value: 'press@orchex.ai' },
              { label: 'Legal',       value: 'legal@orchex.ai' },
            ].map(({ label, value }) => (
              <div key={label} style={{ marginBottom: 20 }}>
                <div style={{
                  fontFamily: 'var(--font-space-mono), monospace',
                  fontSize: 9, letterSpacing: '0.25em', color: '#64748b',
                  textTransform: 'uppercase', marginBottom: 4,
                }}>
                  {label}
                </div>
                <a href={`mailto:${value}`} style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: 14, color: '#00d4ff', textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}>
                  {value}
                </a>
              </div>
            ))}

            {/* Decorative divider */}
            <div style={{
              marginTop: 52, width: 60, height: 1,
              background: 'linear-gradient(90deg, #00d4ff, #a855f7)',
              opacity: 0.4,
            }} />
          </div>

          {/* Right — form */}
          <div>
            {status === 'sent' ? (
              <div style={{
                padding: '48px 40px', textAlign: 'center',
                border: '1px solid rgba(0,212,255,0.18)',
                background: 'rgba(0,212,255,0.03)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-space-mono), monospace',
                  fontSize: 10, letterSpacing: '0.3em', color: '#00d4ff',
                  textTransform: 'uppercase', marginBottom: 20,
                }}>
                  Message Received
                </div>
                <p style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: 16, lineHeight: 1.7, fontWeight: 300,
                  color: 'rgba(226,232,240,0.75)', margin: '0 0 32px',
                }}>
                  Thanks, {form.name.split(' ')[0]}. We&apos;ll be in touch shortly.
                </p>
                <button
                  onClick={() => { setForm({ name: '', email: '', subject: '', message: '' }); setStatus('idle') }}
                  style={{
                    fontFamily: 'var(--font-space-mono), monospace',
                    fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: '#020408', background: 'linear-gradient(135deg, #00d4ff, #3b82f6)',
                    border: 'none', padding: '12px 28px', cursor: 'pointer',
                  }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr',
                  gap: 16, marginBottom: 16,
                }}>
                  {/* Name */}
                  <div>
                    <label style={{
                      fontFamily: 'var(--font-space-mono), monospace',
                      fontSize: 9, letterSpacing: '0.25em', color: '#64748b',
                      textTransform: 'uppercase', display: 'block', marginBottom: 8,
                    }}>
                      Name *
                    </label>
                    <input
                      type="text" required value={form.name}
                      onChange={set('name')}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      placeholder="Your name"
                      style={{ ...inputBase, ...focusStyle('name') }}
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label style={{
                      fontFamily: 'var(--font-space-mono), monospace',
                      fontSize: 9, letterSpacing: '0.25em', color: '#64748b',
                      textTransform: 'uppercase', display: 'block', marginBottom: 8,
                    }}>
                      Email *
                    </label>
                    <input
                      type="email" required value={form.email}
                      onChange={set('email')}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      placeholder="you@company.com"
                      style={{ ...inputBase, ...focusStyle('email') }}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{
                    fontFamily: 'var(--font-space-mono), monospace',
                    fontSize: 9, letterSpacing: '0.25em', color: '#64748b',
                    textTransform: 'uppercase', display: 'block', marginBottom: 8,
                  }}>
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={set('subject')}
                    onFocus={() => setFocused('subject')}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputBase, ...focusStyle('subject'),
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2364748b' strokeWidth='1.5' fill='none'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 16px center',
                    }}
                  >
                    <option value="" style={{ background: '#020408' }}>Select a subject…</option>
                    {SUBJECTS.map(s => (
                      <option key={s} value={s} style={{ background: '#020408' }}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div style={{ marginBottom: 28 }}>
                  <label style={{
                    fontFamily: 'var(--font-space-mono), monospace',
                    fontSize: 9, letterSpacing: '0.25em', color: '#64748b',
                    textTransform: 'uppercase', display: 'block', marginBottom: 8,
                  }}>
                    Message *
                  </label>
                  <textarea
                    required value={form.message}
                    onChange={set('message')}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell us about your use case, company, or question…"
                    rows={6}
                    style={{
                      ...inputBase, ...focusStyle('message'),
                      resize: 'vertical', minHeight: 140,
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    fontFamily: 'var(--font-space-mono), monospace',
                    fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: '#020408',
                    background: status === 'sending'
                      ? 'rgba(0,212,255,0.5)'
                      : 'linear-gradient(135deg, #00d4ff, #3b82f6)',
                    border: 'none', padding: '16px 36px',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    transition: 'opacity 0.3s, box-shadow 0.3s',
                    boxShadow: '0 0 24px rgba(0,212,255,0.25)',
                    width: '100%',
                  }}
                  onMouseEnter={e => { if (status !== 'sending') (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(0,212,255,0.45)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(0,212,255,0.25)' }}
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>

                <p style={{
                  fontFamily: 'var(--font-space-mono), monospace',
                  fontSize: 9, letterSpacing: '0.1em', color: '#64748b',
                  marginTop: 14, textAlign: 'center',
                }}>
                  We typically respond within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
