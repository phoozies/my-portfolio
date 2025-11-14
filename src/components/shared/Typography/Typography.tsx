import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'
import { BREAKPOINTS } from '../../../constants'

export const SectionTitle = styled('h2')({
  fontSize: '2rem',
  fontWeight: 400,
  marginBottom: '2rem',
  textAlign: 'center',
  color: 'var(--terminal-text)',
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
  letterSpacing: '0.05em',

  '&::before': {
    content: '"$ "',
    color: 'var(--terminal-text-dim)',
  },

  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    fontSize: '1.75rem',
    marginBottom: '1.5rem',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    fontSize: '1.5rem',
    letterSpacing: '0.03em',
  },
})

export const PageTitle = styled('h1')({
  fontSize: '2.5rem',
  fontWeight: 400,
  color: 'var(--terminal-text)',
  letterSpacing: '0.05em',
  margin: 0,
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",

  '&::before': {
    content: '"> "',
    color: 'var(--terminal-text-dim)',
  },

  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    fontSize: '2rem',
    letterSpacing: '0.03em',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    fontSize: '1.5rem',
  },
})

export const SubTitle = styled(Typography)({
  fontSize: '1rem',
  color: 'var(--terminal-grey)',
  letterSpacing: '0.03em',
  marginTop: '0.5rem',
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",

  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    fontSize: '0.9rem',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    fontSize: '0.85rem',
  },
})

export const BodyText = styled('p')({
  fontSize: '1rem',
  lineHeight: 1.6,
  color: 'var(--terminal-text)',
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
  letterSpacing: '0.02em',

  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    fontSize: '0.95rem',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    fontSize: '0.9rem',
  },
})
