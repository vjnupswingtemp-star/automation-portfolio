'use client'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { hero } from '@/lib/content'
import { focusRing } from '@/lib/tokens'

export function Hero() {
  const shouldReduce = useReducedMotion()

  function fadeUp(delay: number) {
    return {
      initial: { opacity: 1, y: 0 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, delay: delay, ease: "easeOut" as const },
    }
  }

  return (
    <>
    <section id="hero" className="relative overflow-hidden flex flex-col items-center justify-center bg-white pt-40 pb-16 md:pt-52 md:pb-40">
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Floating Y2K Element 1 (CD Walkman) */}
        <div className="absolute bottom-[9%] md:bottom-auto top-auto md:top-[12%] right-[-2%] md:-right-8 lg:-right-16 w-24 h-24 md:w-[320px] md:h-[320px] z-20 md:z-30 pointer-events-none rotate-[16deg] opacity-[0.95] transition-[transform,opacity] duration-1000">
          <Image 
            src="/images/y2k_cd_walkman_transparent.png" 
            alt="Y2K CD Walkman" 
            fill 
            className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)]" 
          />
        </div>

        {/* Floating Y2K Element (Tamagotchi) */}
        <div className="absolute bottom-[9%] md:bottom-auto top-auto md:top-[12%] left-[-2%] md:-left-4 lg:-left-8 w-20 h-20 md:w-56 md:h-56 z-20 md:z-30 pointer-events-none rotate-[-12deg] opacity-[0.95] transition-[transform,opacity] duration-1000">
          <Image 
            src="/images/y2k_tamagotchi.png" 
            alt="Y2K Tamagotchi" 
            fill 
            className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)]" 
          />
        </div>

        <div className="flex flex-col items-center text-center relative z-10">
          
          {/* Typography & Content */}
          <div className="flex-1 flex flex-col items-center">


            <motion.h1
              {...fadeUp(0.2)}
              className="font-serif font-normal tracking-normal text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-near-black mb-8 max-w-4xl mx-auto"
            >
              We build systems <br className="hidden md:block" />
              that give you your <span className="font-semibold text-blue-600 italic pr-2">{hero.accentWord}</span> back.
            </motion.h1>

            <motion.p
              {...fadeUp(0.3)}
              className="text-lg md:text-xl font-sf font-light text-gray-500 mb-10 max-w-2xl mx-auto"
            >
              {hero.tagline}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              {...fadeUp(0.4)}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            >
              <a
                href="#work"
                className={`relative overflow-hidden group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-b from-[#5c98f8] to-[#2960e4] text-white text-sm font-semibold rounded-xl shadow-[0_4px_10px_rgba(41,96,228,0.25),inset_0_2px_3px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.15)] border border-[#1e48b8]/40 transition-[transform,shadow] hover:shadow-[0_6px_14px_rgba(41,96,228,0.4),inset_0_2px_3px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.15)] active:scale-95 z-10 ${focusRing}`}
              >
                <span className="relative z-10 drop-shadow-sm font-sans tracking-wide flex items-center">
                  {hero.cta.primary} 
                  <span className="ml-2 font-light">↓</span>
                </span>
                {/* Glossy Gel Highlight */}
                <div className="absolute top-[1px] left-[1px] right-[1px] h-[45%] bg-gradient-to-b from-white/45 to-white/0 rounded-t-[11px] pointer-events-none" />
              </a>
              <a
                href="https://cal.com/autobeets/30min"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center px-8 py-4 bg-white border border-gray-200 text-near-black text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors cursor-pointer ${focusRing}`}
              >
                {hero.cta.secondary}
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>

    {/* Social proof Stats Banner - Full Width Section */}
    <section className="w-full bg-[#3662E3] py-12 md:py-16">
      <motion.div {...fadeUp(0.5)} className="max-w-7xl mx-auto px-4 md:px-12 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0 relative">
          {/* Mobile horizontal divider */}
          <div className="md:hidden absolute top-1/2 left-4 right-4 h-px bg-white/20 -translate-y-1/2" />
          
          {hero.socialProofStats.map((stat, i) => (
            <div 
              key={i} 
              className={`flex flex-col items-center justify-center text-center px-2 md:px-6 ${i % 2 !== 0 ? 'border-l border-white/20 md:border-l-0' : ''} ${i !== 0 ? 'md:border-l md:border-white/20' : ''}`}
            >
              <span className="text-4xl md:text-5xl lg:text-[4rem] font-bitroad font-normal text-white tracking-widest mb-2 drop-shadow-sm uppercase">
                {stat.value}
              </span>
              <span className="text-[10px] md:text-[11px] font-sf font-medium text-white/85 tracking-widest max-w-[160px] leading-tight uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
    </>
  )
}
