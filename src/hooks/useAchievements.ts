import { useState, useEffect, useCallback } from 'react'
import { Achievement } from '../types'
import { ACHIEVEMENTS_KEY } from '../constants'
import { storage } from '../utils/storage'

export const SECTION_ACHIEVEMENTS: Record<string, Achievement> = {
  landing: {
    id: 'landing',
    title: 'Welcome Player!',
    description: 'Started your journey',
    icon: '🎮'
  },
  about: {
    id: 'about',
    title: 'Getting to Know Me',
    description: 'Discovered my story',
    icon: '👤'
  },
  skills: {
    id: 'skills',
    title: 'Tech Explorer',
    description: 'Checked out my skills',
    icon: '⚡'
  },
  experience: {
    id: 'experience',
    title: 'Journey Tracker',
    description: 'Reviewed my experience',
    icon: '💼'
  },
  projects: {
    id: 'projects',
    title: 'Project Hunter',
    description: 'Explored my projects',
    icon: '🚀'
  },
  contact: {
    id: 'contact',
    title: "Let's Connect!",
    description: 'Found ways to reach me',
    icon: '📬'
  }
}

export const useAchievements = () => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set())
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null)
  const [showAchievement, setShowAchievement] = useState(false)

  // Load unlocked achievements from storage
  useEffect(() => {
    const stored = storage.get<string[]>(ACHIEVEMENTS_KEY, [])
    setUnlockedAchievements(new Set(stored))
  }, [])

  // Save to storage whenever achievements change
  const saveAchievements = useCallback((achievements: Set<string>) => {
    storage.set(ACHIEVEMENTS_KEY, Array.from(achievements))
  }, [])

  const unlockAchievement = useCallback((sectionId: string) => {
    if (unlockedAchievements.has(sectionId)) return

    const achievement = SECTION_ACHIEVEMENTS[sectionId]
    if (!achievement) return

    // Update unlocked achievements
    const newUnlocked = new Set(unlockedAchievements)
    newUnlocked.add(sectionId)
    setUnlockedAchievements(newUnlocked)
    saveAchievements(newUnlocked)

    // Show achievement notification
    setCurrentAchievement(achievement)
    setShowAchievement(true)
  }, [unlockedAchievements, saveAchievements])

  const hideAchievement = useCallback(() => {
    setShowAchievement(false)
    setTimeout(() => setCurrentAchievement(null), 500)
  }, [])

  const resetAchievements = useCallback(() => {
    setUnlockedAchievements(new Set())
    storage.remove(ACHIEVEMENTS_KEY)
  }, [])

  return {
    unlockedAchievements,
    currentAchievement,
    showAchievement,
    unlockAchievement,
    hideAchievement,
    resetAchievements
  }
}
