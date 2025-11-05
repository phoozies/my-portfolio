import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Paper } from '@mui/material'
import { styled, keyframes } from '@mui/material/styles'

interface GameCard {
  id: string
  title: string
  icon: string
  color: string
  hoverColor: string
  route: string
  description: string
}

// Pixel blink animation
const pixelBlink = keyframes`
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0.7;
  }
`

// Scanline effect
const ArcadeContainer = styled(Box)({
  minHeight: '100vh',
  background: 'var(--pixel-dark)',
  color: 'var(--pixel-light)',
  padding: '2rem 1rem',
  fontFamily: "'Courier New', monospace",
  overflowY: 'auto',
  overflowX: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: '3rem',
  '@media (max-width: 768px)': {
    padding: '1rem',
    gap: '2rem',
  },
  '&::before': {
    content: '""',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.15) 0px,
      rgba(0, 0, 0, 0.15) 2px,
      transparent 2px,
      transparent 4px
    )`,
    pointerEvents: 'none',
    zIndex: 1,
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  },
})

// 8-bit boxy card
const ArcadeCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'cardColor' && prop !== 'hoverColor' && prop !== 'isSelected',
})<{ cardColor: string; hoverColor: string; isSelected: boolean }>(({ cardColor, hoverColor, isSelected }) => ({
  background: 'var(--pixel-bg)',
  border: `8px solid ${isSelected ? cardColor : 'var(--pixel-grey)'}`,
  borderRadius: 0,
  cursor: 'pointer',
  position: 'relative',
  boxShadow: `12px 12px 0 ${isSelected ? cardColor : 'var(--pixel-darker)'}`,
  transition: 'all 0.1s ease',
  imageRendering: 'pixelated',
  '&:hover': {
    transform: 'translate(-4px, -4px)',
    boxShadow: `16px 16px 0 ${hoverColor}`,
    borderColor: hoverColor,
    '& .card-screen': {
      background: `linear-gradient(135deg, var(--pixel-darker) 0%, ${hoverColor}22 100%)`,
    },
    '& .card-title': {
      color: hoverColor,
      textShadow: `4px 4px 0 var(--pixel-dark)`,
    },
    '& .card-icon': {
      filter: `drop-shadow(6px 6px 0 ${hoverColor})`,
      transform: 'scale(1.1)',
    },
  },
  '&:active': {
    transform: 'translate(4px, 4px)',
    boxShadow: `4px 4px 0 ${cardColor}`,
  },
}))

const CardScreen = styled(Box)({
  background: 'var(--pixel-darker)',
  padding: '2.5rem 2rem',
  borderBottom: '6px solid var(--pixel-grey)',
  minHeight: '340px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
})

const CardIcon = styled(Box)({
  fontSize: '5rem',
  marginBottom: '1rem',
  filter: 'drop-shadow(4px 4px 0 var(--pixel-purple))',
  transition: 'all 0.2s ease',
})

const CardTitle = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: 'var(--pixel-yellow)',
  letterSpacing: '4px',
  marginBottom: '0.75rem',
  textShadow: '4px 4px 0 var(--pixel-purple)',
  textAlign: 'center',
  imageRendering: 'pixelated',
  fontFamily: "'Courier New', monospace",
  transition: 'all 0.2s ease',
})

const CardDescription = styled(Typography)({
  fontSize: '0.9rem',
  color: 'var(--pixel-cyan)',
  letterSpacing: '1px',
  marginBottom: '1.5rem',
  textAlign: 'center',
  fontFamily: "'Courier New', monospace",
})

const InsertCoin = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'cardColor',
})<{ isSelected: boolean; cardColor: string }>(({ isSelected, cardColor }) => ({
  fontSize: '0.85rem',
  color: isSelected ? cardColor : 'var(--pixel-green)',
  letterSpacing: '2px',
  padding: '0.75rem 1.25rem',
  border: `4px solid ${isSelected ? cardColor : 'var(--pixel-green)'}`,
  background: 'var(--pixel-dark)',
  animation: `${pixelBlink} ${isSelected ? '0.5s' : '1s'} step-end infinite`,
  fontFamily: "'Courier New', monospace",
  fontWeight: 700,
}))

const CardBase = styled(Box)({
  background: 'linear-gradient(to bottom, var(--pixel-bg) 0%, var(--pixel-darker) 100%)',
  padding: '1.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: '2px solid var(--pixel-darker)',
})

const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
  padding: '1.5rem',
  background: 'var(--pixel-darker)',
  border: '8px solid var(--pixel-cyan)',
  boxShadow: '12px 12px 0 var(--pixel-purple)',
  borderRadius: 0,
})

const ArcadeHome = () => {
  const navigate = useNavigate()
  const [selectedCard, setSelectedCard] = useState<number>(0)

  const gameCards: GameCard[] = [
    {
      id: 'about',
      title: 'PLAYER INFO',
      icon: '👤',
      color: 'var(--pixel-blue)',
      hoverColor: '#00E8FC',
      route: '/about',
      description: 'Learn more about me!'
    },
    {
      id: 'skills',
      title: 'POWER-UPS',
      icon: '⚡',
      color: 'var(--pixel-yellow)',
      hoverColor: '#FFD93D',
      route: '/skills',
      description: 'Check out my skills!'
    },
    {
      id: 'experience',
      title: 'QUEST LOG',
      icon: '📜',
      color: 'var(--pixel-green)',
      hoverColor: '#99E550',
      route: '/experience',
      description: 'View my work experience!'
    },
    {
      id: 'projects',
      title: 'BOSS BATTLES',
      icon: '🚀',
      color: 'var(--pixel-pink)',
      hoverColor: '#FF6B9D',
      route: '/projects',
      description: 'Look at my projects!'
    }
  ]

  const handleCardClick = (route: string) => {
    navigate(route)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSelectedCard((prev) => (prev > 0 ? prev - 1 : gameCards.length - 1))
    } else if (e.key === 'ArrowRight') {
      setSelectedCard((prev) => (prev < gameCards.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'Enter') {
      handleCardClick(gameCards[selectedCard].route)
    }
  }

  const handleResumeClick = () => {
    window.open('/THINH_VO_RESUME.pdf', '_blank')
  }

  return (
    <ArcadeContainer onKeyDown={handleKeyDown} tabIndex={0}>
      <Header>
        <Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 700,
              color: 'var(--pixel-yellow)',
              textShadow: '4px 4px 0 var(--pixel-purple)',
              letterSpacing: { xs: '2px', sm: '4px', md: '8px' },
              margin: 0,
              fontFamily: "'Courier New', monospace",
              imageRendering: 'pixelated',
            }}
          >
            THINH VO
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '0.7rem', sm: '0.85rem', md: '1rem' },
              color: 'var(--pixel-cyan)',
              letterSpacing: { xs: '2px', md: '4px' },
              marginTop: '0.25rem',
              textShadow: '2px 2px 0 var(--pixel-purple)',
              fontFamily: "'Courier New', monospace",
              imageRendering: 'pixelated',
            }}
          >
            PORTFOLIO ARCADE
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: '0.5rem', md: '1rem' }, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box
            component="button"
            onClick={handleResumeClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              background: 'var(--pixel-green)',
              color: 'var(--pixel-dark)',
              border: '4px solid var(--pixel-dark)',
              borderRadius: 0,
              fontFamily: "'Courier New', monospace",
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              cursor: 'pointer',
              boxShadow: '6px 6px 0 var(--pixel-purple)',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translate(-2px, -2px)',
                boxShadow: '8px 8px 0 var(--pixel-purple)',
                background: 'var(--pixel-yellow)',
              },
              '&:active': {
                transform: 'translate(2px, 2px)',
                boxShadow: '2px 2px 0 var(--pixel-purple)',
              },
            }}
          >
            VIEW RESUME
          </Box>
        </Box>
      </Header>

      <Box sx={{ textAlign: 'center', marginBottom: '1rem' }}>
        <Typography
          sx={{
            fontSize: { xs: '0.85rem', md: '1rem' },
            color: 'var(--pixel-green)',
            letterSpacing: '3px',
            margin: '0.25rem 0',
            animation: `${pixelBlink} 1s step-end infinite`,
            fontFamily: "'Courier New', monospace",
            imageRendering: 'pixelated',
          }}
        >
          ▼ SELECT YOUR GAME ▼
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '0.6rem', md: '0.7rem' },
            color: 'var(--pixel-grey)',
            fontFamily: "'Courier New', monospace",
            letterSpacing: '1px',
          }}
        >
          USE ARROW KEYS OR CLICK TO SELECT • PRESS ENTER TO START
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: { xs: '1rem', md: '1.5rem' },
          maxWidth: '1400px',
          margin: '0 auto',
          padding: { xs: '0 0.5rem', md: '0 1rem' },
          flex: 1,
          alignItems: 'center',
        }}
      >
        {gameCards.map((card, index) => (
          <ArcadeCard
            key={card.id}
            cardColor={card.color}
            hoverColor={card.hoverColor}
            isSelected={selectedCard === index}
            onClick={() => {
              setSelectedCard(index)
              handleCardClick(card.route)
            }}
            onMouseEnter={() => setSelectedCard(index)}
            elevation={0}
          >
            <CardScreen className="card-screen">
              <CardIcon className="card-icon">{card.icon}</CardIcon>
              <CardTitle className="card-title">{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
              <InsertCoin isSelected={selectedCard === index} cardColor={card.color}>
                {selectedCard === index ? '▶ PRESS START ◀' : 'CLICK TO PLAY'}
              </InsertCoin>
            </CardScreen>
            <CardBase>
              <Box sx={{ display: 'flex', gap: '0.8rem' }}>
                <Box
                  sx={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'var(--pixel-pink)',
                    border: '4px solid var(--pixel-darker)',
                    boxShadow: 'inset 0 -4px 0 rgba(0, 0, 0, 0.4)',
                  }}
                />
                <Box
                  sx={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'var(--pixel-yellow)',
                    border: '4px solid var(--pixel-darker)',
                    boxShadow: 'inset 0 -4px 0 rgba(0, 0, 0, 0.4)',
                  }}
                />
                <Box
                  sx={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'var(--pixel-green)',
                    border: '4px solid var(--pixel-darker)',
                    boxShadow: 'inset 0 -4px 0 rgba(0, 0, 0, 0.4)',
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: '80px',
                  height: '8px',
                  background: 'var(--pixel-dark)',
                  border: '3px solid var(--pixel-darker)',
                  borderRadius: '2px',
                }}
              />
            </CardBase>
          </ArcadeCard>
        ))}
      </Box>

      <Box
        sx={{
          padding: '1.5rem',
          textAlign: 'center',
          border: '8px solid var(--pixel-cyan)',
          background: 'var(--pixel-darker)',
          boxShadow: '12px 12px 0 var(--pixel-purple)',
          borderRadius: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: '0.5rem', md: '2rem' },
            flexDirection: { xs: 'column', sm: 'row' },
            fontSize: { xs: '0.8rem', md: '1rem' },
            color: 'var(--pixel-light)',
            letterSpacing: '3px',
            fontFamily: "'Courier New', monospace",
            imageRendering: 'pixelated',
          }}
        >
          <Typography
            component="span"
            sx={{
              animation: `${pixelBlink} 1s step-end infinite`,
              fontFamily: "'Courier New', monospace",
              fontSize: 'inherit',
            }}
          >
            © 2025 THINH VO
          </Typography>
          <Typography
            component="span"
            sx={{
              color: 'var(--pixel-cyan)',
              fontSize: '1.5rem',
              display: { xs: 'none', sm: 'inline' },
            }}
          >
            |
          </Typography>
          <Typography
            component="span"
            sx={{
              fontFamily: "'Courier New', monospace",
              fontSize: 'inherit',
            }}
          >
            PRESS ANY KEY TO CONTINUE
          </Typography>
        </Box>
      </Box>
    </ArcadeContainer>
  )
}

export default ArcadeHome
