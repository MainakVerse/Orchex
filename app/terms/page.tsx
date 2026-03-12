'use client'

import Link from 'next/link'

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing or using the Orchex website, early access programme, or any related services (collectively, the "Service"), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the Service.`,
  },
  {
    title: '2. Description of Service',
    body: `Orchex is a data engineering intelligence platform designed to provide an observability and reasoning layer for engineering systems. The Service is currently in an early-access phase. Features, availability, and pricing are subject to change without notice.`,
  },
  {
    title: '3. Early Access Programme',
    body: `Participation in the early-access programme is by invitation or application only. Early-access users agree to provide feedback, acknowledge that the product may contain bugs or incomplete features, and understand that continued access is not guaranteed. Orchex reserves the right to revoke access at its sole discretion.`,
  },
  {
    title: '4. Intellectual Property',
    body: `All content, software, designs, and materials on the Orchex website and platform are owned by Orchex or its licensors and protected by applicable intellectual property laws. You may not copy, reproduce, distribute, or create derivative works without prior written permission.`,
  },
  {
    title: '5. User Conduct',
    body: `You agree not to use the Service to violate any applicable law, infringe third-party rights, transmit malicious code, attempt to gain unauthorised access to any system, or engage in any activity that could harm Orchex, its users, or its infrastructure.`,
  },
  {
    title: '6. Disclaimer of Warranties',
    body: `The Service is provided "as is" and "as available" without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, or non-infringement. Orchex does not warrant that the Service will be uninterrupted, error-free, or free of harmful components.`,
  },
  {
    title: '7. Limitation of Liability',
    body: `To the fullest extent permitted by law, Orchex shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of or inability to use the Service.`,
  },
  {
    title: '8. Governing Law',
    body: `These Terms shall be governed by and construed in accordance with the laws of England and Wales, without regard to its conflict-of-law provisions. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.`,
  },
  {
    title: '9. Changes to Terms',
    body: `Orchex reserves the right to modify these Terms at any time. Material changes will be communicated via the website or email. Continued use of the Service after changes constitutes acceptance of the revised Terms.`,
  },
]

export default function TermsPage() {
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

      <div className="ox-inner-content" style={{ maxWidth: 800, margin: '0 auto', padding: '80px 60px 120px' }}>
        {/* Header */}
        <div style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: 10, letterSpacing: '0.3em', color: '#a855f7',
          textTransform: 'uppercase', marginBottom: 24,
        }}>
          Legal — Terms &amp; Conditions
        </div>
        <h1 style={{
          fontFamily: 'var(--font-syne), sans-serif',
          fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800,
          letterSpacing: '-0.02em', lineHeight: 1.05,
          marginBottom: 16,
        }}>
          Terms &amp; Conditions
        </h1>
        <p style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: 11, color: '#64748b', letterSpacing: '0.05em',
          marginBottom: 64,
        }}>
          Effective date: 1 January 2026
        </p>

        {/* Divider */}
        <div style={{
          width: '100%', height: 1, marginBottom: 64,
          background: 'linear-gradient(90deg, #a855f7, #00d4ff, transparent)',
          opacity: 0.2,
        }} />

        {/* Sections */}
        {sections.map(({ title, body }) => (
          <div key={title} style={{ marginBottom: 48 }}>
            <h2 style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em',
              color: '#e2e8f0', marginBottom: 12,
            }}>
              {title}
            </h2>
            <p style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: 15, lineHeight: 1.8, fontWeight: 300,
              color: 'rgba(226,232,240,0.65)',
            }}>
              {body}
            </p>
          </div>
        ))}

        {/* Contact */}
        <div style={{
          marginTop: 72,
          padding: '28px 32px',
          border: '1px solid rgba(168,85,247,0.12)',
          background: 'rgba(168,85,247,0.03)',
        }}>
          <p style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: 14, lineHeight: 1.7, fontWeight: 300,
            color: 'rgba(226,232,240,0.6)', margin: 0,
          }}>
            Questions about these terms? Contact us at{' '}
            <a href="mailto:legal@orchex.ai" style={{ color: '#a855f7', textDecoration: 'none' }}>
              legal@orchex.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
