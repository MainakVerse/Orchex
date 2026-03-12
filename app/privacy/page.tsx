'use client'

import Link from 'next/link'

const sections = [
  {
    title: '1. Information We Collect',
    body: `We collect information you provide directly — such as your name and email address when you request early access or contact us — and information collected automatically when you visit our site, including IP address, browser type, pages visited, and time spent on pages. We do not sell or share your personal information with third parties for their marketing purposes.`,
  },
  {
    title: '2. How We Use Your Information',
    body: `We use the information we collect to operate and improve Orchex, communicate with you about product updates and early-access opportunities, respond to your inquiries, and comply with applicable laws. We may use aggregated, anonymised data for analytics and product development.`,
  },
  {
    title: '3. Data Storage & Security',
    body: `Your data is stored on secure servers with access controls, encryption at rest, and encrypted transport (TLS). While no system is completely secure, we take commercially reasonable steps to protect your personal information against unauthorised access, alteration, disclosure, or destruction.`,
  },
  {
    title: '4. Cookies',
    body: `We use essential cookies to operate the site and analytics cookies (with your consent) to understand usage patterns. You can control cookie preferences through your browser settings. Disabling cookies may affect some site functionality.`,
  },
  {
    title: '5. Third-Party Services',
    body: `We may use third-party services such as Vercel Analytics for performance monitoring. These services have their own privacy policies and may collect data independently. We encourage you to review their policies.`,
  },
  {
    title: '6. Your Rights',
    body: `Depending on your location, you may have the right to access, correct, or delete your personal data, object to or restrict processing, and request data portability. To exercise these rights, contact us at privacy@orchex.ai.`,
  },
  {
    title: '7. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page with a revised effective date. Continued use of Orchex after changes constitutes acceptance of the updated policy.`,
  },
]

export default function PrivacyPage() {
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
          fontSize: 10, letterSpacing: '0.3em', color: '#00d4ff',
          textTransform: 'uppercase', marginBottom: 24,
        }}>
          Legal — Privacy Policy
        </div>
        <h1 style={{
          fontFamily: 'var(--font-syne), sans-serif',
          fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800,
          letterSpacing: '-0.02em', lineHeight: 1.05,
          marginBottom: 16,
        }}>
          Privacy Policy
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
          background: 'linear-gradient(90deg, #00d4ff, #a855f7, transparent)',
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
          border: '1px solid rgba(0,212,255,0.12)',
          background: 'rgba(0,212,255,0.03)',
        }}>
          <p style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: 14, lineHeight: 1.7, fontWeight: 300,
            color: 'rgba(226,232,240,0.6)', margin: 0,
          }}>
            Questions about this policy? Contact us at{' '}
            <a href="mailto:privacy@orchex.ai" style={{ color: '#00d4ff', textDecoration: 'none' }}>
              privacy@orchex.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
