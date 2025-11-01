import { ReactNode, ButtonHTMLAttributes } from 'react'
import './PixelButton.css'

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning'
  icon?: ReactNode
  fullWidth?: boolean
}

const PixelButton = ({
  children,
  variant = 'primary',
  icon,
  fullWidth = false,
  className = '',
  ...props
}: PixelButtonProps) => {
  const variantClass = `pixel-button--${variant}`
  const widthClass = fullWidth ? 'pixel-button--full' : ''

  return (
    <button
      className={`pixel-button ${variantClass} ${widthClass} ${className}`.trim()}
      {...props}
    >
      {icon && <span className="pixel-button__icon">{icon}</span>}
      <span className="pixel-button__text">{children}</span>
    </button>
  )
}

export default PixelButton
