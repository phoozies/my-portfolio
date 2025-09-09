import { useRef } from 'react'
import './Skills.css'

interface Skill {
  name: string
  logo?: string
  proficiency: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner'
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
        { name: "TypeScript", logo: "/typescript-logo.svg", proficiency: "Expert" },
        { name: "JavaScript", logo: "/javascript-logo.svg", proficiency: "Expert" },
        { name: "C#", logo: "/csharp-logo.svg", proficiency: "Advanced" },
        { name: "Python", logo: "/python-logo.svg", proficiency: "Advanced" },
        { name: "SQL", logo: "/sql-logo.svg", proficiency: "Advanced" },
        { name: "PHP", logo: "/php-logo.svg", proficiency: "Intermediate" }
      ]
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { name: "React", logo: "/react-logo.svg", proficiency: "Expert" },
        { name: "Next.js", logo: "/nextjs-logo.svg", proficiency: "Advanced" },
        { name: "Node.js", logo: "/nodejs-logo.svg", proficiency: "Advanced" },
        { name: ".NET", logo: "/dotnet-logo.svg", proficiency: "Advanced" }
      ]
    },
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS", logo: "/aws-logo.svg", proficiency: "Advanced" },
        { name: "Docker", logo: "/docker-logo.svg", proficiency: "Advanced" },
        { name: "Kubernetes", logo: "/kubernetes-logo.svg", proficiency: "Intermediate" }
      ]
    },
    {
      title: "Data & Analytics",
      skills: [
        { name: "DataDog", logo: "/datadog-logo.svg", proficiency: "Advanced" },
        { name: "PowerBI", logo: "/powerbi-logo.svg", proficiency: "Advanced" },
        { name: "Alteryx", logo: "/alteryx-logo.svg", proficiency: "Advanced" }
      ]
    },
    {
      title: "Design & Tools",
      skills: [
        { name: "HTML", logo: "/html-logo.svg", proficiency: "Expert" },
        { name: "CSS", logo: "/css-logo.svg", proficiency: "Expert" },
        { name: "Figma", logo: "/figma-logo.svg", proficiency: "Advanced" }
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
                        <span className="skill-proficiency">{skill.proficiency}</span>
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
