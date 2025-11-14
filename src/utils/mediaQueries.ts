import { BREAKPOINTS } from '../constants'

/**
 * Media query utilities for consistent responsive design
 */
export const mediaQueries = {
  mobile: `@media (max-width: ${BREAKPOINTS.MOBILE}px)`,
  tablet: `@media (max-width: ${BREAKPOINTS.TABLET}px)`,
  desktop: `@media (max-width: ${BREAKPOINTS.DESKTOP}px)`,
  largeDesktop: `@media (max-width: ${BREAKPOINTS.LARGE_DESKTOP}px)`,
  
  // Min-width queries for mobile-first approach
  minMobile: `@media (min-width: ${BREAKPOINTS.MOBILE + 1}px)`,
  minTablet: `@media (min-width: ${BREAKPOINTS.TABLET + 1}px)`,
  minDesktop: `@media (min-width: ${BREAKPOINTS.DESKTOP + 1}px)`,
  minLargeDesktop: `@media (min-width: ${BREAKPOINTS.LARGE_DESKTOP + 1}px)`,
}

/**
 * Common responsive padding values
 */
export const responsivePadding = {
  section: {
    padding: '100px 0',
    [mediaQueries.tablet]: {
      padding: '80px 20px',
    },
    [mediaQueries.mobile]: {
      padding: '60px 15px',
    },
  },
  container: {
    padding: '0 2rem',
    [mediaQueries.tablet]: {
      padding: '0 1rem',
    },
    [mediaQueries.mobile]: {
      padding: '0 0.875rem',
    },
  },
}
