import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { BREAKPOINTS } from '../../../constants'

export const Container = styled(Box)({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 2rem',

  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    padding: '0 1.5rem',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    padding: '0 1rem',
  },
})

export const Section = styled('section')({
  background: 'var(--terminal-bg)',
  color: 'var(--terminal-text)',
  padding: '4rem 0',
  position: 'relative',

  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    padding: '3rem 0',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    padding: '2rem 0',
  },
})

export const FullHeightSection = styled('section')({
  background: 'var(--terminal-bg)',
  color: 'var(--terminal-text)',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  padding: '2rem 0',

  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    padding: '1.5rem 0',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    padding: '1rem 0',
  },
})
