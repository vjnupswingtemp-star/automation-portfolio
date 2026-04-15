import { Nav } from '@/components/layout/Nav'
import { Hero } from '@/components/sections/Hero'
import { TechStack } from '@/components/sections/TechStack'
import { Services } from '@/components/sections/Services'
import { CaseStudy } from '@/components/sections/CaseStudy'
import { Testimonial } from '@/components/sections/Testimonial'
import { About } from '@/components/sections/About'
import { ROICalculator } from '@/components/sections/ROICalculator'
import { Pricing } from '@/components/sections/Pricing'
import { FreeAuditSection } from '@/components/sections/FreeAuditSection'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TechStack />
        <Services />
        <CaseStudy />
        <Testimonial />
        <About />
        <Pricing />
        <ROICalculator />
        <FreeAuditSection />
      </main>
    </>
  )
}
