import './BackButton.css'
import PixelButton from './shared/PixelButton/PixelButton'

interface BackButtonProps {
  onClick: () => void
}

const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <div className="back-button-wrapper">
      <PixelButton 
        onClick={onClick}
        variant="primary"
        icon={<span className="back-arrow">◀</span>}
        aria-label="Back to arcade"
      >
        BACK
      </PixelButton>
    </div>
  )
}

export default BackButton
