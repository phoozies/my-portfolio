import { useState } from 'react'
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
  image?: string
}

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
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
      live: "#",
      image: "" // Add image URL when available
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
      live: "#",
      image: "" // Add image URL when available
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
      live: "#",
      image: "" // Add image URL when available
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
      live: "#",
      image: "" // Add image URL when available
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
      live: "#",
      image: "" // Add image URL when available
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
        return 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
      case 'Professional Project':
        return 'linear-gradient(135deg, #a855f7 0%, #e879f9 100%)'
      default:
        return 'linear-gradient(135deg, #4a5568 0%, #6b7280 100%)'
    }
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-carousel">
          <div 
            className="carousel-track"
            style={{
              transform: `translateX(-${currentIndex * (1064 + 32 + 48)}px)`
            }}
          >
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-image-section">
                  <div className="project-image-container">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="project-image" />
                    ) : (
                      <div className="project-image-placeholder">
                        <div className="placeholder-icon">💻</div>
                        <span>Project Screenshot</span>
                      </div>
                    )}
                  </div>
                  
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
                  
                  <div className="project-links">
                    <a href={project.github} className="project-link github-link">
                      <span>GitHub</span>
                    </a>
                    <a href={project.live} className="project-link live-link">
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="carousel-controls">
            <button className="carousel-btn" onClick={prevSlide} disabled={currentIndex === 0}>
              ←
            </button>
            
            <div className="carousel-indicators">
              {projects.map((_, index) => (
                <div
                  key={index}
                  className={`indicator ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
            
            <button className="carousel-btn" onClick={nextSlide} disabled={currentIndex === projects.length - 1}>
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
