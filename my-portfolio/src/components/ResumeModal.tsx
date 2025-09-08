import React from 'react'
import Modal from './Modal'
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Resume - Thinh Vo"
      maxWidth="1000px"
      maxHeight="90vh"
    >
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
    </Modal>
  )
}

export default ResumeModal
