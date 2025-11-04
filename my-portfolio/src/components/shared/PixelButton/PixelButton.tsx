import { ReactNode, ButtonHTMLAttributes } from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning'
  icon?: ReactNode
  fullWidth?: boolean
}

const variantStyles = {
  primary: {
    background: 'var(--pixel-bg)',
    color: 'var(--pixel-cyan)',
    borderColor: 'var(--pixel-cyan)',
    boxShadow: '6px 6px 0 var(--pixel-purple)',
    '&:hover': {
      background: 'var(--pixel-cyan)',
      color: 'var(--pixel-dark)',
      boxShadow: '4px 4px 0 var(--pixel-purple)',
    },
  },
  secondary: {
    background: 'var(--pixel-bg)',
    color: 'var(--pixel-yellow)',
    borderColor: 'var(--pixel-yellow)',
    boxShadow: '6px 6px 0 var(--pixel-orange)',
    '&:hover': {
      background: 'var(--pixel-yellow)',
      color: 'var(--pixel-dark)',
      boxShadow: '4px 4px 0 var(--pixel-orange)',
    },
  },
  success: {
    background: 'var(--pixel-green)',
    color: 'var(--pixel-dark)',
    borderColor: 'var(--pixel-dark)',
    boxShadow: '6px 6px 0 var(--pixel-purple)',
    '&:hover': {
      background: 'var(--pixel-yellow)',
      boxShadow: '4px 4px 0 var(--pixel-purple)',
    },
  },
  warning: {
    background: 'var(--pixel-pink)',
    color: 'var(--pixel-dark)',
    borderColor: 'var(--pixel-dark)',
    boxShadow: '6px 6px 0 var(--pixel-purple)',
    '&:hover': {
      background: 'var(--pixel-orange)',
      boxShadow: '4px 4px 0 var(--pixel-purple)',
    },
  },
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'buttonVariant',
})<{ buttonVariant: 'primary' | 'secondary' | 'success' | 'warning' }>(({ buttonVariant }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  padding: '0.75rem 1.5rem',
  fontFamily: "'Courier New', monospace",
  fontSize: '1rem',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: '4px solid',
  borderRadius: 0,
  whiteSpace: 'nowrap',
  ...variantStyles[buttonVariant],
  '&:hover': {
    ...variantStyles[buttonVariant]['&:hover'],
    transform: 'translate(2px, 2px)',
  },
  '&:active': {
    transform: 'translate(6px, 6px)',
    boxShadow: '0 0 0',
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    transform: 'none !important',
  },
  '@media (max-width: 768px)': {
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
  },
}))

const IconWrapper = styled('span')({
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.2rem',
  '@media (max-width: 768px)': {
    fontSize: '1rem',
  },
})

const TextWrapper = styled('span')({
  display: 'flex',
  alignItems: 'center',
})

const PixelButton = ({
  children,
  variant = 'primary',
  icon,
  fullWidth = false,
  className,
  onClick,
  disabled,
  type,
  'aria-label': ariaLabel,
}: PixelButtonProps) => {
  return (
    <StyledButton
      buttonVariant={variant}
      fullWidth={fullWidth}
      disableRipple
      className={className}
      onClick={onClick as any}
      disabled={disabled}
      type={type as any}
      aria-label={ariaLabel}
    >
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <TextWrapper>{children}</TextWrapper>
    </StyledButton>
  )
}

export default PixelButton
