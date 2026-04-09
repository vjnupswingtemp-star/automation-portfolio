'use client'
import { useState } from 'react'
import { Zap } from 'lucide-react'

export function ROICalculator() {
  const [ghostedLeads, setGhostedLeads] = useState<number>(30)
  const [revenuePerClient, setRevenuePerClient] = useState<number>(1500)
  const [recoveryRate, setRecoveryRate] = useState<number>(20)

  // Math
  const recoveredMonthly = ghostedLeads * (recoveryRate / 100) * revenuePerClient
  const recoveredYearly = recoveredMonthly * 12

  return (
    <section id="roi-calculator" className="relative py-20 md:py-32 bg-[#FAFAFA] border-t border-gray-200 overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 z-[1] opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: 'radial-gradient(circle, #cecece 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-block border-2 border-[#3662E3] bg-white text-[#3662E3] shadow-[3px_3px_0px_0px_#3662E3] rounded-sm px-4 py-1.5 text-xs font-bitroad tracking-widest uppercase mb-6">
              The Sales Gap
            </span>
            <h2 className="font-serif font-normal tracking-normal text-4xl md:text-5xl text-near-black leading-[1.1]">
              How much revenue is slipping through the cracks?
            </h2>
          </div>
          <p className="font-sf text-base md:text-lg text-near-black/60 max-w-md text-left pb-2">
            The average lead goes cold in just 5 minutes. Play with the sliders to uncover exactly how much revenue you could recover by implementing instant, automated follow-ups.
          </p>
        </div>

        {/* Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Controls (Left Side) */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-8 md:gap-10">
            
            {/* Slider 1 */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <label className="font-sans font-semibold text-near-black text-sm md:text-base tracking-wide flex flex-col">
                  1. Monthly Ghosted Leads
                  <span className="text-xs font-normal text-gray-500 mt-1">Inquiries that stop replying to you</span>
                </label>
                <div className="border-2 border-near-black bg-gray-50 px-4 py-1.5 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span className="font-bitroad text-lg text-near-black">{ghostedLeads}</span>
                </div>
              </div>
              <input 
                type="range" 
                min="5" 
                max="200" 
                step="5"
                value={ghostedLeads} 
                onChange={(e) => setGhostedLeads(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-[#3662E3]"
              />
            </div>

            {/* Slider 2 */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <label className="font-sans font-semibold text-near-black text-sm md:text-base tracking-wide flex flex-col">
                  2. Average Client Value
                  <span className="text-xs font-normal text-gray-500 mt-1">Revenue per successful deal ($)</span>
                </label>
                <div className="border-2 border-near-black bg-gray-50 px-4 py-1.5 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center">
                  <span className="font-sans font-bold text-sm text-near-black mr-1">$</span>
                  <span className="font-bitroad text-lg text-near-black">{revenuePerClient.toLocaleString()}</span>
                </div>
              </div>
              <input 
                type="range" 
                min="500" 
                max="10000" 
                step="100"
                value={revenuePerClient} 
                onChange={(e) => setRevenuePerClient(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-[#3662E3]"
              />
            </div>

            {/* Slider 3 */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <label className="font-sans font-semibold text-near-black text-sm md:text-base tracking-wide flex flex-col">
                  3. AI Recovery Rate
                  <span className="text-xs font-normal text-gray-500 mt-1">Conservative % of leads saved by instant follow-up</span>
                </label>
                <div className="border-2 border-near-black bg-gray-50 px-4 py-1.5 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center">
                  <span className="font-bitroad text-lg text-near-black">{recoveryRate}</span>
                  <span className="font-sans font-bold text-sm text-near-black ml-1">%</span>
                </div>
              </div>
              <input 
                type="range" 
                min="5" 
                max="50" 
                step="5"
                value={recoveryRate} 
                onChange={(e) => setRecoveryRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-[#3662E3]"
              />
            </div>
          </div>

          {/* Results Display (Right Side) */}
          <div className="lg:col-span-5 relative group">
            {/* 3D Offset Background */}
            <div className="absolute inset-0 bg-[#095EAA] rounded-3xl translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4" />
            
            {/* Foreground Card */}
            <div className="relative h-full bg-[#3662E3] border-2 border-[#1e48b8] rounded-3xl p-8 md:p-10 flex flex-col justify-center overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none">
                 <Zap size={140} strokeWidth={1} className="text-white rotate-12" />
              </div>

              <div className="relative z-10 flex flex-col justify-between h-full space-y-12">
                <div>
                  <h4 className="font-sf text-xs md:text-sm tracking-[0.2em] text-white/80 uppercase font-medium mb-3">
                    Your Recoverable Revenue
                  </h4>
                  <div className="flex flex-col">
                    <span className="text-white font-bitroad text-[3.25rem] md:text-[4rem] leading-none drop-shadow-sm tracking-wide">
                      ${recoveredYearly.toLocaleString()}
                    </span>
                    <span className="mt-2 text-white/90 font-serif italic text-xl">unlocked every year</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5">
                  <p className="font-sf text-[15px] text-white/95 leading-relaxed mb-4">
                    This is the exact amount of capital you could add back to your bottom line every single year by deploying an automated system that texts back instantly.
                  </p>
                  
                  {/* Visual hook mapping into the next section (the contact) */}
                  <a 
                    href="#contact"
                    className="inline-flex items-center text-sm font-semibold text-white hover:text-white/80 transition-colors"
                  >
                    Tap into this revenue ↓
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
