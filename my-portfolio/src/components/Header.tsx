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

  useEffect(() => {
    const handleScroll = (): void => {
      const heroSection = document.getElementById('home')
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight
        const scrollPosition = window.scrollY
        
        // Show header when user scrolls past the hero section
        setIsVisible(scrollPosition > heroHeight - 100)
        setIsScrolled(scrollPosition > heroHeight + 50)
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
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ]

  if (!isVisible) return null

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <span onClick={() => scrollToSection('home')}>TV</span>
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
