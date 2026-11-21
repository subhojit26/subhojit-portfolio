import Reveal from '../ui/Reveal';
import RichText from '../ui/RichText';
import Tags from '../ui/Tags';

/** One job on the timeline. The dot lights up when the item scrolls into view. */
export default function ExperienceItem({ job }) {
  return (
    <Reveal className="exp-item">
      <span className="exp-dot" />
      <div className="exp-head">
        <h3>
          {job.title} <span className="serif">@ {job.company}</span>
        </h3>
        <span className="exp-when">{job.when}</span>
      </div>
      <div className="exp-type">{job.type}</div>
      <ul>
        {job.points.map((p, i) => (
          <li key={i}><RichText text={p} /></li>
        ))}
      </ul>
      <Tags items={job.tags} />
    </Reveal>
  );
}
