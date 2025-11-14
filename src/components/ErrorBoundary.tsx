import { Component, ErrorInfo, ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

const ErrorContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--pixel-dark)',
  color: 'var(--pixel-light)',
  padding: '2rem',
  fontFamily: "'Courier New', monospace",
})

const ErrorBox = styled(Box)({
  maxWidth: '600px',
  textAlign: 'center',
  border: '8px solid var(--pixel-pink)',
  padding: '3rem 2rem',
  background: 'var(--pixel-bg)',
  boxShadow: '12px 12px 0 var(--pixel-purple)',
  borderRadius: 0,
})

const ErrorIcon = styled('div')({
  fontSize: '4rem',
  marginBottom: '1rem',
})

const ErrorTitle = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 700,
  color: 'var(--pixel-yellow)',
  textShadow: '3px 3px 0 var(--pixel-purple)',
  letterSpacing: '3px',
  marginBottom: '1rem',
  fontFamily: "'Courier New', monospace",
  textTransform: 'uppercase',
})

const ErrorMessage = styled(Typography)({
  fontSize: '1rem',
  color: 'var(--pixel-cyan)',
  marginBottom: '2rem',
  fontFamily: "'Courier New', monospace",
  letterSpacing: '1px',
})

const RetryButton = styled('button')({
  padding: '0.75rem 2rem',
  background: 'var(--pixel-green)',
  color: 'var(--pixel-dark)',
  border: '4px solid var(--pixel-dark)',
  borderRadius: 0,
  fontFamily: "'Courier New', monospace",
  fontSize: '1rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '2px',
  cursor: 'pointer',
  boxShadow: '6px 6px 0 var(--pixel-purple)',
  transition: 'all 0.2s ease',

  '&:hover': {
    background: 'var(--pixel-yellow)',
    transform: 'translate(-2px, -2px)',
    boxShadow: '8px 8px 0 var(--pixel-purple)',
  },

  '&:active': {
    transform: 'translate(2px, 2px)',
    boxShadow: '2px 2px 0 var(--pixel-purple)',
  },
})

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <ErrorContainer>
          <ErrorBox>
            <ErrorIcon>⚠️</ErrorIcon>
            <ErrorTitle>Game Over!</ErrorTitle>
            <ErrorMessage>
              Oops! Something went wrong. Don't worry, we'll get you back on track.
            </ErrorMessage>
            <RetryButton onClick={this.handleReset}>
              ◀ Try Again
            </RetryButton>
          </ErrorBox>
        </ErrorContainer>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
