# Subhojit Karmakar: Portfolio

Personal portfolio built with **React 18 + Vite**, plain CSS (no UI framework).

## Run it

```bash
npm install      # first time only
npm run dev      # http://localhost:5173 with hot reload
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally
```

## Where things live

```
src/
├─ data/
│  ├─ profile.js        ← ALL text content: hero, about, jobs, projects, skills, links…
│  └─ terminal.js       ← terminal answers + which questions trigger them
├─ styles/
│  ├─ tokens.css        ← colours, fonts (dark + light theme)
│  └─ global.css        ← reset, buttons, tags, section headings, reveal animation
├─ lib/
│  └─ particles.js      ← tiny canvas particle engine (trail + burst)
├─ hooks/
│  ├─ useTheme.js         light/dark toggle, saved in localStorage
│  ├─ useScrollFrame.js   one shared, frame-throttled scroll listener
│  ├─ useInView.js        "has this scrolled into view yet?"
│  ├─ usePointerEffects.js  useTilt (3D tilt) + useMagnetic (buttons)
│  └─ useReducedMotion.js
├─ components/
│  ├─ ui/               small reusable bits: Reveal, RichText, Tags, SectionHeader, MagneticButton, Icons
│  ├─ Navbar/  ScrollProgress/  ThemeBulb/  ParticleCanvas/  Footer/
│  ├─ Hero/             Hero.jsx (+ RoleRotator.jsx, CodeCard.jsx)
│  ├─ Marquee/
│  ├─ About/            About.jsx (+ ScrollLitText.jsx, StatCounter.jsx)
│  ├─ Experience/       Experience.jsx (+ ExperienceItem.jsx)
│  ├─ Projects/         Projects.jsx (+ ProjectCard.jsx, visuals.jsx)
│  ├─ Skills/
│  ├─ Achievements/     Achievements.jsx (+ Education.jsx)
│  ├─ Contact/
│  └─ Terminal/         the "ask me anything" terminal
├─ App.jsx              page layout: the order of sections
└─ main.jsx             entry point
```

Each component folder holds its `.jsx` and its own `.css`.

## Common edits

| I want to…                         | Edit                                                        |
| ---------------------------------- | ----------------------------------------------------------- |
| Change any text, link or job       | `src/data/profile.js`                                       |
| Add a project                      | add an object to `projects` in `profile.js` (pick `visual: 'jobs'` or `'mail'`, or add a new one in `Projects/visuals.jsx`) |
| Teach the terminal a new answer    | `src/data/terminal.js`: add to `responses` and `intents`   |
| Change colours                     | `src/styles/tokens.css`                                     |
| Reorder / remove a section         | `src/App.jsx`                                               |
| Change the hero's rotating roles   | `hero.roles` in `profile.js`                                |
| Update the resume                  | replace `public/Subhojit_Karmakar_Resume.pdf` (keep the name) |

In `profile.js`, text wrapped in `**double stars**` renders bold, and in the About paragraph
words starting with `~` get the accent highlight.

## Contact form

The form emails you directly through [Web3Forms](https://web3forms.com) (free, 250 messages/month),
with no server needed:

1. Go to web3forms.com, enter the email that should receive messages, and copy the access key it sends you.
2. Copy `.env.example` to `.env.local` and set `VITE_WEB3FORMS_KEY=<your key>`, then restart `npm run dev`.
3. When deploying, add the same `VITE_WEB3FORMS_KEY` variable in your host's environment settings.

Until a key is set, "Send message" opens the visitor's email app with the message pre-filled.

**Spam protection** (layered):
- Web3Forms runs its own server-side spam check on every submission.
- A hidden honeypot field catches form-filling bots.
- `src/lib/spamGuard.js`: per-browser 60s cooldown, max 3 messages/day, max 2 links per message.
The logic lives in `src/lib/sendMessage.js`; the form UI in `src/components/Contact/ContactForm.jsx`.

## Deploy

Any static host works. On **Vercel** or **Netlify**: import the repo, build command `npm run build`,
output folder `dist`. For **GitHub Pages**, set `base: '/<repo-name>/'` in `vite.config.js` first.
