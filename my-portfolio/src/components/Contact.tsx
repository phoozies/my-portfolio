import { useState } from 'react'
import './Contact.css'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface ContactInfo {
  icon: string
  label: string
  value: string
  link: string
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    // Here you would typically send the form data to a backend service
    console.log('Form submitted:', formData)
    // For now, we'll just show an alert
    alert('Thank you for your message! I\'ll get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const contactInfo: ContactInfo[] = [
    {
      icon: '📧',
      label: 'Email',
      value: 'tpvo.business@gmail.com',
      link: 'mailto:tpvo.business@gmail.com'
    },
    {
      icon: '📱',
      label: 'Phone',
      value: '(316) 927-8118',
      link: 'tel:+13169278118'
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Wichita, Kansas, US',
      link: '#'
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
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-intro">
              <h3>Let's Connect!</h3>
              <p>
                I'm always open to discussing new opportunities, interesting projects, 
                or just having a chat about technology. Whether you're looking for a 
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
            
            <div className="availability">
              <h4>Current Status</h4>
              <div className="status-item">
                <span className="status-indicator available"></span>
                <span>Available for internships and full-time opportunities</span>
              </div>
              <div className="status-item">
                <span className="status-indicator busy"></span>
                <span>Graduating December 2025</span>
              </div>
              <div className="status-item">
                <span className="status-indicator open"></span>
                <span>Open to freelance projects</span>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Send Me a Message</h3>
              
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell me about your project or opportunity..."
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
