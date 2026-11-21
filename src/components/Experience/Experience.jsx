import { useRef } from 'react';
import { experience } from '../../data/profile';
import { useScrollFrame } from '../../hooks/useScrollFrame';
import SectionHeader from '../ui/SectionHeader';
import ExperienceItem from './ExperienceItem';
import './Experience.css';

/** Timeline of jobs. The coloured rail on the left fills in as you scroll. */
export default function Experience() {
  const timelineRef = useRef(null);
  const fillRef = useRef(null);

  useScrollFrame((_, vh) => {
    const tl = timelineRef.current;
    if (!tl) return;
    const r = tl.getBoundingClientRect();
    if (r.top > vh || r.bottom < 0) return;
    const p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
    fillRef.current.style.transform = `scaleY(${p})`;
  });

  return (
    <section className="section" id="experience">
      <div className="wrap">
        <SectionHeader eyebrow="02 / experience" title="Where I've been" accent="shipping." />
        <div className="timeline" ref={timelineRef}>
          <div className="timeline-rail"><i ref={fillRef} /></div>
          {experience.map((job) => (
            <ExperienceItem key={job.title + job.when} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
