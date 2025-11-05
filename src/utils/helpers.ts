/**
 * Get a random item from an array
 */
export const getRandomItem = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Clamp a value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

/**
 * Calculate distance between two points
 */
export const getDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  const dx = x2 - x1
  const dy = y2 - y1
  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * Check if two circles collide
 */
export const checkCircleCollision = (
  x1: number,
  y1: number,
  radius1: number,
  x2: number,
  y2: number,
  radius2: number
): boolean => {
  const distance = getDistance(x1, y1, x2, y2)
  return distance < radius1 + radius2
}

/**
 * Debounce a function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

/**
 * Throttle a function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Format a date string
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Generate a unique ID
 */
export const generateId = (() => {
  let id = 0
  return () => id++
})()

/**
 * Safely parse JSON with fallback
 */
export const safeJSONParse = <T,>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json)
  } catch {
    return fallback
  }
}

/**
 * Get weighted random item from array
 */
export const getWeightedRandomItem = <T extends { weight: number }>(
  items: readonly T[]
): T => {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
  let random = Math.random() * totalWeight

  for (const item of items) {
    random -= item.weight
    if (random <= 0) return item
  }

  return items[0]
}

/**
 * Create a range array
 */
export const range = (start: number, end: number, step = 1): number[] => {
  const result: number[] = []
  for (let i = start; i < end; i += step) {
    result.push(i)
  }
  return result
}

/**
 * Sleep for a given duration
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
