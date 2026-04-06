'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { testimonial } from '@/lib/content'
import Image from 'next/image'

export function Testimonial() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="testimonial" className="relative overflow-hidden flex items-center justify-center py-16 md:py-20 border-y border-gray-200/60 bg-[#FAFAFA]">
      {/* Subtle Y2K Engineering Grid Background spanning the entire section */}
      <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-40 z-[1] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        <div className="mb-10 lg:mb-12 flex justify-center lg:justify-start items-end">
          <motion.div 
            initial=
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block border-2 border-[#3662E3] bg-white text-[#3662E3] shadow-[4px_4px_0px_0px_#3662E3] rounded-sm px-4 py-1.5 text-xs font-bitroad tracking-widest uppercase relative -left-1">
              Client Testimonial
            </span>
          </motion.div>
        </div>

        <motion.div
          initial=
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition=
          className="relative flex flex-col items-center justify-center max-w-4xl mx-auto w-full text-center"
        >

          {/* Centered Image Profile */}
          <div className="relative mb-8 md:mb-12">
            <div className="w-[180px] h-[180px] md:w-[240px] md:h-[240px] bg-white p-2 md:p-3 rounded-full border border-gray-200 shadow-[0_12px_40px_rgba(0,0,0,0.06)] relative z-10 transition-transform duration-700 ease-out hover:scale-[1.03]">
              <div className="w-full h-full relative rounded-full overflow-hidden bg-gray-50 scale-[0.98]">
                <Image
                  src={testimonial.image || "/images/upload-client-photo.jpg"}
                  alt={`${testimonial.author} - ${testimonial.role}`}
                  fill
                  unoptimized
                  className="object-cover object-center grayscale hover:grayscale-0 opacity-90 hover:opacity-100 transition-all duration-700"
                />
              </div>
            </div>
          </div>

          {/* Centered Serif Quote */}
          <div className="relative mb-12 max-w-3xl">
            {/* Minimalist Watermark Quote centered behind the text */}
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-[#3662E3]/10 font-serif text-[8rem] md:text-[10rem] leading-none select-none -z-10 mt-6 pointer-events-none">"</span>
            
            <blockquote className="relative font-serif italic text-2xl md:text-[2.25rem] text-near-black leading-[1.3] tracking-tight text-balance">
              "{testimonial.quote}"
            </blockquote>
          </div>

          {/* Centered Attribution Stack */}
          <footer className="flex flex-col items-center gap-3 relative z-10">
            <div className="flex flex-col items-center gap-1">
              <p className="text-xl md:text-2xl font-bold text-near-black tracking-tight">
                {testimonial.author}
              </p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-[11px] md:text-xs text-gray-500 font-mono tracking-wider uppercase">
                  {testimonial.role}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                <span className="text-[11px] md:text-xs text-[#3662E3] font-mono tracking-wider uppercase font-bold">
                  {testimonial.business}
                </span>
              </div>
            </div>

            {/* Centered Project Pill */}
            <div className="mt-8 flex items-center justify-center gap-3 px-5 py-2.5 border border-gray-200/80 bg-white/80 backdrop-blur-md rounded-full shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#41B853] shadow-[0_0_8px_rgba(65,184,83,0.6)]" />
              <span className="text-xs text-gray-700 font-sf font-medium tracking-wide">
                PROJECT: {testimonial.project}
              </span>
            </div>
          </footer>
        </motion.div>
      </div>
    </section>
  )
}
