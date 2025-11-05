import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useSectionVisibility } from '../hooks/useSectionVisibility'
import { CONTACT_INFO } from '../constants'

interface ContactProps {
  unlockAchievement: (sectionId: string) => void;
}

const ContactSection = styled('section')({
  background: 'var(--pixel-dark)',
  color: 'var(--pixel-light)',
  padding: '100px 0',
  position: 'relative',
  overflow: 'hidden',

  '@media (max-width: 768px)': {
    padding: '80px 20px',
  },

  '@media (max-width: 480px)': {
    padding: '60px 15px',
  },
})

const Container = styled(Box)({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 2rem',
})

const SectionTitle = styled('h2')({
  fontSize: '2.5rem',
  fontWeight: 700,
  marginBottom: '3rem',
  textAlign: 'center',
  color: 'var(--pixel-yellow)',
  fontFamily: "'Courier New', monospace",
  letterSpacing: '3px',
  textTransform: 'uppercase',
  textShadow: '3px 3px 0 var(--pixel-purple)',

  '&::after': {
    content: '""',
    display: 'block',
    width: '100px',
    height: '4px',
    background: 'var(--pixel-cyan)',
    margin: '1rem auto 0',
  },
})

const ContactContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  position: 'relative',
  zIndex: 2,
  maxWidth: '1200px',
  margin: '0 auto',

  '@media (max-width: 768px)': {
    gap: '2.5rem',
  },
})

const ContactInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  width: '100%',
  alignItems: 'center',
})

const ContactIntro = styled(Box)({
  maxWidth: '800px',
  margin: '0 auto',

  '& p': {
    fontSize: '1.1rem',
    lineHeight: 1.7,
    color: 'var(--pixel-light)',
  },
})

const ContactDetails = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '2rem',
  width: '100%',
  maxWidth: '900px',

  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '1.5rem',
    maxWidth: '400px',
  },

  '@media (max-width: 480px)': {
    maxWidth: '320px',
  },
})

const ContactItem = styled('a')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '1rem',
  padding: '2rem 1.5rem',
  background: 'var(--pixel-bg)',
  borderRadius: 0,
  textDecoration: 'none',
  color: 'var(--pixel-light)',
  border: '4px solid var(--pixel-cyan)',
  boxShadow: '8px 8px 0 var(--pixel-purple)',
  minHeight: '160px',
  justifyContent: 'center',

  '&:hover': {
    background: 'var(--pixel-blue)',
    borderColor: 'var(--pixel-cyan)',
    transform: 'translate(4px, 4px)',
    boxShadow: '4px 4px 0 var(--pixel-purple)',

    '& .contact-icon': {
      background: 'var(--pixel-cyan)',
      borderColor: 'var(--pixel-yellow)',
    },

    '& .contact-icon-img': {
      filter: 'brightness(0) saturate(100%) invert(8%) sepia(8%) saturate(3127%) hue-rotate(212deg) brightness(93%) contrast(97%)',
    },

    '& .contact-label': {
      color: 'var(--pixel-yellow)',
    },
  },

  '@media (max-width: 768px)': {
    padding: '1.5rem 1rem',
    minHeight: '140px',
  },

  '@media (max-width: 480px)': {
    padding: '1.25rem 0.875rem',
    minHeight: '120px',
  },
})

const ContactIcon = styled('div')({
  width: '60px',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--pixel-darker)',
  borderRadius: 0,
  marginBottom: '0.5rem',
  border: '4px solid var(--pixel-blue)',

  '@media (max-width: 768px)': {
    width: '50px',
    height: '50px',
  },

  '@media (max-width: 480px)': {
    width: '45px',
    height: '45px',
  },
})

const ContactIconImg = styled('img')({
  width: '32px',
  height: '32px',
  filter: 'brightness(0) saturate(100%) invert(100%)',

  '@media (max-width: 768px)': {
    width: '28px',
    height: '28px',
  },

  '@media (max-width: 480px)': {
    width: '24px',
    height: '24px',
  },
})

const ContactText = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
})

const ContactLabel = styled('span')({
  fontSize: '1.1rem',
  fontWeight: 700,
  marginBottom: '0.25rem',
  color: 'var(--pixel-yellow)',
  letterSpacing: '1px',
  textTransform: 'uppercase',

  '@media (max-width: 480px)': {
    fontSize: '1rem',
  },
})

const ContactValue = styled('span')({
  fontSize: '0.9rem',
  fontWeight: 500,
  color: 'var(--pixel-light)',
  wordBreak: 'break-word',

  '@media (max-width: 480px)': {
    fontSize: '0.85rem',
  },
})

const Contact = ({ unlockAchievement }: ContactProps) => {
  const sectionRef = useSectionVisibility({
    threshold: 0.3,
    onVisible: () => unlockAchievement('contact')
  });

  return (
    <ContactSection id="contact" ref={sectionRef}>
      <Container>
        <SectionTitle>Let's Connect!</SectionTitle>
        <ContactContent>
          <ContactInfo>
            <ContactIntro>
              <p>
                I'm always open to discussing new opportunities, interesting projects, 
                or just having a chat. Whether you're looking for a 
                software engineer, have a project in mind, or want to collaborate, 
                I'd love to hear from you!
              </p>
            </ContactIntro>
            
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
      </Container>
    </ContactSection>
  )
}

export default Contact
