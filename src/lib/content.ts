// All user-facing copy lives here.
// Update this file with real content before launch.

export const meta = {
  email: 'hello@example.com', // ← Replace with real email
  calendlyUrl: '', // ← Optional: add Calendly URL
}

export const hero = {
  label: 'Workflow Setup · Tool Connectivity · Bots',
  headline: 'We build digital systems that give you your time back.',
  accentWord: 'time', 
  tagline: 'Stop losing hours to operational bottlenecks and repetitive admin. We build intelligent automation systems so you can focus on scaling your business.',
  cta: { primary: 'See How We Help', secondary: "Let's Talk" },
  socialProofStats: [
    { value: '100%', label: 'Custom Tailored Systems' },
    { value: '0', label: 'Technical Jargon' },
    { value: '1:1', label: 'Direct Founder Support' },
    { value: '24/7', label: 'Automated Operations' },
  ],
  badges: [
    { text: '✦ AUTOMATION EXPERT', rotate: 6, color: 'yellow' as const },
    { text: 'SYSTEM BUILDER', rotate: -3, color: 'red' as const },
  ],
}

export const techStack = {
  label: 'Our Toolbox',
  headline: 'The reliable software that works silently in the background.',
  tools: [
    { 
      name: 'Notion', 
      logo: '/logos/transparent_notion.png', 
      desc: 'A digital workspace where your computer automatically organizes all your important docs, notes, and tasks.',
      bg: 'bg-[#F9F9F9]', // Subtle light gray
      span: 'md:col-span-1'
    },
    { 
      name: 'Airtable', 
      logo: '/logos/transparent_airtable.png', 
      desc: 'A smart, super-powered spreadsheet that keeps your whole team organized automatically.',
      bg: 'bg-[#F0F6FF]', // Soft blue
      span: 'md:col-span-1'
    },
    { 
      name: 'WhatsApp & Telegram', 
      logo: '/logos/transparent_whatsapp_telegram.png', 
      desc: 'We build bots that text your customers back instantly, day or night.',
      bg: 'bg-white',
      span: 'md:col-span-1'
    },
    { 
      name: 'Google Workspace', 
      logo: '/logos/transparent_google-workspace.png', 
      desc: 'We make your Google Docs and Sheets update themselves without you lifting a finger.',
      bg: 'bg-white',
      span: 'md:col-span-1'
    },
    { 
      name: 'Slack', 
      logo: '/logos/transparent_slack.png', 
      desc: 'We automatically send important updates straight to your team chat.',
      bg: 'bg-[#F8F5FF]', // Soft purple
      span: 'md:col-span-1'
    },
    { 
      name: 'Webhooks', 
      logo: '/logos/transparent_webhook.png', 
      desc: 'The secret technical wiring that connects any piece of software in the world.',
      bg: 'bg-gray-50',
      span: 'md:col-span-1'
    },
  ],
  stats: [
    { value: '100%', label: 'Custom Built', subtext: 'Made Just For You' },
    { value: '24/7', label: 'Systems Running', subtext: 'It Never Sleeps' },
    { value: '200+', label: 'Apps Connected', subtext: 'We Hook Into Anything' },
  ]
}

export const services = {
  badge: 'What we do',
  title: 'Three programs.',
  titleEm: 'All run by themselves.',
  window: 'programs — what we do',
  items: [
    {
      fn: 'connect.exe',
      icon: 'Workflow',
      title: 'Connecting your apps',
      description: 'Your software passes data along by itself. No more copy and paste between tools.',
      outcomes: ['Works with tools you already use', 'No typing data in by hand', 'Daily tasks on autopilot'],
    },
    {
      fn: 'assistant.exe',
      icon: 'Bot',
      title: 'Custom support bots',
      description: 'A digital assistant on your website or WhatsApp that answers customers day and night.',
      outcomes: ['Taught how your business works', 'Lives in your own channels', 'Answers without human help'],
    },
    {
      fn: 'wildcard.exe',
      icon: 'Settings',
      title: 'Bespoke automations',
      description: 'A weird, unique or tangled process? We build the custom logic around how you really work.',
      outcomes: ['Built for your edge case', 'Connects unpopular software too', 'A technical partner on call'],
    },
  ] as { fn: string; icon: 'Workflow' | 'Bot' | 'Settings'; title: string; description: string; outcomes: string[] }[],
}

export const caseStudies = [
  {
    label: 'Our Work',
    title: 'Automated Student Enrollment',
    industry: 'Education',
    problem: 'Staff members were wasting hours manually typing new student enrollments into the database and painstakingly building out their weekly class calendars by hand. This tedious work led to double-booked tutors and painful data entry errors.',
    solution: "We built an invisible digital system that takes over the entire onboarding process. When a student signs up, the system instantly ensures the tutor isn't overbooked, logs the student, and automatically generates their exact schedule for the upcoming week.",
    result: 'Class double-bookings dropped to 0%. The academy staff completely stopped managing weekly calendars by hand, permanently removing an incredibly boring task from their day.',
    videoSrc: '/videos/N8nWorkflowMotion.mp4',
    workflowImage: '/images/workflow_architecture.png',
    tools: ['n8n', 'Airtable', 'Outlook'],
    pdfUrl: '/pdfs/innovation_case_study.pdf',
  },
  {
    label: 'Our Work',
    title: 'Automated Document Generation',
    industry: 'Government Contracting',
    problem: 'Staff spent countless hours reading physical forms and repeatedly typing prices and project details into different documents by hand. This tedious work was extremely slow and easily caused costly math mistakes.',
    solution: 'We built an intelligent system that acts exactly like a digital assistant. You simply show it a picture of your document or talk to it in a chat. It instantly reads the numbers out of the picture, makes sure the math is perfect, and automatically fills out all eight required forms for you.',
    result: 'What used to take hours of manual typing now happens practically instantly. The business completely erased human errors and saved their staff from a very frustrating, boring task.',
    videoSrc: '/videos/ProcurementMotion.mp4',
    workflowImage: '/images/workflow_architecture.png', // Temporary placeholder
    tools: ['n8n', 'AI Vision', 'Google Drive'],
    pdfUrl: '/pdfs/procurement_case_study.pdf',
  },
  {
    label: 'Our Work',
    title: 'Coaching Automation Suite',
    industry: 'Coaching & Consulting',
    problem: 'Coaches were losing valuable hours every week to manual administrative tasks—from qualifying new leads and handling onboarding to the constant struggle of writing weekly marketing content.',
    solution: 'We built a complete digital management system. It automatically evaluates and books incoming leads, instantly handles all new client onboarding, uses AI to flag clients who need help, and magically turns session transcripts into a week of social media posts.',
    result: 'Coaches eliminated admin friction entirely. High-value leads are booked immediately, struggling clients are caught before they quit, and multi-platform marketing happens completely effortlessly.',
    workflowImage: '/images/workflow_architecture.png', // Temporary placeholder
    tools: ['n8n', 'OpenAI', 'Airtable', 'Google Drive', 'Notion'],
    pdfUrl: '/pdfs/coaching_case_study.pdf',
  }
]

export const testimonial = {
  quote: "They completely removed the most annoying part of our day. The boring computer work that used to take our highest-paid staff three hours physically typing now happens instantly by itself.",
  author: 'Lyndon Joy',
  role: 'Business Owner',
  business: 'LJCI Merchandising',
  project: 'Automated Document Generation (Procurement)',
  image: '/images/lyndon-joy.jpg'
}

export const about = {
  label: 'Who We Are',
  bio: 'We are a small team of computer builders who believe technology should work for you, not the other way around. We build invisible digital systems that fix your daily headaches—saving you thousands of dollars, stopping errors, and removing hours of incredibly boring manual typing from your life.',
  skills: ['Connecting Software', 'Automating Daily Tasks', 'Chatbots', 'Fixing Business Problems', 'Organizing Data'],
  teamPhoto: '/images/terminal_isolated.png',
}

export const contact = {
  badge: "LET'S BUILD",
  headline: 'Ready to stop doing tasks by hand?',
  subtext: "Stop wasting money and time on manual work. Let's set up a computer system that does it for you.",
  cta: 'Send Us a Message →',
}

// ---------- The Desk redesign (2027) ----------

export type DeskNote =
  | { kind: 'sticky'; color: 'yellow' | 'pink' | 'green'; text: string }
  | { kind: 'sheet'; title: string; body: string; hand: string }

export const deskHero = {
  badgeBefore: 'Your week, before',
  badgeAfter: 'Your week, after',
  headline: 'We Automate.',
  grow: 'You Grow.',
  subBefore: 'Every note on this desk is a job a machine should be doing.',
  subAfter: 'Same work. Done by machines, lined up, finished.',
  hint: 'Scroll, and watch the desk sort itself out',
  ctaAudit: 'Start your free audit',
  ctaCall: 'Book a call',
  callUrl: 'https://cal.com/autobeets/30min',
  notes: [
    { kind: 'sticky', color: 'yellow', text: 'Copy invoice totals into the sheet' },
    { kind: 'sheet', title: 'WORK ORDER', body: '6 pages · retype into system', hand: 'do this today!!' },
    { kind: 'sticky', color: 'pink', text: "Who's booked Thursday??" },
    { kind: 'sticky', color: 'green', text: 'Call 3 suppliers for a price' },
    { kind: 'sheet', title: 'NEW LEAD', body: 'Came in 2 days ago', hand: 'nobody replied' },
    { kind: 'sticky', color: 'yellow', text: "RE: RE: where's my quote?" },
  ] as DeskNote[],
}

// ---------------------------------------------------------------------------
// The Desk — Phase 2: inside the computer
// ---------------------------------------------------------------------------

/** A run's result figure. `real: false` renders a visible "needs your real figure" tag (spec §7). */
export type RunResult = { text: string; real: boolean }

export const desktop = {
  dive: {
    title: 'So where does the work go?',
    sub: 'Into the machine. Come and look inside.',
    brand: 'autobeets 2000',
  },
  icons: ['Runs', 'Now playing', 'Results.txt'],
  todo: 'needs your real figure',
}

export const flagship = {
  window: 'case_file_01 — flagship',
  badge: 'Case file 01 · Flagship',
  title: 'One company.',
  titleEm: 'Their whole back office',
  titleEnd: ', on autopilot.',
  body: "A Texas fire & life-safety services company. Technicians in trucks all day, an office buried in paperwork. We didn't build them one automation. We became their automation team.",
  chips: [
    { label: 'Parts Price Finder', hl: true },
    { label: 'Work Order Intake', hl: true },
    { label: 'Team Hub & clock-in', hl: false },
    { label: 'Truck checklists', hl: false },
    { label: 'Booking system', hl: false },
    { label: 'Renewal tracker', hl: false },
    { label: 'Service reminders', hl: false },
    { label: 'Purchase approvals', hl: false },
    { label: 'Workflow health monitor', hl: false },
    { label: '+ more', hl: false },
  ],
}

export const run01 = {
  window: 'parts_finder.exe — run 01',
  title: 'Parts Price Finder',
  label: 'Run 01 · Parts Price Finder',
  steps: [
    { title: 'The old way', body: 'A tech on site needs a replacement part. Phone calls and browser tabs to find who has it and for how much, while the customer waits.' },
    { title: 'Snap a photo', body: 'Now they scan the QR sticker in the truck and photograph the part, or just type the model number.' },
    { title: 'AI identifies it', body: 'AI reads the photo and works out the exact make and model. No catalogue flipping.' },
    { title: 'The price hunt runs itself', body: 'Suppliers are searched at the same time, and the 3 cheapest that are in stock rise to the top.' },
    { title: 'Done, in the inbox', body: 'The top 3 land in the office inbox and every search is logged. The tech is back to work.' },
  ],
  nodes: ['Photo', 'AI reads', 'Search', 'Inbox'],
  screen: {
    notifs: [
      { from: 'Supplier A', text: 'Out of stock. Try again Monday.' },
      { from: 'Supplier B', text: '"Call us for pricing"' },
      { from: 'Supplier C', text: 'On hold… 12 min' },
      { from: 'Office', text: 'Any update on that part?' },
    ],
    waiting: 'customer still waiting',
    ids: [
      { k: 'Type', v: 'backflow valve' },
      { k: 'Make', v: 'identified' },
      { k: 'Model', v: 'identified' },
    ],
    searching: 'Searching 5 suppliers',
    rows: [
      { supplier: 'Supplier D', price: '$412 #1' },
      { supplier: 'Supplier A', price: '$438 #2' },
      { supplier: 'Supplier F', price: '$455 #3' },
      { supplier: 'Supplier B', price: '—' },
      { supplier: 'Supplier C', price: '—' },
    ],
    note: 'prices illustrative',
    top3Title: 'Top 3 for your part',
    top3: [
      { label: '1. Supplier D · in stock', price: '$412' },
      { label: '2. Supplier A · in stock', price: '$438' },
      { label: '3. Supplier F · ships today', price: '$455' },
    ],
    sent: 'Sent to the office inbox',
  },
  resultLabel: 'Result',
  // "1 min" in the mockup was never confirmed — both numbers wait for Caio.
  result: { text: '__ min → __ min', real: false } as RunResult,
}

export const runs = {
  title: 'Now playing: more runs.',
  badge: 'Case files 02–05',
  resultLabel: 'Result',
  pdfLabel: 'Read the case study',
  items: [
    {
      file: 'run_02.cd',
      industry: 'Fire & life safety',
      title: 'Work Order Intake',
      before: 'Work orders from national accounts arrive as long PDFs. Someone retypes each one.',
      after: 'AI reads each order, flags anything over the spending limit, and drafts the estimate.',
      result: { text: '__ hrs saved / week', real: false },
    },
    {
      file: 'run_03.cd',
      industry: 'Education',
      title: 'Student Enrollment',
      before: 'Enrollments and weekly class calendars built by hand, tutors double-booked.',
      after: "Sign-up checks the tutor's load, logs the student and builds next week's schedule.",
      result: { text: '0% double-bookings', real: true },
      pdfUrl: '/pdfs/innovation_case_study.pdf',
    },
    {
      file: 'run_04.cd',
      industry: 'Government contracting',
      title: 'Document Generation',
      before: 'Prices and project details retyped across 8 forms. Slow, and the math went wrong.',
      after: 'Show it a photo or chat with it. It reads the numbers, checks the math, fills all 8 forms.',
      result: { text: 'Hours → instant', real: true },
      pdfUrl: '/pdfs/procurement_case_study.pdf',
    },
    {
      file: 'run_05.cd',
      industry: 'Coaching',
      title: 'Coaching Automation Suite',
      before: 'Hours a week lost to qualifying leads, onboarding and writing content.',
      after: 'Leads scored and booked, onboarding automatic, transcripts turned into a week of posts.',
      result: { text: 'Admin, handled', real: true },
      pdfUrl: '/pdfs/coaching_case_study.pdf',
    },
  ] as {
    file: string
    industry: string
    title: string
    before: string
    after: string
    result: RunResult
    pdfUrl?: string
  }[],
}

/** Titles of runs whose result is still a placeholder. Go-live is blocked while this is non-empty. */
export function pendingFigures(): string[] {
  return [run01, ...runs.items].filter((r) => !r.result.real).map((r) => r.title)
}
