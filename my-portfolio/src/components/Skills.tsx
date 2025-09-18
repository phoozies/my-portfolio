import { useState } from 'react'
import { Container, Box, IconButton, Typography } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import './Skills.css'

interface Skill {
  name: string
  logo?: string
}

interface SkillCategory {
  title: string
  skills: Skill[]
}

const Skills = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % skillCategories.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + skillCategories.length) % skillCategories.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const skillCategories: SkillCategory[] = [
    {
      title: "Programming Languages",
      skills: [
        { name: "TypeScript", logo: "./typescript-logo.svg" },
        { name: "JavaScript", logo: "./javascript-logo.svg" },
        { name: "C#", logo: "./csharp-logo.svg" },
        { name: "Python", logo: "./python-logo.svg" },
        { name: "SQL", logo: "./sql-logo.svg" },
        { name: "PHP", logo: "./php-logo.svg" }
      ]
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { name: "React", logo: "./react-logo.svg" },
        { name: "Next.js", logo: "./nextjs-logo.svg" },
        { name: "Node.js", logo: "./nodejs-logo.svg" },
        { name: ".NET", logo: "./dotnet-logo.svg" }
      ]
    },
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS", logo: "./aws-logo.svg" },
        { name: "Docker", logo: "./docker-logo.svg" },
        { name: "Kubernetes", logo: "./kubernetes-logo.svg" }
      ]
    },
    {
      title: "Data & Analytics",
      skills: [
        { name: "DataDog", logo: "./datadog-logo.svg" },
        { name: "PowerBI", logo: "./powerbi-logo.svg" },
        { name: "Alteryx", logo: "./alteryx-logo.svg" }
      ]
    },
    {
      title: "Design & Tools",
      skills: [
        { name: "HTML", logo: "./html-logo.svg" },
        { name: "CSS", logo: "./css-logo.svg" },
        { name: "Figma", logo: "./figma-logo.svg" }
      ]
    }
  ]

  return (
    <section id="skills" className="skills">
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
          Skills & Technologies
        </Typography>
        
        <Box className="skills-carousel-container" sx={{ position: 'relative' }}>
          <Box 
            className="skills-carousel" 
            sx={{ 
              overflow: 'hidden',
              px: { xs: 6, sm: 8, md: 12 },
              py: 4
            }}
          >
            <Box
              className="skills-carousel-track"
              sx={{
                display: 'flex',
                transition: 'transform 0.5s ease-in-out',
                transform: `translateX(calc(-${currentSlide * 100}% - ${currentSlide * 8}rem))`,
                gap: '8rem'
              }}
            >
              {skillCategories.map((category, categoryIndex) => (
                <Box
                  key={categoryIndex}
                  className="skill-category-card"
                  sx={{
                    minWidth: '100%',
                    flexShrink: 0,
                    px: { xs: 3, md: 4 },
                    py: { xs: 3, md: 4 }
                  }}
                >
                  <Typography 
                    variant="h3" 
                    component="h3" 
                    className="category-title"
                    sx={{ 
                      fontSize: { xs: '1.2rem', md: '1.4rem' },
                      textAlign: 'center',
                      mb: 2
                    }}
                  >
                    {category.title}
                  </Typography>
                  
                  <Box 
                    className="category-skills"
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
                      <Box key={skillIndex}>
                        <Box className="skill-item">
                          {skill.logo && (
                            <Box className="skill-logo">
                              <img src={skill.logo} alt={`${skill.name} logo`} />
                            </Box>
                          )}
                          <Box className="skill-info">
                            <Typography component="span" className="skill-name">
                              {skill.name}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
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
              aria-label="Previous slide"
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
              {skillCategories.map((_, index) => (
                <IconButton
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                  sx={{
                    width: 12,
                    height: 12,
                    minWidth: 12,
                    p: 0,
                    borderRadius: '50%',
                    bgcolor: index === currentSlide ? '#a855f7' : 'rgba(168, 85, 247, 0.3)',
                    '&:hover': {
                      bgcolor: 'rgba(168, 85, 247, 0.6)'
                    },
                    transform: index === currentSlide ? 'scale(1.2)' : 'scale(1)',
                    boxShadow: index === currentSlide ? '0 0 10px rgba(168, 85, 247, 0.6)' : 'none'
                  }}
                />
              ))}
            </Box>
            
            <IconButton
              onClick={nextSlide}
              className="carousel-btn"
              aria-label="Next slide"
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

export default Skills
