import { Container, Box, Typography, keyframes } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useSectionVisibility } from '../hooks/useSectionVisibility'

const skillPulse = keyframes`
  to {
    transform: scale(1.05);
  }
`

const SkillsSection = styled('section')({
  background: 'var(--pixel-dark)',
  color: 'var(--pixel-light)',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  padding: 0,
})

const SkillsSwiper = styled(Swiper)({
  padding: '2rem 0',
  '& .swiper-pagination': {
    position: 'relative !important',
    marginTop: '2rem !important',
    bottom: 'auto !important',
  },
  '& .swiper-pagination-bullet': {
    width: '12px !important',
    height: '12px !important',
    background: 'var(--pixel-bg) !important',
    borderRadius: '0 !important',
    border: '2px solid var(--pixel-cyan) !important',
    opacity: '1 !important',
    transition: 'all 0.3s ease !important',
  },
  '& .swiper-pagination-bullet-active': {
    background: 'var(--pixel-cyan) !important',
    borderColor: 'var(--pixel-yellow) !important',
    boxShadow: '0 0 10px var(--pixel-cyan) !important',
  },
  '& .swiper-pagination-bullet:hover': {
    background: 'var(--pixel-yellow) !important',
    borderColor: 'var(--pixel-yellow) !important',
  },
  '@media (max-width: 768px)': {
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
  background: 'var(--pixel-bg)',
  padding: '2.5rem 2.75rem',
  borderRadius: 0,
  boxShadow: '8px 8px 0 var(--pixel-purple)',
  border: '4px solid var(--pixel-cyan)',
  minHeight: '70vh',
  display: 'flex',
  flexDirection: 'column',
  willChange: 'transform',
  margin: '0 auto',
  maxWidth: '900px',

  '&:hover': {
    transform: 'translate(4px, 4px)',
    boxShadow: '4px 4px 0 var(--pixel-purple)',
  },

  '@media (max-width: 599px)': {
    padding: '2rem',
  },

  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none !important',
    '&:hover': {
      transform: 'none !important',
    },
  },
})

const CategoryTitle = styled(Typography)({
  fontSize: '1.4rem',
  fontWeight: 700,
  color: 'var(--pixel-yellow)',
  marginBottom: '1.5rem',
  paddingBottom: '0.75rem',
  borderBottom: '4px solid var(--pixel-cyan)',
  textAlign: 'center',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  textShadow: '2px 2px 0 var(--pixel-purple)',
})

const CategorySkills = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

const SkillItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '1rem 1.5rem',
  background: 'var(--pixel-darker)',
  border: '3px solid var(--pixel-blue)',
  borderRadius: 0,
  gap: '1.5rem',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',

  '&:hover': {
    background: 'var(--pixel-blue)',
    borderColor: 'var(--pixel-cyan)',
    transform: 'translateX(8px)',
    boxShadow: '6px 6px 0 var(--pixel-purple)',
    animation: `${skillPulse} 0.3s ease-out`,

    '& .skill-logo': {
      transform: 'scale(1.1) rotate(5deg)',
    },

    '& .skill-logo img': {
      filter: 'brightness(1.2)',
    },

    '& .skill-name': {
      color: 'var(--pixel-yellow)',
      textShadow: '2px 2px 0 var(--pixel-purple)',
    },
  },

  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none !important',
    '&:hover': {
      transform: 'none !important',
      animation: 'none !important',
    },
    '& .skill-logo': {
      transition: 'none !important',
    },
    '&:hover .skill-logo': {
      transform: 'none !important',
    },
  },
})

const SkillLogo = styled(Box)({
  width: '50px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.3s ease',

  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    transition: 'filter 0.3s ease',
  },

  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none !important',
    '& img': {
      transition: 'none !important',
    },
  },
})

const SkillInfo = styled(Box)({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
})

const SkillName = styled(Typography)({
  fontSize: '1.1rem',
  fontWeight: 600,
  color: 'var(--pixel-light)',
  letterSpacing: '0.5px',
  transition: 'all 0.3s ease',

  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none !important',
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

interface SkillsProps {
  unlockAchievement: (sectionId: string) => void;
}

const Skills = ({ unlockAchievement }: SkillsProps) => {
  const sectionRef = useSectionVisibility({
    threshold: 0.3,
    onVisible: () => unlockAchievement('skills')
  });
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
    <SkillsSection id="skills" ref={sectionRef}>
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 12 } }}>
        <Typography 
          variant="h2" 
          component="h2"
          sx={{ 
            textAlign: 'center',
            mb: 4,
            color: 'var(--pixel-yellow)',
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontFamily: "'Courier New', monospace",
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textShadow: '3px 3px 0 var(--pixel-purple)',
          }}
        >
          Skills & Technologies
        </Typography>
        
        <SkillsSwiper
          modules={[Pagination]}
          spaceBetween={48}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          loop={true}
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
      </Container>
    </SkillsSection>
  )
}

export default Skills
