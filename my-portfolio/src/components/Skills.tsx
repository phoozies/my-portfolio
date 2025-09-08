import './Skills.css'

interface Skill {
  name: string
  level: number
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
        { name: "TypeScript", level: 90 },
        { name: "JavaScript", level: 90 },
        { name: "C#", level: 85 },
        { name: "Python", level: 85 },
        { name: "Java", level: 80 },
        { name: "C++", level: 75 },
        { name: "SQL", level: 85 },
        { name: "PHP", level: 70 }
      ]
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "ASP.NET Core", level: 85 },
        { name: "Vue.js", level: 75 },
        { name: "FastAPI", level: 80 },
        { name: "Nest.js", level: 75 }
      ]
    },
    {
      title: "Technologies & Tools",
      skills: [
        { name: "AWS", level: 80 },
        { name: "Azure DevOps", level: 75 },
        { name: "Docker", level: 80 },
        { name: "Kubernetes", level: 70 },
        { name: "GitHub", level: 90 },
        { name: "Microsoft 365", level: 85 },
        { name: "Neo4J", level: 70 },
        { name: "MSSQL", level: 80 }
      ]
    },
    {
      title: "Data & Analytics",
      skills: [
        { name: "PowerBI", level: 85 },
        { name: "Alteryx", level: 80 },
        { name: "DataDog", level: 75 },
        { name: "DAX", level: 80 },
        { name: "Data Visualization", level: 85 }
      ]
    },
    {
      title: "DevOps & Deployment",
      skills: [
        { name: "ArgoCD", level: 70 },
        { name: "Kong", level: 65 },
        { name: "CI/CD", level: 80 },
        { name: "Event-Driven Architecture", level: 75 },
        { name: "Microservices", level: 75 }
      ]
    },
    {
      title: "Design & UI/UX",
      skills: [
        { name: "Figma", level: 75 },
        { name: "Responsive Design", level: 85 },
        { name: "UI/UX Design", level: 70 },
        { name: "Component Libraries", level: 80 }
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
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="skills-summary">
          <div className="summary-card">
            <h3>Core Competencies</h3>
            <ul>
              <li>Full-Stack Web Development</li>
              <li>Cloud Architecture & DevOps</li>
              <li>Data Analytics & Visualization</li>
              <li>GenAI & Machine Learning Integration</li>
              <li>Enterprise Software Development</li>
              <li>Event-Driven Architecture</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
