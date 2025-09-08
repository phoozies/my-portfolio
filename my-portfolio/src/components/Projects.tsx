import './Projects.css'

interface Project {
  title: string
  period: string
  description: string
  achievements: string[]
  technologies: string[]
  status: 'In Progress' | 'Completed' | 'On Hold'
  type: 'Academic Project' | 'Professional Project' | 'Personal Project'
  github: string
  live: string
}

const Projects = () => {
  const projects: Project[] = [
    {
      title: "WSU Senior Design Project - Electromech Technologies",
      period: "JAN 2025 - Current",
      description: "Full-stack project management application sponsored by Electromech Technologies, featuring task management, security, and team collaboration capabilities.",
      achievements: [
        "Collaborated on full-stack development of an internal project management application",
        "Developed and refactored application to utilize ASP.NET backend framework and Next.js frontend",
        "Implemented containerized architecture for modular and expandable codebase",
        "Focused on task management, security, and team collaboration features"
      ],
      technologies: ["ASP.NET Core", "Next.js", "Docker", "Full-Stack Development", "Project Management"],
      status: "In Progress",
      type: "Academic Project",
      github: "#", // You can add actual links later
      live: "#"
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
      technologies: ["GenAI", "AI Agents", "Next.js", "Machine Learning", "User Experience"],
      status: "Completed",
      type: "Professional Project",
      github: "#",
      live: "#"
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
      technologies: ["AWS S3", "Event-Driven Architecture", "Next.js", "PI Systems", "API Integration"],
      status: "Completed",
      type: "Professional Project",
      github: "#",
      live: "#"
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
      technologies: ["Full-Stack Development", "NIST 800-171", "Authentication", "Data Management"],
      status: "Completed",
      type: "Professional Project",
      github: "#",
      live: "#"
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
      technologies: ["Microsoft Teams API", "Event Handling", "Multi-channel Routing", "Error Handling"],
      status: "Completed",
      type: "Professional Project",
      github: "#",
      live: "#"
    }
  ]

  const getStatusColor = (status: Project['status']): string => {
    switch (status) {
      case 'Completed':
        return '#48bb78'
      case 'In Progress':
        return '#ed8936'
      default:
        return '#4a5568'
    }
  }

  const getTypeColor = (type: Project['type']): string => {
    switch (type) {
      case 'Academic Project':
        return '#667eea'
      case 'Professional Project':
        return '#764ba2'
      default:
        return '#4a5568'
    }
  }

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <div className="project-meta">
                  <span 
                    className="project-type" 
                    style={{ background: getTypeColor(project.type) }}
                  >
                    {project.type}
                  </span>
                  <span 
                    className="project-status" 
                    style={{ background: getStatusColor(project.status) }}
                  >
                    {project.status}
                  </span>
                </div>
                <span className="project-period">{project.period}</span>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-achievements">
                  <h4>Key Achievements:</h4>
                  <ul>
                    {project.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex}>{achievement}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="project-technologies">
                  <h4>Technologies:</h4>
                  <div className="tech-tags">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="project-links">
                <a href={project.github} className="project-link github-link">
                  <span>GitHub</span>
                </a>
                <a href={project.live} className="project-link live-link">
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="projects-summary">
          <div className="summary-content">
            <h3>Project Highlights</h3>
            <div className="highlight-stats">
              <div className="highlight-item">
                <h4>$45K+</h4>
                <p>Total Value Delivered</p>
              </div>
              <div className="highlight-item">
                <h4>5+</h4>
                <p>Major Projects</p>
              </div>
              <div className="highlight-item">
                <h4>Multiple</h4>
                <p>Tech Stacks</p>
              </div>
              <div className="highlight-item">
                <h4>Enterprise</h4>
                <p>Scale Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
