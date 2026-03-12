'use client'

import { useEffect, useState } from 'react'
import Cursor from '@/components/cursor'
import Preloader from '@/components/preloader'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import HeroSection from '@/components/sections/hero-section'
import ProblemSection from '@/components/sections/problem-section'
import IdeaSection from '@/components/sections/idea-section'
import CapabilitiesSection from '@/components/sections/capabilities-section'
import PhilosophySection from '@/components/sections/philosophy-section'
import ArchitectureSection from '@/components/sections/architecture-section'
import VisionSection from '@/components/sections/vision-section'
import CTASection from '@/components/sections/cta-section'

function Divider() {
  return <div className="ox-divider" />
}

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ background: '#020408', color: '#e2e8f0', minHeight: '100vh' }}>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <Cursor />
      <Nav />
      <HeroSection />
      <Divider />
      <ProblemSection />
      <Divider />
      <IdeaSection />
      <Divider />
      <CapabilitiesSection />
      <Divider />
      <PhilosophySection />
      <Divider />
      <ArchitectureSection />
      <Divider />
      <VisionSection />
      <Divider />
      <CTASection />
      <Footer />
    </div>
  )
}
