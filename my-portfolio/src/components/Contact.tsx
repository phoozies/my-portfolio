import './Contact.css'

interface ContactInfo {
  icon: string
  label: string
  value: string
  link: string
}

const Contact = () => {

  const contactInfo: ContactInfo[] = [
    {
      icon: '📧',
      label: 'Email',
      value: 'tpvo.business@gmail.com',
      link: 'mailto:tpvo.business@gmail.com'
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'linkedin.com/in/thinh-vo-1736062bb',
      link: 'https://linkedin.com/in/thinh-vo-1736062bb'
    },
    {
      icon: '💻',
      label: 'GitHub',
      value: 'github.com/phoozies',
      link: 'https://github.com/phoozies'
    }
  ]

  return (
    <section id="contact" className="contact">
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
              {contactInfo.map((info, index) => (
                <a 
                  key={index} 
                  href={info.link} 
                  className="contact-item"
                  target={info.link.startsWith('http') ? '_blank' : '_self'}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <div className="contact-icon">{info.icon}</div>
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
