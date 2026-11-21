import { achievements } from '../../data/profile';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import RichText from '../ui/RichText';
import Education from './Education';
import './Achievements.css';

export default function Achievements() {
  return (
    <section className="section" id="achievements">
      <div className="wrap">
        <SectionHeader eyebrow="05 / achievements & education" title="Competitive by" accent="nature." />
        <div className="ach-grid">
          {achievements.map((a, i) => (
            <Reveal className="ach-card" key={a.title} delay={(i % 2) * 0.1}>
              <div className="ach-icon">{a.icon}</div>
              <div>
                <h4>{a.title}</h4>
                <p><RichText text={a.text} /></p>
              </div>
            </Reveal>
          ))}
        </div>
        <Education />
      </div>
    </section>
  );
}
