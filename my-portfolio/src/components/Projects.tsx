import { useState } from 'react'
import { Container, Box, IconButton, Typography, Chip } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import './Projects.css'

interface Project {
  title: string
  period: string
  description: string
  achievements: string[]
  technologies: string[]
}

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const projects: Project[] = [
    {
      title: "WSU Senior Design Project - Electromech Technologies",
      period: "JAN 2025 - Current",
      description: "Full-stack project management application sponsored by Electromech Technologies, featuring task management, security, and team collaboration capabilities.",
      achievements: [
        "Collaborated on full-stack development of an internal project management application",
        "Developed and refactored application to utilize ASP.NET backend framework and React.js frontend",
        "Implemented containerized architecture for modular and expandable codebase",
        "Focused on task management, security, and team collaboration features"
      ],
      technologies: ["ASP.NET Core", "React.js", "Docker", "Full-Stack Development", "Project Management"]
    },
    {
      title: "INVISTA Assistant GenAI Platform",
      period: "MAY 2025 – AUG 2025",
      description: "Enhanced GenAI platform integrating multiple AI agents with new features that delivered significant business value.",
      achievements: [
        "Developed new features for GenAI platform integrating multiple AI agents",
        "Enhanced user experience and delivered $40K value proposition",
        "Integrated AI agents for improved functionality",
        "Focused on user-centric design and feature development"
      ],
      technologies: ["GenAI", "AI Agents", "Next.js", "Machine Learning", "User Experience"]
    },
    {
      title: "Event-Driven Architecture Pipeline",
      period: "MAY 2025 – AUG 2025",
      description: "Automated telemetry data processing and error replay system using event-driven architecture.",
      achievements: [
        "Automated IP21 telemetry data from AWS S3 into PI systems",
        "Developed Next.js frontend for replaying errors from events",
        "Integrated existing APIs for local diagnostics and recovery",
        "Supporting $5M value proposition for Butachimie Project"
      ],
      technologies: ["AWS S3", "Event-Driven Architecture", "Next.js", "PI Systems", "API Integration"]
    },
    {
      title: "NIAR Legacy Application Replacement",
      period: "MAY 2024 – MAY 2025",
      description: "Full-stack internal web application replacing legacy system for data management and specimen tracking.",
      achievements: [
        "Replaced legacy application with modern full-stack solution",
        "Implemented secure authentication for NIST 800-171 compliance",
        "Optimized business processes for data management",
        "Focused on specimen tracking and inventory management"
      ],
      technologies: ["Full-Stack Development", "NIST 800-171", "Authentication", "Data Management"]
    },
    {
      title: "Microsoft Teams Notification System",
      period: "MAY 2025 – AUG 2025",
      description: "Event failure notification system with multi-channel routing and error response handling.",
      achievements: [
        "Engineered notification system for event failures",
        "Implemented multi-channel routing support",
        "Added 4XX/5XX level error response handling",
        "Reduced incident response time for business processes"
      ],
      technologies: ["Microsoft Teams API", "Event Handling", "Multi-channel Routing", "Error Handling"]
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section id="projects" className="projects">
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 12 } }}>
        <Typography 
          variant="h2" 
          component="h2" 
          className="section-title"
          sx={{ 
            textAlign: 'center',
            mb: 4,
            color: 'white',
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          Featured Projects
        </Typography>
        
        <Box className="projects-carousel" sx={{ position: 'relative', px: { xs: 6, sm: 8, md: 12 }, py: 4 }}>
          <Box
            className="carousel-track"
            sx={{
              display: 'flex',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 8}rem))`,
              gap: '8rem'
            }}
          >
            {projects.map((project, index) => (
              <Box
                key={index}
                className="project-card"
                sx={{
                  minWidth: '100%',
                  flexShrink: 0,
                  px: { xs: 3, md: 4 },
                  py: { xs: 3, md: 4 }
                }}
              >
                <Box className="project-content">
                  <Typography 
                    variant="h3" 
                    component="h3" 
                    className="project-title"
                    sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}
                  >
                    {project.title}
                  </Typography>
                  <Typography 
                    component="span" 
                    className="project-period"
                    sx={{ 
                      color: '#c084fc',
                      fontSize: { xs: '0.8rem', md: '0.9rem' },
                      display: 'block',
                      mb: 2
                    }}
                  >
                    {project.period}
                  </Typography>
                  <Typography 
                    className="project-description"
                    sx={{ 
                      mb: 2,
                      fontSize: { xs: '0.9rem', md: '1rem' }
                    }}
                  >
                    {project.description}
                  </Typography>
                  
                  <Box className="project-achievements" sx={{ mb: 2 }}>
                    <Typography 
                      variant="h4" 
                      component="h4"
                      sx={{ 
                        fontSize: { xs: '0.95rem', md: '1rem' },
                        mb: 1,
                        color: '#e879f9'
                      }}
                    >
                      Key Achievements:
                    </Typography>
                    <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                      {project.achievements.map((achievement, achievementIndex) => (
                        <Typography 
                          key={achievementIndex} 
                          component="li" 
                          className="achievement-item"
                          sx={{ 
                            fontSize: { xs: '0.85rem', md: '0.9rem' },
                            mb: 0.5,
                            pl: 2,
                            position: 'relative',
                            '&::before': {
                              content: '"✦"',
                              position: 'absolute',
                              left: 0,
                              color: '#a855f7'
                            }
                          }}
                        >
                          {achievement}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                  
                  <Box className="project-technologies">
                    <Typography 
                      variant="h4" 
                      component="h4"
                      sx={{ 
                        fontSize: { xs: '0.95rem', md: '1rem' },
                        mb: 1,
                        color: '#e879f9'
                      }}
                    >
                      Technologies:
                    </Typography>
                    <Box className="tech-tags" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {project.technologies.map((tech, techIndex) => (
                        <Chip
                          key={techIndex}
                          label={tech}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(168, 85, 247, 0.1)',
                            color: '#e5e7eb',
                            border: '1px solid rgba(168, 85, 247, 0.3)',
                            fontSize: { xs: '0.7rem', md: '0.8rem' },
                            '&:hover': {
                              backgroundColor: '#a855f7',
                              color: 'white'
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          
          <Box 
            className="carousel-controls"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              mt: 3
            }}
          >
            <IconButton
              onClick={prevSlide}
              className="carousel-btn"
              sx={{
                bgcolor: 'linear-gradient(135deg, #a855f7 0%, #e879f9 100%)',
                background: 'linear-gradient(135deg, #a855f7 0%, #e879f9 100%)',
                color: 'white',
                width: 50,
                height: 50,
                boxShadow: '0 4px 15px rgba(168, 85, 247, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #9333ea 0%, #d946ef 100%)',
                  transform: 'translateY(-2px) scale(1.05)',
                  boxShadow: '0 8px 25px rgba(168, 85, 247, 0.5)'
                },
                '&:disabled': {
                  opacity: 0.5,
                  cursor: 'not-allowed',
                  transform: 'none'
                }
              }}
            >
              <ArrowBackIos />
            </IconButton>
            
            <Box className="carousel-indicators" sx={{ display: 'flex', gap: 1 }}>
              {projects.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`indicator ${index === currentIndex ? 'active' : ''}`}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: index === currentIndex ? '#a855f7' : 'rgba(168, 85, 247, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)',
                    boxShadow: index === currentIndex ? '0 0 10px rgba(168, 85, 247, 0.6)' : 'none',
                    '&:hover': {
                      bgcolor: 'rgba(168, 85, 247, 0.6)'
                    }
                  }}
                />
              ))}
            </Box>
            
            <IconButton
              onClick={nextSlide}
              className="carousel-btn"
              sx={{
                bgcolor: 'linear-gradient(135deg, #a855f7 0%, #e879f9 100%)',
                background: 'linear-gradient(135deg, #a855f7 0%, #e879f9 100%)',
                color: 'white',
                width: 50,
                height: 50,
                boxShadow: '0 4px 15px rgba(168, 85, 247, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #9333ea 0%, #d946ef 100%)',
                  transform: 'translateY(-2px) scale(1.05)',
                  boxShadow: '0 8px 25px rgba(168, 85, 247, 0.5)'
                },
                '&:disabled': {
                  opacity: 0.5,
                  cursor: 'not-allowed',
                  transform: 'none'
                }
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </section>
  )
}

export default Projects
