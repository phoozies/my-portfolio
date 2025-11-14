import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

interface HeaderProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

interface NavItem {
  id: string
  label: string
}

const HeaderContainer = styled('header')<{ isScrolled: boolean }>(({ isScrolled }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  background: 'var(--terminal-bg)',
  zIndex: 1000,
  borderBottom: `1px solid ${isScrolled ? 'var(--terminal-text)' : 'var(--terminal-border)'}`,
  transform: 'translateY(0)',
  transition: 'border-color 0.2s ease',
}))

const ScrollProgressBar = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  height: '2px',
  background: 'var(--terminal-text)',
  transition: 'width 0.05s linear',
})

const HeaderInner = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem 2rem',

  '@media (max-width: 768px)': {
    padding: '0.75rem 1rem',
  },
})

const Logo = styled('div')({
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
  fontSize: '1rem',
  fontWeight: 400,
  color: 'var(--terminal-text)',
  cursor: 'pointer',
  letterSpacing: '0.02em',
  flexShrink: 0,

  '&::before': {
    content: '"$ "',
    color: 'var(--terminal-text-dim)',
  },

  '&:hover': {
    color: 'var(--terminal-text)',
  },
})

const Nav = styled('nav')<{ isOpen: boolean }>(({ isOpen }) => ({
  display: 'flex',
  gap: '1.5rem',
  alignItems: 'center',

  '@media (max-width: 768px)': {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'var(--terminal-bg)',
    flexDirection: 'column',
    padding: '1rem',
    gap: '0.5rem',
    borderBottom: '1px solid var(--terminal-border)',
    transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: 'all 0.2s ease',
  },
}))

const NavLink = styled('a')<{ isActive: boolean }>(({ isActive }) => ({
  textDecoration: 'none',
  color: isActive ? 'var(--terminal-text)' : 'var(--terminal-text-dim)',
  fontWeight: 400,
  position: 'relative',
  padding: '0.25rem 0.5rem',
  letterSpacing: '0.02em',
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
  fontSize: '0.875rem',
  borderBottom: isActive ? '1px solid var(--terminal-text)' : '1px solid transparent',
  transition: 'all 0.2s ease',

  '&:hover': {
    color: 'var(--terminal-text)',
    borderColor: 'var(--terminal-text)',
  },

  '@media (max-width: 768px)': {
    fontSize: '0.95rem',
    padding: '0.5rem 0',
  },
}))

const ResumeLink = styled('a')({
  textDecoration: 'none',
  background: 'transparent',
  color: 'var(--terminal-text)',
  padding: '0.25rem 0.75rem',
  border: '1px solid var(--terminal-border)',
  fontWeight: 400,
  letterSpacing: '0.02em',
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
  fontSize: '0.875rem',
  transition: 'all 0.2s ease',

  '&:hover': {
    background: 'var(--terminal-surface)',
    borderColor: 'var(--terminal-text)',
  },

  '@media (max-width: 768px)': {
    fontSize: '0.95rem',
    padding: '0.5rem 0.75rem',
  },
})

const MobileMenuButton = styled('button')({
  display: 'none',
  flexDirection: 'column',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '0.5rem',
  gap: '3px',

  '& span': {
    width: '20px',
    height: '1px',
    background: 'var(--terminal-text)',
  },

  '@media (max-width: 768px)': {
    display: 'flex',
  },
})

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
    { id: 'myinfo', label: 'My Info' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ]

  if (!isVisible) return null

  return (
    <HeaderContainer isScrolled={isScrolled}>
      <ScrollProgressBar sx={{ width: `${scrollProgress}%` }} />
      <HeaderInner>
        <Logo onClick={() => scrollToSection('home')}>
          Thinh Vo
        </Logo>
        
        <Nav isOpen={isMobileMenuOpen}>
          {navItems.slice(1).map((item) => (
            <NavLink
              key={item.id}
              href={`#${item.id}`}
              isActive={activeSection === item.id}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(item.id)
              }}
            >
              {item.label}
            </NavLink>
          ))}
          <ResumeLink
            href="/THINH_VO_RESUME.pdf"
            download="THINH_VO_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            resume
          </ResumeLink>
        </Nav>

        <MobileMenuButton
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </MobileMenuButton>
      </HeaderInner>
    </HeaderContainer>
  )
}

export default Header
