'use client'
import { useState } from 'react'
import { caseStudies } from '@/lib/content'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react'

export function CaseStudy() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)

  const switchTo = (next: number) => {
    setVisible(false)
    setIsExpanded(false)
    setTimeout(() => {
      setCurrentIndex(next)
      setVisible(true)
    }, 250)
  }

  const handleNext = () => switchTo((currentIndex + 1) % caseStudies.length)
  const handlePrev = () => switchTo((currentIndex - 1 + caseStudies.length) % caseStudies.length)

  const study = caseStudies[currentIndex]

  return (
    <section id="work" className={`relative py-16 md:py-24 bg-[#FAFAFA] ${isExpanded ? 'z-[9999]' : ''}`}>
      <div className={`relative ${isExpanded ? 'z-[9999]' : 'z-10'} max-w-7xl mx-auto px-6 md:px-12 w-full`}>

        {/* Header & Nav */}
        <div className="flex justify-between items-center mb-12 sm:mb-16 w-full">
          <span className="inline-block border-2 border-[#3662E3] bg-white text-[#3662E3] shadow-[4px_4px_0px_0px_#3662E3] rounded-sm px-4 py-1.5 text-xs font-bitroad tracking-widest uppercase">
            Our Work
          </span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 font-sf">{currentIndex + 1} / {caseStudies.length}</span>
            <button
              onClick={handlePrev}
              className="p-3 transition-colors hover:bg-gray-100 flex items-center justify-center text-near-black border border-gray-200 rounded-full bg-white shadow-sm"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 transition-colors hover:bg-gray-100 flex items-center justify-center text-near-black border border-gray-200 rounded-full bg-white shadow-sm"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content — fades on switch */}
        <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.25s ease-in-out' }}>

          <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-near-black text-center mb-12 sm:mb-16 w-full">
            {study.title}
          </h2>

          {/* 3 Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 w-full">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-start shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="w-16 h-16 sm:w-20 sm:h-20 relative flex items-center justify-center mb-6 bg-[#EEF2FC] rounded-[1.25rem] shadow-sm shrink-0">
                <Image src="/images/simple_construction_sign.png" alt="Problem Icon" fill className="object-contain p-3 sm:p-3.5 mix-blend-multiply opacity-90" />
              </div>
              <div className="flex-grow">
                <span className="inline-block bg-gray-100 text-gray-600 font-sf font-semibold text-xs px-3 py-1.5 rounded-full mb-4">Challenge</span>
                <h3 className="font-serif font-semibold text-xl sm:text-2xl text-[#3662E3] mb-3">The Problem</h3>
                <p className="font-sf font-light text-gray-600 text-sm sm:text-[15px] leading-relaxed">{study.problem}</p>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-start shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="w-16 h-16 sm:w-20 sm:h-20 relative flex items-center justify-center mb-6 bg-[#EEF2FC] rounded-[1.25rem] shadow-sm shrink-0">
                <Image src="/images/simple_excavator.png" alt="Solution Icon" fill className="object-contain p-3 sm:p-3.5 mix-blend-multiply opacity-90" />
              </div>
              <div className="flex-grow">
                <span className="inline-block bg-gray-100 text-gray-600 font-sf font-semibold text-xs px-3 py-1.5 rounded-full mb-4">Solution</span>
                <h3 className="font-serif font-semibold text-xl sm:text-2xl text-[#3662E3] mb-3">What We Built</h3>
                <p className="font-sf font-light text-gray-600 text-sm sm:text-[15px] leading-relaxed">{study.solution}</p>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-start shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="w-16 h-16 sm:w-20 sm:h-20 relative flex items-center justify-center mb-6 bg-[#EEF2FC] rounded-[1.25rem] shadow-sm shrink-0">
                <Image src="/images/simple_building.png" alt="Outcome Icon" fill className="object-contain p-3 sm:p-3.5 mix-blend-multiply opacity-90" />
              </div>
              <div className="flex-grow">
                <span className="inline-block bg-gray-100 text-gray-600 font-sf font-semibold text-xs px-3 py-1.5 rounded-full mb-4">Outcome</span>
                <h3 className="font-serif font-semibold text-xl sm:text-2xl text-[#3662E3] mb-3">The Result</h3>
                <p className="font-sf font-light text-gray-600 text-sm sm:text-[15px] leading-relaxed">{study.result}</p>
              </div>
            </div>
          </div>

          {/* Video / Image */}
          <div className={isExpanded 
            ? "fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8" 
            : "relative w-full rounded-[2.5rem] overflow-hidden min-h-[300px] md:min-h-[500px] lg:min-h-[600px] bg-[#111] shadow-xl group border border-gray-100"}>
            
            {isExpanded && (
              <button 
                onClick={() => setIsExpanded(false)}
                className="absolute top-6 right-6 z-[110] p-3 md:p-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full transition-colors backdrop-blur-md"
                aria-label="Minimize"
              >
                <Minimize className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            )}

            {study.videoSrc ? (
              <>
                <video
                  key={study.videoSrc}
                  src={study.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={isExpanded
                    ? "relative z-[105] w-full max-w-5xl max-h-[85vh] object-contain rounded-xl sm:rounded-2xl shadow-2xl"
                    : "absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"}
                />
                {!isExpanded && (
                  <button 
                    onClick={() => setIsExpanded(true)}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2.5 bg-black/40 hover:bg-black/60 text-white rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-white/10"
                    aria-label="Maximize video"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                )}
                {!isExpanded && (
                  <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] pointer-events-none rounded-[2.5rem]" />
                )}
              </>
            ) : (
                study.workflowImage && (
                  <>
                    <div className={isExpanded ? "relative z-[105] w-full max-w-5xl h-[85vh]" : "absolute inset-0 w-full h-full"}>
                      <Image
                        src={study.workflowImage}
                        alt="Automated Workflow Architecture"
                        fill
                        className={isExpanded ? "object-contain" : "object-cover object-center opacity-90"}
                      />
                    </div>
                    {!isExpanded && (
                      <button 
                        onClick={() => setIsExpanded(true)}
                        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2.5 bg-black/40 hover:bg-black/60 text-white rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-white/10"
                        aria-label="Maximize image"
                      >
                        <Maximize className="w-5 h-5" />
                      </button>
                    )}
                  </>
                )
            )}
            
            <div className={`absolute bottom-6 left-6 right-6 flex flex-wrap gap-2 z-10 pointer-events-none ${isExpanded ? 'max-w-5xl mx-auto' : ''}`}>
              {study.tools.map((tool) => (
                <span key={tool} className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 text-white rounded-full text-xs font-mono font-medium tracking-wide shadow-sm">
                  {tool}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* PDF CTA */}
        {study.pdfUrl && (
          <div className="mt-16 flex justify-center">
            <a
              href={study.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-b from-[#5c98f8] to-[#2960e4] text-white text-sm font-semibold rounded-xl shadow-[0_4px_10px_rgba(41,96,228,0.25),inset_0_2px_3px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.15)] border border-[#1e48b8]/40 transition-[transform,shadow] hover:shadow-[0_6px_14px_rgba(41,96,228,0.4),inset_0_2px_3px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.15)] active:scale-95 z-10"
            >
              <span className="relative z-10 drop-shadow-sm font-sans tracking-wide flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                View Full Case Study PDF
              </span>
              <div className="absolute top-[1px] left-[1px] right-[1px] h-[45%] bg-gradient-to-b from-white/45 to-white/0 rounded-t-[11px] pointer-events-none" />
            </a>
          </div>
        )}

      </div>
    </section>
  )
}
