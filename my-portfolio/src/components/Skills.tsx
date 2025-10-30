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
    <section id="skills" className="skills">
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 12 } }}>
        <Typography 
          variant="h2" 
          component="h2" 
          className="section-title" 
          sx={{ 
            textAlign: 'center',
            mb: 4,
            color: 'var(--neutral-dark)',
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
                    <Box key={skillIndex} className="skill-item">
                      {skill.logo && (
                        <Box className="skill-logo">
                          <img src={skill.logo} alt={`${skill.name} logo`} />
                        </Box>
                      )}
                      <Box className="skill-info">
                        <Typography 
                          component="span" 
                          className="skill-name"
                          sx={{ fontWeight: 550 }}
                        >
                          {skill.name}
                        </Typography>
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
