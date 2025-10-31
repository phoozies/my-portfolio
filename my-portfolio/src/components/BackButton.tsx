import './BackButton.css'

interface BackButtonProps {
  onClick: () => void
}

const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <button className="back-button" onClick={onClick} aria-label="Back to arcade">
      <span className="back-arrow">◀</span>
      <span className="back-text">BACK</span>
    </button>
  )
}

export default BackButton
