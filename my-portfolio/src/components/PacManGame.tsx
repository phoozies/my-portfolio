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
  fruitType?: { name: string; color: string; secondaryColor: string }
}

const PacManGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const itemsRef = useRef<FallingItem[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)
  const lastSpawnRef = useRef(0)
  const pacmanMouthRef = useRef(0)
  const pacmanDirectionRef = useRef({ x: 1, y: 0 })
  const lastMouseRef = useRef({ x: 0, y: 0 })
  const comboTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const nextIdRef = useRef(0)

  const GHOST_COLORS = [
    '#AC3232', // Red (Blinky)
    '#FF8FA3', // Pink (Pinky)
    '#5FCDE4', // Cyan (Inky)
    '#F6AA61', // Orange (Clyde)
    '#D95763', // Dark Red
    '#99E550', // Green
    '#8B4789', // Purple
    '#FFD93D', // Yellow
    '#00E8FC', // Light Blue
    '#FF6B9D'  // Hot Pink
  ]

  const FRUIT_TYPES = [
    { name: 'cherry', color: '#AC3232', secondaryColor: '#99E550' },
    { name: 'strawberry', color: '#F6AA61', secondaryColor: '#99E550' },
    { name: 'orange', color: '#F6AA61', secondaryColor: '#FFD93D' },
    { name: 'apple', color: '#AC3232', secondaryColor: '#8B4789' },
    { name: 'melon', color: '#99E550', secondaryColor: '#FFD93D' },
    { name: 'bell', color: '#FFD93D', secondaryColor: '#F6AA61' },
    { name: 'key', color: '#5FCDE4', secondaryColor: '#00E8FC' }
  ]

  const ITEM_TYPES = [
    { type: 'pellet' as const, color: '#FBF236', size: 32, points: 10, weight: 50 },
    { type: 'power-pellet' as const, color: '#99E550', size: 64, points: 50, weight: 15 },
    { type: 'ghost' as const, color: '', size: 24, points: -50, weight: 15 },
    { type: 'fruit' as const, color: '#F6AA61', size: 20, points: 100, weight: 20 }
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
    const isFruit = itemType.type === 'fruit'
    
    // Select random fruit type if spawning fruit
    const randomFruit = isFruit ? FRUIT_TYPES[Math.floor(Math.random() * FRUIT_TYPES.length)] : undefined
    
    const newItem: FallingItem = {
      id: nextIdRef.current++,
      x: Math.random() * canvasWidth,
      y: -50,
      speed: 0.5 + Math.random() * 1.5,
      type: itemType.type,
      color: isGhost 
        ? GHOST_COLORS[Math.floor(Math.random() * GHOST_COLORS.length)] 
        : (isFruit && randomFruit ? randomFruit.color : itemType.color),
      size: itemType.size,
      eaten: false,
      points: itemType.points,
      vulnerable: false,
      fruitType: randomFruit
    }
    itemsRef.current.push(newItem)
  }

  const drawPacMan = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const pixelSize = 3
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
    
    // Draw pixelated Pac-Man body (14x14 grid for bigger, rounder shape)
    const pixels = [
      [0,0,0,0,1,1,1,1,1,1,0,0,0,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,0,0,0,1,1,1,1,1,1,0,0,0,0]
    ]
    
    const mouthPixels = mouthOpen ? [
      [0,0,0,0,1,1,1,1,1,1,0,0,0,0],
      [0,0,1,1,1,1,1,1,1,0,0,0,0,0],
      [0,1,1,1,1,1,1,1,0,0,0,0,0,0],
      [0,1,1,1,1,1,1,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,0,0,0,0,0,0,0,0],
      [0,1,1,1,1,1,1,0,0,0,0,0,0,0],
      [0,1,1,1,1,1,1,1,0,0,0,0,0,0],
      [0,0,1,1,1,1,1,1,1,0,0,0,0,0],
      [0,0,0,0,1,1,1,1,1,1,0,0,0,0]
    ] : pixels
    
    for (let row = 0; row < 14; row++) {
      for (let col = 0; col < 14; col++) {
        if (mouthPixels[row][col]) {
          ctx.fillRect(
            (col - 7) * pixelSize,
            (row - 7) * pixelSize,
            pixelSize,
            pixelSize
          )
        }
      }
    }
    
    // Draw pixelated eye
    ctx.fillStyle = '#000000'
    if (!mouthOpen || rotation === 0) {
      ctx.fillRect(-3 * pixelSize, -4 * pixelSize, pixelSize * 2, pixelSize * 2)
    }
    
    ctx.restore()
    
    pacmanMouthRef.current += 1
  }

  const drawPellet = (ctx: CanvasRenderingContext2D, item: FallingItem) => {
    ctx.fillStyle = item.color
    const pixelSize = 3
    const gridSize = item.type === 'power-pellet' ? 6 : 3
    
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
    const isVulnerable = item.vulnerable
    
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
    const fruitType = item.fruitType?.name || 'cherry'
    
    // Define unique 8-bit sprites for each fruit (10x10 pixels)
    // 0=transparent, 1=main color, 2=accent color, 3=detail color
    const fruitSprites: Record<string, number[][]> = {
      cherry: [
        [0,0,0,0,2,2,0,0,0,0],
        [0,0,0,2,2,2,2,0,0,0],
        [0,0,1,1,0,0,1,1,0,0],
        [0,1,1,1,1,1,1,1,1,0],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [0,1,1,1,1,1,1,1,1,0],
        [0,0,1,1,1,1,1,1,0,0],
        [0,0,0,1,1,1,1,0,0,0],
        [0,0,0,0,1,1,0,0,0,0]
      ],
      strawberry: [
        [0,0,0,2,2,2,2,0,0,0],
        [0,0,2,2,2,2,2,2,0,0],
        [0,0,1,1,1,1,1,1,0,0],
        [0,1,1,3,1,1,3,1,1,0],
        [0,1,1,1,1,1,1,1,1,0],
        [1,1,1,3,1,3,1,3,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [0,1,1,1,1,1,1,1,1,0],
        [0,0,1,1,1,1,1,1,0,0],
        [0,0,0,1,1,1,1,0,0,0]
      ],
      orange: [
        [0,0,0,2,2,2,0,0,0,0],
        [0,0,2,2,2,2,2,0,0,0],
        [0,1,1,1,1,1,1,1,0,0],
        [1,1,1,1,1,1,1,1,1,0],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,0,0],
        [0,0,1,1,1,1,1,0,0,0],
        [0,0,0,1,1,1,0,0,0,0]
      ],
      apple: [
        [0,0,0,0,2,0,0,0,0,0],
        [0,0,0,2,2,2,0,0,0,0],
        [0,0,1,1,2,1,1,0,0,0],
        [0,1,1,1,1,1,1,1,0,0],
        [1,1,1,1,1,1,1,1,1,0],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,0,0],
        [0,0,1,1,1,1,1,0,0,0],
        [0,0,0,1,1,1,0,0,0,0]
      ],
      melon: [
        [0,0,2,2,2,2,2,2,0,0],
        [0,2,1,1,1,1,1,1,2,0],
        [2,1,1,3,1,1,3,1,1,2],
        [2,1,1,1,1,1,1,1,1,2],
        [2,1,3,1,1,1,1,3,1,2],
        [2,1,1,1,1,1,1,1,1,2],
        [2,1,1,3,1,1,3,1,1,2],
        [0,2,1,1,1,1,1,1,2,0],
        [0,0,2,2,2,2,2,2,0,0],
        [0,0,0,0,0,0,0,0,0,0]
      ],
      bell: [
        [0,0,0,0,3,3,0,0,0,0],
        [0,0,0,3,3,3,3,0,0,0],
        [0,0,1,1,3,1,1,1,0,0],
        [0,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,0],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [0,1,1,1,0,0,1,1,1,0],
        [0,0,0,3,3,3,3,0,0,0]
      ],
      key: [
        [0,0,1,1,1,1,0,0,0,0],
        [0,1,1,2,2,1,1,0,0,0],
        [1,1,2,0,0,2,1,1,0,0],
        [1,1,2,0,0,2,1,1,1,1],
        [1,1,2,2,2,1,1,1,1,1],
        [0,1,1,1,1,1,0,1,1,1],
        [0,0,1,1,1,0,0,0,1,1],
        [0,0,0,0,0,0,0,1,1,0],
        [0,0,0,0,0,0,0,1,1,0],
        [0,0,0,0,0,0,0,0,0,0]
      ]
    }
    
    const sprite = fruitSprites[fruitType] || fruitSprites.cherry
    const colors = {
      1: item.fruitType?.color || '#AC3232',
      2: item.fruitType?.secondaryColor || '#99E550',
      3: '#FBF236'
    }
    
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const pixel = sprite[row][col]
        if (pixel === 0) continue
        
        ctx.fillStyle = colors[pixel as 1 | 2 | 3]
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
    // Adjusted for pixelated Pac-Man size (14 pixels * 3 pixel size = 42px radius)
    return distance < (42 + item.size)
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
          
          let points = item.points
          
          // Handle ghost collision - always negative points
          if (item.type === 'ghost') {
            points = -50
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
    }
  }, [combo])

  return (
    <>
      <canvas ref={canvasRef} className="pacman-canvas" />
      <div className="score-display">
        <div className="score-label">SCORE</div>
        <div className="score-value">{score.toString().padStart(6, '0')}</div>
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
