/**
 * Terminal answers and how questions map to them.
 * To add a new answer: add a key to `responses`, then a regex to `intents`
 * that points at that key. Intents are checked top to bottom; the first match wins.
 * Responses are HTML strings (use <b>, <a>, <span class="k">).
 */
import { links } from './profile.js';

const a = (href, text) => `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;

export const bootMessage = `<span class="k">subhojit-os</span> v2.5 · booting… done.
Welcome! Ask me anything about Subhojit.
Type <b>help</b> to see commands, or click a chip below.`;

export const chips = ['about', 'experience', 'projects', 'skills', 'contact', 'joke', 'matrix'];

export const responses = {
  help: `Available commands:
  <b>about</b>         who am I
  <b>experience</b>    where I've worked
  <b>projects</b>      things I've built
  <b>skills</b>        my tech stack
  <b>education</b>     where I studied
  <b>achievements</b>  competitive programming & more
  <b>contact</b>       how to reach me
  <b>resume</b>        download my resume (PDF)
  <b>github</b> / <b>linkedin</b>   open my profiles
  <b>theme</b>         flip the lights
  <b>clear</b>         clear the screen

  for fun: <b>joke</b> · <b>coffee</b> · <b>party</b> · <b>matrix</b> · <b>eggs</b>
…or just ask in plain English, like <span class="k">"what do you work on?"</span>`,
  about: `Hey! I'm <b>Subhojit Karmakar</b> 👋
Full-stack engineer and Technical Analyst at <b>Citi</b>.
Strong foundation in Java, Spring Boot/MVC, Oracle SQL, C++, Kafka, Docker & React.
I love designing scalable architectures and solving hard engineering problems.
Quick to adapt, always learning, currently exploring <b>AI architectures</b>
and experimenting with new models in my projects.`,
  ai: `I'm actively exploring <b>AI architectures</b> and new models, experimenting with
them and wiring them into real projects. <b>MailGenie</b> uses Gemini to draft
email replies, and I keep trying out newer models as they ship.`,
  experience: `<b>Citi · Technical Analyst</b> (Jul 2025 - present)
  → Migrated .NET services to Java 17 / Spring Boot
  → Entitlement-based auth with Spring Security
  → Redis caching: <b>-40%</b> avg API response time
  → Kafka event pipelines for real-time analytics
  → JUnit/Mockito integration tests, mentoring interns

<b>Citi · Technical Analyst Intern</b> (Jun - Jul 2024)
  → IBM Cognos dashboards on Oracle
  → Jira REST + webhook scheduler for auto defect creation
  → Loan management app: Spring Boot + MongoDB + React`,
  projects: `<b>JobScout</b>: personal job radar
  Java 21 · Spring Boot · Spring Mail · Jsoup · SQLite · Docker
  Matches jobs to your profile, emails the last 24h of openings
  every day at 6 AM, plus a dashboard to browse jobs & edit your profile.
  ${a('https://github.com/subhojit26/JobScout', 'github.com/subhojit26/JobScout')}

<b>MailGenie</b>: AI email assistant
  Spring Boot · React · Gemini AI · Chrome Extension
  Adds an "AI Reply" button right inside Gmail.

More at ${a(links.github, 'github.com/subhojit26')}`,
  skills: `<b>Languages</b>   Java, C++, Python, SQL, JavaScript, HTML, CSS
<b>Frameworks</b>  Spring Boot, Spring Security, React, Next.js, Tailwind, Bootstrap
<b>Infra</b>       Kafka, Redis, Docker, Kubernetes
<b>Databases</b>   Oracle, PostgreSQL, MongoDB, MySQL
<b>Tools</b>       Git, GitHub, Postman, VS Code`,
  education: `<b>NIT Karnataka, Surathkal</b> (Dec 2021 - Apr 2025)
  B.Tech, Information Technology, CGPA <b>8.48</b>
  Minor in Management, CGPA <b>8.40</b>`,
  achievements: `🏆 LeetCode peak <b>1764</b> · 300+ solved
⭐ CodeChef <b>3★</b>, peak 1741 · 100+ solved
🌍 Global rank <b>377</b> / 15k+ in CodeChef Starters 80 (Div 2)
🧭 Mentored engineering interns at Citi`,
  contact: `✉  <a href="mailto:${links.email}">${links.email}</a>
in ${a(links.linkedin, 'linkedin.com/in/subhojit-k26')}
gh ${a(links.github, 'github.com/subhojit26')}`,
  whoami: `guest, but you could be my next teammate 😉 (try <b>contact</b>)`,
  hire: `<b>Excellent decision.</b> 🎉 Fastest route: <a href="mailto:${links.email}">${links.email}</a>`,
  redis: `At Citi I put <b>Redis</b> in front of high-traffic REST APIs and cut average response time by <b>40%</b>.`,
  kafka: `I built <b>Kafka</b> event-driven workflows that publish usage analytics on case-stage transitions, feeding near real-time dashboards.`,
  spring: `Spring Boot is my home turf: microservices migrated from .NET, Spring Security entitlements, JobScout's scheduled mailer, and more.`,
  location: `Based in <b>India</b> 🇮🇳`,
  hobby: `When I'm not shipping code, I'm usually grinding contests on LeetCode / CodeChef. I genuinely enjoy a good DP problem.`,
  ls: 'about.txt  experience.log  projects/  skills.json  education.md  achievements.txt  contact.vcf  <span class="k">.secrets/</span>',
  coffee: `      ( (
       ) )
    ........
    |      |]   brewing… ☕
    \\      /    Java runs on coffee. So do I.
     \`----'`,
  rmrf: `<span class="k">Permission denied.</span> Nice try 😄 This portfolio is production. I write rollback plans, remember?`,
  secrets: `🔐 .secrets/ is locked. Hint: there are 6 easter eggs on this site. Type <b>eggs</b> to see your progress.`,
  party: `🎉 Party mode engaged!`,
  matrix: `Follow the white rabbit… 🐇`,
};

/** `joke` picks one at random. */
export const jokes = [
  'Why do Java developers wear glasses? Because they can’t C#.',
  'A SQL query walks into a bar, walks up to two tables and asks: “Can I JOIN you?”',
  'There are 10 kinds of people: those who understand binary and those who don’t.',
  'I would tell you a UDP joke, but you might not get it.',
  'My Kafka consumer and I have something in common: we both lag on Mondays.',
  'Cache invalidation, naming things and off-by-one errors: the two hardest problems in CS.',
  '“It works on my machine.” “Then we’ll ship your machine.” And that’s how Docker was born.',
];

/** Special keys handled in code (not plain text): clear, exit, theme, github, linkedin, joke, party, matrix, eggs */
export const intents = [
  [/^(help|\?|commands?|menu)$/, 'help'],
  [/^(ls|ls -a|ls -la)$/, 'ls'],
  [/rm\s+-rf/, 'rmrf'],
  [/secret|cd \.secrets/, 'secrets'],
  [/^(joke|tell me a joke|make me laugh)|\bjoke\b/, 'joke'],
  [/coffee|chai|tea\b/, 'coffee'],
  [/^(party|confetti|celebrate|🎉)$/, 'party'],
  [/matrix|red pill|white rabbit/, 'matrix'],
  [/^eggs?$|easter/, 'eggs'],
  [/^(clear|cls)$/, 'clear'],
  [/^(exit|quit|close)$/, 'exit'],
  [/(theme|dark|light|bulb|lights?)/, 'theme'],
  [/\bgithub\b|\bgit hub\b/, 'github'],
  [/linkedin/, 'linkedin'],
  [/(sudo|hire|recruit|job offer|open to work|available)/, 'hire'],
  [/r[eé]sum[eé]|\bcv\b/, 'resume'],
  [/whoami/, 'whoami'],
  [/redis|cach/, 'redis'],
  [/kafka|event/, 'kafka'],
  [/spring|java\b|backend/, 'spring'],
  [/(\bai\b|llm|model|gemini|gpt|machine learning|artificial)/, 'ai'],
  [/(skill|stack|tech|language|framework|tool|know)/, 'skills'],
  [/(experience|work|job|citi|company|intern|career|role|do you do)/, 'experience'],
  [/(project|built|build|jobscout|job scout|mailgenie|portfolio)/, 'projects'],
  [/(education|college|university|study|studied|nitk|degree|cgpa|gpa|school)/, 'education'],
  [/(achiev|leetcode|codechef|rating|rank|competitive|cp\b|award)/, 'achievements'],
  [/(contact|email|mail|reach|phone|connect|talk)/, 'contact'],
  [/(where.*(live|based|from)|location|city)/, 'location'],
  [/(hobb|fun|free time|weekend|interest)/, 'hobby'],
  [/(who|about|yourself|introduce|name|hello|\bhi\b|hey)/, 'about'],
];

export const fallback = (q) =>
  `Hmm, I don't have an answer for <span class="k">"${q}"</span> yet.\nTry <b>help</b>, or ask about my skills, work, projects or how to reach me.`;
