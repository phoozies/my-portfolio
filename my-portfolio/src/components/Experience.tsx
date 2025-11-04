import { useEffect, useRef, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useSectionVisibility } from '../hooks/useSectionVisibility'

const ExperienceSection = styled('section')({
  background: 'var(--pixel-dark)',
  padding: '100px 20px',
  color: 'var(--pixel-light)',
  '@media (max-width: 768px)': {
    padding: '80px 15px',
  },
})

const ExperienceTimeline = styled(Box)({
  position: 'relative',
  maxWidth: '1400px',
  margin: '0 auto',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: 0,
    bottom: 0,
    width: '4px',
    background: 'var(--pixel-cyan)',
    borderRadius: 0,
    boxShadow: '0 0 10px var(--pixel-cyan)',
  },
  '@media (max-width: 768px)': {
    '&::before': {
      left: '30px',
      transform: 'none',
    },
  },
  '@media (max-width: 480px)': {
    '&::before': {
      left: '20px',
    },
  },
})

const ExperienceItem = styled(Box)<{ side: 'left' | 'right'; isAnimatedIn?: boolean; isAnimatedOut?: boolean }>(({ side, isAnimatedIn, isAnimatedOut }) => ({
  position: 'relative',
  marginBottom: '4rem',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  opacity: isAnimatedIn ? 1 : isAnimatedOut ? 0 : 0,
  transform: isAnimatedIn ? 'translateY(0)' : isAnimatedOut ? 'translateY(30px) scale(0.95)' : 'translateY(50px)',
  transition: 'all 0.6s ease',
  justifyContent: side === 'left' ? 'flex-end' : 'flex-start',
  paddingRight: side === 'left' ? 'calc(50% + 40px)' : 0,
  paddingLeft: side === 'right' ? 'calc(50% + 40px)' : 0,
  '@media (max-width: 768px)': {
    justifyContent: 'flex-start !important',
    paddingLeft: '80px !important',
    paddingRight: '0 !important',
  },
  '@media (max-width: 480px)': {
    paddingLeft: '60px !important',
  },
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none !important',
    transition: 'none !important',
  },
}))

const ExperienceMarker = styled(Box)<{ isAnimatedIn?: boolean; isAnimatedOut?: boolean }>(({ isAnimatedIn, isAnimatedOut }) => ({
  position: 'absolute',
  left: '50%',
  transform: isAnimatedIn ? 'translateX(-50%) translate(3px, 3px)' : isAnimatedOut ? 'translateX(-50%) scale(0.8)' : 'translateX(-50%)',
  width: '80px',
  height: '80px',
  borderRadius: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 3,
  border: '4px solid var(--pixel-cyan)',
  background: 'var(--pixel-bg)',
  boxShadow: isAnimatedIn ? '3px 3px 0 var(--pixel-purple)' : '6px 6px 0 var(--pixel-purple)',
  opacity: isAnimatedOut ? 0.3 : 1,
  transition: 'none',
  '@media (max-width: 768px)': {
    left: '30px',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '60px',
    borderWidth: '3px',
  },
  '@media (max-width: 480px)': {
    left: '20px',
    width: '40px',
    height: '40px',
  },
}))

const MarkerDot = styled(Box)({
  width: '24px',
  height: '24px',
  background: 'var(--pixel-yellow)',
  borderRadius: 0,
  boxShadow: '0 0 10px var(--pixel-yellow)',
  '@media (max-width: 768px)': {
    width: '18px',
    height: '18px',
  },
  '@media (max-width: 480px)': {
    width: '12px',
    height: '12px',
  },
})

const ExperienceContent = styled(Box)<{ side: 'left' | 'right'; isAnimatedIn?: boolean; isAnimatedOut?: boolean }>(({ side, isAnimatedIn, isAnimatedOut }) => ({
  background: 'var(--pixel-bg)',
  padding: '2.5rem',
  borderRadius: 0,
  boxShadow: '8px 8px 0 var(--pixel-purple)',
  border: '4px solid var(--pixel-cyan)',
  transition: 'none',
  flex: 1,
  maxWidth: '500px',
  position: 'relative',
  marginRight: side === 'left' ? '2rem' : 0,
  marginLeft: side === 'right' ? '2rem' : 0,
  transform: isAnimatedIn 
    ? 'translateX(0)' 
    : isAnimatedOut 
      ? `translateX(${side === 'left' ? '-50px' : '50px'}) scale(0.9)` 
      : `translateX(${side === 'left' ? '-30px' : '30px'})`,
  opacity: isAnimatedOut ? 0 : 1,
  '&:hover': {
    transform: 'translate(4px, 4px)',
    boxShadow: '4px 4px 0 var(--pixel-purple)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    ...(side === 'left' ? {
      right: '-15px',
      borderLeft: '15px solid var(--pixel-bg)',
    } : {
      left: '-15px',
      borderRight: '15px solid var(--pixel-bg)',
    }),
    top: '50%',
    transform: 'translateY(-50%)',
    width: 0,
    height: 0,
    borderTop: '15px solid transparent',
    borderBottom: '15px solid transparent',
  },
  '@media (max-width: 768px)': {
    marginLeft: '1.5rem',
    marginRight: 0,
    maxWidth: 'none',
    padding: '2rem',
    transform: isAnimatedIn ? 'translateX(0) !important' : isAnimatedOut ? 'translateX(-20px) scale(0.95) !important' : 'translateX(-30px)',
    '&::after': {
      display: 'none',
    },
  },
  '@media (max-width: 480px)': {
    marginLeft: '1rem',
    padding: '1.5rem',
  },
}))

const ExperienceHeader = styled(Box)({
  marginBottom: '1.5rem',
})

const ExperienceTitle = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: 'var(--pixel-yellow)',
  marginBottom: '0.5rem',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  textShadow: '2px 2px 0 var(--pixel-purple)',
  '@media (max-width: 768px)': {
    fontSize: '1.3rem',
  },
})

const ExperienceMeta = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  fontSize: '0.9rem',
  color: 'var(--pixel-light)',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '0.5rem',
  },
})

const Company = styled('span')({
  fontWeight: 600,
  color: 'var(--pixel-cyan)',
  textTransform: 'uppercase',
})

const Period = styled('span')({
  background: 'var(--pixel-blue)',
  color: 'var(--pixel-light)',
  padding: '0.25rem 0.75rem',
  borderRadius: 0,
  fontSize: '0.8rem',
  fontWeight: 600,
  boxShadow: '2px 2px 0 var(--pixel-purple)',
  border: '2px solid var(--pixel-cyan)',
})

const Location = styled('span')({
  '&::before': {
    content: '"📍 "',
    marginRight: '0.25rem',
  },
})

const Achievements = styled('ul')({
  listStyle: 'none',
  padding: 0,
  marginBottom: '1.5rem',
  '& li': {
    padding: '0.75rem 0',
    borderBottom: '2px solid var(--pixel-darker)',
    color: 'var(--pixel-light)',
    lineHeight: 1.6,
    position: 'relative',
    paddingLeft: '1.5rem',
    '&:last-child': {
      borderBottom: 'none',
    },
    '&::before': {
      content: '"▶"',
      position: 'absolute',
      left: 0,
      color: 'var(--pixel-cyan)',
      fontSize: '0.8rem',
    },
  },
})

const Technologies = styled(Box)({
  '& h4': {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--pixel-yellow)',
    marginBottom: '0.75rem',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
})

const TechTags = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
})

const TechTag = styled('span')({
  color: 'var(--pixel-light) !important',
  padding: '0.25rem 0.75rem',
  border: '3px solid var(--pixel-blue)',
  borderRadius: 0,
  fontSize: '0.8rem',
  fontWeight: 550,
  background: 'var(--pixel-darker)',
  transition: 'none',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  '&:hover': {
    background: 'var(--pixel-blue)',
    color: 'var(--pixel-light) !important',
    transform: 'translate(-2px, -2px)',
    boxShadow: '4px 4px 0 var(--pixel-purple)',
    borderColor: 'var(--pixel-cyan)',
  },
})

interface Experience {
  title: string
  company: string
  period: string
  location: string
  achievements: string[]
  technologies: string[]
  type: 'internship' | 'student-assistant' | 'full-time'
}

interface ExperienceProps {
  unlockAchievement: (sectionId: string) => void;
}

const Experience = ({ unlockAchievement }: ExperienceProps) => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [animationStates, setAnimationStates] = useState<{ [key: number]: 'in' | 'out' | 'none' }>({})
  const sectionRef = useSectionVisibility({
    threshold: 0.1,
    onVisible: () => unlockAchievement('experience')
  })

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      // Skip animations if user prefers reduced motion
      const initialStates: { [key: number]: 'in' | 'out' | 'none' } = {}
      itemRefs.current.forEach((_, index) => {
        initialStates[index] = 'in'
      })
      setAnimationStates(initialStates)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0')
          if (entry.isIntersecting) {
            setAnimationStates(prev => ({ ...prev, [index]: 'in' }))
          } else {
            setAnimationStates(prev => ({ ...prev, [index]: 'out' }))
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

  return (
    <ExperienceSection id="experience" ref={sectionRef}>
      <Box className="container-fullwidth">
        <Typography 
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 4,
            color: 'var(--pixel-yellow)',
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontFamily: "'Courier New', monospace",
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textShadow: '3px 3px 0 var(--pixel-purple)',
          }}
        >
          Professional Experience
        </Typography>
        <ExperienceTimeline>
          {experiences.map((exp, index) => {
            const side = index % 2 === 0 ? 'left' : 'right'
            const animState = animationStates[index]
            const isAnimatedIn = animState === 'in'
            const isAnimatedOut = animState === 'out'
            
            return (
              <ExperienceItem 
                key={index} 
                side={side}
                isAnimatedIn={isAnimatedIn}
                isAnimatedOut={isAnimatedOut}
                data-index={index}
                ref={(el) => { itemRefs.current[index] = el as HTMLDivElement | null }}
              >
                <ExperienceMarker 
                  isAnimatedIn={isAnimatedIn} 
                  isAnimatedOut={isAnimatedOut}
                >
                  <MarkerDot />
                </ExperienceMarker>
                
                <ExperienceContent 
                  side={side}
                  isAnimatedIn={isAnimatedIn}
                  isAnimatedOut={isAnimatedOut}
                >
                  <ExperienceHeader>
                    <ExperienceTitle variant="h3">{exp.title}</ExperienceTitle>
                    <ExperienceMeta>
                      <Company>{exp.company}</Company>
                      <Period>{exp.period}</Period>
                      <Location>{exp.location}</Location>
                    </ExperienceMeta>
                  </ExperienceHeader>
                  
                  <Box>
                    <Achievements>
                      {exp.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex}>{achievement}</li>
                      ))}
                    </Achievements>
                    
                    <Technologies>
                      <h4>Technologies Used:</h4>
                      <TechTags>
                        {exp.technologies.map((tech, techIndex) => (
                          <TechTag key={techIndex}>{tech}</TechTag>
                        ))}
                      </TechTags>
                    </Technologies>
                  </Box>
                </ExperienceContent>
              </ExperienceItem>
            )
          })}
        </ExperienceTimeline>
      </Box>
    </ExperienceSection>
  )
}

export default Experience
