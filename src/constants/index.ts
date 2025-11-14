// Application-wide constants

// Terminal Theme Colors
export const TERMINAL_COLORS = {
  BG: '#0a0a0a',
  BG_ALT: '#111111',
  SURFACE: '#1a1a1a',
  BORDER: '#2a2a2a',
  TEXT: '#00ff00',
  TEXT_DIM: '#00aa00',
  TEXT_BRIGHT: '#00ff00',
  CURSOR: '#00ff00',
  WHITE: '#ffffff',
  GREY: '#888888',
  GREY_DARK: '#444444',
  SUCCESS: '#00ff00',
  ERROR: '#ff0000',
  WARNING: '#ffaa00',
  INFO: '#00aaff',
} as const

// Animation speeds
export const ANIMATION_SPEEDS = {
  TYPING_SPEED: 30,
  TYPING_DELAY: 500,
  CURSOR_BLINK: 500,
  FADE_IN: 300,
  HOVER_TRANSITION: 200,
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

// Routes
export const ROUTES = {
  HOME: '/',
  MYINFO: '/myinfo',
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
    url: 'tpvo.business@gmail.com',
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
