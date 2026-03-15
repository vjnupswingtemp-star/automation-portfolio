# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **REQUIRED: Before building any section (Tasks 5–11), invoke `/build-section [name]` skill. This activates the 4-agent workflow (ux-architect → ui-designer → whimsy-injector → frontend-developer) and runs the validation gate. No section ships without it.**

**Goal:** Build a single long-scroll AI automation portfolio website that converts a first paying client.

**Architecture:** Next.js 14 App Router with a single `page.tsx` composing 8 section components. Shared UI primitives in `components/ui/`. All content in `lib/content.ts` so copy can be updated without touching components.

**Tech Stack:** Next.js 14, Tailwind CSS, Framer Motion, Lucide React, next/font/google (Bricolage Grotesque + Inter), next-sitemap, Vercel Analytics

---

## Chunk 1: Project Setup & Design System

### Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json` (auto-generated)
- Create: `tailwind.config.ts`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `.gitignore`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd "c:/Users/ASUS/n8n_project/Portfolio"
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --no-import-alias
```

When prompted:
- Would you like to use Turbopack? → No

- [ ] **Step 2: Install dependencies**

```bash
npm install framer-motion lucide-react next-sitemap @vercel/analytics
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```
Expected: Server running at `http://localhost:3000` with default Next.js page.

- [ ] **Step 4: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 14 project with Tailwind"
```

---

### Task 2: Configure Design System

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Create: `src/lib/tokens.ts`

- [ ] **Step 1: Configure Tailwind with design tokens**

Replace `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#FEFEFE',
        'near-black': '#111111',
        'ai-accent': '#5B5BFF',
        'y2k-yellow': '#FFE500',
        'sticker-red': '#FF6B6B',
        muted: '#AAAAAA',
        'light-gray': '#F7F7F7',
      },
      fontFamily: {
        display: ['var(--font-bricolage)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        // font-mono keeps Tailwind's default monospace stack (ui-monospace, SFMono-Regular, etc.)
      },
      lineHeight: {
        'display-tight': '1.05',
        'display-snug': '1.15',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Set up fonts and global styles**

Replace `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* scroll-smooth is applied via Tailwind class on <html> in layout.tsx */

body {
  @apply bg-base text-near-black font-body antialiased;
}

@layer utilities {
  .section-label {
    @apply font-mono text-xs text-muted uppercase tracking-widest;
  }
}
```

- [ ] **Step 3: Configure layout with fonts**

Replace `src/app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import { Inter, Bricolage_Grotesque } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  weight: ['400', '500', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'We Automate. You Grow. — AI Automation Services',
  description: 'We build n8n workflows and custom AI agents that eliminate manual work for growing businesses. Asia-based team, global clients.',
  openGraph: {
    title: 'We Automate. You Grow. — AI Automation Services',
    description: 'We build n8n workflows and custom AI agents that eliminate manual work for growing businesses.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable} scroll-smooth`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Create design token constants**

Create `src/lib/tokens.ts`:

```typescript
export const colors = {
  base: '#FEFEFE',
  nearBlack: '#111111',
  aiAccent: '#5B5BFF',
  y2kYellow: '#FFE500',
  stickerRed: '#FF6B6B',
  muted: '#AAAAAA',
  lightGray: '#F7F7F7',
} as const

// Focus ring — apply to all interactive elements
export const focusRing = 'focus:outline-none focus:ring-2 focus:ring-ai-accent focus:ring-offset-2'
```

- [ ] **Step 5: Verify fonts load correctly**

```bash
npm run dev
```
Open `http://localhost:3000` — inspect the page, confirm Bricolage Grotesque and Inter load in the Network tab.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: configure design system — tokens, fonts, Tailwind"
```

---

## Chunk 2: Shared UI Components

### Task 3: Build Shared UI Primitives

**Files:**
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/PillTag.tsx`
- Create: `src/components/ui/FloatingCTA.tsx`
- Create: `src/components/ui/index.ts`

- [ ] **Step 1: Build Y2K Badge component**

Create `src/components/ui/Badge.tsx`:

```typescript
'use client'
import { useReducedMotion, motion } from 'framer-motion'

interface BadgeProps {
  children: React.ReactNode
  rotate?: number
  color?: 'yellow' | 'red'
  floating?: boolean
}

export function Badge({ children, rotate = 0, color = 'yellow', floating = false }: BadgeProps) {
  const shouldReduce = useReducedMotion()

  const floatAnimation = !shouldReduce && floating
    ? { y: [0, -6, 0], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }
    : {}

  const colorClasses = color === 'yellow'
    ? 'bg-y2k-yellow text-near-black'
    : 'bg-sticker-red text-white'

  return (
    <motion.span
      animate={floatAnimation}
      className={`inline-block px-3 py-1 text-[10px] font-black font-mono uppercase tracking-wider rounded-sm ${colorClasses}`}
      style={{ '--badge-rotate': `${rotate}deg` } as React.CSSProperties}
      // Using CSS custom property avoids inline transform while supporting arbitrary rotation values
      // Apply via: className="[transform:rotate(var(--badge-rotate))]"
    >
      <span className="[transform:rotate(var(--badge-rotate))] inline-block">
        {children}
      </span>
    </motion.span>
  )
}
```

- [ ] **Step 2: Build PillTag component**

Create `src/components/ui/PillTag.tsx`:

```typescript
interface PillTagProps {
  children: React.ReactNode
  variant?: 'default' | 'accent'
}

export function PillTag({ children, variant = 'default' }: PillTagProps) {
  const classes = variant === 'accent'
    ? 'border border-ai-accent text-ai-accent'
    : 'border border-gray-200 text-muted'

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-mono ${classes}`}>
      {children}
    </span>
  )
}
```

- [ ] **Step 3: Build mobile FloatingCTA**

Create `src/components/ui/FloatingCTA.tsx`:

```typescript
'use client'
import { focusRing } from '@/lib/tokens'
import { meta } from '@/lib/content'

export function FloatingCTA() {
  return (
    <a
      href={`mailto:${meta.email}`}
      className={`
        fixed bottom-6 right-6 z-50
        md:hidden
        bg-near-black text-white
        px-5 py-3 rounded-sm
        text-sm font-black font-mono uppercase tracking-wider
        shadow-lg
        ${focusRing}
      `}
    >
      Hire Us →
    </a>
  )
}
```

- [ ] **Step 4: Create barrel export**

Create `src/components/ui/index.ts`:

```typescript
export { Badge } from './Badge'
export { PillTag } from './PillTag'
export { FloatingCTA } from './FloatingCTA'
```

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add shared UI primitives — Badge, PillTag, FloatingCTA"
```

---

### Task 4: Set Up Content File

**Files:**
- Create: `src/lib/content.ts`

- [ ] **Step 1: Create content constants**

Create `src/lib/content.ts`:

```typescript
// All user-facing copy lives here.
// Update this file with real content before launch.

export const meta = {
  email: 'hello@example.com', // ← Replace with real email
  calendlyUrl: '', // ← Optional: add Calendly URL
}

export const hero = {
  label: 'AI Workflow Automation · AI Agents · Chatbots',
  headline: 'We build AI workflows that give your business back its time.',
  accentWord: 'workflows', // This word gets italic + AI accent color
  tagline: 'We Automate. You Grow.',
  cta: { primary: 'See Our Work', secondary: "Let's Talk" },
  socialProof: '✓ Real workflows · Real results · One happy client',
  badges: [
    { text: '✦ AI SPECIALIST', rotate: 6, color: 'yellow' as const },
    { text: 'n8n EXPERT', rotate: -3, color: 'red' as const },
  ],
}

export const techStack = {
  label: 'Tools We Work With',
  tools: [
    { name: 'n8n', logo: '/logos/n8n.svg' },
    { name: 'OpenAI', logo: '/logos/openai.svg' },
    { name: 'Anthropic', logo: '/logos/anthropic.svg' },
    { name: 'WhatsApp', logo: '/logos/whatsapp.svg' },
    { name: 'Telegram', logo: '/logos/telegram.svg' },
    { name: 'Google Workspace', logo: '/logos/google-workspace.svg' },
    { name: 'Slack', logo: '/logos/slack.svg' },
  ],
}

export const services = {
  label: 'What We Do',
  items: [
    {
      icon: 'Workflow', // Lucide icon name
      title: 'n8n Workflow Automation',
      description: 'We connect your tools and eliminate the manual work slowing your team down. Workflows run 24/7 so you don\'t have to.',
      outcomes: [
        'Connect any tool with an API',
        'Eliminate repetitive manual tasks',
        'Run processes on autopilot',
      ],
    },
    {
      icon: 'Bot', // Lucide icon name
      title: 'Custom AI Agents & Chatbots',
      description: 'We build AI that works inside your business — trained on your data, integrated into your systems, available around the clock.',
      outcomes: [
        'AI trained on your business context',
        'Integrated into WhatsApp, Slack, web',
        'Handles inquiries without human input',
      ],
    },
  ],
}

export const caseStudy = {
  label: 'Our Work',
  title: 'Project Title', // ← Replace with real project name
  industry: 'Industry', // ← Replace with real industry
  problem: 'Describe the problem the client had.', // ← Replace
  solution: 'Describe what you built and how.', // ← Replace
  result: 'Describe the outcome.', // ← Replace
  tools: ['n8n', 'OpenAI', 'Webhooks'], // ← Replace with real tools
}

export const testimonial = {
  quote: 'Replace this with the real client testimonial quote.',
  author: 'Client Name',
  role: 'Role, Company',
}

export const about = {
  label: 'Who We Are',
  bio: 'We are a small team of AI automation specialists who believe that the best technology should feel invisible. We build workflows and agents that just work — so you can focus on what matters.',
  skills: ['n8n', 'OpenAI', 'Anthropic', 'AI Agents', 'Chatbots', 'API Integrations', 'Workflow Automation'],
  teamPhoto: '/team.jpg', // ← Replace with real photo path
}

export const contact = {
  badge: 'LET\'S BUILD',
  headline: 'Ready to automate your business?',
  subtext: 'Book a free discovery call or send us a message.',
  cta: 'Get in Touch →',
}
```

- [ ] **Step 2: Commit**

```bash
git add .
git commit -m "feat: add content file with all copy — replace placeholders before launch"
```

---

## Chunk 3: Navigation & Hero

### Task 5: Build Navigation — `/build-section nav`

> **REQUIRED: Run `/build-section nav` before writing any code in this task.**

**Files:**
- Create: `src/components/layout/Nav.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Run build-section skill**

```
/build-section nav
```

Follow the 4-agent workflow. Complete all steps before proceeding.

- [ ] **Step 2: Build Nav component**

Create `src/components/layout/Nav.tsx`:

```typescript
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
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className={`font-body font-black text-sm text-near-black tracking-tight ${focusRing}`}>
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
```

- [ ] **Step 3: Verify nav renders and scroll behavior works**

```bash
npm run dev
```
Check: transparent at top, white background after scrolling, hamburger on mobile (resize browser < 768px).

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add sticky Nav with scroll behavior and mobile hamburger"
```

---

### Task 6: Build Hero Section — `/build-section hero`

> **REQUIRED: Run `/build-section hero` before writing any code in this task.**

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Run build-section skill**

```
/build-section hero
```

- [ ] **Step 2: Build Hero component**

Create `src/components/sections/Hero.tsx`:

```typescript
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { Badge } from '@/components/ui'
import { hero, meta } from '@/lib/content'
import { focusRing } from '@/lib/tokens'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

export function Hero() {
  const shouldReduce = useReducedMotion()

  // Split headline to find accent word
  const words = hero.headline.split(' ')
  const accentIndex = words.findIndex(w =>
    w.toLowerCase().includes(hero.accentWord.toLowerCase())
  )

  return (
    <section className="relative min-h-screen flex items-center pt-16 pb-24 px-6 overflow-hidden">
      {/* Y2K sky gradient hint */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-blue-100/40 to-transparent pointer-events-none" />

      {/* Floating Y2K badges */}
      <div className="absolute top-24 right-8 md:right-16 flex flex-col gap-3 z-10">
        {hero.badges.map((badge, i) => (
          <Badge
            key={i}
            rotate={badge.rotate}
            color={badge.color}
            floating={!shouldReduce}
          >
            {badge.text}
          </Badge>
        ))}
      </div>

      <div className="max-w-6xl mx-auto w-full">
        {/* Label */}
        <motion.p
          custom={0}
          initial={shouldReduce ? 'visible' : 'hidden'}
          animate="visible"
          variants={fadeUp}
          className="section-label mb-6"
        >
          {hero.label}
        </motion.p>

        {/* Headline */}
        <motion.h1
          custom={1}
          initial={shouldReduce ? 'visible' : 'hidden'}
          animate="visible"
          variants={fadeUp}
          className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-tight text-near-black mb-4 max-w-3xl"
        >
          {words.map((word, i) => (
            <span key={i}>
              {i === accentIndex ? (
                <em className="italic text-ai-accent">{word}</em>
              ) : word}{' '}
            </span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          custom={2}
          initial={shouldReduce ? 'visible' : 'hidden'}
          animate="visible"
          variants={fadeUp}
          className="font-display font-bold text-xl text-muted mb-8"
        >
          {hero.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          initial={shouldReduce ? 'visible' : 'hidden'}
          animate="visible"
          variants={fadeUp}
          className="flex flex-wrap gap-4 mb-8"
        >
          <a
            href="#work"
            className={`bg-near-black text-white font-black font-mono text-sm uppercase tracking-wider px-6 py-3 rounded-sm hover:bg-ai-accent transition-colors ${focusRing}`}
          >
            {hero.cta.primary} ↓
          </a>
          <a
            href={`mailto:${meta.email}`}
            className={`border border-gray-300 text-near-black font-mono text-sm px-6 py-3 rounded-sm hover:border-near-black transition-colors ${focusRing}`}
          >
            {hero.cta.secondary}
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.p
          custom={4}
          initial={shouldReduce ? 'visible' : 'hidden'}
          animate="visible"
          variants={fadeUp}
          className="text-xs text-muted font-mono"
        >
          {hero.socialProof}
        </motion.p>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Wire up page.tsx**

Replace `src/app/page.tsx`:

```typescript
import { Nav } from '@/components/layout/Nav'
import { Hero } from '@/components/sections/Hero'
import { FloatingCTA } from '@/components/ui'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {/* Remaining sections added in subsequent tasks */}
      </main>
      <FloatingCTA />
    </>
  )
}
```

- [ ] **Step 4: Verify hero renders**

```bash
npm run dev
```
Check: headline renders, accent word is purple/blue, badges float, CTAs are clickable, Y2K sky gradient is visible.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add Hero section with Y2K badges and animated entrance"
```

---

## Chunk 4: Tech Stack & Services

### Task 7: Build Tech Stack Strip — `/build-section tech-stack`

> **REQUIRED: Run `/build-section tech-stack` before writing any code.**

**Files:**
- Create: `src/components/sections/TechStack.tsx`
- Create: `public/logos/` (placeholder SVGs)

- [ ] **Step 1: Run build-section skill**

```
/build-section tech-stack
```

- [ ] **Step 2: Add placeholder logo files and team photo**

```bash
mkdir -p "c:/Users/ASUS/n8n_project/Portfolio/public/logos"
# Create a placeholder team photo so About section doesn't throw during development
curl -o "c:/Users/ASUS/n8n_project/Portfolio/public/team.jpg" "https://placehold.co/80x80/e0e0e0/888888.jpg" 2>/dev/null || echo "placeholder team.jpg — replace before launch"
```

Download official SVG logos from each tool's brand kit into `public/logos/`:
- n8n: https://n8n.io/brand/
- OpenAI: https://openai.com/brand/
- Anthropic: brand assets page
- WhatsApp, Telegram, Google Workspace, Slack: official brand pages

> **Legal note:** Confirm logo usage rights before public launch. Most allow usage when displaying tool integrations.

- [ ] **Step 3: Build TechStack component**

Create `src/components/sections/TechStack.tsx`:

```typescript
import Image from 'next/image'
import { techStack } from '@/lib/content'

export function TechStack() {
  return (
    <section className="bg-light-gray py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="section-label text-center mb-8">{techStack.label}</p>
        <div className="flex items-center gap-10 overflow-x-auto pb-2 justify-start md:justify-center">
          {techStack.tools.map((tool) => (
            <div
              key={tool.name}
              className="flex-shrink-0 grayscale opacity-50 hover:opacity-80 hover:grayscale-0 transition-all duration-200"
            >
              <Image
                src={tool.logo}
                alt={tool.name}
                width={80}
                height={32}
                className="h-7 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Add to page.tsx**

```typescript
import { TechStack } from '@/components/sections/TechStack'
// Add <TechStack /> after <Hero />
```

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add TechStack strip with logo row"
```

---

### Task 8: Build Services Section — `/build-section services`

> **REQUIRED: Run `/build-section services` before writing any code.**

**Files:**
- Create: `src/components/sections/Services.tsx`

- [ ] **Step 1: Run build-section skill**

```
/build-section services
```

- [ ] **Step 2: Build Services component**

Create `src/components/sections/Services.tsx`:

```typescript
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { Workflow, Bot } from 'lucide-react'
import { services } from '@/lib/content'

const iconMap: Record<string, React.ElementType> = {
  Workflow,
  Bot,
}

export function Services() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="section-label mb-12">{services.label}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.items.map((service, i) => {
            const Icon = iconMap[service.icon]
            if (!Icon) return null // Guard: prevents crash if icon name is missing from iconMap
            return (
              <motion.div
                key={service.title}
                initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={shouldReduce ? { duration: 0 } : { delay: i * 0.1, duration: 0.5 }}
                className="bg-base border border-gray-100 rounded-xl p-8 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <Icon className="text-ai-accent mb-5" size={28} strokeWidth={1.5} />
                <h3 className="font-display font-black text-xl text-near-black mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-5">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2 text-sm text-near-black font-mono">
                      <span className="text-ai-accent mt-0.5">✦</span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add to page.tsx**

```typescript
import { Services } from '@/components/sections/Services'
// Add <Services /> after <TechStack />
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add Services section with two animated cards"
```

---

## Chunk 5: Case Study & Testimonial

### Task 9: Build Case Study — `/build-section case-study`

> **REQUIRED: Run `/build-section case-study` before writing any code.**

**Files:**
- Create: `src/components/sections/CaseStudy.tsx`

- [ ] **Step 1: Run build-section skill**

```
/build-section case-study
```

- [ ] **Step 2: Build CaseStudy component**

Create `src/components/sections/CaseStudy.tsx`:

```typescript
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { PillTag } from '@/components/ui'
import { caseStudy } from '@/lib/content'

export function CaseStudy() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-light-gray py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="section-label mb-12">{caseStudy.label}</p>
        <motion.div
          initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-base rounded-xl p-8 md:p-12 border border-gray-100"
        >
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <div>
              <h3 className="font-display font-black text-2xl md:text-3xl text-near-black mb-1">
                {caseStudy.title}
              </h3>
              <p className="section-label">{caseStudy.industry}</p>
            </div>
          </div>

          {/* Problem / Solution / Result */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              { label: 'Problem', content: caseStudy.problem },
              { label: 'What We Built', content: caseStudy.solution },
              { label: 'Result', content: caseStudy.result },
            ].map(({ label, content }) => (
              <div key={label}>
                <p className="section-label mb-2">{label}</p>
                <p className="text-sm text-near-black leading-relaxed">{content}</p>
              </div>
            ))}
          </div>

          {/* Tools */}
          <div className="flex flex-wrap gap-2">
            {caseStudy.tools.map((tool) => (
              <PillTag key={tool}>{tool}</PillTag>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add to page.tsx and commit**

```bash
git add .
git commit -m "feat: add CaseStudy section — editorial layout with problem/solution/result"
```

---

### Task 10: Build Testimonial — `/build-section testimonial`

> **REQUIRED: Run `/build-section testimonial` before writing any code.**

**Files:**
- Create: `src/components/sections/Testimonial.tsx`

- [ ] **Step 1: Run build-section skill**

```
/build-section testimonial
```

- [ ] **Step 2: Build Testimonial component**

Create `src/components/sections/Testimonial.tsx`:

```typescript
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { testimonial } from '@/lib/content'

export function Testimonial() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Y2K quotation mark */}
          <span className="font-display font-black text-8xl text-y2k-yellow leading-none block mb-4">
            "
          </span>
          <blockquote className="font-display font-bold text-xl md:text-2xl text-near-black italic leading-snug mb-8">
            {testimonial.quote}
          </blockquote>
          <div>
            <p className="font-mono font-black text-sm text-near-black uppercase tracking-wider">
              {testimonial.author}
            </p>
            <p className="text-sm text-muted mt-1">{testimonial.role}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add to page.tsx and commit**

```bash
git add .
git commit -m "feat: add Testimonial section with Y2K quotation accent"
```

---

## Chunk 6: About & Contact

### Task 11: Build About Section — `/build-section about`

> **REQUIRED: Run `/build-section about` before writing any code.**

**Files:**
- Create: `src/components/sections/About.tsx`

- [ ] **Step 1: Run build-section skill**

```
/build-section about
```

- [ ] **Step 2: Build About component**

Create `src/components/sections/About.tsx`:

```typescript
'use client'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { PillTag } from '@/components/ui'
import { about } from '@/lib/content'

export function About() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="about" className="bg-light-gray py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="section-label mb-12">{about.label}</p>
        <motion.div
          initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-10 items-start"
        >
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src={about.teamPhoto}
                alt="Team photo"
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Bio + skills */}
          <div>
            <p className="text-base text-near-black leading-relaxed mb-6 max-w-xl">
              {about.bio}
            </p>
            <div className="flex flex-wrap gap-2">
              {about.skills.map((skill) => (
                <PillTag key={skill}>{skill}</PillTag>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add to page.tsx and commit**

```bash
git add .
git commit -m "feat: add About section with team photo and skill pills"
```

---

### Task 12: Build Contact/CTA — `/build-section contact`

> **REQUIRED: Run `/build-section contact` before writing any code.**

**Files:**
- Create: `src/components/sections/Contact.tsx`

- [ ] **Step 1: Run build-section skill**

```
/build-section contact
```

- [ ] **Step 2: Build Contact component**

Create `src/components/sections/Contact.tsx`:

```typescript
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { Badge } from '@/components/ui'
import { contact, meta } from '@/lib/content'
import { focusRing } from '@/lib/tokens'

export function Contact() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="contact" className="bg-near-black py-24 px-6 relative overflow-hidden">
      <motion.div
        initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        {/* Y2K badge */}
        <div className="inline-block mb-8">
          <Badge rotate={-5} color="yellow" floating={!shouldReduce}>
            <Zap size={10} className="inline mr-1" />
            {contact.badge}
          </Badge>
        </div>

        <h2 className="font-display font-black text-4xl md:text-5xl text-white leading-tight mb-4">
          {contact.headline}
        </h2>
        <p className="text-muted text-sm mb-10 font-mono">{contact.subtext}</p>

        <a
          href={`mailto:${meta.email}`}
          className={`inline-block bg-y2k-yellow text-near-black font-black font-mono text-sm uppercase tracking-wider px-8 py-4 rounded-sm hover:bg-white transition-colors ${focusRing}`}
        >
          {contact.cta}
        </a>

        {meta.calendlyUrl && (
          <p className="mt-4">
            <a
              href={meta.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-muted text-sm hover:text-white transition-colors font-mono ${focusRing}`}
            >
              Or book a free call →
            </a>
          </p>
        )}
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 3: Add to page.tsx — wire up all sections**

Replace `src/app/page.tsx` with the complete version:

```typescript
import { Nav } from '@/components/layout/Nav'
import { Hero } from '@/components/sections/Hero'
import { TechStack } from '@/components/sections/TechStack'
import { Services } from '@/components/sections/Services'
import { CaseStudy } from '@/components/sections/CaseStudy'
import { Testimonial } from '@/components/sections/Testimonial'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { FloatingCTA } from '@/components/ui'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TechStack />
        <Services />
        <CaseStudy />
        <Testimonial />
        <About />
        <Contact />
      </main>
      <FloatingCTA />
    </>
  )
}
```

- [ ] **Step 4: Verify full page renders end-to-end**

```bash
npm run dev
```
Scroll through all sections. Check: correct order, no layout breaks, mobile responsive.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add Contact CTA section — complete page wired up"
```

---

## Chunk 7: SEO, Sitemap & Deployment

### Task 13: SEO, Sitemap & Favicon

**Files:**
- Create: `next-sitemap.config.js`
- Create: `public/favicon.svg`
- Modify: `package.json` (postbuild script)

- [ ] **Step 1: Configure next-sitemap**

Create `next-sitemap.config.js`:

```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://your-domain.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}
```

- [ ] **Step 2: Add postbuild script to package.json**

```json
"scripts": {
  "build": "next build",
  "postbuild": "next-sitemap"
}
```

- [ ] **Step 3: Add favicon placeholder**

Create a minimal SVG favicon at `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="4" fill="#111111"/>
  <text x="16" y="22" font-family="sans-serif" font-size="18" font-weight="900" fill="#FFE500" text-anchor="middle">✦</text>
</svg>
```

Replace the full `metadata` export in `src/app/layout.tsx` with this complete version (merges icons with existing SEO fields):

```typescript
export const metadata: Metadata = {
  title: 'We Automate. You Grow. — AI Automation Services',
  description: 'We build n8n workflows and custom AI agents that eliminate manual work for growing businesses. Asia-based team, global clients.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'We Automate. You Grow. — AI Automation Services',
    description: 'We build n8n workflows and custom AI agents that eliminate manual work for growing businesses.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}
```

- [ ] **Step 4: Run build and verify**

```bash
npm run build
```
Expected: Build succeeds, `public/sitemap.xml` and `public/robots.txt` generated.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add sitemap, robots.txt, and favicon"
```

---

### Task 14: Deploy to Vercel

**Files:**
- Create: `.env.example`

- [ ] **Step 1: Create environment example**

Create `.env.example`:

```
SITE_URL=https://your-domain.vercel.app
```

- [ ] **Step 2: Push to GitHub**

```bash
git remote add origin https://github.com/[your-username]/portfolio.git
git push -u origin main
```

- [ ] **Step 3: Deploy on Vercel**

1. Go to vercel.com → New Project
2. Import your GitHub repository
3. Framework: Next.js (auto-detected)
4. Add environment variable: `SITE_URL` = your Vercel URL
5. Deploy

- [ ] **Step 4: Run Lighthouse audit**

After deploy, open Chrome DevTools → Lighthouse on the live URL.
Target: 90+ on Performance, Accessibility, SEO.

Fix any issues before sharing with clients.

- [ ] **Step 5: Replace all placeholder content**

Update `src/lib/content.ts`:
- [ ] Real email address
- [ ] Real case study details
- [ ] Real testimonial quote
- [ ] Real team bio and photo
- [ ] Real OG image at `public/og-image.png` (1200×630px)

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "feat: deploy-ready — replace placeholders with real content"
```

---

## File Map Summary

```
Portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Fonts, metadata, Analytics
│   │   ├── page.tsx            # Composes all sections
│   │   └── globals.css         # Tailwind + scroll-smooth
│   ├── components/
│   │   ├── layout/
│   │   │   └── Nav.tsx         # Sticky nav + mobile hamburger
│   │   ├── sections/
│   │   │   ├── Hero.tsx        # Hero with Y2K badges
│   │   │   ├── TechStack.tsx   # Logo strip
│   │   │   ├── Services.tsx    # Two service cards
│   │   │   ├── CaseStudy.tsx   # Featured project
│   │   │   ├── Testimonial.tsx # Single client quote
│   │   │   ├── About.tsx       # Team bio + skills
│   │   │   └── Contact.tsx     # Dark CTA section
│   │   └── ui/
│   │       ├── Badge.tsx       # Y2K rotating badge
│   │       ├── PillTag.tsx     # Skill/tech pill
│   │       ├── FloatingCTA.tsx # Mobile sticky CTA
│   │       └── index.ts        # Barrel export
│   └── lib/
│       ├── content.ts          # All copy — edit before launch
│       └── tokens.ts           # Color constants, focusRing
├── public/
│   ├── logos/                  # Tech stack SVGs
│   ├── og-image.png            # 1200×630 OG image
│   ├── favicon.svg             # ✦ favicon
│   └── team.jpg                # Team photo
├── next-sitemap.config.js
├── tailwind.config.ts
└── CLAUDE.md
```
