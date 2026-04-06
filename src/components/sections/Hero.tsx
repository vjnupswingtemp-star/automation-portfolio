'use client'
import Image from 'next/image'
import { hero } from '@/lib/content'
import { focusRing } from '@/lib/tokens'

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden min-h-[80vh] md:min-h-screen flex items-center bg-white pb-20 md:pb-32">
      
      {/* Massive Outline Text Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none z-0 overflow-hidden">
        <h1 
          className="text-[17vw] sm:text-[15vw] md:text-[13vw] lg:text-[12vw] font-sans font-black text-transparent whitespace-nowrap leading-none tracking-tighter" 
          style={{ WebkitTextStroke: '2px #000' }}
        >
          AUTOMATE
        </h1>
      </div>

      {/* Decorative Thin Lines */}
      <div className="absolute top-0 left-6 md:left-12 w-px h-full bg-gray-100 z-0" />
      <div className="absolute top-0 right-6 md:right-12 w-px h-full bg-gray-100 z-0" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-gray-100 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-28 md:pb-40">
        
        {/* Floating Y2K Element 1 (CD Walkman) */}
        <div className="absolute top-[10%] md:top-[12%] -right-4 md:-right-8 lg:-right-16 w-32 h-32 md:w-[320px] md:h-[320px] z-0 md:z-30 pointer-events-none rotate-[16deg] opacity-[0.95] transition-[transform,opacity] duration-1000">
          <Image 
            src="/images/y2k_cd_walkman_transparent.png" 
            alt="Y2K CD Walkman" 
            fill 
            className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)]" 
          />
        </div>

        {/* Floating Y2K Element 2 (Floppy Disk) */}
        <div className="absolute top-[28%] md:top-[12%] left-[-5%] md:left-[-5%] w-24 h-24 md:w-40 md:h-40 z-0 md:z-20 pointer-events-none rotate-[-12deg] opacity-70 md:opacity-100">
          <Image 
            src="/images/y2k_floppy.png" 
            alt="Y2K Floppy Disk" 
            fill 
            className="object-contain" 
          />
        </div>

        {/* Floating Y2K Element 3 (Tamagotchi) */}
        <div className="absolute bottom-[10%] md:bottom-[-5%] left-[-2%] md:left-[8%] w-28 h-28 md:w-48 md:h-48 z-20 pointer-events-none rotate-[8deg]">
          <Image 
            src="/images/y2k_tamagotchi.png" 
            alt="Y2K Tamagotchi" 
            fill 
            className="object-contain" 
          />
        </div>

        <div className="flex flex-col items-center text-center relative z-10">
          
          {/* Typography & Content */}
          <div className="flex-1 flex flex-col items-center">
            <div className="mb-6 hero-fade-1">
              <span className="inline-block border-2 border-[#3662E3] bg-white text-[#3662E3] shadow-[4px_4px_0px_0px_#3662E3] rounded-sm px-4 py-1.5 text-xs font-bitroad tracking-widest uppercase">
                {hero.label}
              </span>
            </div>

            <h1 className="hero-fade-2 font-serif font-normal tracking-normal text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-near-black mb-8 max-w-4xl mx-auto">
              We build systems <br className="hidden md:block" />
              that give you your <span className="font-semibold text-blue-600 italic pr-2">{hero.accentWord}</span> back.
            </h1>

            <p className="hero-fade-3 text-lg md:text-xl font-sf font-light text-gray-500 mb-10 max-w-2xl mx-auto">
              {hero.tagline}
            </p>

            {/* CTA buttons */}
            <div className="hero-fade-4 flex flex-col sm:flex-row gap-4 items-center justify-center">
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
                href="#contact"
                className={`inline-flex items-center justify-center px-8 py-4 bg-white border border-gray-200 text-near-black text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors ${focusRing}`}
              >
                {hero.cta.secondary}
              </a>
            </div>

            {/* Social proof */}
            <div className="hero-fade-5 mt-10 md:mt-16 pt-6 md:pt-8 border-t border-gray-200 max-w-2xl w-full mx-auto bg-white/50 backdrop-blur-sm">
              <p className="text-xs font-semibold text-gray-400 tracking-wide uppercase">
                {hero.socialProof}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
