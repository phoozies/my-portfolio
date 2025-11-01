import { ReactNode, RefObject } from 'react'
import './SectionWrapper.css'

interface SectionWrapperProps {
  id: string
  children: ReactNode
  className?: string
  sectionRef?: RefObject<HTMLElement>
  fullWidth?: boolean
  backgroundColor?: string
}

const SectionWrapper = ({
  id,
  children,
  className = '',
  sectionRef,
  fullWidth = false,
  backgroundColor,
}: SectionWrapperProps) => {
  const containerClass = fullWidth ? 'container-fullwidth' : 'container'

  return (
    <section
      id={id}
      className={`section-wrapper ${className}`.trim()}
      ref={sectionRef}
      style={backgroundColor ? { background: backgroundColor } : undefined}
    >
      <div className={containerClass}>
        {children}
      </div>
    </section>
  )
}

export default SectionWrapper
