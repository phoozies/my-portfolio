import { useEffect, useRef, useState } from 'react'
import './PacManGame.css'

interface FallingItem {
  id: number
  x: number
  y: number
  speed: number
  type: 'pellet' | 'power-pellet' | 'ghost' | 'fruit'
  color: string
  size: number
  eaten: boolean
  points: number
  vulnerable?: boolean
}

const PacManGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [powerMode, setPowerMode] = useState(false)
  const itemsRef = useRef<FallingItem[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)
  const lastSpawnRef = useRef(0)
  const pacmanMouthRef = useRef(0)
  const pacmanDirectionRef = useRef({ x: 1, y: 0 })
  const lastMouseRef = useRef({ x: 0, y: 0 })
  const comboTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const powerModeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const nextIdRef = useRef(0)

  const GHOST_COLORS = ['#AC3232', '#FF8FA3', '#5FCDE4', '#F6AA61', '#D95763', '#99E550']

  const ITEM_TYPES = [
    { type: 'pellet' as const, color: '#FBF236', size: 8, points: 10, weight: 50 },
    { type: 'power-pellet' as const, color: '#99E550', size: 16, points: 50, weight: 15 },
    { type: 'ghost' as const, color: '', size: 24, points: -50, weight: 10 },
    { type: 'fruit' as const, color: '#F6AA61', size: 20, points: 100, weight: 25 }
  ]

  const getRandomItemType = () => {
    const totalWeight = ITEM_TYPES.reduce((sum, type) => sum + type.weight, 0)
    let random = Math.random() * totalWeight
    
    for (const itemType of ITEM_TYPES) {
      random -= itemType.weight
      if (random <= 0) return itemType
    }
    return ITEM_TYPES[0]
  }

  const spawnItem = (canvasWidth: number) => {
    const itemType = getRandomItemType()
    const isGhost = itemType.type === 'ghost'
    const newItem: FallingItem = {
      id: nextIdRef.current++,
      x: Math.random() * canvasWidth,
      y: -50,
      speed: 0.5 + Math.random() * 1.5,
      type: itemType.type,
      color: isGhost ? GHOST_COLORS[Math.floor(Math.random() * GHOST_COLORS.length)] : itemType.color,
      size: itemType.size,
      eaten: false,
      points: itemType.points,
      vulnerable: false
    }
    itemsRef.current.push(newItem)
  }

  const drawPacMan = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const pixelSize = 2
    const mouthOpen = Math.floor(pacmanMouthRef.current / 10) % 2 === 0
    
    // Calculate direction based on mouse movement
    const dx = x - lastMouseRef.current.x
    const dy = y - lastMouseRef.current.y
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
      pacmanDirectionRef.current = { x: dx, y: dy }
      lastMouseRef.current = { x, y }
    }

    ctx.save()
    ctx.translate(x, y)
    
    // Determine rotation (0, 90, 180, 270 degrees only - 8-bit style)
    let rotation = 0
    if (Math.abs(pacmanDirectionRef.current.x) > Math.abs(pacmanDirectionRef.current.y)) {
      rotation = pacmanDirectionRef.current.x > 0 ? 0 : Math.PI
    } else {
      rotation = pacmanDirectionRef.current.y > 0 ? Math.PI / 2 : -Math.PI / 2
    }
    ctx.rotate(rotation)
    
    ctx.fillStyle = '#FBF236'
    
    // Draw pixelated Pac-Man body
    const pixels = [
      [0,0,0,1,1,1,1,0,0,0],
      [0,0,1,1,1,1,1,1,0,0],
      [0,1,1,1,1,1,1,1,1,0],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [0,1,1,1,1,1,1,1,1,0],
      [0,0,1,1,1,1,1,1,0,0],
      [0,0,0,1,1,1,1,0,0,0]
    ]
    
    const mouthPixels = mouthOpen ? [
      [0,0,0,1,1,1,1,0,0,0],
      [0,0,1,1,1,1,0,0,0,0],
      [0,1,1,1,1,0,0,0,0,0],
      [1,1,1,1,0,0,0,0,0,0],
      [1,1,1,1,0,0,0,0,0,0],
      [1,1,1,1,0,0,0,0,0,0],
      [1,1,1,1,0,0,0,0,0,0],
      [0,1,1,1,1,0,0,0,0,0],
      [0,0,1,1,1,1,0,0,0,0],
      [0,0,0,1,1,1,1,0,0,0]
    ] : pixels
    
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (mouthPixels[row][col]) {
          ctx.fillRect(
            (col - 5) * pixelSize,
            (row - 5) * pixelSize,
            pixelSize,
            pixelSize
          )
        }
      }
    }
    
    // Draw pixelated eye
    ctx.fillStyle = '#000000'
    if (!mouthOpen || rotation === 0) {
      ctx.fillRect(-2 * pixelSize, -3 * pixelSize, pixelSize * 2, pixelSize * 2)
    }
    
    ctx.restore()
    
    pacmanMouthRef.current += 1
  }

  const drawPellet = (ctx: CanvasRenderingContext2D, item: FallingItem) => {
    ctx.fillStyle = item.color
    const pixelSize = 2
    const gridSize = item.type === 'power-pellet' ? 4 : 2
    
    // Draw pixelated square pellet
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        ctx.fillRect(
          item.x - (gridSize * pixelSize) / 2 + col * pixelSize,
          item.y - (gridSize * pixelSize) / 2 + row * pixelSize,
          pixelSize,
          pixelSize
        )
      }
    }
  }

  const drawGhost = (ctx: CanvasRenderingContext2D, item: FallingItem) => {
    const pixelSize = 2
    const isVulnerable = item.vulnerable || powerMode
    
    // 8-bit ghost sprite (12x12 pixels)
    const ghostPixels = [
      [0,0,0,1,1,1,1,1,1,0,0,0],
      [0,0,1,1,1,1,1,1,1,1,0,0],
      [0,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,2,2,1,1,1,1,2,2,1,0],
      [1,1,2,2,1,1,1,1,2,2,1,1],
      [1,1,3,3,1,1,1,1,3,3,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,0,1,1,1,1,0,1,1,1],
      [1,1,0,0,0,1,1,0,0,0,1,1]
    ]
    
    for (let row = 0; row < 12; row++) {
      for (let col = 0; col < 12; col++) {
        const pixel = ghostPixels[row][col]
        if (pixel === 1) {
          ctx.fillStyle = isVulnerable ? '#5FCDE4' : item.color
        } else if (pixel === 2) {
          ctx.fillStyle = isVulnerable ? '#0D0E14' : '#FFFFFF'
        } else if (pixel === 3) {
          ctx.fillStyle = isVulnerable ? '#FFFFFF' : '#0D0E14'
        } else {
          continue
        }
        
        ctx.fillRect(
          item.x - 12 + col * pixelSize,
          item.y - 12 + row * pixelSize,
          pixelSize,
          pixelSize
        )
      }
    }
  }

  const drawFruit = (ctx: CanvasRenderingContext2D, item: FallingItem) => {
    const pixelSize = 2
    
    // 8-bit strawberry sprite (10x10 pixels)
    const fruitPixels = [
      [0,0,0,2,2,2,2,0,0,0],
      [0,0,2,2,2,2,2,2,0,0],
      [0,0,1,1,1,1,1,1,0,0],
      [0,1,1,1,1,1,1,1,1,0],
      [0,1,3,1,1,1,3,1,1,0],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,3,1,3,1,1,1,1],
      [0,1,1,1,1,1,1,1,1,0],
      [0,0,1,1,1,1,1,1,0,0],
      [0,0,0,1,1,1,1,0,0,0]
    ]
    
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const pixel = fruitPixels[row][col]
        if (pixel === 1) {
          ctx.fillStyle = item.color // Orange/red body
        } else if (pixel === 2) {
          ctx.fillStyle = '#99E550' // Green leaves
        } else if (pixel === 3) {
          ctx.fillStyle = '#FBF236' // Yellow seeds
        } else {
          continue
        }
        
        ctx.fillRect(
          item.x - 10 + col * pixelSize,
          item.y - 10 + row * pixelSize,
          pixelSize,
          pixelSize
        )
      }
    }
  }

  const checkCollision = (x: number, y: number, item: FallingItem): boolean => {
    const dx = x - item.x
    const dy = y - item.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    // Adjusted for pixelated Pac-Man size (10 pixels * 2 pixel size = 20px radius)
    return distance < (20 + item.size)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const animate = (timestamp: number) => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Spawn new items
      if (timestamp - lastSpawnRef.current > 800) {
        spawnItem(canvas.width)
        lastSpawnRef.current = timestamp
      }

      // Update and draw items
      itemsRef.current = itemsRef.current.filter(item => {
        if (item.eaten) return false

        item.y += item.speed

        // Check collision with Pac-Man
        if (checkCollision(mouseRef.current.x, mouseRef.current.y, item)) {
          item.eaten = true
          
          // Handle power pellet
          if (item.type === 'power-pellet') {
            setPowerMode(true)
            
            // Clear existing power mode timer
            if (powerModeTimerRef.current) clearTimeout(powerModeTimerRef.current)
            
            // Set new power mode timer
            powerModeTimerRef.current = setTimeout(() => {
              setPowerMode(false)
            }, 6000)
          }
          
          let points = item.points
          
          // Handle ghost collision
          if (item.type === 'ghost') {
            if (powerMode || item.vulnerable) {
              // Vulnerable ghost: double the regular pellet points
              points = 20
            } else {
              // Regular ghost: negative points
              points = -50
            }
          }
          
          // Apply combo multiplier for positive points
          if (points > 0) {
            const comboMultiplier = Math.floor(combo / 5) + 1
            points = points * comboMultiplier
            setCombo(prev => prev + 1)
          } else {
            // Reset combo on negative points
            setCombo(0)
          }
          
          setScore(prev => Math.max(0, prev + points))

          // Reset combo timer for positive points
          if (points > 0) {
            if (comboTimerRef.current) clearTimeout(comboTimerRef.current)
            comboTimerRef.current = setTimeout(() => setCombo(0), 2000)
          }

          return false
        }

        // Remove if off screen
        if (item.y > canvas.height + 50) {
          return false
        }

        // Draw item based on type
        if (item.type === 'pellet' || item.type === 'power-pellet') {
          drawPellet(ctx, item)
        } else if (item.type === 'ghost') {
          drawGhost(ctx, item)
        } else if (item.type === 'fruit') {
          drawFruit(ctx, item)
        }

        return true
      })

      // Draw Pac-Man cursor
      drawPacMan(ctx, mouseRef.current.x, mouseRef.current.y)

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (comboTimerRef.current) clearTimeout(comboTimerRef.current)
      if (powerModeTimerRef.current) clearTimeout(powerModeTimerRef.current)
    }
  }, [combo, powerMode])

  return (
    <>
      <canvas ref={canvasRef} className="pacman-canvas" />
      <div className="score-display">
        <div className="score-label">SCORE</div>
        <div className="score-value">{score.toString().padStart(6, '0')}</div>
        {powerMode && (
          <div className="power-mode-indicator">
            POWER MODE
          </div>
        )}
        {combo > 1 && (
          <div className="combo-display">
            COMBO x{Math.floor(combo / 5) + 1}!
          </div>
        )}
      </div>
    </>
  )
}

export default PacManGame
