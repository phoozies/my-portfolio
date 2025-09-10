import React, { useEffect } from 'react'
import './ResumeModal.css'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
  resumeUrl: string
  fileName?: string
}

const ResumeModal: React.FC<ResumeModalProps> = ({ 
  isOpen, 
  onClose, 
  resumeUrl,
  fileName = 'Thinh_Vo_Resume.pdf'
}) => {
  // Handle ESC key press and body scroll
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = resumeUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleOpenNewTab = () => {
    window.open(resumeUrl, '_blank', 'noopener,noreferrer')
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="resume-modal-overlay" onClick={handleBackdropClick}>
      <div 
        className="resume-modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
      >
        <div className="resume-modal-header">
          <h2 id="resume-modal-title" className="resume-modal-title">Resume - Thinh Vo</h2>
          <button 
            className="resume-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        
        <div className="resume-modal-content">
          <div className="resume-viewer">
            <iframe
              src={resumeUrl}
              title="Thinh Vo Resume"
              className="resume-iframe"
              loading="lazy"
            />
          </div>
          <div className="resume-actions">
            <button 
              className="btn-action btn-download"
              onClick={handleDownload}
              aria-label="Download resume PDF"
            >
              <span className="btn-icon">📥</span>
              Download PDF
            </button>
            <button 
              className="btn-action btn-open"
              onClick={handleOpenNewTab}
              aria-label="Open resume in new tab"
            >
              <span className="btn-icon">🔗</span>
              Open in New Tab
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeModal
