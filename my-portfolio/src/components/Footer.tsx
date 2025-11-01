import './Footer.css'
import { SOCIAL_LINKS } from '../constants'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-links">
          {SOCIAL_LINKS.map((link, index) => (
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
