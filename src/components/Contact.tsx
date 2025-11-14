import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { CONTACT_INFO, BREAKPOINTS } from '../constants'
import { SectionTitle as SharedSectionTitle } from './shared/Typography/Typography'
import { Container as SharedContainer, Section } from './shared/Layout/Container'

const ContactSection = styled(Section)({
  background: 'var(--terminal-surface)',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  scrollSnapAlign: 'start',
  padding: '4rem 0',

  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    padding: '3rem 0',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    padding: '2rem 0',
  },
})

const ContactContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',
})

const ContactInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  width: '100%',
  alignItems: 'center',
})

const ContactDetails = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1.5rem',
  width: '100%',
  maxWidth: '800px',

  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    gridTemplateColumns: '1fr',
    gap: '1rem',
    maxWidth: '400px',
  },
})

const ContactItem = styled('a')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '0.75rem',
  padding: '1.5rem 1rem',
  background: 'var(--terminal-surface)',
  border: '1px solid var(--terminal-border)',
  textDecoration: 'none',
  color: 'var(--terminal-text)',
  transition: 'all 0.2s ease',

  '&:hover': {
    background: 'var(--terminal-bg-alt)',
    borderColor: 'var(--terminal-text)',

    '& .contact-icon-img': {
      filter: 'brightness(0) saturate(100%) invert(73%) sepia(76%) saturate(4629%) hue-rotate(74deg) brightness(119%) contrast(119%)',
    },

    '& .contact-label': {
      color: 'var(--terminal-text)',
    },
  },

  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    padding: '1.25rem 1rem',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    padding: '1.25rem 0.875rem',
    minHeight: '120px',
  },
})

const ContactIcon = styled('div')({
  width: '48px',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  border: '1px solid var(--terminal-border)',
  transition: 'all 0.2s ease',

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    width: '40px',
    height: '40px',
  },
})

const ContactIconImg = styled('img')({
  width: '24px',
  height: '24px',
  filter: 'brightness(0) saturate(100%) invert(100%)',
  transition: 'filter 0.2s ease',

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    width: '20px',
    height: '20px',
  },
})

const ContactText = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
})

const ContactLabel = styled('span')({
  fontSize: '0.95rem',
  fontWeight: 500,
  color: 'var(--terminal-text)',
  letterSpacing: '0.03em',
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    fontSize: '0.9rem',
  },
})

const ContactValue = styled('span')({
  fontSize: '0.85rem',
  fontWeight: 400,
  color: 'var(--terminal-grey)',
  wordBreak: 'break-word',
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    fontSize: '0.8rem',
  },
})

const Contact = () => {
  return (
    <ContactSection id="contact">
      <SharedContainer>
        <SharedSectionTitle>Connect with me!</SharedSectionTitle>
        <ContactContent>
          <ContactInfo>
            <ContactDetails>
              {CONTACT_INFO.map((info, index) => (
                <ContactItem 
                  key={index} 
                  href={info.link} 
                  target={info.link.startsWith('http') ? '_blank' : '_self'}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <ContactIcon className="contact-icon">
                    <ContactIconImg src={info.icon} alt={`${info.label} icon`} className="contact-icon-img" />
                  </ContactIcon>
                  <ContactText>
                    <ContactLabel className="contact-label">{info.label}</ContactLabel>
                    <ContactValue>{info.value}</ContactValue>
                  </ContactText>
                </ContactItem>
              ))}
            </ContactDetails>
          </ContactInfo>
        </ContactContent>
      </SharedContainer>
    </ContactSection>
  )
}

export default Contact
