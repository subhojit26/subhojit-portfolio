import { contact, links } from '../../data/profile';
import Reveal from '../ui/Reveal';
import ContactForm from './ContactForm';
import './Contact.css';

const direct = [
  { label: 'Email', value: links.email, href: `mailto:${links.email}` },
  { label: 'LinkedIn', value: 'in/subhojit-k26', href: links.linkedin, external: true },
  { label: 'GitHub', value: 'subhojit26', href: links.github, external: true },
  { label: 'Resume', value: 'Download PDF', href: links.resume, download: 'Subhojit_Karmakar_Resume.pdf' },
];

/**
 * Header (label, heading, tagline) across the full width, then two equal-height cards
 * side by side: direct links on the left, the message form on the right.
 */
export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <div className="contact-head">
          <div className="eyebrow">06 / contact</div>
          <Reveal as="h2" className="contact-big">
            Let's <span className="serif">talk.</span>
          </Reveal>
          <Reveal as="p" className="contact-tagline" delay={0.1}>
            {contact.tagline}
          </Reveal>
        </div>

        <Reveal className="contact-grid" delay={0.15}>
          <div className="contact-card contact-direct">
            <h3>Reach me directly</h3>
            <ul>
              {direct.map((d) => (
                <li key={d.label}>
                  <span>{d.label}</span>
                  <a
                    href={d.href}
                    {...(d.external ? { target: '_blank', rel: 'noopener' } : {})}
                    {...(d.download ? { download: d.download } : {})}
                  >
                    {d.value} <i aria-hidden="true">{d.external ? '↗' : d.download ? '↓' : '→'}</i>
                  </a>
                </li>
              ))}
            </ul>
            <p className="contact-reply">Usually replies within a day or two.</p>
          </div>

          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
