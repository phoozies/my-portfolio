import { useEffect, useRef, useState } from 'react'
import { Box, keyframes } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTypingAnimation } from '../hooks/useTypingAnimation'
import { BREAKPOINTS } from '../constants'

const blink = keyframes`
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
`

const AboutSection = styled('section')({
  background: 'var(--terminal-bg)',
  padding: '4rem 0',
  color: 'var(--terminal-text)',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  scrollSnapAlign: 'start',

  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    padding: '3rem 0',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    padding: '2rem 0',
  },
})

const Container = styled(Box)({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 2rem',

  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    padding: '0 1.5rem',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    padding: '0 1rem',
  },
})

const SectionTitle = styled('h2')({
  fontSize: '2rem',
  fontWeight: 400,
  marginBottom: '2rem',
  textAlign: 'center',
  color: 'var(--terminal-text)',
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
  letterSpacing: '0.05em',

  '&::before': {
    content: '"$ "',
    color: 'var(--terminal-text-dim)',
  },

  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    fontSize: '1.75rem',
    marginBottom: '1.5rem',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    fontSize: '1.5rem',
  },
})

const AboutContent = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '300px 1fr',
  gap: '3rem',
  alignItems: 'start',
  minHeight: '280px',

  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    gridTemplateColumns: '1fr',
    gap: '2rem',
    minHeight: 'auto',
  },
})

const AboutText = styled(Box)({
  fontSize: '1rem',
  lineHeight: 1.6,
  color: 'var(--terminal-text)',
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
  letterSpacing: '0.02em',

  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    fontSize: '0.95rem',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    fontSize: '0.9rem',
  },
})

const AboutIntro = styled('p')({
  fontSize: '1rem',
  fontWeight: 400,
  color: 'var(--terminal-text)',
  marginBottom: '1rem',
  letterSpacing: '0.02em',
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    fontSize: '0.9rem',
  },
})

const TypingCursor = styled('span')<{ isTyping: boolean }>(({ isTyping }) => ({
  color: 'var(--terminal-text)',
  fontWeight: 'bold',
  marginLeft: '2px',
  animation: isTyping ? `${blink} 0.8s infinite` : 'none',
  opacity: isTyping ? 1 : 0,

  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none !important',
    opacity: '1 !important',
  },
}))

const HeroImage = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
})

const ProfileImage = styled(Box)({
  width: '280px',
  height: '280px',
  borderRadius: '50%',
  overflow: 'hidden',
  position: 'relative',
  border: '2px solid var(--terminal-border)',
  transition: 'all 0.2s ease',
  flexShrink: 0,

  '&:hover': {
    borderColor: 'var(--terminal-text)',
  },

  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    width: '240px',
    height: '240px',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    width: '200px',
    height: '200px',
  },

  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none !important',
  },
})

const Headshot = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '50%',
})

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const aboutRef = useRef<HTMLDivElement>(null)

  const aboutText = "Hi there! I'm Thinh Vo. Driven by the belief that technology should make life better, I'm a full-stack software engineer committed to building solutions that matter. I'm constantly exploring new technologies and methodologies; I'm always asking myself, \"how can we do this better?\" Beyond development, I like to unwind through playing video games and hanging out with friends!"

  const { displayedText, isTyping, fastComplete } = useTypingAnimation({
    text: isVisible ? aboutText : '',
    speed: 30,
    startDelay: 500
  })

  const handleDoubleClick = () => {
    if (isTyping) {
      fastComplete()
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '50px'
      }
    )

    if (aboutRef.current) {
      observer.observe(aboutRef.current)
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current)
      }
    }
  }, [isVisible])

  return (
    <AboutSection id="about" ref={aboutRef}>
      <Container>
        <SectionTitle>About Me</SectionTitle>
        <AboutContent>
          <HeroImage>
            <ProfileImage>
              <Headshot 
                src="./thinh_vo_headshot.jpg" 
                alt="Thinh Vo - Professional Headshot" 
                onError={() => {
                  console.error('Failed to load headshot image');
                  console.log('Trying fallback...');
                }}
                onLoad={() => console.log('Headshot image loaded successfully')}
              />
            </ProfileImage>
          </HeroImage>
          <AboutText>
            <AboutIntro 
              onDoubleClick={handleDoubleClick}
              style={{ cursor: isTyping ? 'pointer' : 'default' }}
              title={isTyping ? 'Double-click to fast-track' : ''}
            >
              {displayedText}
              <TypingCursor isTyping={isTyping}>|</TypingCursor>
            </AboutIntro>
          </AboutText>
        </AboutContent>
      </Container>
    </AboutSection>
  )
}

export default About
