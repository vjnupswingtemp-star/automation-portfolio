import { Nav } from '@/components/layout/Nav'
import { Hero } from '@/components/sections/Hero'
import { TechStack } from '@/components/sections/TechStack'
import { Services } from '@/components/sections/Services'
import { CaseStudy } from '@/components/sections/CaseStudy'
import { Testimonial } from '@/components/sections/Testimonial'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'

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
        <Contact />
      </main>
    </>
  )
}
