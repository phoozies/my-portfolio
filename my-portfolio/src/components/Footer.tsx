import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/phoozies',
      logo: '/github-logo.svg'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/thinh-vo-1736062bb',
      logo: '/linkedin-bw-logo.svg'
    },
    {
      name: 'Email',
      url: 'mailto:tpvo.business@gmail.com',
      logo: '/email-logo.svg'
    }
  ]

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-links">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target={link.name !== 'Email' ? '_blank' : '_self'}
              rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
              className="social-link"
              aria-label={link.name}
            >
              <img src={link.logo} alt={`${link.name} logo`} className="social-icon" />
            </a>
          ))}
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Thinh Vo. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
