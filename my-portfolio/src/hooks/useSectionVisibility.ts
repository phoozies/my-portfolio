import { useEffect, useRef } from 'react'

interface UseSectionVisibilityOptions {
  threshold?: number
  onVisible?: () => void
}

export const useSectionVisibility = ({ 
  threshold = 0.3, 
  onVisible 
}: UseSectionVisibilityOptions = {}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const hasBeenVisibleRef = useRef(false)

  useEffect(() => {
    const element = sectionRef.current
    if (!element || hasBeenVisibleRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasBeenVisibleRef.current) {
            hasBeenVisibleRef.current = true
            onVisible?.()
          }
        })
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, onVisible])

  return sectionRef
}
