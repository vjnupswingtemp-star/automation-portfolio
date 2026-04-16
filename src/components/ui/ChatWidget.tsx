'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { MessageSquare, X, Send, Bot, Maximize2, Minimize2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

type Message = {
  id: string
  text: string
  sender: 'bot' | 'user'
}

function parseButtonTag(text: string): { body: string; buttonLabel: string; buttonUrl: string } | null {
  const match = text.match(/\[BUTTON:\s*(.+?)\s*\|\s*(https?:\/\/\S+)\s*\]/i)
  if (!match) return null
  return {
    body: text.replace(match[0], '').trimEnd(),
    buttonLabel: match[1].trim(),
    buttonUrl: match[2].trim(),
  }
}

export function ChatWidget() {
  const shouldReduce = false // useReducedMotion()
  const [isOpen, setIsOpen] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Hi there! I'm the AI assistant for this portfolio. I know all about our case studies, technical stack, and services. How can I help you today?",
      sender: 'bot'
    }
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const lastSentAt = useRef<number>(0)
  const RATE_LIMIT_MS = 1500

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping, isOpen])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const now = Date.now()
    if (now - lastSentAt.current < RATE_LIMIT_MS) return
    lastSentAt.current = now

    const userMsg: Message = { id: Date.now().toString(), text: inputValue, sender: 'user' }
    setMessages(prev => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error ?? 'Unknown error')
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        sender: 'bot',
      }
      setMessages(prev => [...prev, botMsg])
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Oops, I couldn't connect to my brain. Please check your internet or try again later.",
        sender: 'bot',
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 1, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 1, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`fixed bottom-24 right-6 sm:bottom-28 sm:right-8 bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-[100] transition-[width,height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isMaximized 
                ? 'w-[calc(100vw-48px)] h-[calc(100vh-140px)] sm:w-[500px] sm:h-[700px] max-h-[85vh]' 
                : 'w-[calc(100vw-48px)] sm:w-[380px] h-[500px] max-h-[70vh]'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#5c98f8] to-[#2960e4] text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] leading-tight font-sans">Automation Assistant</h3>
                  <p className="text-white/70 text-xs font-medium uppercase tracking-wider">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="text-white/80 hover:text-white transition-colors p-1"
                  aria-label={isMaximized ? "Minimize chat" : "Maximize chat"}
                >
                  {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-1 pl-2 border-l border-white/20 ml-1"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-[#f8f9fc]">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mb-1">
                      <Bot className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-xl text-[14px] leading-[1.6] shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#3662E3] text-white rounded-br-sm'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:font-bold [&_strong]:text-black [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_li]:mb-1.5'
                    }`}
                  >
                    {(() => {
                      const parsed = msg.sender === 'bot' ? parseButtonTag(msg.text) : null
                      const rawText = parsed ? parsed.body : msg.text
                      const cleaned = rawText.replace(/\\n/g, '\n').replace(/\\\*/g, '*').replace(/(?<!\n)(\d+\.\s+\*\*)/g, '\n\n$1').replace(/(?<!\n)(-\s+\*\*)/g, '\n\n$1')

                      return (
                        <>
                          <ReactMarkdown 
                            disallowedElements={['script', 'iframe', 'object', 'embed', 'form', 'input', 'button']} 
                            unwrapDisallowed
                            components={msg.sender === 'bot' ? {
                              a: ({node, href, children, ...props}) => (
                                <a
                                  {...props}
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="my-3 flex items-center justify-center w-full px-4 py-3 bg-[#3662E3] hover:bg-[#2952cf] text-white text-[14px] font-bold rounded-xl transition-all shadow-[0_4px_14px_0_rgba(54,98,227,0.39)] hover:shadow-[0_6px_20px_rgba(54,98,227,0.23)] hover:-translate-y-[1px] active:translate-y-0 no-underline"
                                >
                                  {children}
                                </a>
                              )
                            } : {}}
                          >
                            {cleaned}
                          </ReactMarkdown>
                          {parsed && (
                            <a
                              href={parsed.buttonUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 flex items-center justify-center w-full px-4 py-3 bg-[#3662E3] hover:bg-[#2952cf] text-white text-[14px] font-bold rounded-xl transition-all shadow-[0_4px_14px_0_rgba(54,98,227,0.39)] hover:shadow-[0_6px_20px_rgba(54,98,227,0.23)] hover:-translate-y-[1px] active:translate-y-0 no-underline"
                            >
                              {parsed.buttonLabel}
                            </a>
                          )}
                        </>
                      )
                    })()}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-end gap-2 justify-start">
                   <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mb-1">
                      <Bot className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                  <div className="bg-white border border-gray-100 px-4 py-3.5 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1.5 h-[42px]">
                    <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={shouldReduce ? {} : { y: [0, -4, 0] }} transition={{ repeat: shouldReduce ? 0 : Infinity, duration: 0.6, ease: "easeInOut" }} />
                    <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={shouldReduce ? {} : { y: [0, -4, 0] }} transition={{ repeat: shouldReduce ? 0 : Infinity, duration: 0.6, ease: "easeInOut", delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={shouldReduce ? {} : { y: [0, -4, 0] }} transition={{ repeat: shouldReduce ? 0 : Infinity, duration: 0.6, ease: "easeInOut", delay: 0.4 }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form 
                onSubmit={handleSendMessage}
                className="flex items-center gap-2 bg-[#f8f9fc] p-1.5 rounded-full border border-gray-200/60 focus-within:border-[#3662E3]/40 focus-within:ring-2 focus-within:ring-[#3662E3]/10 transition-all"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  maxLength={500}
                  className="flex-1 bg-transparent border-none focus:outline-none px-4 text-sm text-gray-800 placeholder:text-gray-400 font-sans"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#3662E3] text-white hover:bg-[#2952cf] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 ml-[2px]" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-gradient-to-b from-[#5c98f8] to-[#2960e4] text-white shadow-[0_8px_20px_rgba(41,96,228,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)] border border-[#1e48b8]/40 hover:shadow-[0_12px_24px_rgba(41,96,228,0.45),inset_0_2px_4px_rgba(255,255,255,0.6)] transition-[shadow] z-[100]"
        aria-label="Open chat assistant"
      >
        {isOpen ? <X className="w-6 h-6 md:w-7 md:h-7 drop-shadow-sm" /> : <MessageSquare className="w-6 h-6 md:w-7 md:h-7 drop-shadow-sm" />}
      </motion.button>
    </>
  )
}
