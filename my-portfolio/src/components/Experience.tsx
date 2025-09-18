import { useEffect, useRef } from 'react'
import './Experience.css'

interface Experience {
  title: string
  company: string
  period: string
  location: string
  achievements: string[]
  technologies: string[]
  type: 'internship' | 'student-assistant' | 'full-time'
}

const Experience = () => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      // Skip animations if user prefers reduced motion
      itemRefs.current.forEach((ref) => {
        if (ref) {
          ref.classList.add('animate-in')
        }
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            entry.target.classList.remove('animate-out')
          } else {
            entry.target.classList.remove('animate-in')
            entry.target.classList.add('animate-out')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const experiences: Experience[] = [
    {
      title: "Software Engineering Intern",
      company: "INVISTA",
      period: "MAY 2025 – AUG 2025",
      location: "Wichita, Kansas",
      achievements: [
        "Developed new features for INVISTA Assistant, a GenAI platform integrating multiple AI agents, to enhance user experience and delivered a $40K value proposition for features.",
        "Automated IP21 telemetry data from AWS S3 into PI systems using event-driven architecture, supporting a $5M value proposition for the Butachimie Project.",
        "Engineered a Microsoft Teams notification system for event failures with support for multi-channel routing and 4XX/5XX level error responses, reducing incident response time for business processes.",
        "Developed a Next.js-based frontend for replaying errors from events in an event-driven architecture pipeline, integrating existing APIs to enable local level diagnostics, recovery, and visualization."
      ],
      technologies: ["Next.js", "GenAI", "AWS S3", "Event-Driven Architecture", "Microsoft Teams API", "PI Systems"],
      type: "internship"
    },
    {
      title: "Web Development Student Assistant",
      company: "NIAR (National Institute for Aviation Research)",
      period: "MAY 2024 – MAY 2025",
      location: "Wichita, Kansas",
      achievements: [
        "Developed a full-stack internal web application to replace a legacy application focused on data management and tracking specimens in order to optimize business processes.",
        "Implemented secure authentication to maintain compliance with NIST 800-171 standards and government security protocols."
      ],
      technologies: ["Full-Stack Development", "NIST 800-171", "Authentication", "Data Management"],
      type: "student-assistant"
    },
    {
      title: "Logistics Student Assistant",
      company: "NIAR (National Institute for Aviation Research)",
      period: "JUL 2023 – MAY 2024",
      location: "Wichita, Kansas",
      achievements: [
        "Managed 250+ weekly specimen failure records and organized inventory for 10K+ items using Excel and internal tools to support an effective management system for faster lookup."
      ],
      technologies: ["Excel", "Data Management", "Inventory Management"],
      type: "student-assistant"
    },
    {
      title: "IT Data & Analytics Intern",
      company: "Textron Aviation",
      period: "JUL 2023 – MAY 2025",
      location: "Wichita, Kansas",
      achievements: [
        "Managed and cleaned over 700K aircraft data entries using Alteryx, enhancing data quality and integrity.",
        "Created PowerBI dashboards with DAX to visualize trends and identify data gaps, supporting executive decision-making."
      ],
      technologies: ["Alteryx", "PowerBI", "DAX", "Data Analytics", "Data Visualization"],
      type: "internship"
    }
  ]

  const getTypeColor = (type: Experience['type']): string => {
    switch (type) {
      case 'internship':
        return '#667eea'
      case 'student-assistant':
        return '#764ba2'
      default:
        return '#4a5568'
    }
  }

  return (
    <section id="experience" className="experience">
      <div className="container-fullwidth">
        <h2 className="section-title">Professional Experience</h2>
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className={`experience-item ${index % 2 === 0 ? 'left' : 'right'}`}
              ref={(el) => { itemRefs.current[index] = el }}
            >
              <div className="experience-marker" style={{ background: getTypeColor(exp.type) }}>
                <div className="marker-dot"></div>
              </div>
              
              <div className="experience-content">
                <div className="experience-header">
                  <h3 className="experience-title">{exp.title}</h3>
                  <div className="experience-meta">
                    <span className="company">{exp.company}</span>
                    <span className="period">{exp.period}</span>
                    <span className="location">{exp.location}</span>
                  </div>
                </div>
                
                <div className="experience-body">
                  <ul className="achievements">
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex}>{achievement}</li>
                    ))}
                  </ul>
                  
                  <div className="technologies">
                    <h4>Technologies Used:</h4>
                    <div className="tech-tags">
                      {exp.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
