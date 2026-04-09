'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { focusRing } from '@/lib/tokens'
import { meta } from '@/lib/content'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-6 pointer-events-none">
      <div 
        className={`pointer-events-auto relative w-full max-w-[1100px] bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-full transition-all duration-300 ${
          scrolled ? 'shadow-md shadow-near-black/5' : 'shadow-xl shadow-near-black/10'
        }`}
      >
        <nav className="w-full h-16 md:h-20 flex items-center px-6 md:px-8">
          
          {/* Logo - Far Left */}
          <div className="w-1/4 flex items-center">
            <a
              href="#"
              className={`block focus:outline-none ${focusRing}`}
            >
              <Image 
                src="/logos/autologo.svg" 
                alt="Logo" 
                width={120} 
                height={40} 
                className="h-10 w-auto"
                priority
              />
            </a>
          </div>

          {/* Desktop links - Centered */}
          <div className="hidden lg:flex flex-1 justify-center items-center gap-10">
            {['Home', 'Toolbox', 'Services', 'Work', 'About'].map((item) => (
              <a
                key={item}
                href={item === 'Home' ? '#hero' : item === 'Toolbox' ? '#tech-stack' : `#${item.toLowerCase().replace(/ /g, '-')}`}
                className={`text-[15px] font-sans tracking-wide text-near-black/80 hover:text-black transition-colors ${focusRing}`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA - Far Right */}
          <div className="hidden lg:flex w-1/4 justify-end items-center">
            <a
              href="https://cal.com/auto-beets-epcwto/30min"
              target="_blank"
              rel="noopener noreferrer"
              className={`relative overflow-hidden group bg-gradient-to-b from-[#5c98f8] to-[#2960e4] text-white px-7 py-2.5 rounded-xl text-[15px] font-semibold shadow-[0_4px_10px_rgba(41,96,228,0.25),inset_0_2px_3px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.15)] border border-[#1e48b8]/40 transition-[transform,shadow] hover:shadow-[0_6px_14px_rgba(41,96,228,0.4),inset_0_2px_3px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.15)] active:scale-95 cursor-pointer ${focusRing}`}
            >
               <span className="relative z-10 drop-shadow-sm font-sans tracking-wide">Book a Call</span>
               {/* Glossy Gel Highlight */}
               <div className="absolute top-[1px] left-[1px] right-[1px] h-[45%] bg-gradient-to-b from-white/45 to-white/0 rounded-t-[11px] pointer-events-none" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex flex-1 justify-end">
            <button
              className={`p-2 -mr-2 text-near-black ${focusRing}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-3xl p-6 flex flex-col gap-6 border border-gray-100 shadow-2xl z-10 w-full overflow-hidden">
            {['Home', 'Toolbox', 'Services', 'Work', 'About'].map((item) => (
              <a
                key={item}
                href={item === 'Home' ? '#hero' : item === 'Toolbox' ? '#tech-stack' : `#${item.toLowerCase().replace(/ /g, '-')}`}
                className={`text-lg text-near-black font-sans tracking-wide ${focusRing}`}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="https://cal.com/auto-beets-epcwto/30min"
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-4 relative overflow-hidden group bg-gradient-to-b from-[#5c98f8] to-[#2960e4] text-white px-8 py-3.5 rounded-xl text-center text-lg font-semibold shadow-[0_4px_10px_rgba(41,96,228,0.3),inset_0_2px_3px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.15)] border border-[#1e48b8]/40 transition-[transform,shadow] hover:shadow-[0_6px_14px_rgba(41,96,228,0.4),inset_0_2px_3px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.15)] active:scale-95 cursor-pointer ${focusRing}`}
              onClick={() => setMenuOpen(false)}
            >
               <span className="relative z-10 drop-shadow-sm font-sans tracking-wide">Book a Call</span>
               <div className="absolute top-[1px] left-[1px] right-[1px] h-[45%] bg-gradient-to-b from-white/45 to-white/0 rounded-t-[11px] pointer-events-none" />
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
