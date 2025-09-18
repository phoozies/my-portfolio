import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Box,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import {
  Close as CloseIcon,
  Download as DownloadIcon,
  OpenInNew as OpenInNewIcon,
  PhoneAndroid} from '@mui/icons-material'
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
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // Detect if device likely doesn't support PDF in iframe
  const shouldUseFallback = isMobile || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

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
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={fullScreen}
      className="resume-dialog"
      PaperProps={{
        className: 'resume-dialog-paper',
        sx: {
          background: 'linear-gradient(145deg, #1a0f2e, #0f0f0f)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          borderRadius: '16px',
          boxShadow: [
            '0 25px 50px rgba(0, 0, 0, 0.5)',
            '0 0 30px rgba(168, 85, 247, 0.2)'
          ].join(', '),
          height: '95vh',
          minHeight: '95vh',
          maxHeight: '95vh',
          width: '85vw',
          maxWidth: '900px',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }
      }}
    >
      <DialogTitle
        className="resume-dialog-title"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid rgba(168, 85, 247, 0.3)',
          background: 'rgba(26, 15, 46, 0.8)',
          color: '#e879f9',
          fontSize: '1.3rem',
          fontWeight: 600,
          textShadow: '0 0 10px rgba(168, 85, 247, 0.3)',
          flexShrink: 0
        }}
      >
        <Typography variant="h6" component="h2" sx={{ 
          color: 'inherit', 
          fontSize: 'inherit',
          fontWeight: 'inherit',
          textShadow: 'inherit'
        }}>
          Resume - Thinh Vo
        </Typography>
        <IconButton
          onClick={onClose}
          className="resume-dialog-close"
          sx={{
            color: '#e5e7eb',
            width: '40px',
            height: '40px',
            '&:hover': {
              background: 'rgba(168, 85, 247, 0.2)',
              color: '#e879f9',
              transform: 'scale(1.1)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        className="resume-dialog-content"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: '1rem',
          overflow: 'hidden'
        }}
      >
        <Box
          className="resume-viewer"
          sx={{
            flex: 1,
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: [
              '0 8px 32px rgba(0, 0, 0, 0.3)',
              '0 0 20px rgba(168, 85, 247, 0.1)',
              'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            ].join(', '),
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'center',
            minHeight: 0,
            border: '1px solid rgba(168, 85, 247, 0.15)'
          }}
        >
          {shouldUseFallback ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                textAlign: 'center',
                width: '100%',
                background: 'linear-gradient(145deg, rgba(26, 15, 46, 0.9), rgba(15, 15, 15, 0.9))',
                color: 'white',
                borderRadius: '8px'
              }}
            >
              <PhoneAndroid 
                sx={{ 
                  fontSize: '4rem', 
                  color: '#e879f9', 
                  mb: 2,
                  filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.3))'
                }} 
              />
              <Typography variant="h6" sx={{ mb: 2, color: '#e879f9' }}>
                Mobile PDF Viewer
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: '#e5e7eb' }}>
                For the best viewing experience on mobile devices, please download 
                the PDF or open it in a new tab.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: '300px' }}>
                <Button
                  onClick={handleDownload}
                  startIcon={<DownloadIcon />}
                  variant="contained"
                  fullWidth
                  sx={{
                    background: 'linear-gradient(135deg, #a855f7 0%, #e879f9 100%)',
                    color: 'white',
                    py: 1.5,
                    borderRadius: '25px',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #9333ea 0%, #d946ef 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(168, 85, 247, 0.4)'
                    }
                  }}
                >
                  Download PDF
                </Button>
                <Button
                  onClick={handleOpenNewTab}
                  startIcon={<OpenInNewIcon />}
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: '#a855f7',
                    color: '#e879f9',
                    py: 1.5,
                    borderRadius: '25px',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: '#e879f9',
                      background: 'rgba(168, 85, 247, 0.1)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Open in New Tab
                </Button>
              </Box>
            </Box>
          ) : (
            <iframe
              src={resumeUrl}
              title="Thinh Vo Resume"
              className="resume-iframe"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '8px',
                background: 'white',
                minHeight: '600px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}
              loading="lazy"
            />
          )}
        </Box>
      </DialogContent>

      <DialogActions
        className="resume-dialog-actions"
        sx={{
          display: shouldUseFallback ? 'none' : 'flex',
          gap: '1rem',
          justifyContent: 'center',
          padding: '1rem 1.5rem',
          borderTop: '1px solid rgba(168, 85, 247, 0.2)',
          flexShrink: 0
        }}
      >
        {!shouldUseFallback && (
          <>
            <Button
              onClick={handleDownload}
              startIcon={<DownloadIcon />}
              className="btn-action btn-download"
              variant="contained"
          sx={{
            padding: '1rem 2.5rem',
            borderRadius: '50px',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px) saturate(180%) brightness(110%)',
            color: 'rgba(255, 255, 255, 1)',
            fontWeight: 600,
            fontSize: '1.1rem',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            boxShadow: [
              '0 4px 30px rgba(0, 0, 0, 0.1)',
              '0 0 20px rgba(168, 85, 247, 0.05)',
              'inset 0 1px 0 rgba(255, 255, 255, 0.15)'
            ].join(', '),
            border: 'none',
            minWidth: '160px',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              transform: 'translateY(-3px)',
              background: 'transparent',
              boxShadow: [
                '0 8px 25px rgba(0, 0, 0, 0.3)',
                '0 0 30px rgba(168, 85, 247, 0.5)',
                '0 0 50px rgba(232, 121, 249, 0.3)',
                'inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              ].join(', ')
            },
            '&:active': {
              transform: 'translateY(-1px)'
            }
          }}
        >
          Download PDF
        </Button>
        
        <Button
          onClick={handleOpenNewTab}
          startIcon={<OpenInNewIcon />}
          className="btn-action btn-open"
          variant="contained"
          sx={{
            padding: '1rem 2.5rem',
            borderRadius: '50px',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px) saturate(180%) brightness(110%)',
            color: 'rgba(255, 255, 255, 1)',
            fontWeight: 600,
            fontSize: '1.1rem',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            boxShadow: [
              '0 4px 30px rgba(0, 0, 0, 0.1)',
              '0 0 20px rgba(168, 85, 247, 0.05)',
              'inset 0 1px 0 rgba(255, 255, 255, 0.15)'
            ].join(', '),
            border: 'none',
            minWidth: '160px',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              transform: 'translateY(-3px)',
              background: 'transparent',
              boxShadow: [
                '0 8px 25px rgba(0, 0, 0, 0.3)',
                '0 0 30px rgba(168, 85, 247, 0.5)',
                '0 0 50px rgba(232, 121, 249, 0.3)',
                'inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              ].join(', ')
            },
            '&:active': {
              transform: 'translateY(-1px)'
            }
          }}
        >
          Open in New Tab
        </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default ResumeModal
