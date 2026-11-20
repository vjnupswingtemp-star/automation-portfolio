import { Nav } from '@/components/layout/Nav'
import { DeskHero } from '@/components/desk/DeskHero'
import { SceneLayer } from '@/components/three/SceneLayer'
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
      <SceneLayer />
      <main>
        <DeskHero />
        {/* Positioned (no z-index) so it paints over the fixed 3D canvas without trapping
            the old CaseStudy's z-[9999] expanded view in a new stacking context. */}
        <div className="relative bg-white">
          <TechStack />
          <Services />
          <CaseStudy />
          <Testimonial />
          <About />
          <Pricing />
          <ROICalculator />
          <FreeAuditSection />
        </div>
      </main>
    </>
  )
}
