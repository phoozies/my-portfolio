import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/phoozies',
      icon: '💻'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/thinh-vo-1736062bb',
      icon: '💼'
    },
    {
      name: 'Email',
      url: 'mailto:tpvo.business@gmail.com',
      icon: '📧'
    }
  ]

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section footer-brand">
          <h3>Thinh Vo</h3>
          <p>Software Engineer & Full-Stack Developer</p>
          <p className="footer-tagline">
            Building innovative solutions with passion and precision
          </p>
        </div>
        
        <div className="footer-section footer-links">
          <h4>Quick Links</h4>
          <ul>
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="footer-section footer-contact">
          <h4>Get In Touch</h4>
          <div className="contact-details">
            <p>📍 Wichita, Kansas, US</p>
            <p>📱 (316) 927-8118</p>
            <p>📧 tpvo.business@gmail.com</p>
          </div>
        </div>
        
        <div className="footer-section footer-social">
          <h4>Follow Me</h4>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={social.name}
              >
                <span className="social-icon">{social.icon}</span>
                <span className="social-name">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} Thinh Vo. All rights reserved.</p>
          <p className="footer-made-with">
            Built with ❤️ using React & modern web technologies
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
