import { useEffect, useRef, useState } from 'react'
import ResumeModal from './ResumeModal'
import './Landing.css'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

interface MouseTrail {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
}

const Landing = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const mouseTrailRef = useRef<MouseTrail[]>([])
  const [displayedName, setDisplayedName] = useState('')
  const [displayedTitle, setDisplayedTitle] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false)

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Typing animation effect
  useEffect(() => {
    const name = "Thinh Vo!"
    const title = "I'm a full-stack developer."
    let nameIndex = 0
    let titleIndex = 0
    let isTypingName = true

    const typeText = () => {
      if (isTypingName && nameIndex < name.length) {
        setDisplayedName(name.slice(0, nameIndex + 1))
        nameIndex++
        setTimeout(typeText, 100)
      } else if (isTypingName && nameIndex >= name.length) {
        isTypingName = false
        setTimeout(typeText, 500) // Pause before typing title
      } else if (!isTypingName && titleIndex < title.length) {
        setDisplayedTitle(title.slice(0, titleIndex + 1))
        titleIndex++
        setTimeout(typeText, 50)
      } else {
        // Typing complete, stop cursor blinking after a delay
        setTimeout(() => setShowCursor(false), 2000)
      }
    }

    // Start typing after a short delay
    setTimeout(typeText, 500)

    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Get the hero section element
    const heroSection = canvas.parentElement
    if (!heroSection) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      const particleCount = 150
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2
        })
      }
    }

    initParticles()

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroSection.getBoundingClientRect()
      const newX = e.clientX - rect.left
      const newY = e.clientY - rect.top
      
      // Create mouse trail particles
      if (mouseRef.current.x !== 0 && mouseRef.current.y !== 0) {
        mouseTrailRef.current.push({
          x: newX + (Math.random() - 0.5) * 5,
          y: newY + (Math.random() - 0.5) * 5,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          size: Math.random() * 2 + 1,
          opacity: 1,
          life: 0,
          maxLife: 40 + Math.random() * 20
        })
      }
      
      mouseRef.current.x = newX
      mouseRef.current.y = newY
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        // Calculate distance to mouse
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        // Apply mouse influence
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          particle.vx += (dx / distance) * force * 0.05
          particle.vy += (dy / distance) * force * 0.05
        }

        // Apply friction
        particle.vx *= 0.95
        particle.vy *= 0.95

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.save()
        ctx.globalAlpha = particle.opacity
        // Create star-like particles with purple/golden glow
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 2)
        gradient.addColorStop(0, 'rgba(232, 121, 249, 1)')
        gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.8)')
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Draw connections between nearby particles
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.save()
            ctx.globalAlpha = (100 - distance) / 100 * 0.4
            // Create constellation-like connections with purple glow
            ctx.strokeStyle = 'rgba(168, 85, 247, 0.8)'
            ctx.lineWidth = 1.5
            ctx.shadowColor = 'rgba(168, 85, 247, 0.5)'
            ctx.shadowBlur = 3
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })

      // Update and draw mouse trail particles
      mouseTrailRef.current = mouseTrailRef.current.filter((trail) => {
        trail.life++
        trail.x += trail.vx
        trail.y += trail.vy
        trail.vx *= 0.98
        trail.vy *= 0.98
        trail.opacity = 1 - (trail.life / trail.maxLife)

        if (trail.life < trail.maxLife) {
          // Draw trail particle (same style as constellation stars)
          ctx.save()
          ctx.globalAlpha = trail.opacity
          
          // Create star-like particles with purple glow (matching constellation style)
          const gradient = ctx.createRadialGradient(trail.x, trail.y, 0, trail.x, trail.y, trail.size * 2)
          gradient.addColorStop(0, 'rgba(232, 121, 249, 1)')
          gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.8)')
          gradient.addColorStop(1, 'rgba(168, 85, 247, 0)')
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(trail.x, trail.y, trail.size, 0, Math.PI * 2)
          ctx.fill()
          
          ctx.restore()
          return true
        }
        return false
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Event listeners
    heroSection.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      heroSection.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <section id="home" className="hero">
      <canvas 
        ref={canvasRef}
        className="hero-canvas"
      />
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">{displayedName}</span>
            {showCursor && displayedTitle === '' && <span className="typing-cursor">|</span>}
          </h1>
          <h2 className="hero-subtitle">
            {displayedTitle}
            {showCursor && displayedTitle !== '' && <span className="typing-cursor">|</span>}
          </h2>
          <div className="hero-buttons">
            <button onClick={scrollToAbout} className="btn-view-work">
              <span>View My Work</span>
              <svg className="down-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>
            <button onClick={() => setIsResumeModalOpen(true)} className="btn-resume">
              <span>View Resume</span>
              <svg className="resume-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        resumeUrl="./THINH_VO_RESUME.pdf"
        fileName="Thinh_Vo_Resume.pdf"
      />
    </section>
  )
}

export default Landing
