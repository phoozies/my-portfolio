import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { SOCIAL_LINKS } from '../constants'

const FooterContainer = styled('footer')({
  background: 'linear-gradient(180deg, var(--neutral-warm) 0%, var(--white-soft) 100%)',
  color: 'var(--neutral-dark)',
  padding: '1rem 0 1rem',
  borderTop: '2px solid var(--sakura-light)',
})

const FooterContent = styled(Box)({
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',

  '@media (max-width: 768px)': {
    padding: '0 1rem',
  },
})

const SocialLinks = styled(Box)({
  display: 'flex',
  gap: '2rem',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
})

const SocialLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50px',
  height: '50px',
  background: 'var(--white-soft)',
  borderRadius: 0,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '2px solid var(--sakura-accent)',
  position: 'relative',
  boxShadow: '3px 3px 0 var(--sakura-pink)',

  '&:hover': {
    background: 'var(--sakura-light)',
    borderColor: 'var(--sakura-deep)',
    transform: 'translate(3px, 3px)',
    boxShadow: '0 0 0 var(--sakura-pink)',

    '& img': {
      filter: 'brightness(0) saturate(100%) invert(49%) sepia(64%) saturate(2269%) hue-rotate(313deg) brightness(102%) contrast(101%)',
      transform: 'scale(1.1)',
    },
  },
})

const SocialIcon = styled('img')({
  width: '24px',
  height: '24px',
  filter: 'brightness(0) saturate(100%) invert(14%) sepia(11%) saturate(1026%) hue-rotate(330deg) brightness(95%) contrast(89%)',
  transition: 'all 0.3s ease',
})

const FooterBottom = styled(Box)({
  paddingTop: '1rem',
  borderTop: '1px solid var(--sakura-light)',
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
    color: 'var(--neutral-grey)',
    fontSize: '0.9rem',
  },

  '@media (max-width: 768px)': {
    padding: '0 1rem',
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
