import { useState, useEffect } from 'react'
import { Box, keyframes } from '@mui/material'
import { styled } from '@mui/material/styles'

interface HeaderProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

interface NavItem {
  id: string
  label: string
}

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const pixelShake = keyframes`
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-2px, 2px); }
  50% { transform: translate(2px, -2px); }
  75% { transform: translate(-2px, -2px); }
`

const HeaderContainer = styled('header')<{ isScrolled: boolean }>(({ isScrolled }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  background: isScrolled ? 'var(--pixel-dark)' : 'var(--pixel-darker)',
  zIndex: 1000,
  borderBottom: isScrolled ? '6px solid var(--pixel-pink)' : '6px solid var(--pixel-cyan)',
  transform: 'translateY(0)',
  animation: `${slideDown} 0.3s ease-out`,
  boxShadow: isScrolled ? '0 6px 0 var(--pixel-purple)' : '0 4px 0 var(--pixel-purple)',
}))

const ScrollProgressBar = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  height: '6px',
  background: 'repeating-linear-gradient(90deg, var(--pixel-yellow) 0px, var(--pixel-yellow) 20px, var(--pixel-green) 20px, var(--pixel-green) 40px, var(--pixel-cyan) 40px, var(--pixel-cyan) 60px)',
  transition: 'width 0.05s linear',
})

const HeaderInner = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem 2rem 1rem 2rem',

  '@media (max-width: 768px)': {
    padding: '1rem',
  },
})

const Logo = styled('div')({
  fontFamily: "'Courier New', monospace",
  fontSize: '1.5rem',
  fontWeight: 700,
  color: 'var(--pixel-yellow)',
  cursor: 'pointer',
  letterSpacing: '2px',
  flexShrink: 0,
  textShadow: '3px 3px 0px var(--pixel-purple)',
  textTransform: 'uppercase',

  '&:hover': {
    color: 'var(--pixel-green)',
    animation: `${pixelShake} 0.3s ease`,
  },
})

const Nav = styled('nav')<{ isOpen: boolean }>(({ isOpen }) => ({
  display: 'flex',
  gap: '2rem',
  alignItems: 'center',

  '@media (max-width: 768px)': {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'linear-gradient(135deg, #0f0f0f 0%, #1a0f2e 100%)',
    flexDirection: 'column',
    padding: '2rem',
    gap: '1rem',
    boxShadow: '0 5px 20px rgba(168, 85, 247, 0.3)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: 'all 0.3s ease',
  },
}))

const NavLink = styled('a')<{ isActive: boolean }>(({ isActive }) => ({
  textDecoration: 'none',
  color: isActive ? 'var(--pixel-yellow)' : 'var(--pixel-light)',
  fontWeight: 700,
  position: 'relative',
  padding: '0.5rem 1rem',
  letterSpacing: '1px',
  fontFamily: "'Courier New', monospace",
  textTransform: 'uppercase',
  fontSize: '0.9rem',
  background: isActive ? 'var(--pixel-bg)' : 'transparent',

  '&:hover': {
    color: 'var(--pixel-cyan)',
    background: 'var(--pixel-bg)',
  },

  '&::after': isActive ? {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'var(--pixel-yellow)',
    borderRadius: 0,
  } : {},

  '@media (max-width: 768px)': {
    fontSize: '1.1rem',
    padding: '0.75rem 0',
  },
}))

const ResumeLink = styled('a')({
  textDecoration: 'none',
  background: 'var(--pixel-green) !important',
  color: 'var(--pixel-dark) !important',
  padding: '0.5rem 1.25rem !important',
  borderRadius: 0,
  border: '4px solid var(--pixel-light) !important',
  boxShadow: '4px 4px 0 var(--pixel-purple)',
  fontWeight: '700 !important',
  letterSpacing: '1px',
  fontFamily: "'Courier New', monospace",
  textTransform: 'uppercase',
  fontSize: '0.9rem',

  '&:hover': {
    background: 'var(--pixel-yellow) !important',
    borderColor: 'var(--pixel-light) !important',
    transform: 'translate(4px, 4px)',
    boxShadow: '0 0 0 var(--pixel-purple)',
    color: 'var(--pixel-dark) !important',
  },

  '@media (max-width: 768px)': {
    fontSize: '1.1rem',
    padding: '0.75rem 0 !important',
  },
})

const MobileMenuButton = styled('button')({
  display: 'none',
  flexDirection: 'column',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '0.5rem',
  gap: '4px',

  '& span': {
    width: '25px',
    height: '2px',
    background: 'var(--pixel-light)',
    borderRadius: 0,
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
    { id: 'about', label: 'About' },
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
            href="./THINH_VO_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
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
