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
      icon: 'Workflow',
      title: 'n8n Workflow Automation',
      description: "We connect your tools and eliminate the manual work slowing your team down. Workflows run 24/7 so you don't have to.",
      outcomes: [
        'Connect any tool with an API',
        'Eliminate repetitive manual tasks',
        'Run processes on autopilot',
      ],
    },
    {
      icon: 'Bot',
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
  title: 'Project Title',
  industry: 'Industry',
  problem: 'Describe the problem the client had.',
  solution: 'Describe what you built and how.',
  result: 'Describe the outcome.',
  tools: ['n8n', 'OpenAI', 'Webhooks'],
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
  teamPhoto: '/images/team.jpg',
}

export const contact = {
  badge: "LET'S BUILD",
  headline: 'Ready to automate your business?',
  subtext: 'Book a free discovery call or send us a message.',
  cta: 'Get in Touch →',
}
