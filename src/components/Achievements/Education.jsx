import { education } from '../../data/profile';
import Reveal from '../ui/Reveal';

export default function Education() {
  return (
    <Reveal className="edu">
      <div className="edu-crest">{education.crest}</div>
      <div>
        <h3>{education.school}</h3>
        <p>{education.detail}</p>
      </div>
      <div className="edu-gpa">
        <b>{education.gpa}</b>
        <span>CGPA</span>
      </div>
    </Reveal>
  );
}
