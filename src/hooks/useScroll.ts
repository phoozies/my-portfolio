import { useEffect, useState } from 'react'

interface UseScrollOptions {
  threshold?: number
  onScroll?: (scrollPosition: number, scrollProgress: number) => void
}

export const useScroll = (options: UseScrollOptions = {}) => {
  const { threshold = 0, onScroll } = options
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const progress = (position / (documentHeight - windowHeight)) * 100

      setScrollPosition(position)
      setScrollProgress(Math.min(progress, 100))
      setIsScrolled(position > threshold)

      onScroll?.(position, progress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold, onScroll])

  const scrollTo = (target: number | string, behavior: ScrollBehavior = 'smooth') => {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior })
    } else {
      const element = document.getElementById(target)
      element?.scrollIntoView({ behavior })
    }
  }

  const scrollToTop = (behavior: ScrollBehavior = 'smooth') => {
    scrollTo(0, behavior)
  }

  return {
    scrollPosition,
    scrollProgress,
    isScrolled,
    scrollTo,
    scrollToTop,
  }
}
