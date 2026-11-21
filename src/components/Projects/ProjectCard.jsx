import { useInView } from '../../hooks/useInView';
import { useTilt } from '../../hooks/usePointerEffects';
import RichText from '../ui/RichText';
import Tags from '../ui/Tags';
import { ArrowRight } from '../ui/Icons';
import { visuals } from './visuals';

/** Tilting project card with a glow that follows the cursor. */
export default function ProjectCard({ project, index }) {
  const tiltRef = useTilt(6);
  const [viewRef, inView] = useInView();
  const Visual = visuals[project.visual];

  // one element needs both refs
  const setRefs = (el) => {
    tiltRef.current = el;
    viewRef.current = el;
  };

  return (
    <a
      ref={setRefs}
      className={`proj reveal ${inView ? 'in' : ''}`}
      href={project.url}
      target="_blank"
      rel="noopener"
    >
      <div className="proj-go"><ArrowRight /></div>
      <div className="proj-meta">
        <span>/{String(index + 1).padStart(2, '0')}</span>
        <span>{project.meta}</span>
      </div>
      <div className="proj-visual">{Visual && <Visual />}</div>
      <h3>
        {project.name[0]}
        <span className="serif">{project.name[1]}</span>
      </h3>
      <p><RichText text={project.description} /></p>
      <Tags items={project.tags} />
    </a>
  );
}
