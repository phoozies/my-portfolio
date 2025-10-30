import { useState, useEffect } from 'react'
import './Header.css'

interface HeaderProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

interface NavItem {
  id: string
  label: string
}

const Header = ({ activeSection, setActiveSection }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const [scrollProgress, setScrollProgress] = useState<number>(0)

  useEffect(() => {
    const handleScroll = (): void => {
      const heroSection = document.getElementById('home')
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight
        const scrollPosition = window.scrollY
        
        // Show header when user scrolls past the hero section
        setIsVisible(scrollPosition > heroHeight - 100)
        setIsScrolled(scrollPosition > heroHeight + 50)
        
        // Calculate scroll progress
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = Math.min((scrollPosition / totalHeight) * 100, 100)
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Check initial scroll position
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsMobileMenuOpen(false)
    }
  }

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ]

  if (!isVisible) return null

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      <div className="header-container">
        <div className="logo">
          <span onClick={() => scrollToSection('home')}>Thinh Vo</span>
        </div>
        
        <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          {navItems.slice(1).map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(item.id)
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="./THINH_VO_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link resume-link"
          >
            Resume
          </a>
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header
