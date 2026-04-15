'use client'
import { CheckCircle2 } from 'lucide-react'

export function Pricing() {
  const packages = [
    {
      name: 'Basic',
      badge: 'Getting Started',
      price: '1,500',
      priceRange: '– $2,500',
      description: 'We completely automate your biggest manual time-waster. Perfect if you have one clear problem you want solved right now.',
      features: ['3–5 days delivery', '1 round of revisions', '30 days free fixes', 'Solopreneurs & small businesses'],
    },
    {
      name: 'Standard',
      badge: 'Most Popular',
      price: '5,000',
      priceRange: '– $10,000',
      description: 'We connect your tools and build a system where everything talks to each other automatically. Multiple areas of your business handled at once.',
      features: ['1–2 weeks delivery', '2 rounds of revisions', '60 days free fixes', 'Growing businesses & agencies'],
    },
    {
      name: 'Advanced',
      badge: 'Full Operation',
      price: '12,000',
      priceRange: '– $25,000',
      description: 'We rebuild your backend with AI-powered decision making. Your team stops managing processes and focuses on growth.',
      features: ['2–4 weeks delivery', '3 rounds of revisions', '90 days free fixes', 'Established businesses'],
    },
    {
      name: 'Custom',
      badge: 'Enterprise',
      price: '25,000+',
      priceRange: '',
      description: 'We design and build everything from scratch around how your business specifically works. Fully bespoke, fully managed — nothing off the shelf.',
      features: ['4–8 weeks delivery', 'Unlimited revisions', '120 days free fixes', 'Complex multi-dept companies'],
    },
  ]

  const retainers = [
    {
      name: 'Essential',
      for: 'For Basic clients',
      price: '300',
      period: '/ month',
      description: 'Your automations stay running, monitored, and up to date. If anything breaks or needs adjusting, we handle it before you notice.',
    },
    {
      name: 'Growth',
      for: 'For Standard clients',
      price: '750',
      period: '/ month',
      description: 'Everything in Essential, plus one improvement or addition to your system every month. Priority response within 24 hours guaranteed.',
    },
    {
      name: 'Partner',
      for: 'For Advanced & Enterprise',
      price: '1,500',
      period: '/ month',
      description: 'Full ongoing management plus two new automations built every month. We act as your dedicated automation team with a weekly check-in call.',
    },
  ]

  const whyItWorks = [
    {
      title: 'You own nothing technical.',
      description: 'No servers to manage, no software to maintain. We handle everything — you just use the results.',
    },
    {
      title: 'Built once, runs forever.',
      description: 'Once delivered, your system runs tirelessly 24/7. It requires no days off, never gets tired, and makes zero errors.',
    },
    {
      title: 'Your retainer keeps it healthy.',
      description: 'As tools update and your business grows, your system stays current. We proactively fix issues before you notice them.',
    },
  ]

  return (
    <section id="pricing" className="relative py-20 md:py-32 bg-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col items-start w-full">
          <div className="mb-8 md:mb-12 flex">
             <span className="inline-block border-2 border-[#3662E3] bg-white text-[#3662E3] shadow-[4px_4px_0px_0px_#3662E3] rounded-sm px-4 py-1.5 text-xs font-bitroad tracking-widest uppercase relative -left-1">
               Pricing Guide
             </span>
          </div>
          <h2 className="font-serif font-normal tracking-normal text-5xl md:text-6xl text-near-black leading-[1.1] mb-6">
            AI Automation Services
          </h2>
          <p className="font-sf text-base md:text-xl text-near-black/60 max-w-2xl text-left">
            All prices in USD. Fully managed by us — you focus on your business.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, i) => (
              <div 
                key={i} 
                className="relative flex flex-col bg-[#FAFAFA] rounded-[32px] p-8 border border-gray-100 transition-colors duration-300 hover:bg-[#3662E3] group hover:border-[#3662E3] hover:shadow-xl hover:-translate-y-1"
              >
                {/* Y2K Badge at Top */}
                {pkg.badge && (
                  <div className="mb-6 flex justify-start">
                    <span className="inline-block bg-[#F3F4F6] border border-gray-300 text-near-black shadow-[inset_1px_1px_0px_0px_rgba(255,255,255,1),inset_-1px_-1px_0px_0px_rgba(0,0,0,0.1)] group-hover:bg-[#1e48b8] group-hover:border-[#1e48b8] group-hover:text-white group-hover:shadow-[inset_1px_1px_0px_0px_rgba(255,255,255,0.2),inset_-1px_-1px_0px_0px_rgba(0,0,0,0.3)] rounded px-3 py-1 text-[10px] font-sans font-bold tracking-widest uppercase mb-2 transition-all duration-300">
                      {pkg.badge}
                    </span>
                  </div>
                )}

                {/* Title & Description */}
                <div className="mb-8">
                  <div className="flex mb-3">
                    <h4 className="font-serif font-semibold text-2xl sm:text-[28px] text-near-black group-hover:text-white transition-colors duration-300">{pkg.name}</h4>
                  </div>
                  <p className="font-sf font-light text-gray-600 group-hover:text-blue-100 text-[15px] leading-[1.65] min-h-[84px] transition-colors duration-300">
                    {pkg.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-start">
                    <span className="font-sans font-medium text-lg text-near-black group-hover:text-blue-100 mt-1 mr-1.5 transition-colors duration-300">$</span>
                    <span 
                      className="font-bitroad text-[3.5rem] leading-none tracking-wide text-[#3662E3] group-hover:text-white transition-colors duration-300"
                    >
                      {pkg.price}
                    </span>
                  </div>
                  <span className="block text-near-black/50 group-hover:text-white/70 font-sf text-sm mt-2 transition-colors duration-300">
                    {pkg.priceRange ? `${pkg.priceRange} +` : 'Fully Custom'}
                  </span>
                </div>

                <div className="mt-auto">
                  {/* Divider */}
                  <div className="w-full h-px bg-gray-200/60 group-hover:bg-white/20 mb-8 transition-colors duration-300" />

                  {/* Features */}
                  <ul className="space-y-4 relative z-10">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="flex items-start">
                        <CheckCircle2 size={18} strokeWidth={2.5} className="text-[#10B981] group-hover:text-[#41B853] shrink-0 mt-0.5 mr-3 transition-colors duration-300" />
                        <span className="font-sf text-[14.5px] text-near-black/80 group-hover:text-white/95 leading-snug transition-colors duration-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Retainers Grid */}
        <div className="mb-24">
          <div className="mb-8 ml-2 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h3 className="font-sf text-sm font-bold tracking-widest text-near-black/40 uppercase mb-2">
                Monthly Retainers
              </h3>
              <p className="font-sf text-base text-near-black/60">
                Add-on to any package · We manage everything — you never touch the system
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {retainers.map((retainer, i) => (
              <div 
                key={i} 
                className="relative bg-[#FAFAFA] border border-gray-100 rounded-[32px] p-8 flex flex-col justify-between group hover:bg-[#3662E3] hover:border-[#3662E3] transition-colors duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative z-10">
                  <span className="inline-block bg-[#F3F4F6] group-hover:bg-[#1e48b8] group-hover:border-[#1e48b8] group-hover:text-white group-hover:shadow-[inset_1px_1px_0px_0px_rgba(255,255,255,0.2),inset_-1px_-1px_0px_0px_rgba(0,0,0,0.3)] border border-gray-300 text-near-black shadow-[inset_1px_1px_0px_0px_rgba(255,255,255,1),inset_-1px_-1px_0px_0px_rgba(0,0,0,0.1)] rounded px-3 py-1 text-[10px] font-sans font-bold tracking-widest uppercase mb-5 transition-all duration-300">
                    {retainer.for}
                  </span>

                  <h4 className="font-serif font-semibold text-2xl sm:text-[28px] text-near-black group-hover:text-white transition-colors duration-300 mb-3">{retainer.name}</h4>
                  
                  <div className="flex items-start mb-6">
                    <span className="font-sans font-medium text-lg text-near-black group-hover:text-blue-100 transition-colors duration-300 mt-1 mr-1.5">$</span>
                    <span className="font-bitroad text-[3rem] leading-none tracking-wide text-[#3662E3] group-hover:text-white transition-colors duration-300">
                      {retainer.price}
                    </span>
                    <span className="text-gray-500 group-hover:text-blue-200/80 transition-colors duration-300 font-sans font-medium text-sm ml-2 self-end mb-1">
                      {retainer.period}
                    </span>
                  </div>

                  <p className="font-sf font-light text-gray-600 group-hover:text-blue-100 transition-colors duration-300 text-[15px] leading-[1.65]">
                    {retainer.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why It Works Section */}
        <div>
          <h3 className="font-sf text-sm font-bold tracking-widest text-near-black/40 uppercase mb-8 ml-2">
            Why It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-x-16 pt-8 border-t border-gray-200">
            {whyItWorks.map((item, i) => (
              <div 
                key={i} 
                className="relative group"
              >
                <div className="font-bitroad text-[#EEF2FC] group-hover:text-[#3662E3] transition-colors duration-300 text-[60px] leading-none mb-4 -ml-1">
                  0{i + 1}
                </div>
                <h4 className="font-serif font-semibold text-2xl text-near-black mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  {item.title}
                </h4>
                <p className="font-sf font-light text-[15px] text-gray-600 leading-[1.65]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  )
}
