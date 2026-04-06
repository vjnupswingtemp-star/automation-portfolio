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
  socialProof: '✓ 100% Custom Tailored Systems · Zero Technical Jargon · Direct Founder Support',
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
      name: 'n8n', 
      logo: '/logos/transparent_n8n.png', 
      desc: 'The glue that connects all your different apps together so they can talk to each other.',
      bg: 'bg-[#F2FBF7]', // Soft mint
      span: 'md:col-span-1'
    },
    { 
      name: 'OpenAI', 
      logo: '/logos/transparent_openai.png', 
      desc: 'We use this to write draft emails, summarize long documents, and handle repetitive typing.',
      bg: 'bg-white',
      span: 'md:col-span-1'
    },
    { 
      name: 'Claude (Anthropic)', 
      logo: '/logos/transparent_anthropic.png', 
      desc: 'We use this to read complex data and spreadsheets so a human does not have to.',
      bg: 'bg-[#FFF6ED]', // Soft peach
      span: 'md:col-span-1'
    },
    { 
      name: 'Gemini', 
      logo: '/logos/transparent_gemini.png', 
      desc: 'We use this incredibly fast brain to write perfect emails, analyze text, and generate creative ideas on the fly.',
      bg: 'bg-[#F0F4FF]', // Soft blue
      span: 'md:col-span-1'
    },
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
  label: 'What We Do',
  items: [
    {
      icon: 'Workflow',
      title: 'Connecting Your Apps Together',
      description: "We hook your software up so data moves automatically. This eliminates the annoying, manual copy-and-pasting that slows your team down. It runs 24/7, so you don't even have to think about it.",
      outcomes: [
        'Connect any tool you already use',
        'Stop copying and pasting data by hand',
        'Run your daily tasks completely on autopilot',
      ],
      bg: 'bg-white', // Stark White
      image: '/images/feet_on_desk_y2k.png',
      newDesign: {
        headline: "Watch your tasks run on autopilot.",
        logoText: "AUTOMATION",
        modelNumber: "N8N",
        tagline: "Connecting Apps",
        adCopy: "Connect your favorite apps and completely automate your daily tasks. Eliminate manual data entry and focus entirely on scaling your business with 24/7 reliability, zero errors, and customized workflows that put your digital world on autopilot."
      }
    },
    {
      icon: 'Bot',
      title: 'Custom Support Bots',
      description: 'We build digital assistants that live inside your website or WhatsApp. They answer customer questions, handle onboarding, and solve routine problems around the clock, which instantly saves you money on hiring support staff.',
      outcomes: [
        'Taught exactly how your business works',
        'Placed right into your channels or website',
        'Answers customer questions without human help'
      ],
      bg: 'bg-white', // Use white for the retro ad container
      image: '/images/too_many_phones_test.png',
      newDesign: {
        headline: "Custom Support Bots",
        logoText: "ASSISTANT",
        tagline: "Intelligent Support",
        adCopy: "We build digital assistants that live securely inside your website or channels. They automatically answer customer questions, handle onboarding, and solve routine problems around the clock—instantly reducing your support volume so you scale without hiring extra staff."
      }
    },
    {
      icon: 'Settings',
      title: 'Bespoke Automations',
      description: 'Have a weird, unique, or complex operational problem? We can probably solve it. We build custom logic and infrastructure designed specifically for your unorthodox workflows.',
      outcomes: [
        'Completely custom built for your edge-case',
        'Integrate obscure software that isn\'t popular',
        'A dedicated technical partner for your business'
      ],
      bg: 'bg-white',
      image: '/images/tangled_cables_y2k.png',
      newDesign: {
        headline: "Your problem. Our solution.",
        logoText: "WILDCARD",
        modelNumber: "CSTM-X",
        tagline: "Custom Architecture",
        imagePosition: "object-[40%_center]",
        adCopy: "Have a profoundly weird, incredibly complex, or completely unique operational bottleneck? We exist to solve the edge cases. If it involves moving data, writing code, or untangling deeply nested workflows, we engineer flawless custom architecture that clears the chaos."
      }
    },
  ],
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
