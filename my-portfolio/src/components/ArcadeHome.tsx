import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ArcadeHome.css'

interface GameCard {
  id: string
  title: string
  icon: string
  color: string
  route: string
  description: string
}

const ArcadeHome = () => {
  const navigate = useNavigate()
  const [selectedCard, setSelectedCard] = useState<number>(0)

  const gameCards: GameCard[] = [
    {
      id: 'about',
      title: 'PLAYER INFO',
      icon: '👤',
      color: 'var(--pixel-blue)',
      route: '/about',
      description: 'About me & contact info'
    },
    {
      id: 'skills',
      title: 'POWER-UPS',
      icon: '⚡',
      color: 'var(--pixel-yellow)',
      route: '/skills',
      description: 'Check skill inventory'
    },
    {
      id: 'experience',
      title: 'QUEST LOG',
      icon: '📜',
      color: 'var(--pixel-green)',
      route: '/experience',
      description: 'View completed quests'
    },
    {
      id: 'projects',
      title: 'BOSS BATTLES',
      icon: '🚀',
      color: 'var(--pixel-pink)',
      route: '/projects',
      description: 'Epic project showcase'
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
    <div className="arcade-home" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="arcade-header">
        <div className="arcade-title">
          <h1 className="glitch-text">THINH VO</h1>
          <div className="subtitle">PORTFOLIO ARCADE</div>
        </div>
        <div className="header-actions">
          <button className="resume-button" onClick={handleResumeClick}>
            <span className="resume-text">VIEW RESUME</span>
          </button>
          <div className="arcade-coins">
            <span className="coin-label">CREDITS:</span>
            <span className="coin-value">∞</span>
          </div>
        </div>
      </div>

      <div className="arcade-instruction">
        <p>▼ SELECT YOUR GAME ▼</p>
        <p className="instruction-hint">USE ARROW KEYS OR CLICK TO SELECT • PRESS ENTER TO START</p>
      </div>

      <div className="arcade-grid">
        {gameCards.map((card, index) => (
          <div
            key={card.id}
            className={`arcade-card ${selectedCard === index ? 'selected' : ''}`}
            onClick={() => {
              setSelectedCard(index)
              handleCardClick(card.route)
            }}
            onMouseEnter={() => setSelectedCard(index)}
            style={{ '--card-color': card.color } as React.CSSProperties}
          >
            <div className="card-screen">
              <div className="screen-glow"></div>
              <div className="card-icon">{card.icon}</div>
              <div className="card-title">{card.title}</div>
              <div className="card-description">{card.description}</div>
              <div className="insert-coin">
                {selectedCard === index ? '▶ PRESS START ◀' : 'CLICK TO PLAY'}
              </div>
            </div>
            <div className="card-base">
              <div className="card-buttons">
                <div className="button red"></div>
                <div className="button yellow"></div>
                <div className="button green"></div>
              </div>
              <div className="card-slot"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="arcade-footer">
        <div className="footer-text">
          <span className="blinking">© 2025 THINH VO</span>
          <span className="separator">|</span>
          <span>PRESS ANY KEY TO CONTINUE</span>
        </div>
      </div>
    </div>
  )
}

export default ArcadeHome
