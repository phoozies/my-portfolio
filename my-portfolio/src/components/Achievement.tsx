import { useEffect, useState } from 'react'
import { Box, keyframes } from '@mui/material'
import { styled } from '@mui/material/styles'

interface AchievementProps {
  title: string
  description: string
  icon: string
  show: boolean
  onHide: () => void
}

const achievementSlideIn = keyframes`
  0% {
    transform: translateX(400px) scale(0.8);
    opacity: 0;
  }
  50% {
    transform: translateX(-20px) scale(1.05);
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
`

const achievementSlideOut = keyframes`
  0% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateX(400px) scale(0.8);
    opacity: 0;
  }
`

const achievementBlink = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.7;
  }
`

const achievementIconBounce = keyframes`
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(1.1);
  }
`

const achievementProgress = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`

const achievementSound = keyframes`
  0% {
    opacity: 1;
    transform: scale(0.5) translateY(0);
  }
  100% {
    opacity: 0;
    transform: scale(2) translateY(-20px);
  }
`

const AchievementContainer = styled(Box)<{ isVisible: boolean }>(({ isVisible }) => ({
  position: 'fixed',
  top: '20px',
  right: '20px',
  zIndex: 99999,
  fontFamily: "'Courier New', monospace",
  pointerEvents: 'none',
  animation: `${isVisible ? achievementSlideIn : achievementSlideOut} 0.5s ${isVisible ? 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'ease-in'} forwards`,

  '@media (max-width: 768px)': {
    top: '80px',
    right: '10px',
    left: '10px',
  },
}))

const AchievementBox = styled(Box)({
  background: 'var(--pixel-darker)',
  border: '6px solid var(--pixel-yellow)',
  boxShadow: '8px 8px 0 var(--pixel-purple), 0 0 20px rgba(251, 242, 54, 0.5)',
  minWidth: '350px',
  maxWidth: '400px',
  overflow: 'hidden',
  position: 'relative',

  '&::before': {
    content: '"♪"',
    position: 'absolute',
    top: '10px',
    left: '10px',
    fontSize: '1.5rem',
    color: 'var(--pixel-green)',
    opacity: 0,
    animation: `${achievementSound} 0.6s ease-out`,
  },

  '@media (max-width: 768px)': {
    minWidth: 'unset',
    maxWidth: 'unset',
  },
})

const AchievementHeader = styled(Box)({
  background: 'var(--pixel-yellow)',
  padding: '0.5rem 1rem',
  textAlign: 'center',
  borderBottom: '4px solid var(--pixel-orange)',
})

const AchievementBadge = styled('span')({
  color: 'var(--pixel-darker)',
  fontSize: '0.8rem',
  fontWeight: 700,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  textShadow: '2px 2px 0 rgba(0, 0, 0, 0.2)',
  animation: `${achievementBlink} 0.5s infinite alternate`,
})

const AchievementContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '1rem',
  background: 'linear-gradient(to bottom, var(--pixel-bg) 0%, var(--pixel-darker) 100%)',

  '@media (max-width: 768px)': {
    gap: '0.75rem',
    padding: '0.75rem',
  },
})

const AchievementIcon = styled(Box)({
  fontSize: '3rem',
  minWidth: '60px',
  textAlign: 'center',
  filter: 'drop-shadow(2px 2px 0 var(--pixel-purple))',
  animation: `${achievementIconBounce} 0.6s ease-in-out infinite`,

  '@media (max-width: 768px)': {
    fontSize: '2rem',
    minWidth: '40px',
  },
})

const AchievementText = styled(Box)({
  flex: 1,
})

const AchievementTitle = styled('div')({
  color: 'var(--pixel-yellow)',
  fontSize: '1.1rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  marginBottom: '0.3rem',
  textShadow: '2px 2px 0 var(--pixel-purple)',

  '@media (max-width: 768px)': {
    fontSize: '0.9rem',
  },
})

const AchievementDescription = styled('div')({
  color: 'var(--pixel-cyan)',
  fontSize: '0.85rem',
  lineHeight: 1.3,
  letterSpacing: '0.5px',

  '@media (max-width: 768px)': {
    fontSize: '0.75rem',
  },
})

const AchievementProgressBar = styled(Box)({
  height: '8px',
  background: 'var(--pixel-dark)',
  borderTop: '4px solid var(--pixel-purple)',
  overflow: 'hidden',
})

const AchievementProgressFill = styled('div')({
  height: '100%',
  background: 'repeating-linear-gradient(90deg, var(--pixel-green) 0px, var(--pixel-green) 10px, var(--pixel-cyan) 10px, var(--pixel-cyan) 20px)',
  animation: `${achievementProgress} 4s linear forwards`,
})

const Achievement = ({ title, description, icon, show, onHide }: AchievementProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      
      // Hide after 4 seconds
      const hideTimer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onHide, 500) // Wait for exit animation
      }, 4000)

      return () => clearTimeout(hideTimer)
    }
  }, [show, onHide])

  if (!show && !isVisible) return null

  return (
    <AchievementContainer isVisible={isVisible}>
      <AchievementBox>
        <AchievementHeader>
          <AchievementBadge>★ ACHIEVEMENT UNLOCKED ★</AchievementBadge>
        </AchievementHeader>
        <AchievementContent>
          <AchievementIcon>{icon}</AchievementIcon>
          <AchievementText>
            <AchievementTitle>{title}</AchievementTitle>
            <AchievementDescription>{description}</AchievementDescription>
          </AchievementText>
        </AchievementContent>
        <AchievementProgressBar>
          <AchievementProgressFill />
        </AchievementProgressBar>
      </AchievementBox>
    </AchievementContainer>
  )
}

export default Achievement
