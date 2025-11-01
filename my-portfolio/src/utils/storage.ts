export const storage = {
  /**
   * Get item from localStorage with JSON parsing
   */
  get: <T>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : fallback
    } catch (error) {
      console.warn(`Error reading from localStorage key "${key}":`, error)
      return fallback
    }
  },

  /**
   * Set item in localStorage with JSON stringification
   */
  set: <T>(key: string, value: T): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.warn(`Error writing to localStorage key "${key}":`, error)
      return false
    }
  },

  /**
   * Remove item from localStorage
   */
  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
      return false
    }
  },

  /**
   * Clear all items from localStorage
   */
  clear: (): boolean => {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.warn('Error clearing localStorage:', error)
      return false
    }
  },

  /**
   * Check if key exists in localStorage
   */
  has: (key: string): boolean => {
    return localStorage.getItem(key) !== null
  },
}
