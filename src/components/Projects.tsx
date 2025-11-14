import { useState } from 'react'
import { Container, Box, Typography, Chip, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { BREAKPOINTS } from '../constants'

const ProjectsSection = styled('section')({
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

const ProjectsSwiper = styled(Swiper)({
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
    '& .swiper-wrapper': {
      transition: 'none !important',
    },
    '& .swiper-pagination-bullet, & .swiper-pagination-bullet-active': {
      transition: 'none !important',
    },
  },
})

const ProjectCard = styled(Box)({
  background: 'var(--terminal-surface)',
  padding: '2rem',
  border: '1px solid var(--terminal-border)',
  maxHeight: '75vh',
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  maxWidth: '900px',
  overflowY: 'auto',
  transition: 'all 0.2s ease',
  
  '&:hover': {
    background: 'var(--terminal-bg)',
    borderColor: 'var(--terminal-text)',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    padding: '1.5rem',
    maxHeight: '65vh',
  },
  
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none !important',
  },
})

const ProjectTitle = styled(Typography)({
  fontSize: '1.1rem',
  fontWeight: 400,
  color: 'var(--terminal-text)',
  marginBottom: '1rem',
  paddingBottom: '0.5rem',
  borderBottom: '1px solid var(--terminal-border)',
  lineHeight: 1.25,
  textAlign: 'center',
  letterSpacing: '0.05em',
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",

  '&::before': {
    content: '"[project] "',
    color: 'var(--terminal-text-dim)',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    fontSize: '1rem',
  },
})

const ProjectDescription = styled(Typography)({
  color: 'var(--terminal-text-dim)',
  lineHeight: 1.6,
  marginBottom: '1rem',
  textAlign: 'center',
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
  fontSize: '0.875rem',

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    fontSize: '0.8125rem',
  },
})

const TechTags = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '0.5rem',
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

interface Project {
  title: string
  period: string
  description: string
  technologies: string[]
  link?: string
  image?: string
}

const Projects = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)

  const projects: Project[] = [
    {
      title: "TechReady - Interview Prep",
      period: "OCT 2025 | K-State Hackathon 2025 Winner",
      description: "AI-powered mock interview platform with live transcription (Deepgram), speech synthesis (ElevenLabs), and LLM feedback (Gemini). Features modular API routes for proctoring, audio, and interview orchestration with Firebase authentication and storage. Includes technical prompt and feedback pipelines with schema validation and rate limiting.",
      technologies: ["Next.js", "Firebase", "Deepgram", "ElevenLabs", "Gemini API", "TypeScript"],
      link: "https://techready.tech",
      image: "./techready-screenshot.png"
    },
    {
      title: "Meteor Madness",
      period: "OCT 2025 | NASA Space Apps Challenge 2025 Winner",
      description: "Interactive asteroid-impact simulator visualizing real-time planetary defense scenarios. Models impact physics (crater size, overpressure, blast radius) and mitigation strategies (kinetic impactor, gravity tractor) using live NASA NEO API data.",
      technologies: ["Next.js", "CesiumJS", "react-leaflet", "NASA NEO API", "TypeScript"],
      link: "https://nasa-meteor-madness-wine.vercel.app/",
      image: "./meteor-madness-screenshot.png"
    },
    {
      title: "WSU Senior Design - Electromech Technologies",
      period: "JAN 2025 - Current",
      description: "Full-stack project management application with containerized architecture for modular and expandable codebase. Focuses on team collaboration, dynamic visualizations, task management, and security features.",
      technologies: ["ASP.NET Core", "React.js", "Docker", "Entity Framework", "Azure DevOps"],
      image: "./senior-design-screenshot.png"
    }
  ]

  return (
    <ProjectsSection id="projects">
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 12 } }}>
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
          Projects
        </Typography>
        
        <Box sx={{ position: 'relative' }}>
          <PrevButton onClick={() => swiperInstance?.slidePrev()}>
            ←
          </PrevButton>
          <NextButton onClick={() => swiperInstance?.slideNext()}>
            →
          </NextButton>
          <ProjectsSwiper
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
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <ProjectCard
                sx={{
                  flexShrink: 0,
                  margin: '0 auto',
                  maxWidth: '900px',
                  px: { xs: 2, sm: 3, md: 4 },
                  py: { xs: 2, sm: 3, md: 4 }
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 3,
                  height: '100%'
                }}>
                  {/* Left Column - Image and Button */}
                  <Box sx={{ 
                    flex: '0 0 55%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                  }}>
                    {project.image && (
                      <Box 
                        sx={{ 
                          overflow: 'hidden',
                          border: '1px solid var(--terminal-border)',
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'var(--terminal-bg)'
                        }}
                      >
                        <img 
                          src={project.image} 
                          alt={`${project.title} screenshot`}
                          style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            objectFit: 'contain'
                          }}
                        />
                      </Box>
                    )}
                    {project.link && (
                      <Box sx={{ textAlign: 'center' }}>
                        <Button
                          variant="outlined"
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            background: 'transparent',
                            color: 'var(--terminal-text)',
                            px: 3,
                            py: 1,
                            border: '1px solid var(--terminal-border)',
                            fontSize: { xs: '0.875rem', md: '0.95rem' },
                            fontWeight: 400,
                            letterSpacing: '0.02em',
                            fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
                            transition: 'all 0.2s ease',
                            width: '100%',
                            '&:hover': {
                              background: 'var(--terminal-surface)',
                              borderColor: 'var(--terminal-text)',
                            }
                          }}
                        >
                          → view project
                        </Button>
                      </Box>
                    )}
                  </Box>

                  {/* Right Column - Title, Period, Description, Technologies */}
                  <Box className="project-content" sx={{ 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <ProjectTitle 
                      variant="h3"
                      sx={{ 
                        fontSize: { xs: '1.2rem', md: '1.4rem' },
                        textAlign: 'center',
                        mb: 2
                      }}
                    >
                      {project.title}
                    </ProjectTitle>
                    <Typography 
                      component="span" 
                      className="project-period"
                      sx={{ 
                        color: 'var(--terminal-text-dim)',
                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                        display: 'block',
                        textAlign: 'center',
                        mb: 2,
                        fontWeight: 400,
                        letterSpacing: '0.02em',
                        fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace"
                      }}
                    >
                      {project.period}
                    </Typography>
                    <ProjectDescription
                      sx={{ 
                        mb: 3,
                        fontSize: { xs: '0.85rem', md: '0.95rem' },
                        textAlign: 'center',
                        lineHeight: 1.5
                      }}
                    >
                      {project.description}
                    </ProjectDescription>
                    
                    <Box className="project-technologies">
                      <Typography 
                        variant="h4" 
                        component="h4"
                        sx={{ 
                          fontSize: { xs: '0.875rem', md: '0.95rem' },
                          mb: 1.5,
                          color: 'var(--terminal-text)',
                          textAlign: 'center',
                          fontWeight: 400,
                          letterSpacing: '0.02em',
                          fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
                          '&::before': {
                            content: '"[tech] "',
                            color: 'var(--terminal-text-dim)',
                          },
                        }}
                      >
                        Stack
                      </Typography>
                      <TechTags>
                        {project.technologies.map((tech, techIndex) => (
                          <Chip
                            key={techIndex}
                            label={tech}
                            size="small"
                            sx={{
                              backgroundColor: 'var(--terminal-bg)',
                              color: 'var(--terminal-text-dim)',
                              border: '1px solid var(--terminal-border)',
                              fontSize: { xs: '0.75rem', md: '0.8125rem' },
                              fontWeight: 400,
                              fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                backgroundColor: 'var(--terminal-surface)',
                                color: 'var(--terminal-text)',
                                borderColor: 'var(--terminal-text)',
                              }
                            }}
                          />
                        ))}
                      </TechTags>
                    </Box>
                  </Box>
                </Box>
              </ProjectCard>
            </SwiperSlide>
          ))}
        </ProjectsSwiper>
        </Box>
      </Container>
    </ProjectsSection>
  )
}

export default Projects
