import { Container, Box, Typography, Chip } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import './Projects.css'

interface Project {
  title: string
  period: string
  description: string
  technologies: string[]
}

const Projects = () => {
  const projects: Project[] = [
    {
      title: "WSU Senior Design Project - Electromech Technologies",
      period: "JAN 2025 - Current",
      description: "Full-stack project management application sponsored by Electromech Technologies, featuring task management, security, and team collaboration capabilities.",
      technologies: ["ASP.NET Core", "React.js", "Docker", "Full-Stack Development", "Project Management"]
    },
    {
      title: "INVISTA Assistant GenAI Platform",
      period: "MAY 2025 – AUG 2025",
      description: "Enhanced GenAI platform integrating multiple AI agents with new features that delivered significant business value.",
      technologies: ["GenAI", "AI Agents", "Next.js", "Machine Learning", "User Experience"]
    },
    {
      title: "Event-Driven Architecture Pipeline",
      period: "MAY 2025 – AUG 2025",
      description: "Automated telemetry data processing and error replay system using event-driven architecture.",
      technologies: ["AWS S3", "Event-Driven Architecture", "Next.js", "PI Systems", "API Integration"]
    },
    {
      title: "NIAR Legacy Application Replacement",
      period: "MAY 2024 – MAY 2025",
      description: "Full-stack internal web application replacing legacy system for data management and specimen tracking.",
      technologies: ["Full-Stack Development", "NIST 800-171", "Authentication", "Data Management"]
    },
    {
      title: "Microsoft Teams Notification System",
      period: "MAY 2025 – AUG 2025",
      description: "Event failure notification system with multi-channel routing and error response handling.",
      technologies: ["Microsoft Teams API", "Event Handling", "Multi-channel Routing", "Error Handling"]
    }
  ]

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
        
        <Swiper
          modules={[Pagination]}
          spaceBetween={48}
          slidesPerView={1}
          pagination={{
            clickable: true,
            bulletClass: 'custom-project-bullet',
            bulletActiveClass: 'custom-project-bullet-active',
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
                <Box className="project-content">
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
                      color: '#c084fc',
                      fontSize: { xs: '0.8rem', md: '0.9rem' },
                      display: 'block',
                      textAlign: 'center',
                      mb: 3
                    }}
                  >
                    {project.period}
                  </Typography>
                  <Typography 
                    className="project-description"
                    sx={{ 
                      mb: 3,
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      textAlign: 'center',
                      lineHeight: 1.6
                    }}
                  >
                    {project.description}
                  </Typography>
                  
                  <Box className="project-technologies" sx={{ flex: 1 }}>
                    <Typography 
                      variant="h4" 
                      component="h4"
                      sx={{ 
                        fontSize: { xs: '0.95rem', md: '1rem' },
                        mb: 2,
                        color: '#e879f9',
                        textAlign: 'center'
                      }}
                    >
                      Technologies:
                    </Typography>
                    <Box 
                      className="tech-tags" 
                      sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
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
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              backgroundColor: '#a855f7',
                              color: 'white',
                              transform: 'translateY(-2px)'
                            }
                          }}
                        />
                      ))}
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
