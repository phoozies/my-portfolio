import './Contact.css'
import { useSectionVisibility } from '../hooks/useSectionVisibility'
import { CONTACT_INFO } from '../constants'

interface ContactProps {
  unlockAchievement: (sectionId: string) => void;
}

const Contact = ({ unlockAchievement }: ContactProps) => {
  const sectionRef = useSectionVisibility({
    threshold: 0.3,
    onVisible: () => unlockAchievement('contact')
  });

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Let's Connect!</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-intro">
              <p>
                I'm always open to discussing new opportunities, interesting projects, 
                or just having a chat. Whether you're looking for a 
                software engineer, have a project in mind, or want to collaborate, 
                I'd love to hear from you!
              </p>
            </div>
            
            <div className="contact-details">
              {CONTACT_INFO.map((info, index) => (
                <a 
                  key={index} 
                  href={info.link} 
                  className="contact-item"
                  target={info.link.startsWith('http') ? '_blank' : '_self'}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <div className="contact-icon">
                    <img src={info.icon} alt={`${info.label} icon`} className="contact-icon-img" />
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">{info.label}</span>
                    <span className="contact-value">{info.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
