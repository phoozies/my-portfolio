import { useRef } from 'react'
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
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 532 // Card width (500px) + gap (32px)
      scrollContainerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 532 // Card width (500px) + gap (32px)
      scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' })
    }
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
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills-carousel-container">
          <button 
            className="carousel-button carousel-left"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            ←
          </button>
          <div className="skills-carousel" ref={scrollContainerRef}>
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
          <button 
            className="carousel-button carousel-right"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}

export default Skills
