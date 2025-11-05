import { ReactNode, RefObject } from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

interface SectionWrapperProps {
  id: string
  children: ReactNode
  className?: string
  sectionRef?: RefObject<HTMLElement>
  fullWidth?: boolean
  backgroundColor?: string
}

const StyledSection = styled('section')({
  padding: '100px 0',
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '@media (max-width: 768px)': {
    padding: '60px 0',
  },
  '@media (max-width: 480px)': {
    padding: '40px 0',
  },
})

const SectionWrapper = ({
  id,
  children,
  className = '',
  sectionRef,
  fullWidth = false,
  backgroundColor,
}: SectionWrapperProps) => {
  return (
    <StyledSection
      id={id}
      className={className}
      ref={sectionRef}
      style={backgroundColor ? { background: backgroundColor } : undefined}
    >
      <Box
        className={fullWidth ? 'container-fullwidth' : 'container'}
      >
        {children}
      </Box>
    </StyledSection>
  )
}

export default SectionWrapper
