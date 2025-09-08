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
        { name: "DataDog", logo: "/datadog-logo.svg", proficiency: "Advanced" }
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
      <div className="container">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-cards">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-card">
                    {skill.logo && (
                      <div className="skill-logo">
                        <img src={skill.logo} alt={`${skill.name} logo`} />
                      </div>
                    )}
                    <div className="skill-content">
                      <h4 className="skill-name">{skill.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
