import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { BREAKPOINTS } from '../../../constants'

export const TerminalWindow = styled(Box)({
  background: 'var(--terminal-surface)',
  border: '1px solid var(--terminal-border)',
  borderRadius: '4px',
  overflow: 'hidden',
  marginBottom: '2rem',
})

export const TerminalHeader = styled(Box)({
  background: 'var(--terminal-bg-alt)',
  padding: '0.75rem 1rem',
  borderBottom: '1px solid var(--terminal-border)',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
  fontSize: '0.875rem',
  color: 'var(--terminal-grey)',

  '&::before': {
    content: '"●  ●  ●"',
    fontSize: '0.625rem',
    marginRight: '0.5rem',
    color: 'var(--terminal-grey-dark)',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    padding: '0.5rem 0.75rem',
    fontSize: '0.75rem',
  },
})

export const TerminalBody = styled(Box)({
  padding: '1.5rem',
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
  fontSize: '0.95rem',
  lineHeight: 1.6,
  color: 'var(--terminal-text)',

  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    padding: '1.25rem',
    fontSize: '0.9rem',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    padding: '1rem',
    fontSize: '0.85rem',
  },
})

export const TerminalPrompt = styled('span')({
  color: 'var(--terminal-text-dim)',
  marginRight: '0.5rem',
  userSelect: 'none',

  '&::before': {
    content: '"$ "',
  },
})

export const TerminalCommand = styled('span')({
  color: 'var(--terminal-text)',
  fontWeight: 500,
})

export const TerminalOutput = styled(Box)({
  marginTop: '0.5rem',
  paddingLeft: '1rem',
  color: 'var(--terminal-grey)',
  whiteSpace: 'pre-wrap',
})
