'use client'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { techStack } from '@/lib/content'
import { focusRing } from '@/lib/tokens'

// Since we are mocking SVGs, we will use a styled 3D-feeling text fallback
// for a high-end minimalist Y2K look if the logo image fails to load.
import { Terminal } from 'lucide-react'

function ToolLogo({ name, logo }: { name: string; logo: string }) {
  const [failed, setFailed] = useState(false)

  if (failed || logo.endsWith('.svg')) {
    return (
      <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-start mb-6 text-gray-400">
        <Terminal className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />
      </div>
    )
  }

  return (
    <img
      src={logo}
      alt={name}
      className="h-16 md:h-20 w-auto max-w-[140px] object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-500 ease-out"
      onError={() => setFailed(true)}
    />
  )
}

export function TechStack() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="tech-stack" className="relative overflow-hidden bg-white pt-24 pb-12 md:pt-32 md:pb-16">
      
      {/* (Removed Massive Outline Text Background) */}

      {/* Decorative Thin Lines (Matching Hero) */}
      <div className="absolute top-0 left-6 md:left-12 w-px h-full bg-gray-100 z-0" />
      <div className="absolute top-0 right-6 md:right-12 w-px h-full bg-gray-100 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 cursor-default">
          {/* Left: Typography */}
          <div className="lg:w-1/3 flex flex-col justify-start">
            <motion.div 
              initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-8"
            >
              <span className="inline-block border-2 border-[#3662E3] bg-white text-[#3662E3] shadow-[4px_4px_0px_0px_#3662E3] rounded-sm px-4 py-1.5 text-xs font-bitroad tracking-widest uppercase">
                {techStack.label}
              </span>
            </motion.div>
            
            <motion.h2
              initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="font-serif font-normal text-5xl md:text-6xl text-near-black leading-[1.1]"
            >
              {techStack.headline}
            </motion.h2>

            {/* Statistics Mini-Row */}
            <div className="mt-16 flex flex-row lg:flex-col justify-between gap-4 lg:gap-8 border-t border-gray-200 pt-8 w-full lg:max-w-sm">
              {techStack.stats.map((stat, idx) => (
                <motion.div 
                  key={stat.label}
                  initial={shouldReduce ? { opacity: 1 } : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (idx * 0.1), duration: 0.5 }}
                  className="flex flex-col flex-1"
                >
                  <span className="font-sans font-light text-2xl sm:text-3xl lg:text-4xl text-near-black mb-1">{stat.value}</span>
                  <span className="font-sans font-medium text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider leading-tight">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Minimalist Raw Grid Grid */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
              {techStack.tools.map((tool, idx) => (
                <motion.div
                  key={tool.name}
                  initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col items-start"
                >
                  {/* Raw Logo */}
                  <div className="h-14 flex items-center justify-start mb-6 w-full">
                    <img
                      src={tool.logo}
                      alt={tool.name}
                      className={`object-left object-contain filter drop-shadow-sm group-hover:scale-105 transition-all duration-500 ease-out ${
                        tool.name === 'OpenAI' ? 'max-h-10 max-w-[140px]' : 'max-h-14 max-w-[160px]'
                      }`}
                      onError={(e) => {
                        // Fallback text if image missing
                        (e.target as HTMLElement).style.display = 'none';
                        const fallback = document.createElement('span');
                        fallback.className = 'font-sans font-bold text-xl text-gray-800 tracking-tight';
                        fallback.innerText = tool.name;
                        (e.target as HTMLElement).parentElement?.appendChild(fallback);
                      }}
                    />
                  </div>

                  {/* Text Content */}
                  <h3 className="font-sf font-semibold text-base md:text-lg text-near-black mb-2">{tool.name}</h3>
                  <p className="font-sf font-light text-sm text-gray-500 leading-relaxed max-w-[240px]">
                    {tool.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
