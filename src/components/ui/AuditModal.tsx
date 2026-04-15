'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, CheckCircle2 } from 'lucide-react'
import { focusRing } from '@/lib/tokens'
import { useAuditModal } from '@/lib/AuditModalContext'

interface AuditFormData {
  name: string
  email: string
  phone: string
  website: string
  businessDesc: string
  teamSize: string
  manualTasks: string
  hoursWasted: string
  currentTools: string
}

const initialData: AuditFormData = {
  name: '',
  email: '',
  phone: '',
  website: '',
  businessDesc: '',
  teamSize: '',
  manualTasks: '',
  hoursWasted: '',
  currentTools: '',
}

export function AuditModal() {
  const { isOpen, closeModal } = useAuditModal()
  
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<AuditFormData>(initialData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Block body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    closeModal()
    setTimeout(() => {
      setStep(1)
      setFormData(initialData)
      setIsSuccess(false)
    }, 300)
  }

  const handleNext = () => setStep(step + 1)
  const handleBack = () => setStep(step - 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setIsSuccess(true)
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error(error)
      alert('Error submitting request.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: 30, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-[#0f1115] border border-[#2a2f3a] rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className={`absolute top-4 right-4 p-2 text-muted hover:text-white bg-[#1a1d24] hover:bg-[#2a2f3a] rounded-full transition-colors ${focusRing}`}
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="font-serif text-3xl text-white mb-2">Audit Requested!</h3>
                <p className="text-muted text-[15px] mb-8">
                  Our team has received your workflow data. We will carefully review your submission, build out a custom automation strategy, and send a full free proposal to your inbox shortly.
                </p>
                <button
                  onClick={handleClose}
                  className={`px-6 py-3 bg-[#1a1d24] hover:bg-[#2a2f3a] text-white rounded-xl transition-colors border border-[#2a2f3a] font-medium text-[15px] ${focusRing}`}
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="flex flex-col w-full text-left">
                {/* Progress Indicator */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex-1 h-1 bg-[#1a1d24] rounded-full overflow-hidden">
                    <div className={`h-full bg-blue-500 transition-all duration-300 ${step === 1 ? 'w-1/2' : 'w-full'}`}></div>
                  </div>
                  <span className="text-xs font-mono text-muted pl-2">Step {step}/2</span>
                </div>

                <h3 className="font-serif text-2xl text-white mb-2">
                  {step === 1 ? "Let's Get Started" : "The Core Issue"}
                </h3>
                <p className="text-sm text-muted mb-8">
                  {step === 1 ? "Help us customize our team's understanding of your business." : "Tell us exactly where you are losing time."}
                </p>

                <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} className="flex flex-col gap-5">
                  {/* STEP 1 FIELDS */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col gap-1.5">
                          <span className="text-sm font-medium text-white">Full Name *</span>
                          <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-[#1a1d24] border border-[#2a2f3a] text-white rounded-lg px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors placeholder-muted" placeholder="John Doe" />
                        </label>
                        <label className="flex flex-col gap-1.5">
                          <span className="text-sm font-medium text-white">Work Email *</span>
                          <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-[#1a1d24] border border-[#2a2f3a] text-white rounded-lg px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors placeholder-muted" placeholder="john@company.com" />
                        </label>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col gap-1.5">
                          <span className="text-sm font-medium text-white">WhatsApp / Phone *</span>
                          <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-[#1a1d24] border border-[#2a2f3a] text-white rounded-lg px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors placeholder-muted" placeholder="+1..." />
                        </label>
                        <label className="flex flex-col gap-1.5">
                          <span className="text-sm font-medium text-white">Website / Landing Page *</span>
                          <input required type="text" value={formData.website} onChange={e => setFormData({ ...formData, website: e.target.value })} className="w-full bg-[#1a1d24] border border-[#2a2f3a] text-white rounded-lg px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors placeholder-muted" placeholder="company.com" />
                        </label>
                      </div>
                      <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium text-white">What does your business do? *</span>
                        <input required type="text" value={formData.businessDesc} onChange={e => setFormData({ ...formData, businessDesc: e.target.value })} className="w-full bg-[#1a1d24] border border-[#2a2f3a] text-white rounded-lg px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors" />
                      </label>
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-white">How many people are on your team? *</span>
                        <div className="grid grid-cols-2 gap-3 mt-1">
                          {['Just me (solopreneur)', '2-5 people', '6-20 people', '20+ people'].map(size => (
                            <label key={size} className={`flex items-center gap-2 cursor-pointer p-3 rounded-lg border ${formData.teamSize === size ? 'bg-blue-500/10 border-blue-500' : 'bg-[#1a1d24] border-[#2a2f3a] hover:border-[#3a3f4a]'} transition-colors`}>
                              <input type="radio" required name="teamSize" value={size} checked={formData.teamSize === size} onChange={e => setFormData({ ...formData, teamSize: e.target.value })} className="hidden" />
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.teamSize === size ? 'border-blue-500' : 'border-gray-500'}`}>
                                {formData.teamSize === size && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                              </div>
                              <span className="text-sm text-white">{size}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2 FIELDS */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
                      <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium text-white">What tasks are you doing manually right now that feel repetitive? *</span>
                        <textarea required rows={3} value={formData.manualTasks} onChange={e => setFormData({ ...formData, manualTasks: e.target.value })} className="w-full bg-[#1a1d24] border border-[#2a2f3a] text-white rounded-lg px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors resize-none" placeholder="Data entry, emailing new leads, moving files..." />
                      </label>
                      <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium text-white">How many hours per week does this waste? *</span>
                        <input required type="text" value={formData.hoursWasted} onChange={e => setFormData({ ...formData, hoursWasted: e.target.value })} className="w-full bg-[#1a1d24] border border-[#2a2f3a] text-white rounded-lg px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="e.g. 10 hours" />
                      </label>
                      <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium text-white">What tools or software do you currently use? *</span>
                        <textarea required rows={3} value={formData.currentTools} onChange={e => setFormData({ ...formData, currentTools: e.target.value })} className="w-full bg-[#1a1d24] border border-[#2a2f3a] text-white rounded-lg px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors resize-none" placeholder="Slack, Gmail, Typeform, Excel..." />
                      </label>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center mt-6 pt-6 border-t border-[#2a2f3a]">
                    {step === 2 ? (
                      <button type="button" onClick={handleBack} className={`text-sm text-muted hover:text-white transition-colors ${focusRing}`}>
                        Back
                      </button>
                    ) : <div />}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black font-semibold text-sm rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${focusRing}`}
                    >
                      {step === 1 ? 'Next Step' : isSubmitting ? 'Submitting...' : 'View My Audit'}
                      {step === 1 && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
