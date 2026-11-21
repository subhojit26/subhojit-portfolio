import { about } from '../../data/profile';
import Reveal from '../ui/Reveal';
import ScrollLitText from './ScrollLitText';
import StatCounter from './StatCounter';
import './About.css';

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="eyebrow">01 / about</div>
        <ScrollLitText text={about.text} />

        <Reveal className="stats">
          {(inView) =>
            about.stats.map((s) => <StatCounter key={s.label} {...s} start={inView} />)
          }
        </Reveal>
      </div>
    </section>
  );
}
