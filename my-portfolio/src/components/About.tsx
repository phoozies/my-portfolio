import { useEffect, useRef, useState } from 'react'
import './About.css'
import { useTypingAnimation } from '../hooks/useTypingAnimation'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const aboutRef = useRef<HTMLDivElement>(null)

  const aboutText = "Driven by the belief that technology should make life better, I'm a full-stack developer committed to building solutions that matter. I'm constantly exploring new technologies and methodologies; I'm always asking myself, \"how can we do this better?\" Beyond development, I like to unwind through playing video games such as Valorant and Roblox as well as spending quality time with friends!"

  const { displayedText, isTyping } = useTypingAnimation({
    text: isVisible ? aboutText : '',
    speed: 30,
    startDelay: 500
  })

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
    <section id="about" className="about" ref={aboutRef}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p className="about-intro">
              {displayedText}
              <span className={`typing-cursor ${isTyping ? 'blinking' : 'hidden'}`}>|</span>
            </p>
          </div>
          <div className="hero-image">
            <div className="profile-image">
              <img 
                src="./thinh_vo_headshot.jpg" 
                alt="Thinh Vo - Professional Headshot" 
                className="headshot"
                onError={() => {
                  console.error('Failed to load headshot image');
                  console.log('Trying fallback...');
                }}
                onLoad={() => console.log('Headshot image loaded successfully')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
