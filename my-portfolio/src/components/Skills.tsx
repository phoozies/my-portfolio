import { useState } from 'react'
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
        { name: "TypeScript", logo: "/typescript-logo.svg" },
        { name: "JavaScript", logo: "/javascript-logo.svg" },
        { name: "C#", logo: "/csharp-logo.svg" },
        { name: "Python", logo: "/python-logo.svg" },
        { name: "SQL", logo: "/sql-logo.svg" },
        { name: "PHP", logo: "/php-logo.svg" }
      ]
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { name: "React", logo: "/react-logo.svg" },
        { name: "Next.js", logo: "/nextjs-logo.svg" },
        { name: "Node.js", logo: "/nodejs-logo.svg" },
        { name: ".NET", logo: "/dotnet-logo.svg" }
      ]
    },
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS", logo: "/aws-logo.svg" },
        { name: "Docker", logo: "/docker-logo.svg" },
        { name: "Kubernetes", logo: "/kubernetes-logo.svg" }
      ]
    },
    {
      title: "Data & Analytics",
      skills: [
        { name: "DataDog", logo: "/datadog-logo.svg" },
        { name: "PowerBI", logo: "/powerbi-logo.svg" },
        { name: "Alteryx", logo: "/alteryx-logo.svg" }
      ]
    },
    {
      title: "Design & Tools",
      skills: [
        { name: "HTML", logo: "/html-logo.svg" },
        { name: "CSS", logo: "/css-logo.svg" },
        { name: "Figma", logo: "/figma-logo.svg" }
      ]
    }
  ]

  return (
    <section id="skills" className="skills">
      <div className="container-fullwidth">
        <h2 className="section-title" style={{ margin: '0rem' }}>Skills & Technologies</h2>
        <div className="skills-carousel-container">
          <div className="carousel-button-container">
            <button 
              className="carousel-button"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              ←
            </button>
          </div>
          <div className="skills-carousel">
            <div 
              className="skills-carousel-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {skillCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="skill-category-card">
                  <h3 className="category-title">{category.title}</h3>
                  <div className="category-skills">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="skill-item">
                        {skill.logo && (
                          <div className="skill-logo">
                            <img src={skill.logo} alt={`${skill.name} logo`} />
                          </div>
                        )}
                        <div className="skill-info">
                          <span className="skill-name">{skill.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-button-container">
            <button 
              className="carousel-button"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              →
            </button>
          </div>
          <div className="carousel-indicators">
            {skillCategories.map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
