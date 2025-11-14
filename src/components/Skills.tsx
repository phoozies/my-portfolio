import { useState } from 'react'
import { Container, Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { BREAKPOINTS } from '../constants'

const SkillsSection = styled('section')({
  background: 'var(--terminal-bg)',
  color: 'var(--terminal-text)',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  padding: '4rem 0',

  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    padding: '3rem 0',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    padding: '2rem 0',
  },
})

const SkillsSwiper = styled(Swiper)({
  padding: '2rem 0',
  '& .swiper-pagination': {
    position: 'relative !important',
    marginTop: '2rem !important',
    bottom: 'auto !important',
  },
  '& .swiper-pagination-bullet': {
    width: '8px !important',
    height: '8px !important',
    background: 'var(--terminal-grey-dark) !important',
    borderRadius: '50% !important',
    opacity: '1 !important',
    transition: 'all 0.2s ease !important',
  },
  '& .swiper-pagination-bullet-active': {
    background: 'var(--terminal-text) !important',
  },
  '& .swiper-pagination-bullet:hover': {
    background: 'var(--terminal-text) !important',
  },
  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    padding: '1rem 0',
    '& .swiper-pagination': {
      marginTop: '1rem !important',
    },
  },
  '@media (prefers-reduced-motion: reduce)': {
    '& .swiper-pagination-bullet': {
      transition: 'none !important',
    },
  },
})

const SkillCategoryCard = styled(Box)({
  background: 'var(--terminal-surface)',
  padding: '2rem',
  border: '1px solid var(--terminal-border)',
  minHeight: '60vh',
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  maxWidth: '900px',

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    padding: '1.5rem',
    minHeight: '50vh',
  },
})

const CategoryTitle = styled(Typography)({
  fontSize: '1.25rem',
  fontWeight: 400,
  color: 'var(--terminal-text)',
  marginBottom: '1.5rem',
  paddingBottom: '0.75rem',
  borderBottom: '1px solid var(--terminal-border)',
  textAlign: 'center',
  letterSpacing: '0.05em',
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",

  '&::before': {
    content: '"# "',
    color: 'var(--terminal-text-dim)',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    fontSize: '1.1rem',
  },
})

const CategorySkills = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
})

const SkillItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '0.75rem 1rem',
  background: 'var(--terminal-bg)',
  border: '1px solid var(--terminal-border)',
  gap: '1rem',
  transition: 'all 0.2s ease',
  cursor: 'pointer',

  '&:hover': {
    background: 'var(--terminal-surface)',
    borderColor: 'var(--terminal-text)',

    '& .skill-name': {
      color: 'var(--terminal-text)',
    },
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    padding: '0.5rem 0.75rem',
    gap: '0.75rem',
  },

  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none !important',
    '&:hover': {
      transform: 'none !important',
    },
  },
})

const SkillLogo = styled(Box)({
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    width: '28px',
    height: '28px',
  },
})

const SkillInfo = styled(Box)({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
})

const SkillName = styled(Typography)({
  fontSize: '0.95rem',
  fontWeight: 400,
  color: 'var(--terminal-text-dim)',
  letterSpacing: '0.02em',
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
  transition: 'color 0.2s ease',

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    fontSize: '0.875rem',
  },

  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none !important',
  },
})

const NavButton = styled(Box)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--terminal-surface)',
  border: '1px solid var(--terminal-border)',
  color: 'var(--terminal-text)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
  fontSize: '1.2rem',
  userSelect: 'none',
  '&:hover': {
    background: 'var(--terminal-bg)',
    borderColor: 'var(--terminal-text)',
    color: 'var(--terminal-text)',
  },
  '&.swiper-button-disabled': {
    opacity: 0.3,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    width: '32px',
    height: '32px',
    fontSize: '1rem',
  },
})

const PrevButton = styled(NavButton)({
  left: '10px',
  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    left: '5px',
  },
})

const NextButton = styled(NavButton)({
  right: '10px',
  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    right: '5px',
  },
})

interface Skill {
  name: string
  logo?: string
}

interface SkillCategory {
  title: string
  skills: Skill[]
}

const Skills = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)

  const skillCategories: SkillCategory[] = [
    {
      title: "Programming Languages",
      skills: [
        { name: "C#", logo: "./csharp-logo.svg" },
        { name: "TypeScript", logo: "./typescript-logo.svg" },
        { name: "JavaScript", logo: "./javascript-logo.svg" },
        { name: "Python", logo: "./python-logo.svg" },
        { name: "Java", logo: "./java-logo.svg" },
        { name: "C++", logo: "./cpp-logo.svg" },
        { name: "SQL", logo: "./sql-logo.svg" },
        { name: "PHP", logo: "./php-logo.svg" }
      ]
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { name: "ASP.NET Core", logo: "./dotnet-logo.svg" },
        { name: "React", logo: "./react-logo.svg" },
        { name: "Next.js", logo: "./nextjs-logo.svg" },
        { name: "FastAPI", logo: "./fastapi-logo.svg" },
        { name: "Nest.js", logo: "./nestjs-logo.svg" },
        { name: "Vue.js", logo: "./vue-logo.svg" }
      ]
    },
    {
      title: "Testing",
      skills: [
        { name: "Jest", logo: "./jest-logo.svg" },
        { name: "Pytest", logo: "./pytest-logo.svg" },
        { name: "xUnit.net", logo: "./xunit-logo.svg" }
      ]
    },
    {
      title: "Technologies",
      skills: [
        { name: "Microsoft 365", logo: "./ms365-logo.svg" },
        { name: "AWS", logo: "./aws-logo.svg" },
        { name: "Git", logo: "./git-logo.svg" },
        { name: "GitHub", logo: "./github-logo.svg" },
        { name: "Azure DevOps", logo: "./ado-logo.svg" },
        { name: "Postman", logo: "./postman-logo.svg" },
        { name: "Neo4J", logo: "./neo4j-logo.svg" },
        { name: "Docker", logo: "./docker-logo.svg" },
        { name: "Kubernetes", logo: "./kubernetes-logo.svg" },
        { name: "Firebase", logo: "./firebase-logo.svg" },
        { name: "Linux", logo: "./linux-logo.svg" },
        { name: "PowerShell", logo: "./powershell-logo.svg" }
      ]
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "PowerBI", logo: "./powerbi-logo.svg" },
        { name: "Alteryx", logo: "./alteryx-logo.svg" },
        { name: "DataDog", logo: "./datadog-logo.svg" },
        { name: "ArgoCD", logo: "./argo-logo.svg" },
        { name: "Kong", logo: "./kong-logo.svg" },
        { name: "Figma", logo: "./figma-logo.svg" }
      ]
    }
  ]

  return (
    <SkillsSection id="skills">
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
        <Typography 
          variant="h2" 
          component="h2"
          sx={{ 
            textAlign: 'center',
            mb: 4,
            color: 'var(--terminal-text)',
            fontSize: { xs: '1.5rem', md: '1.75rem' },
            fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
            fontWeight: 400,
            letterSpacing: '0.05em',
            '&::before': {
              content: '"$ "',
              color: 'var(--terminal-text-dim)',
            },
          }}
        >
          Technical Skills
        </Typography>
        
        <Box sx={{ position: 'relative' }}>
          <PrevButton onClick={() => swiperInstance?.slidePrev()}>
            ←
          </PrevButton>
          <NextButton onClick={() => swiperInstance?.slideNext()}>
            →
          </NextButton>
          <SkillsSwiper
            modules={[Pagination, Navigation]}
            spaceBetween={48}
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            loop={true}
            onSwiper={setSwiperInstance}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 40,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 48,
              },
            }}
          >
          {skillCategories.map((category, categoryIndex) => (
            <SwiperSlide key={categoryIndex}>
              <SkillCategoryCard>
                <CategoryTitle variant="h3">
                  {category.title}
                </CategoryTitle>
                
                <CategorySkills
                  sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { 
                      xs: '1fr', 
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)'
                    },
                    gap: { xs: 1, md: 2 },
                    flex: 1,
                    px: { xs: 1, md: 2 }
                  }}
                >
                  {category.skills.map((skill, skillIndex) => (
                    <SkillItem key={skillIndex}>
                      {skill.logo && (
                        <SkillLogo className="skill-logo">
                          <img src={skill.logo} alt={`${skill.name} logo`} />
                        </SkillLogo>
                      )}
                      <SkillInfo className="skill-info">
                        <SkillName className="skill-name">
                          {skill.name}
                        </SkillName>
                      </SkillInfo>
                    </SkillItem>
                  ))}
                </CategorySkills>
              </SkillCategoryCard>
            </SwiperSlide>
          ))}
        </SkillsSwiper>
        </Box>
      </Container>
    </SkillsSection>
  )
}

export default Skills
