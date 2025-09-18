import { Container, Box, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
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
        
        <Swiper
          modules={[Pagination]}
          spaceBetween={48}
          slidesPerView={1}
          pagination={{
            clickable: true,
            bulletClass: 'custom-skill-bullet',
            bulletActiveClass: 'custom-skill-bullet-active',
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
          className="skills-swiper"
        >
          {skillCategories.map((category, categoryIndex) => (
            <SwiperSlide key={categoryIndex}>
              <Box
                className="skill-category-card"
                sx={{
                  flexShrink: 0,
                  margin: '0 auto',
                  maxWidth: '900px',
                  px: { xs: 2, sm: 3, md: 4 },
                  py: { xs: 2, sm: 3, md: 4 }
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
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  )
}

export default Skills
