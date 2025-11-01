// Shared type definitions across the application

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked?: boolean
}

export interface AchievementProps {
  title: string
  description: string
  icon: string
  show: boolean
  onHide: () => void
}

export interface UnlockAchievementFn {
  (sectionId: string): void
}

export interface PageProps {
  unlockAchievement: UnlockAchievementFn
}

export interface GameCard {
  id: string
  title: string
  icon: string
  color: string
  route: string
  description: string
}

export interface ContactInfo {
  icon: string
  label: string
  value: string
  link: string
}

export interface SocialLink {
  name: string
  url: string
  logo: string
}

export interface NavItem {
  id: string
  label: string
}

export interface Skill {
  name: string
  logo?: string
}

export interface SkillCategory {
  title: string
  skills: Skill[]
}

export interface Project {
  title: string
  period: string
  description: string
  technologies: string[]
  link?: string
  image?: string
}

export interface Experience {
  title: string
  company: string
  period: string
  location: string
  achievements: string[]
  technologies: string[]
  type: 'internship' | 'student-assistant' | 'full-time'
}
