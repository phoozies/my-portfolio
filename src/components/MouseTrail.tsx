import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'

interface Trail {
  id: number
  x: number
  y: number
}

const TrailDot = styled('div')<{ x: number; y: number; delay: number }>(({ x, y, delay }) => ({
  position: 'fixed',
  left: x,
  top: y,
  width: '8px',
  height: '8px',
  background: 'var(--terminal-text)',
  pointerEvents: 'none',
  zIndex: 9999,
  opacity: 0,
  transform: 'translate(-50%, -50%)',
  animation: `trailFade 0.6s ease-out ${delay}s`,
  
  '@keyframes trailFade': {
    '0%': {
      opacity: 1,
      transform: 'translate(-50%, -50%) scale(1)',
    },
    '100%': {
      opacity: 0,
      transform: 'translate(-50%, -50%) scale(0)',
    },
  },
}))

const Cursor = styled('div')<{ x: number; y: number }>(({ x, y }) => ({
  position: 'fixed',
  left: x,
  top: y,
  width: '12px',
  height: '12px',
  border: '2px solid var(--terminal-text)',
  borderRadius: '50%',
  pointerEvents: 'none',
  zIndex: 10000,
  transform: 'translate(-50%, -50%)',
  transition: 'width 0.1s ease, height 0.1s ease',
  mixBlendMode: 'difference',
}))

const MouseTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trails, setTrails] = useState<Trail[]>([])
  const [isClicking, setIsClicking] = useState(false)
  const [trailId, setTrailId] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      if (isClicking) {
        const newTrail: Trail = {
          id: trailId,
          x: e.clientX,
          y: e.clientY,
        }
        setTrails((prev) => [...prev, newTrail])
        setTrailId((prev) => prev + 1)

        // Remove trail after animation completes
        setTimeout(() => {
          setTrails((prev) => prev.filter((trail) => trail.id !== newTrail.id))
        }, 600)
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) { // Left click only
        setIsClicking(true)
      }
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isClicking, trailId])

  if (isMobile) return null

  return (
    <>
      <Cursor x={mousePosition.x} y={mousePosition.y} />
      {trails.map((trail, index) => (
        <TrailDot
          key={trail.id}
          x={trail.x}
          y={trail.y}
          delay={index * 0.02}
        />
      ))}
    </>
  )
}

export default MouseTrail
