// Application-wide constants

// Animation speeds
export const ANIMATION_SPEEDS = {
  TYPING_SPEED: 30,
  TYPING_DELAY: 500,
  ACHIEVEMENT_DURATION: 4000,
  ACHIEVEMENT_EXIT_DELAY: 500,
  CURSOR_BLINK: 500,
  PACMAN_MOUTH_SPEED: 10,
} as const

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE_DESKTOP: 1200,
} as const

// Z-index layers
export const Z_INDEX = {
  BASE: 1,
  HEADER: 1000,
  PACMAN_CANVAS: 9999,
  SCORE_DISPLAY: 10000,
  ACHIEVEMENT: 99999,
} as const

// Intersection Observer thresholds
export const VISIBILITY_THRESHOLDS = {
  DEFAULT: 0.3,
  STRICT: 0.5,
  LENIENT: 0.1,
} as const

// PacMan game configuration
export const PACMAN_CONFIG = {
  SPAWN_INTERVAL: 800,
  PIXEL_SIZE: 3,
  GRID_SIZE: 14,
  PELLET_PIXEL_SIZE: 3,
  PELLET_GRID_SIZE: 3,
  POWER_PELLET_GRID_SIZE: 6,
  COLLISION_RADIUS: 42,
} as const

// Item types for PacMan game
export const ITEM_TYPES = [
  { type: 'pellet' as const, color: '#FBF236', size: 32, points: 10, weight: 50 },
  { type: 'power-pellet' as const, color: '#99E550', size: 64, points: 50, weight: 15 },
  { type: 'ghost' as const, color: '', size: 24, points: -50, weight: 15 },
  { type: 'fruit' as const, color: '#F6AA61', size: 20, points: 100, weight: 20 },
] as const

// Ghost colors
export const GHOST_COLORS = [
  '#AC3232', 
  '#FF8FA3', 
  '#5FCDE4', 
  '#F6AA61', 
  '#D95763',
  '#99E550', 
  '#8B4789', 
  '#FFD93D', 
  '#00E8FC', 
  '#FF6B9D', 
] as const

// Fruit types
export const FRUIT_TYPES = [
  { name: 'cherry', color: '#AC3232', secondaryColor: '#99E550' },
  { name: 'strawberry', color: '#F6AA61', secondaryColor: '#99E550' },
  { name: 'orange', color: '#F6AA61', secondaryColor: '#FFD93D' },
  { name: 'apple', color: '#AC3232', secondaryColor: '#8B4789' },
  { name: 'melon', color: '#99E550', secondaryColor: '#FFD93D' },
  { name: 'bell', color: '#FFD93D', secondaryColor: '#F6AA61' },
  { name: 'key', color: '#5FCDE4', secondaryColor: '#00E8FC' },
] as const

// Achievement storage key
export const ACHIEVEMENTS_KEY = 'portfolio-achievements'

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SKILLS: '/skills',
  EXPERIENCE: '/experience',
  PROJECTS: '/projects',
  CONTACT: '/contact',
} as const

// Social links
export const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/phoozies',
    logo: './github-logo.svg',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/thinhpvo/',
    logo: './linkedin-bw-logo.svg',
  },
  {
    name: 'Email',
    url: 'mailto:tpvo.business@gmail.com',
    logo: './email-logo.svg',
  },
] as const

// Contact information
export const CONTACT_INFO = [
  {
    icon: './email-logo.svg',
    label: 'Email',
    value: 'tpvo.business@gmail.com',
    link: 'mailto:tpvo.business@gmail.com',
  },
  {
    icon: './linkedin-bw-logo.svg',
    label: 'LinkedIn',
    value: 'linkedin.com/in/thinhpvo',
    link: 'https://www.linkedin.com/in/thinhpvo/',
  },
  {
    icon: './github-logo.svg',
    label: 'GitHub',
    value: 'github.com/phoozies',
    link: 'https://github.com/phoozies',
  },
] as const
