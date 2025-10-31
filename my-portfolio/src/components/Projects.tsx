import { Container, Box, Typography, Chip, Button } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import './Projects.css'
import { useSectionVisibility } from '../hooks/useSectionVisibility'

interface Project {
  title: string
  period: string
  description: string
  technologies: string[]
  link?: string
  image?: string
}

interface ProjectsProps {
  unlockAchievement: (sectionId: string) => void;
}

const Projects = ({ unlockAchievement }: ProjectsProps) => {
  const sectionRef = useSectionVisibility({
    threshold: 0.3,
    onVisible: () => unlockAchievement('projects')
  });
  const projects: Project[] = [
    {
      title: "TechReady - Interview Prep 🏆",
      period: "OCT 2025 | K-State Hackathon 2025 Winner",
      description: "AI-powered mock interview platform with live transcription (Deepgram), speech synthesis (ElevenLabs), and LLM feedback (Gemini). Features modular API routes for proctoring, audio, and interview orchestration with Firebase authentication and storage. Includes technical prompt and feedback pipelines with schema validation and rate limiting.",
      technologies: ["Next.js", "Firebase", "Deepgram", "ElevenLabs", "Gemini API", "TypeScript"],
      link: "https://techready.tech",
      image: "./techready-screenshot.png"
    },
    {
      title: "Meteor Madness 🏆",
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
    <section id="projects" className="projects" ref={sectionRef}>
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 12 } }}>
        <Typography 
          variant="h2" 
          component="h2" 
          className="section-title"
          sx={{ 
            textAlign: 'center',
            mb: 4,
            color: 'var(--pixel-yellow)',
            fontSize: { xs: '2rem', md: '2.5rem' },
            textTransform: 'uppercase',
            letterSpacing: '3px',
            textShadow: '3px 3px 0 var(--pixel-purple)'
          }}
        >
          Featured Projects
        </Typography>
        
        <Swiper
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
          className="projects-swiper"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <Box
                className="project-card"
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
                          borderRadius: 0,
                          overflow: 'hidden',
                          boxShadow: '4px 4px 0 var(--pixel-purple)',
                          border: '4px solid var(--pixel-cyan)',
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'var(--pixel-darker)'
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
                          variant="contained"
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            background: 'var(--pixel-blue)',
                            color: 'var(--pixel-light)',
                            px: 4,
                            py: 1.25,
                            borderRadius: 0,
                            border: '4px solid var(--pixel-blue)',
                            textTransform: 'uppercase',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            fontWeight: 700,
                            letterSpacing: '1px',
                            boxShadow: '6px 6px 0 var(--pixel-purple)',
                            transition: 'none',
                            width: '100%',
                            '&:hover': {
                              background: 'var(--pixel-cyan)',
                              borderColor: 'var(--pixel-cyan)',
                              transform: 'translate(2px, 2px)',
                              boxShadow: '4px 4px 0 var(--pixel-purple)'
                            }
                          }}
                        >
                          Visit Live Site →
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
                    <Typography 
                      variant="h3" 
                      component="h3" 
                      className="project-title"
                      sx={{ 
                        fontSize: { xs: '1.2rem', md: '1.4rem' },
                        textAlign: 'center',
                        mb: 2
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Typography 
                      component="span" 
                      className="project-period"
                      sx={{ 
                        color: 'var(--pixel-cyan)',
                        fontSize: { xs: '0.8rem', md: '0.9rem' },
                        display: 'block',
                        textAlign: 'center',
                        mb: 2,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}
                    >
                      {project.period}
                    </Typography>
                    <Typography 
                      className="project-description"
                      sx={{ 
                        mb: 3,
                        fontSize: { xs: '0.85rem', md: '0.95rem' },
                        textAlign: 'center',
                        lineHeight: 1.5
                      }}
                    >
                      {project.description}
                    </Typography>
                    
                    <Box className="project-technologies">
                      <Typography 
                        variant="h4" 
                        component="h4"
                        sx={{ 
                          fontSize: { xs: '0.95rem', md: '1rem' },
                          mb: 2,
                          color: 'var(--pixel-yellow)',
                          textAlign: 'center',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}
                      >
                        Technologies:
                      </Typography>
                      <Box className="tech-tags">
                        {project.technologies.map((tech, techIndex) => (
                          <Chip
                            key={techIndex}
                            label={tech}
                            size="small"
                            sx={{
                              backgroundColor: 'var(--pixel-darker)',
                              color: 'var(--pixel-light)',
                              border: '3px solid var(--pixel-blue)',
                              borderRadius: 0,
                              fontSize: { xs: '0.8rem', md: '0.9rem' },
                              fontWeight: 550,
                              transition: 'none',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              '&:hover': {
                                backgroundColor: 'var(--pixel-blue)',
                                color: 'var(--pixel-light)',
                                borderColor: 'var(--pixel-cyan)',
                                transform: 'translate(-2px, -2px)',
                                boxShadow: '4px 4px 0 var(--pixel-purple)'
                              }
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  )
}

export default Projects
