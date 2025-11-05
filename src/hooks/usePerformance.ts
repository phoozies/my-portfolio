/**
 * Performance utilities for detecting device capabilities and user preferences
 */

export interface PerformanceSettings {
  particleCount: number
  animationFPS: number
  enableTrailParticles: boolean
  enableConnections: boolean
  enableShadows: boolean
  enableGradients: boolean
}

export const detectDeviceCapabilities = (): PerformanceSettings => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  if (prefersReducedMotion) {
    return {
      particleCount: 0,
      animationFPS: 30,
      enableTrailParticles: false,
      enableConnections: false,
      enableShadows: false,
      enableGradients: false
    }
  }

  // Detect device type
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent)
  
  // Check hardware concurrency (number of CPU cores)
  const cores = navigator.hardwareConcurrency || 4
  
  // Check memory (if available)
  const memory = (navigator as any).deviceMemory || 4
  
  // Check connection speed
  const connection = (navigator as any).connection
  const isSlowConnection = connection && (
    connection.effectiveType === 'slow-2g' || 
    connection.effectiveType === '2g' ||
    connection.saveData
  )

  // Determine performance level
  let performanceLevel: 'low' | 'medium' | 'high' = 'high'
  
  if (isMobile || isSlowConnection || cores < 4 || memory < 4) {
    performanceLevel = 'low'
  } else if (isTablet || cores < 8 || memory < 8) {
    performanceLevel = 'medium'
  }

  // Return settings based on performance level
  switch (performanceLevel) {
    case 'low':
      return {
        particleCount: 30,
        animationFPS: 30,
        enableTrailParticles: false,
        enableConnections: false,
        enableShadows: false,
        enableGradients: false
      }
    case 'medium':
      return {
        particleCount: 75,
        animationFPS: 45,
        enableTrailParticles: true,
        enableConnections: false,
        enableShadows: false,
        enableGradients: true
      }
    case 'high':
    default:
      return {
        particleCount: 120,
        animationFPS: 60,
        enableTrailParticles: true,
        enableConnections: true,
        enableShadows: true,
        enableGradients: true
      }
  }
}

export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean
  return function(this: any) {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export const debounce = (func: Function, delay: number) => {
  let timeoutId: number
  return function(this: any, ...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}