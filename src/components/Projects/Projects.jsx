import { projects } from '../../data/profile';
import SectionHeader from '../ui/SectionHeader';
import ProjectCard from './ProjectCard';
import './Projects.css';

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="wrap">
        <SectionHeader eyebrow="03 / selected projects" title="Things I've" accent="built." />
        <div className="projects">
          {projects.map((p, i) => (
            <ProjectCard key={p.url + i} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
