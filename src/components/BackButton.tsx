import { Box, keyframes } from '@mui/material'
import { styled } from '@mui/material/styles'
import PixelButton from './shared/PixelButton/PixelButton'

interface BackButtonProps {
  onClick: () => void
}

const arrowBlink = keyframes`
  0%, 50%, 100% {
    opacity: 1;
  }
  25%, 75% {
    opacity: 0.3;
  }
`

const ButtonWrapper = styled(Box)({
  position: 'fixed',
  top: '2rem',
  left: '2rem',
  zIndex: 1000,
  '@media (max-width: 768px)': {
    top: '1rem',
    left: '1rem',
  },
})

const Arrow = styled('span')({
  fontSize: '1.2rem',
  animation: `${arrowBlink} 1.5s infinite`,
  '@media (max-width: 768px)': {
    fontSize: '1rem',
  },
})

const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <ButtonWrapper>
      <PixelButton 
        onClick={onClick}
        variant="primary"
        icon={<Arrow>◀</Arrow>}
      >
        cd ../
      </PixelButton>
    </ButtonWrapper>
  )
}

export default BackButton
