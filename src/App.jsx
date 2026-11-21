import { useCallback, useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useKonami } from './hooks/useKonami';
import { emit } from './lib/fx';
import { find } from './lib/eggs';

import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import ParticleCanvas from './components/ParticleCanvas/ParticleCanvas';
import ThemeBulb from './components/ThemeBulb/ThemeBulb';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Marquee from './components/Marquee/Marquee';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Achievements from './components/Achievements/Achievements';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Terminal from './components/Terminal/Terminal';

// fun layer: confetti, matrix rain, easter-egg toasts
import Confetti from './components/Fun/Confetti';
import MatrixRain from './components/Fun/MatrixRain';
import EggToast from './components/Fun/EggToast';
import './components/Fun/Fun.css';

/**
 * Page layout. Sections render top-to-bottom in this order -
 * reorder or remove a line here to change the page.
 */
export default function App() {
  const { theme, toggle } = useTheme();
  const [termOpen, setTermOpen] = useState(false);
  const openTerm = useCallback(() => setTermOpen(true), []);
  const closeTerm = useCallback(() => setTermOpen(false), []);

  useKonami(
    useCallback(() => {
      emit('confetti', { big: true });
      find('konami');
    }, [])
  );

  return (
    <>
      <ScrollProgress />
      <ParticleCanvas />
      <ThemeBulb theme={theme} onToggle={toggle} />
      <Navbar />

      <Hero />
      <Marquee />
      <main>
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />

      <Terminal open={termOpen} onOpen={openTerm} onClose={closeTerm} onToggleTheme={toggle} />

      <Confetti />
      <MatrixRain />
      <EggToast />
    </>
  );
}
