import { useState, useEffect } from 'react'

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

  useEffect(() => {
    if (!text) return

    setDisplayedText('')
    setIsTyping(false)
    setIsComplete(false)

    const startTimer = setTimeout(() => {
      setIsTyping(true)
      let index = 0

      const typingInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1))
          index++
        } else {
          clearInterval(typingInterval)
          setIsTyping(false)
          setIsComplete(true)
        }
      }, speed)

      return () => clearInterval(typingInterval)
    }, startDelay)

    return () => clearTimeout(startTimer)
  }, [text, speed, startDelay])

  return { displayedText, isTyping, isComplete }
}
