import { useState, useEffect } from 'react'
import { Box, keyframes } from '@mui/material'
import { styled } from '@mui/material/styles'

const floatIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

const pulse = keyframes`
  0% {
    box-shadow: 0 4px 20px rgba(168, 85, 247, 0.4);
  }
  50% {
    box-shadow: 0 4px 20px rgba(168, 85, 247, 0.6), 0 0 30px rgba(168, 85, 247, 0.4);
  }
  100% {
    box-shadow: 0 4px 20px rgba(168, 85, 247, 0.4);
  }
`

const twinkle = keyframes`
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`

const BackToTopButton = styled('button')({
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
  width: '60px',
  height: '60px',
  background: 'var(--white-soft)',
  border: '3px solid var(--sakura-accent)',
  borderRadius: 0,
  cursor: 'pointer',
  boxShadow: '4px 4px 0 var(--sakura-pink)',
  zIndex: 999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  animation: `${floatIn} 0.5s ease-out, ${pulse} 2s ease-in-out 1s`,
  overflow: 'visible',
  willChange: 'transform',

  '&:hover': {
    transform: 'translate(4px, 4px)',
    boxShadow: '0 0 0 var(--sakura-pink)',
    background: 'var(--sakura-accent)',

    '& .constellation-icon': {
      opacity: 1,
      transform: 'rotate(180deg)',
    },

    '& .back-to-top-text': {
      color: 'var(--white-soft)',
    },
  },

  '&:active': {
    transform: 'translate(6px, 6px)',
    boxShadow: '0 0 0 var(--sakura-pink)',
  },

  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none !important',
    transition: 'none !important',
    
    '&:hover': {
      transform: 'none !important',
    },

    '& .constellation-icon': {
      transition: 'none !important',
    },

    '&:hover .constellation-icon': {
      transform: 'none !important',
    },

    '& .star': {
      animation: 'none !important',
    },
  },

  '@media (max-width: 768px)': {
    bottom: '1.5rem',
    right: '1.5rem',
    width: '50px',
    height: '50px',
  },
})

const ConstellationIcon = styled(Box)({
  position: 'absolute',
  width: '30px',
  height: '30px',
  opacity: 0.6,
  transition: 'all 0.3s ease',

  '@media (max-width: 768px)': {
    width: '25px',
    height: '25px',
  },
})

const Star = styled('div')({
  position: 'absolute',
  width: '3px',
  height: '3px',
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '50%',
  boxShadow: '0 0 6px rgba(255, 255, 255, 0.6)',

  '&:nth-of-type(1)': {
    top: '5px',
    left: '10px',
    animation: `${twinkle} 2s ease-in-out infinite`,
  },

  '&:nth-of-type(2)': {
    top: '15px',
    right: '8px',
    animation: `${twinkle} 2s ease-in-out infinite 0.5s`,
  },

  '&:nth-of-type(3)': {
    bottom: '8px',
    left: '15px',
    animation: `${twinkle} 2s ease-in-out infinite 1s`,
  },
})

const ConstellationLines = styled('div')({
  position: 'absolute',
  top: '8px',
  left: '10px',
  width: '15px',
  height: '15px',
  borderTop: '1px solid rgba(255, 255, 255, 0.4)',
  borderRight: '1px solid rgba(255, 255, 255, 0.4)',
  transform: 'rotate(45deg)',
  opacity: 0.5,
})

const BackToTopText = styled('span')({
  fontSize: '1.5rem',
  color: 'var(--sakura-accent)',
  fontWeight: 600,
  zIndex: 2,
  position: 'relative',
  transition: 'color 0.3s ease',

  '@media (max-width: 768px)': {
    fontSize: '1.2rem',
  },
})

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      
      // Show button when user scrolls past one screen height
      setIsVisible(scrollPosition > windowHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) return null

  return (
    <BackToTopButton 
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ConstellationIcon className="constellation-icon">
        <Star className="star" />
        <Star className="star" />
        <Star className="star" />
        <ConstellationLines />
      </ConstellationIcon>
      <BackToTopText className="back-to-top-text">↑</BackToTopText>
    </BackToTopButton>
  )
}

export default BackToTop
