import { useEffect, useRef, useState } from 'react'
import { Box, keyframes } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTypingAnimation } from '../hooks/useTypingAnimation'
import { useSectionVisibility } from '../hooks/useSectionVisibility'

interface AboutProps {
  unlockAchievement: (sectionId: string) => void;
}

const blink = keyframes`
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
`

const AboutSection = styled('section')({
  background: 'linear-gradient(180deg, var(--neutral-warm) 0%, var(--white-soft) 100%)',
  padding: '100px 0',
  color: 'var(--neutral-dark)',
})

const Container = styled(Box)({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 2rem',
})

const SectionTitle = styled('h2')({
  fontSize: '2.5rem',
  fontWeight: 700,
  marginBottom: '3rem',
  textAlign: 'center',
  color: 'var(--neutral-dark)',
  fontFamily: "'Courier New', monospace",
  letterSpacing: '2px',
  textTransform: 'uppercase',
})

const AboutContent = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '548px 1fr',
  gap: '4rem',
  alignItems: 'center',

  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '2rem',
  },
})

const AboutText = styled(Box)({
  fontSize: '1.1rem',
  lineHeight: 1.8,
  color: 'var(--neutral-grey)',
  minHeight: '280px',
})

const AboutIntro = styled('p')({
  fontSize: '1.3rem',
  fontWeight: 500,
  color: 'var(--neutral-dark)',
  marginBottom: '1.5rem',
  letterSpacing: '0.3px',
})

const TypingCursor = styled('span')<{ isTyping: boolean }>(({ isTyping }) => ({
  color: 'var(--sakura-accent)',
  fontWeight: 'bold',
  marginLeft: '2px',
  animation: isTyping ? `${blink} 1s infinite` : 'none',
  opacity: isTyping ? 1 : 0,

  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none !important',
    opacity: '1 !important',
  },
}))

const HeroImage = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const ProfileImage = styled(Box)({
  width: '300px',
  height: '300px',
  borderRadius: 0,
  overflow: 'hidden',
  position: 'relative',
  border: '3px solid var(--sakura-accent)',
  boxShadow: '8px 8px 0 var(--sakura-pink)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  willChange: 'transform',

  '&:hover': {
    transform: 'translate(4px, 4px)',
    boxShadow: '4px 4px 0 var(--sakura-pink)',
  },

  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none !important',
    '&:hover': {
      transform: 'none !important',
      boxShadow: '0 8px 32px rgba(168, 85, 247, 0.3) !important',
    },
  },
})

const Headshot = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '50%',
})

const About = ({ unlockAchievement }: AboutProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const aboutRef = useRef<HTMLDivElement>(null)
  
  const achievementRef = useSectionVisibility({
    threshold: 0.3,
    onVisible: () => unlockAchievement('about')
  })

  const aboutText = "Driven by the belief that technology should make life better, I'm a full-stack developer committed to building solutions that matter. I'm constantly exploring new technologies and methodologies; I'm always asking myself, \"how can we do this better?\" Beyond development, I like to unwind through playing video games such as Valorant and Roblox as well as spending quality time with friends!"

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
    <AboutSection id="about" ref={(el) => {
      aboutRef.current = el as HTMLDivElement | null;
      (achievementRef as any).current = el;
    }}>
      <Container>
        <SectionTitle>About Me</SectionTitle>
        <AboutContent>
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
        </AboutContent>
      </Container>
    </AboutSection>
  )
}

export default About
