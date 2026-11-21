import { useRef } from 'react';
import { stack, stackLayers } from '../../data/profile';
import { find } from '../../lib/eggs';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import StackChip from './StackChip';
import './Skills.css';

const STORIES_FOR_EGG = 5;

/**
 * Tech stack drawn as a system architecture: one row per layer, with a request
 * "packet" travelling down the rail. Hover / focus / tap any tech for its story.
 */
export default function Skills() {
  const seen = useRef(new Set());
  const onSeen = (name) => {
    seen.current.add(name);
    if (seen.current.size === STORIES_FOR_EGG) find('stack');
  };

  const languages = stack.filter((s) => s.layer === 'Languages');
  const layers = stackLayers.map((l) => ({ ...l, items: stack.filter((s) => s.layer === l.id) }));

  return (
    <section className="section" id="skills">
      <div className="wrap">
        <SectionHeader eyebrow="04 / toolbox" title="The" accent="stack." />

        <Reveal className="arch">
          <div className="arch-langs">
            <span className="arch-langs-label">Languages I think in</span>
            <div className="arch-chips">
              {languages.map((s) => <StackChip key={s.name} skill={s} onSeen={onSeen} />)}
            </div>
          </div>

          <div className="arch-layers">
            <div className="arch-rail" aria-hidden="true"><i /></div>
            {layers.map((l, i) => (
              <div className="arch-layer" key={l.id} style={{ '--i': i }}>
                <span className="arch-node" aria-hidden="true" />
                <div className="arch-meta">
                  <span className="arch-num">0{i + 1}</span>
                  <b>{l.id}</b>
                  <small>{l.note}</small>
                </div>
                <div className="arch-chips">
                  {l.items.map((s) => <StackChip key={s.name} skill={s} onSeen={onSeen} />)}
                </div>
              </div>
            ))}
          </div>

          <p className="arch-hint">↳ a request’s path through the systems I build · hover any tech for the story</p>
        </Reveal>
      </div>
    </section>
  );
}
