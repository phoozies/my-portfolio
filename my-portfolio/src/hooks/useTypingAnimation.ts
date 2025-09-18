import { useState, useEffect, useRef } from 'react'

interface UseTypingAnimationProps {
  text: string
  speed?: number
  startDelay?: number
}

export const useTypingAnimation = ({ 
  text, 
  speed = 50, 
  startDelay = 0 
}: UseTypingAnimationProps) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (!text) return

    // Cleanup previous timers
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    setDisplayedText('')
    setIsTyping(false)
    setIsComplete(false)

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      // Skip animation and show full text immediately
      setDisplayedText(text)
      setIsComplete(true)
      return
    }

    timeoutRef.current = setTimeout(() => {
      setIsTyping(true)
      let index = 0

      intervalRef.current = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1))
          index++
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          setIsTyping(false)
          setIsComplete(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [text, speed, startDelay])

  return { displayedText, isTyping, isComplete }
}
