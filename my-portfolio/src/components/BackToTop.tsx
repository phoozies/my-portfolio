import { useState, useEffect } from 'react'
import './BackToTop.css'

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
    <button 
      className="back-to-top"
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <div className="constellation-icon">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="constellation-lines"></div>
      </div>
      <span className="back-to-top-text">↑</span>
    </button>
  )
}

export default BackToTop
