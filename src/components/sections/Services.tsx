'use client'
import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import Image from 'next/image'
import { services } from '@/lib/content'

interface CustomServiceItem {
  icon: string
  title: string
  description: string
  outcomes: string[]
  bg: string
  image: string
  newDesign?: {
    headline: string
    logoText: string
    modelNumber: string
    tagline: string
    adCopy: string
    imagePosition?: string
  }
}

export function Services() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progressKey, setProgressKey] = useState(0)
  const [visible, setVisible] = useState(true)

  const goToSlide = (i: number) => {
    if (i === currentIndex) return
    setVisible(false)
    setTimeout(() => {
      setCurrentIndex(i)
      setProgressKey((k) => k + 1)
      setVisible(true)
    }, 250)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => {
          const next = (prev + 1) % services.items.length
          return next
        })
        setProgressKey((k) => k + 1)
        setVisible(true)
      }, 250)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const item = services.items[currentIndex] as unknown as CustomServiceItem
  const isEven = currentIndex % 2 === 0

  return (
    <section id="services" className="relative overflow-hidden py-8 md:py-16">

      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/sky_bg.png')" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1] opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px)',
          backgroundSize: '8px 8px',
        }}
      />
      <div className="absolute inset-0 bg-white/40 z-[2]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">

        {/* Section Header */}
        <div className="mb-8 md:mb-12 flex">
          <span className="inline-block border-2 border-[#3662E3] bg-white text-[#3662E3] shadow-[4px_4px_0px_0px_#3662E3] rounded-sm px-4 py-1.5 text-xs font-bitroad tracking-widest uppercase relative -left-1">
            {services.label}
          </span>
        </div>

        {/* Card — fades in/out on slide change */}
        <div
          className="w-full flex justify-center md:px-4 py-4"
          style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.25s ease-in-out' }}
        >
          {item.newDesign ? (
            <div className="relative w-full max-w-[1300px] bg-white border border-gray-100 shadow-[0_12px_40px_rgb(0,0,0,0.06)] rounded-3xl overflow-hidden flex flex-col md:flex-row mx-auto group min-h-[350px] md:min-h-[500px]">
              <div className={`w-full md:w-1/2 relative min-h-[220px] md:min-h-full shrink-0 overflow-hidden bg-[#e8e4db]/20 ${isEven ? '' : 'md:order-2'}`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={`object-cover ${item.newDesign.imagePosition || (isEven ? 'object-right' : 'object-[55%_center]')}`}
                />
              </div>
              <div className={`w-full md:w-1/2 flex flex-col items-start px-5 sm:px-6 md:px-12 lg:px-16 py-6 md:py-16 relative z-20 ${isEven ? '' : 'md:order-1'}`}>
                <div className={`absolute top-0 w-24 md:w-32 h-6 md:h-8 bg-[#095EAA] ${isEven ? 'right-12' : 'left-12'}`} />
                <h3 className="font-serif font-normal text-3xl md:text-[3.2rem] text-near-black leading-[1.05] tracking-normal mb-4 md:mb-6 mt-2 md:mt-4">
                  {item.newDesign.headline}
                </h3>
                <p className="text-[15px] md:text-lg leading-[1.65] md:leading-[1.75] font-sf text-gray-700 text-left tracking-normal flex-grow">
                  {item.newDesign.adCopy}
                </p>
                <div className="w-full mt-8 md:mt-16 flex flex-col items-start z-10">
                  <span className="font-bitroad text-[#095EAA] text-lg md:text-2xl tracking-widest uppercase">{item.newDesign.logoText}</span>
                  <span className="font-bitroad text-[#095EAA] text-[8px] md:text-[10px] tracking-widest mt-1 uppercase">{item.newDesign.tagline}</span>
                </div>
              </div>
              <div className={`absolute bottom-0 w-32 md:w-48 h-6 md:h-8 bg-[#41B853] ${isEven ? 'right-[15%]' : 'left-[15%]'}`} />
            </div>
          ) : (
            <div className={`relative w-full max-w-[1300px] grid grid-cols-1 lg:grid-cols-12 rounded-[2.5rem] overflow-hidden ${item.bg} border-2 border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm`}>
              <div className={`p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <h4 className="font-serif font-normal text-3xl md:text-5xl text-near-black mb-6 leading-[1.1] tracking-tight">{item.title}</h4>
                <p className="font-sf font-normal text-lg text-near-black/60 leading-relaxed mb-10 max-w-sm">{item.description}</p>
                <ul className="space-y-5">
                  {item.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-4 text-base font-sf text-near-black/90 font-medium">
                      <Check size={22} strokeWidth={2} className="text-[#3662E3] shrink-0 mt-0.5" aria-hidden="true" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`relative min-h-[350px] lg:min-h-full flex items-center justify-center lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'} p-3 md:p-5 lg:p-6`}>
                <div className="relative w-full h-full min-h-[300px] lg:min-h-[450px] overflow-hidden mix-blend-darken">
                  <Image src={item.image} alt={item.title} fill className="object-contain object-center" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-1 md:gap-3 mt-6 md:mt-16 relative z-20">
          {services.items.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className="p-3 cursor-pointer"
              aria-label={`Go to slide ${i + 1}`}
            >
              <div className={`relative overflow-hidden rounded-full transition-all duration-300 ${currentIndex === i ? 'w-10 md:w-12 h-2.5 bg-black/10' : 'w-2.5 h-2.5 bg-black/20 hover:bg-black/30'}`}>
                {currentIndex === i && (
                  <div
                    key={progressKey}
                    className="absolute inset-y-0 left-0 bg-[#3662E3] rounded-full animate-[progress_8s_linear_forwards]"
                  />
                )}
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}
