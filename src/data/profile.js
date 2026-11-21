/**
 * ─────────────────────────────────────────────────────────────
 *  ALL SITE CONTENT LIVES HERE.
 *  Edit this file to change text, links, jobs, projects, skills…
 *  Components only read from it: no copy is hard-coded in them.
 *
 *  Tip: in strings marked "rich", wrap words in **double stars**
 *  to make them bold (see <RichText />).
 * ─────────────────────────────────────────────────────────────
 */

export const links = {
  email: 'ksubhojit20@gmail.com',
  github: 'https://github.com/subhojit26',
  linkedin: 'https://www.linkedin.com/in/subhojit-k26/',
  resume: '/Subhojit_Karmakar_Resume.pdf', // file lives in public/
};

export const nav = [
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'work' },
  { id: 'projects', label: 'projects' },
  { id: 'skills', label: 'skills' },
  { id: 'contact', label: 'contact' },
];

export const hero = {
  status: 'Software Developer',
  firstName: 'Subhojit',
  lastName: 'Karmakar.',
  // rich
  intro:
    'Full-stack engineer with deep roots in **Java, Spring Boot & Kafka**. I design **scalable, secure architectures** and love untangling hard engineering problems.',
  rotatorPrefix: 'Currently building',
  roles: [
    'microservices in Spring Boot',
    'event pipelines with Kafka',
    'secure REST APIs',
    'full-stack apps',
    'AI-powered side projects',
  ],
  highlights: [
    { title: 'Backend-first', caption: 'scalable, event-driven systems' },
    { title: 'Full-stack', caption: 'React → Spring → SQL' },
    { title: 'AI-curious', caption: 'exploring new models & agents' },
  ],
  codeCard: {
    filename: 'Subhojit.java',
  },
};

/** The Java snippet typed out in the hero card. Token types map to colours in CodeCard.css */
export const codeTokens = [
  ['c', '// hi there 👋'], ['p', '\n'],
  ['k', 'public class '], ['t', 'Subhojit '], ['p', '{\n'],
  ['p', '  '], ['k', 'String '], ['p', 'role = '], ['s', '"Technical Analyst @ Citi"'], ['p', ';\n'],
  ['p', '  '], ['k', 'String '], ['p', 'alma = '], ['s', '"NITK Surathkal"'], ['p', ';\n'],
  ['p', '  '], ['t', 'List'], ['p', '<'], ['t', 'String'], ['p', '> stack = '], ['t', 'List'], ['p', '.of(\n'],
  ['p', '    '], ['s', '"Java"'], ['p', ', '], ['s', '"Spring Boot"'], ['p', ', '], ['s', '"Kafka"'], ['p', ',\n'],
  ['p', '    '], ['s', '"Redis"'], ['p', ', '], ['s', '"React"'], ['p', ', '], ['s', '"Python"'], ['p', ',\n'],
  ['p', '    '], ['s', '"C++"'], ['p', ', '], ['s', '"Docker"'], ['p', ', '], ['s', '"Kubernetes"'], ['p', ');\n\n'],
  ['p', '  '], ['a', '@Cacheable'], ['p', '\n'],
  ['p', '  '], ['k', 'public '], ['t', 'Impact '], ['n', 'ship'], ['p', '('], ['t', 'Idea '], ['p', 'idea) {\n'],
  ['p', '    '], ['k', 'return '], ['p', 'idea.build().scale().'], ['n', 'fast'], ['p', '();\n'],
  ['p', '  }\n}'],
];

export const marquee = [
  'Java', 'Spring Boot', 'Kafka', 'Redis', 'React', 'Docker', 'PostgreSQL',
  'Spring Security', 'MongoDB', 'Next.js', 'JUnit', 'Oracle',
];

export const about = {
  // Words starting with ~ are highlighted in italic accent colour when lit.
  text:
    "I'm Subhojit, a ~full-stack ~engineer with a strong foundation in Java, Spring Boot/MVC, Oracle SQL, C++, Kafka, Docker and React. I care about designing ~scalable ~architectures, streamlining how systems flow, and cracking ~complex ~problems. I adapt ~quickly to change and stay ~curious by default. Lately I'm exploring ~AI ~architectures, experimenting with new models and wiring them into real projects. The goal never changes: build software that's ~efficient, ~secure and ~impactful.",
  stats: [
    { value: 8.48, decimals: 2, label: 'CGPA · B.Tech IT' },
    { value: 400, suffix: '+', label: 'DSA problems solved' },
    { value: 1764, label: 'LeetCode peak rating' },
    { value: 1741, label: 'CodeChef peak rating · 3★' },
  ],
};

export const experience = [
  {
    title: 'Technical Analyst',
    company: 'Citi',
    when: 'Jul 2025 - Present',
    type: 'Full time · India',
    // rich
    points: [
      'Migrated backend services from **.NET to Java 17 / Spring Boot**, enabling a modular, scalable microservice architecture.',
      'Implemented **entitlement-based auth** with Spring Security: role & permission-based access control on REST endpoints.',
      'Integrated **Redis caching** for high-traffic APIs, cutting average response time by **40%**.',
      'Built **event-driven workflows on Apache Kafka** publishing usage analytics on case-stage transitions for near real-time dashboards.',
      'Automated case-stage email notifications and wrote **integration tests** with JUnit & Mockito.',
      'Mentored engineering interns through onboarding and PR reviews.',
    ],
    tags: ['Java 17', 'Spring Boot', 'Spring Security', 'Redis', 'Kafka', 'JUnit', 'Mockito'],
  },
  {
    title: 'Technical Analyst Intern',
    company: 'Citi',
    when: 'Jun 2024 - Jul 2024',
    type: 'Internship · India',
    points: [
      'Built interactive **IBM Cognos dashboards** on Oracle with drill-downs to analyse stage-wise and date-wise failure patterns.',
      'Wrote a scheduler on **Jira REST APIs + webhooks** that auto-creates defects when failure thresholds are crossed.',
      'Built a **loan management app**: Spring Boot REST API, MongoDB, and a responsive React frontend.',
    ],
    tags: ['IBM Cognos', 'Oracle', 'Jira API', 'MongoDB', 'React'],
  },
];

export const projects = [
  {
    name: ['Job', 'Scout'],
    meta: 'live · vercel',
    url: 'https://github.com/subhojit26/JobScout',
    visual: 'jobs', // see components/Projects/visuals
    // rich
    description:
      'A personal job radar that matches fresh openings to your profile and experience. Every morning at **6 AM** it emails the jobs posted in the last 24 hours, and a dashboard lets you browse every match and edit your profile.',
    tags: ['Java 21', 'Spring Boot', 'Spring Mail', 'Jsoup', 'SQLite', 'Docker'],
  },
  {
    name: ['Mail', 'Genie'],
    meta: 'Jan 2025',
    url: 'https://github.com/subhojit26',
    visual: 'mail',
    description:
      'AI-powered email automation using Gemini to draft smart replies. Spring Boot + React, shipped with a Chrome extension that drops an “AI Reply” button right next to Gmail’s own reply.',
    tags: ['Spring Boot', 'React', 'Gemini AI', 'Chrome Ext'],
  },
];

/**
 * Tech stack, drawn as a system architecture in the Skills section.
 *   layer: which architecture layer it sits in (see `stackLayers`); 'Languages' shows as the top strip
 *   where: where I used it (short)
 *   story: one line shown in the hover tooltip
 */
export const stackLayers = [
  { id: 'Client', note: 'what users touch' },
  { id: 'Services', note: 'business logic & APIs' },
  { id: 'Events & cache', note: 'speed & decoupling' },
  { id: 'Data', note: 'where state lives' },
  { id: 'Infra & tooling', note: 'ship & operate' },
];

export const stack = [
  // Languages
  { name: 'Java', abbr: 'Jv', layer: 'Languages', where: 'Citi · JobScout · MailGenie', story: 'My main language: production services at Citi, plus every backend I build on the side.' },
  { name: 'C++', abbr: 'C++', layer: 'Languages', where: 'Competitive programming', story: 'My contest language: LeetCode peak 1764 and CodeChef 3★ (1741).' },
  { name: 'Python', abbr: 'Py', layer: 'Languages', where: 'Scripting & experiments', story: 'Quick scripts, automation and trying out new AI models.' },
  { name: 'SQL', abbr: 'SQL', layer: 'Languages', where: 'Citi · projects', story: 'Queries behind dashboards, reports and every app’s data layer.' },
  { name: 'JavaScript', abbr: 'JS', layer: 'Languages', where: 'React apps · Chrome extension', story: 'Frontends and MailGenie’s Gmail extension, including this site.' },

  // Backend
  { name: 'Spring Boot', abbr: 'SB', layer: 'Services', where: 'Citi · JobScout · MailGenie', story: 'Migrated .NET services to Java 17 / Spring Boot microservices at Citi.' },
  { name: 'Spring Security', abbr: 'SS', layer: 'Services', where: 'Citi · SprintSync', story: 'Entitlement-based, role & permission access control on REST APIs; JWT auth.' },
  { name: 'Apache Kafka', abbr: 'Kf', layer: 'Events & cache', where: 'Citi', story: 'Event-driven workflows publishing analytics on case-stage transitions.' },
  { name: 'Redis', abbr: 'Rd', layer: 'Events & cache', where: 'Citi', story: 'Caching for high-traffic APIs that cut average response time by 40%.' },
  { name: 'REST APIs', abbr: 'API', layer: 'Services', where: 'Everywhere', story: 'Designed, secured and documented REST endpoints across all my services.' },
  { name: 'JUnit & Mockito', abbr: 'JU', layer: 'Services', where: 'Citi', story: 'Integration tests that keep releases reliable end to end.' },

  // Frontend
  { name: 'React', abbr: 'Re', layer: 'Client', where: 'MailGenie · loan app · this site', story: 'Responsive UIs on top of my Spring Boot backends.' },
  { name: 'Next.js', abbr: 'Nx', layer: 'Client', where: 'Side projects', story: 'Server-rendered React when a project needs routing and SEO.' },
  { name: 'Tailwind CSS', abbr: 'Tw', layer: 'Client', where: 'Side projects', story: 'Fast, consistent styling without leaving the markup.' },
  { name: 'HTML & CSS', abbr: '</>', layer: 'Client', where: 'Everywhere', story: 'Hand-written layouts and animations, like this portfolio.' },

  // Data
  { name: 'Oracle SQL', abbr: 'Or', layer: 'Data', where: 'Citi', story: 'IBM Cognos dashboards with drill-downs into failure patterns.' },
  { name: 'PostgreSQL', abbr: 'Pg', layer: 'Data', where: 'SprintSync', story: 'Relational backbone for a Jira-like project management platform.' },
  { name: 'MongoDB', abbr: 'Mg', layer: 'Data', where: 'Loan management app', story: 'Document store for transactions between users.' },
  { name: 'MySQL', abbr: 'My', layer: 'Data', where: 'Projects', story: 'The dependable default for smaller relational apps.' },
  { name: 'SQLite', abbr: 'SQ', layer: 'Data', where: 'JobScout', story: 'Lightweight store for scraped jobs and user profiles.' },

  // DevOps & Tools
  { name: 'Docker', abbr: 'Dk', layer: 'Infra & tooling', where: 'SprintSync · JobScout', story: 'Containerised services so they run the same everywhere.' },
  { name: 'Kubernetes', abbr: 'K8s', layer: 'Infra & tooling', where: 'Learning & labs', story: 'Orchestrating containers: deployments, services and scaling.' },
  { name: 'Git & GitHub', abbr: 'Gt', layer: 'Infra & tooling', where: 'Every day', story: 'Branching, PR reviews, and mentoring interns through them at Citi.' },
  { name: 'Jira APIs', abbr: 'Ji', layer: 'Infra & tooling', where: 'Citi internship', story: 'Scheduler + webhooks that auto-create defects past failure thresholds.' },
  { name: 'Postman', abbr: 'Pm', layer: 'Infra & tooling', where: 'Every API', story: 'Exploring, testing and documenting endpoints.' },
];

export const achievements = [
  { icon: '⚔️', title: 'LeetCode', text: 'Peak rating **1764** · 300+ problems solved' },
  { icon: '⭐', title: 'CodeChef 3★', text: 'Peak rating **1741** · 100+ problems solved' },
  { icon: '🏆', title: 'Global rank 377', text: 'Out of **15k+** in CodeChef Starters 80 (Div 2), 2023' },
  { icon: '🧭', title: 'Mentor', text: 'Onboarded and reviewed PRs for **engineering interns** at Citi' },
];

export const education = {
  crest: 'NITK',
  school: 'National Institute of Technology Karnataka, Surathkal',
  detail: 'B.Tech, Information Technology · Minor in Management (CGPA 8.40) · Dec 2021 - Apr 2025',
  gpa: '8.48',
};

export const contact = {
  tagline: 'Open to backend and AI engineering roles. If you’re hiring or building something ambitious, I’d love to hear about it.',
};
