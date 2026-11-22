import { Nav } from '@/components/layout/Nav'
import { DeskHero } from '@/components/desk/DeskHero'
import { MonitorDive } from '@/components/desk/MonitorDive'
import { DesktopShell } from '@/components/desk/DesktopShell'
import { ServicesWindow } from '@/components/desk/ServicesWindow'
import { FlagshipCase } from '@/components/desk/FlagshipCase'
import { RunPartsFinder } from '@/components/desk/RunPartsFinder'
import { MoreRuns } from '@/components/desk/MoreRuns'
import { SceneLayer } from '@/components/three/SceneLayer'
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
        {/* Positioned so it paints over the fixed 3D canvas. */}
        <div className="relative bg-white">
          <MonitorDive />
          <DesktopShell>
            <ServicesWindow />
            <FlagshipCase />
            <RunPartsFinder />
            <MoreRuns />
          </DesktopShell>
          {/* Old sections below are replaced in Phases 3–4. */}
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
