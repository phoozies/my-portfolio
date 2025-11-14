import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { SOCIAL_LINKS } from '../constants'

const FooterContainer = styled('footer')({
  background: 'var(--terminal-bg)',
  color: 'var(--terminal-text)',
  padding: '2rem 0',
  borderTop: '1px solid var(--terminal-border)',
})

const FooterContent = styled(Box)({
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.5rem',

  '@media (max-width: 768px)': {
    padding: '0 1rem',
    gap: '1rem',
  },
})

const SocialLinks = styled(Box)({
  display: 'flex',
  gap: '1.5rem',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',

  '@media (max-width: 480px)': {
    gap: '1rem',
  },
})

const SocialLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  background: 'transparent',
  transition: 'all 0.2s ease',
  border: '1px solid var(--terminal-border)',

  '&:hover': {
    background: 'var(--terminal-surface)',
    borderColor: 'var(--terminal-text)',

    '& img': {
      opacity: 1,
    },
  },

  '@media (max-width: 480px)': {
    width: '36px',
    height: '36px',
  },
})

const SocialIcon = styled('img')({
  width: '20px',
  height: '20px',
  opacity: 0.7,
  transition: 'all 0.2s ease',

  '@media (max-width: 480px)': {
    width: '18px',
    height: '18px',
  },
})

const FooterBottom = styled(Box)({
  paddingTop: '1rem',
  borderTop: '1px solid var(--terminal-border)',
})

const FooterBottomContent = styled(Box)({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 2rem',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  '& p': {
    color: 'var(--pixel-cyan)',
    fontSize: '0.9rem',
    fontFamily: "'Courier New', monospace",
    letterSpacing: '2px',
  },

  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
  fontSize: '0.875rem',
  color: 'var(--terminal-text-dim)',

  '@media (max-width: 768px)': {
    padding: '0 1rem',
  },

  '@media (max-width: 480px)': {
    '& p': {
      fontSize: '0.75rem',
    },
  },
})

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <FooterContainer>
      <FooterContent>
        <SocialLinks>
          {SOCIAL_LINKS.map((link, index) => (
            <SocialLink
              key={index}
              href={link.url}
              target={link.name !== 'Email' ? '_blank' : '_self'}
              rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
              aria-label={link.name}
            >
              <SocialIcon src={link.logo} alt={`${link.name} logo`} />
            </SocialLink>
          ))}
        </SocialLinks>
        
        <FooterBottom>
          <FooterBottomContent>
            <p>&copy; {currentYear} Thinh Vo. All rights reserved.</p>
          </FooterBottomContent>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer
