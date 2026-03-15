'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { focusRing } from '@/lib/tokens'
import { meta } from '@/lib/content'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className={`font-body font-black text-sm text-near-black tracking-tight ${focusRing}`}
        >
          ✦ We Automate. You Grow.
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {['Work', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-sm text-muted hover:text-near-black transition-colors ${focusRing}`}
            >
              {item}
            </a>
          ))}
          <a
            href={`mailto:${meta.email}`}
            className={`bg-near-black text-white text-xs font-black font-mono uppercase tracking-wider px-4 py-2 rounded-sm hover:bg-ai-accent transition-colors ${focusRing}`}
          >
            Hire Us →
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden text-near-black ${focusRing}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {['Work', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-sm text-near-black font-medium ${focusRing}`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href={`mailto:${meta.email}`}
            className={`bg-near-black text-white text-xs font-black font-mono uppercase tracking-wider px-4 py-3 rounded-sm text-center hover:bg-ai-accent transition-colors ${focusRing}`}
          >
            Hire Us →
          </a>
        </div>
      )}
    </header>
  )
}
