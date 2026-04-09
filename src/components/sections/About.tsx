'use client'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Users } from 'lucide-react'
import { PillTag } from '@/components/ui'
import { about } from '@/lib/content'

function TeamPhoto() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="aspect-square w-full rounded-2xl bg-[#eeeeee] flex items-center justify-center">
        <Users size={48} className="text-muted" aria-hidden="true" />
      </div>
    )
  }

  return (
    <div className="relative w-full flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={about.teamPhoto}
        alt="Our team"
        className="object-contain w-[80%] max-w-[250px] md:max-w-[450px] lg:max-w-[650px] h-auto transform -rotate-12 mix-blend-multiply"
        onError={() => setFailed(true)}
      />
    </div>
  )
}

export function About() {
  const shouldReduce = false // useReducedMotion()

  return (
    <section id="about" className="relative overflow-hidden py-8 md:py-16 bg-white">


      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full">
        {/* Section label (Neo-Brutalist Y2K Badge) */}
        <div className="mb-8 md:mb-16 flex justify-between items-end">
          <motion.div
            initial={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block border-2 border-[#3662E3] bg-white text-[#3662E3] shadow-[4px_4px_0px_0px_#3662E3] rounded-sm px-4 py-1.5 text-xs font-bitroad tracking-widest uppercase relative -left-1">
              {about.label}
            </span>
          </motion.div>
        </div>

        {/* Photo + bio grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 items-center">
          {/* Bio + skills */}
          <motion.div
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduce ? { duration: 0 } : { duration: 0.6, delay: 0.1, ease: 'easeOut' as const }}
            className="md:col-span-2 flex flex-col justify-center max-w-2xl"
          >
            <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-near-black leading-none mb-8">
              A collective of <span className="text-gray-400 italic">builders</span> & <span className="text-[#3662E3] italic">automators</span>.
            </h3>
            
            <p className="font-sf font-light text-lg md:text-xl text-near-black/70 leading-relaxed mb-10">
              {about.bio}
            </p>
          </motion.div>

          {/* Team photo */}
          <motion.div
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduce ? { duration: 0 } : { duration: 0.6, delay: 0.2, ease: 'easeOut' as const }}
            className="w-full relative"
          >
            {/* Clean isolated container for Team Photo */}
            <div className="w-full flex items-center justify-center transition-all duration-300 -mt-24 mb-[-2rem] md:mt-0 md:mb-0">
              <TeamPhoto />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
