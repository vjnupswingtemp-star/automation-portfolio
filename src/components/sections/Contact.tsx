'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { Zap } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { contact, meta } from '@/lib/content'
import { focusRing } from '@/lib/tokens'

// Split headline to italicize the accent word "automate"
export function Contact() {
  const shouldReduce = false // useReducedMotion()

  return (
    <section id="contact" className="relative bg-near-black py-20 md:py-32 overflow-hidden">
      
      {/* Floating 3D Y2K Widgets */}
      <div className="absolute inset-0 z-0 pointer-events-none max-w-6xl mx-auto flex items-center justify-center">
        {/* Chrome Star */}
        <div className="absolute -top-[-14px] md:top-0 right-[10%] md:right-[15%] w-24 h-24 md:w-32 md:h-32 -rotate-[-12deg]">
          <Image src="/images/widget_star.png" alt="Star Widget" fill unoptimized className="object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
        </div>

        {/* Y2K Controller (Left Side) */}
        <div className="absolute top-[5%] md:top-[15%] left-[5%] md:left-[10%] w-28 h-28 md:w-40 md:h-40 -rotate-12">
          <Image src="/images/controller_widget.png" alt="Controller Widget" fill unoptimized className="object-contain filter drop-shadow-[0_0_20px_rgba(168,85,247,0.2)]" />
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduce ? { duration: 0 } : { duration: 0.7, ease: 'easeOut' as const }}
        >          {/* Headline */}
          {/* Headline */}
          <h2 className="font-serif font-normal tracking-normal text-4xl md:text-6xl text-white leading-[1.05] mb-6">
            {contact.headline}
          </h2>

          {/* Subtext */}
          <p className="font-sf text-base md:text-lg text-muted mb-10">
            {contact.subtext}
          </p>

          <button
            data-cal-link="auto-beets-epcwto/30min"
            data-cal-config='{"layout":"month_view"}'
            className={`relative overflow-hidden group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-b from-[#5c98f8] to-[#2960e4] text-white text-sm font-semibold rounded-xl shadow-[0_4px_10px_rgba(41,96,228,0.25),inset_0_2px_3px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.15)] border border-[#1e48b8]/40 transition-[transform,shadow] hover:shadow-[0_6px_14px_rgba(41,96,228,0.4),inset_0_2px_3px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.15)] active:scale-95 cursor-pointer ${focusRing}`}
          >
            <span className="relative z-10 drop-shadow-sm font-sans tracking-wide">Book a Call</span>
            <div className="absolute top-[1px] left-[1px] right-[1px] h-[45%] bg-gradient-to-b from-white/45 to-white/0 rounded-t-[11px] pointer-events-none" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
