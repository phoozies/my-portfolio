import { useEffect, useState } from 'react'
import './Achievement.css'

interface AchievementProps {
  title: string
  description: string
  icon: string
  show: boolean
  onHide: () => void
}

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
    <div className={`achievement-container ${isVisible ? 'achievement-show' : 'achievement-hide'}`}>
      <div className="achievement-box">
        <div className="achievement-header">
          <span className="achievement-badge">★ ACHIEVEMENT UNLOCKED ★</span>
        </div>
        <div className="achievement-content">
          <div className="achievement-icon">{icon}</div>
          <div className="achievement-text">
            <div className="achievement-title">{title}</div>
            <div className="achievement-description">{description}</div>
          </div>
        </div>
        <div className="achievement-progress-bar">
          <div className="achievement-progress-fill"></div>
        </div>
      </div>
    </div>
  )
}

export default Achievement
