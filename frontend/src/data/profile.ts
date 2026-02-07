export const profile = {
  name: 'Jonathan Milolo Beya',
  role: 'Frontend React Developer',
  location: 'Gauteng, South Africa',
  headline:
    'I build clean, fast, modern web apps with React + TypeScript—shipping production features and polished UI.',

  highlights: [
    'React + TypeScript + Tailwind + shadcn/ui',
    'Redux Toolkit, TanStack Query, TanStack Router',
    'Authentication + role-based access control patterns',
    'Fintech and verification product experience',
    'Tutor: Frontend Development & French',
  ],

  links: {
    github: 'https://github.com/jmbcode23',
    linkedin: 'https://www.linkedin.com/in/jonathan-beya-240680259',
    resumeUrl: '/Jonathan-Beya-Resume.pdf', // put your PDF in /public
  },

  projects: [
    {
      name: 'Qiniso (Verification Platform)',
      description:
        'All-in-one verification app for quick checks and industry-specific forms, producing automated verification reports.',
      tags: ['React', 'TypeScript', 'Tailwind', 'APIs'],
      links: { live: '', repo: '' }, // optional
    },
    {
      name: 'Ride-Sharing Web App (In Progress)',
      description:
        'Ride request experience with maps, real-time tracking concepts, and notification flows (web-first, mobile later).',
      tags: ['React', 'TypeScript', 'Maps', 'Realtime'],
      links: { live: '', repo: '' },
    },
    {
      name: 'CIB (Corporate Internet Banking) (In Progress)',
      description:
        'A corporate banking portal where businesses can sign up/login, initiate transfers and payments, view transactions, and purchase airtime.',
      tags: ['Fintech', 'React', 'TypeScript', 'Secure UX'],
      links: { live: '', repo: '' },
    },
    {
      name: 'Government Travel & Budget Platform (In Progress)',
      description:
        'A platform for government agents to plan official travel: choose destinations, manage departmental budgets, and book trips end-to-end.',
      tags: ['React', 'TypeScript', 'Workflow', 'Approvals'],
      links: { live: '', repo: '' },
    },
  ],
}
