'use client'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { PillTag } from '@/components/ui'
import { caseStudies } from '@/lib/content'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function CaseStudy() {
  const shouldReduce = useReducedMotion()
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length)
  }

  const currentStudy = caseStudies[currentIndex]

  return (
    <section id="work" className="relative overflow-hidden py-16 md:py-20 bg-white">
      {/* Decorative Thin Lines */}
      <div className="absolute top-0 left-6 md:left-12 w-px h-full bg-gray-100 z-0" />
      <div className="absolute top-0 right-6 md:right-12 w-px h-full bg-gray-100 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16 flex justify-between items-end">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-6"
          >
            <span 
              className="inline-block border-2 border-[#3662E3] bg-white text-[#3662E3] shadow-[4px_4px_0px_0px_#3662E3] rounded-sm px-4 py-1.5 text-xs font-bitroad tracking-widest uppercase"
            >
              {currentStudy.label}
            </span>
          </motion.div>
          <div className="hidden md:block">
            <PillTag>{currentStudy.industry}</PillTag>
          </div>
        </div>

        {/* Massive Project Title & Navigation */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-8">
          <motion.h2
            key={currentIndex} // Re-animate on change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-serif font-normal text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-near-black leading-[1.05] tracking-tight max-w-5xl"
          >
            {currentStudy.title}
          </motion.h2>

          {/* Navigation Arrows */}
          <div className="flex justify-between md:justify-end w-full md:w-auto gap-4 pb-2 md:pb-4">
            <button 
              onClick={handlePrev}
              className="p-2 md:p-3 transition-opacity hover:opacity-60 flex items-center justify-center text-near-black"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button 
              onClick={handleNext}
              className="p-2 md:p-3 transition-opacity hover:opacity-60 flex items-center justify-center text-near-black"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div key={"details-" + currentIndex} className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in zoom-in-95 duration-500">
          
          {/* Mobile 1: The Workflow Image  */}
          <div className={`order-1 lg:order-none lg:col-start-4 lg:col-end-10 lg:row-start-2 relative w-full flex flex-col rounded-[2.5rem] overflow-hidden min-h-[350px] group ${!currentStudy.videoSrc ? 'bg-near-black' : ''}`}>
            {currentStudy.videoSrc ? (
              <div className="absolute inset-0 w-full h-full">
                <video
                  key={currentStudy.videoSrc}
                  src={currentStudy.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] rounded-[2.5rem] pointer-events-none" />
              </div>
            ) : (
              <>
                {currentStudy.workflowImage && (
                  <Image
                    src={currentStudy.workflowImage}
                    alt="Automated Workflow Architecture"
                    fill
                    className="object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-out opacity-90 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                  />
                )}
                <div className="absolute inset-0 bg-[#3662E3]/20 group-hover:bg-transparent transition-colors duration-500" />
              </>
            )}
          </div>

          {/* Mobile 2: 01 Problem */}
          <div className="order-2 lg:order-none lg:col-start-1 lg:col-end-4 lg:row-start-1 lg:row-end-3 bg-[#111111] rounded-[2.5rem] p-8 flex flex-col justify-between min-h-[550px] hover:bg-[#111111] transition-colors">
            {/* Image Placeholder */}
            <div className="w-full h-48 mb-8 relative overflow-hidden flex items-center justify-center">
               <Image src="/images/simple_construction_sign.png" alt="Construction Sign" fill className="object-contain p-6 drop-shadow-xl mix-blend-screen opacity-90" />
            </div>
            <div>
              <h3 className="font-serif text-[2rem] text-white mb-4 leading-none">01 <br/><span className="text-xl text-gray-300">The Problem</span></h3>
              <p className="font-sf text-base text-gray-400 leading-relaxed font-light">
                {currentStudy.problem}
              </p>
            </div>
          </div>

          {/* Mobile 3: 02 What We Built */}
          <div className="order-3 lg:order-none lg:col-start-4 lg:col-end-10 lg:row-start-1 bg-[#111111] rounded-[2.5rem] p-8 flex flex-col-reverse sm:flex-row items-center gap-8 hover:bg-[#111111] transition-colors border border-white/5">
            <div className="flex-1">
              <h3 className="font-serif text-[2rem] text-white mb-4 leading-none">02 <br/><span className="text-xl text-gray-300">What We Built</span></h3>
              <p className="font-sf text-base text-gray-400 leading-relaxed font-light">
                {currentStudy.solution}
              </p>
            </div>
            <div className="w-32 h-32 sm:w-48 sm:h-48 relative flex-shrink-0 flex items-center justify-center overflow-hidden">
               <Image src="/images/simple_excavator.png" alt="Excavator" fill className="object-contain p-6 drop-shadow-xl mix-blend-screen opacity-90" />
            </div>
          </div>

          {/* Mobile 4: 03 Result */}
          <div className="order-4 lg:order-none lg:col-start-10 lg:col-end-13 lg:row-start-1 lg:row-end-3 bg-[#111111] rounded-[2.5rem] p-8 flex flex-col justify-between min-h-[550px] hover:bg-[#111111] transition-colors">
             {/* Image Placeholder */}
             <div className="w-full h-48 mb-8 relative overflow-hidden flex items-center justify-center">
               <Image src="/images/simple_building.png" alt="House" fill className="object-contain p-4 drop-shadow-xl mix-blend-screen opacity-90" />
            </div>
            <div>
              <h3 className="font-serif text-[2rem] text-white mb-4 leading-none">03 <br/><span className="text-xl text-gray-300">The Results</span></h3>
              <p className="font-sf text-base text-gray-400 leading-relaxed font-light mb-6">
                {currentStudy.result}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {currentStudy.tools.map((tool) => (
                  <span key={tool} className="px-3 py-1 bg-white/10 border border-white/20 text-gray-200 rounded-full text-xs font-mono font-bold tracking-wide shadow-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* PDF CTA Component */}
        {currentStudy.pdfUrl && (
          <div className="mt-20 flex justify-center">
            <a 
              href={currentStudy.pdfUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className={`relative overflow-hidden group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-b from-[#5c98f8] to-[#2960e4] text-white text-sm font-semibold rounded-xl shadow-[0_4px_10px_rgba(41,96,228,0.25),inset_0_2px_3px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.15)] border border-[#1e48b8]/40 transition-[transform,shadow] hover:shadow-[0_6px_14px_rgba(41,96,228,0.4),inset_0_2px_3px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.15)] active:scale-95 z-10`}
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
