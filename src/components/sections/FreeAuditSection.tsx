'use client'

import React from 'react'
import Image from 'next/image'
import { focusRing } from '@/lib/tokens'
import { useAuditModal } from '@/lib/AuditModalContext'

export function FreeAuditSection() {
  const { openModal } = useAuditModal()

  return (
    <section className="relative py-24 bg-near-black border-y border-[#2a2f3a] overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none opacity-40">
        <div className="w-full max-w-4xl h-64 bg-gradient-to-r from-transparent via-[#2960e4]/20 to-transparent blur-3xl rounded-full"></div>
      </div>

      {/* Floating 3D Y2K Widgets */}
      <div className="absolute inset-0 z-0 pointer-events-none max-w-6xl mx-auto flex items-center justify-center">
        {/* Chrome Star */}
        <div className="absolute -top-[-14px] md:top-0 right-[10%] md:right-[15%] w-24 h-24 md:w-32 md:h-32 -rotate-[-12deg]">
          <Image src="/images/widget_star.png" alt="Star Widget" fill unoptimized className="object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
        </div>
        {/* Y2K Controller */}
        <div className="absolute top-[5%] md:top-[15%] left-[5%] md:left-[10%] w-28 h-28 md:w-40 md:h-40 -rotate-12">
          <Image src="/images/controller_widget.png" alt="Controller Widget" fill unoptimized className="object-contain filter drop-shadow-[0_0_20px_rgba(168,85,247,0.2)]" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">
          Discover The Hidden Potential Of Your Workflows.
        </h2>
        <p className="font-sf text-base md:text-lg text-muted mb-10 max-w-2xl mx-auto">
          Our team will analyze your current systems and generate a Custom Automation Roadmap tailored strictly to your business. 
        </p>

        <button
          onClick={openModal}
          className={`relative overflow-hidden group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-b from-[#5c98f8] to-[#2960e4] text-white text-[15px] font-semibold rounded-xl shadow-[0_4px_10px_rgba(41,96,228,0.25),inset_0_2px_3px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.15)] border border-[#1e48b8]/40 transition-all hover:shadow-[0_6px_14px_rgba(41,96,228,0.4),inset_0_2px_3px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.15)] hover:scale-[1.02] active:scale-95 ${focusRing}`}
        >
          <span className="relative z-10 drop-shadow-sm tracking-wide">Start Your Free Audit</span>
          <div className="absolute top-[1px] left-[1px] right-[1px] h-[45%] bg-gradient-to-b from-white/45 to-white/0 rounded-t-[11px] pointer-events-none" />
        </button>
      </div>
    </section>
  )
}
