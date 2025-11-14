import { useEffect, useRef, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { BREAKPOINTS } from '../constants'

const ExperienceSection = styled('section')({
  background: 'var(--terminal-bg)',
  padding: '4rem 1.25rem',
  color: 'var(--terminal-text)',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',

  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    padding: '3rem 1rem',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    padding: '2rem 1rem',
  },
})

const ExperienceTimeline = styled(Box)({
  position: 'relative',
  maxWidth: '1200px',
  margin: '0 auto',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: 0,
    bottom: 0,
    width: '1px',
    background: 'var(--terminal-border)',
  },
  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    '&::before': {
      left: '24px',
      transform: 'none',
    },
  },
  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    '&::before': {
      left: '16px',
    },
  },
})

const ExperienceItem = styled(Box)<{ side: 'left' | 'right'; isAnimatedIn?: boolean; isAnimatedOut?: boolean }>(({ side, isAnimatedIn, isAnimatedOut }) => ({
  position: 'relative',
  marginBottom: '3rem',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  opacity: isAnimatedIn ? 1 : isAnimatedOut ? 0 : 0,
  transform: isAnimatedIn ? 'translateY(0)' : isAnimatedOut ? 'translateY(20px)' : 'translateY(30px)',
  transition: 'all 0.3s ease',
  justifyContent: side === 'left' ? 'flex-end' : 'flex-start',
  paddingRight: side === 'left' ? 'calc(50% + 32px)' : 0,
  paddingLeft: side === 'right' ? 'calc(50% + 32px)' : 0,
  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    justifyContent: 'flex-start !important',
    paddingLeft: '64px !important',
    paddingRight: '0 !important',
  },
  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    paddingLeft: '48px !important',
    marginBottom: '2rem',
  },
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none !important',
    transition: 'none !important',
  },
}))

const ExperienceMarker = styled(Box)<{ isAnimatedIn?: boolean; isAnimatedOut?: boolean }>(({ isAnimatedIn, isAnimatedOut }) => ({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '12px',
  height: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 3,
  border: '2px solid var(--terminal-text)',
  background: isAnimatedIn ? 'var(--terminal-text)' : 'var(--terminal-bg)',
  opacity: isAnimatedOut ? 0.3 : 1,
  transition: 'all 0.3s ease',
  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    left: '24px',
    width: '10px',
    height: '10px',
  },
  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    left: '16px',
    width: '8px',
    height: '8px',
  },
}))

const ExperienceContent = styled(Box)<{ side: 'left' | 'right'; isAnimatedIn?: boolean; isAnimatedOut?: boolean }>(({ side, isAnimatedIn, isAnimatedOut }) => ({
  background: 'var(--terminal-surface)',
  padding: '1.5rem',
  border: '1px solid var(--terminal-border)',
  transition: 'all 0.2s ease',
  flex: 1,
  maxWidth: '500px',
  position: 'relative',
  marginRight: side === 'left' ? '1rem' : 0,
  marginLeft: side === 'right' ? '1rem' : 0,
  transform: isAnimatedIn 
    ? 'translateX(0)' 
    : isAnimatedOut 
      ? `translateX(${side === 'left' ? '-20px' : '20px'})` 
      : `translateX(${side === 'left' ? '-15px' : '15px'})`,
  opacity: isAnimatedOut ? 0 : 1,
  '&:hover': {
    background: 'var(--terminal-bg)',
    borderColor: 'var(--terminal-text)',
  },
  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    marginLeft: '1rem',
    marginRight: 0,
    maxWidth: 'none',
    padding: '1.25rem',
    transform: isAnimatedIn ? 'translateX(0) !important' : isAnimatedOut ? 'translateX(-15px) !important' : 'translateX(-20px)',
  },
  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    marginLeft: '0.75rem',
    padding: '1rem',
  },
}))

const ExperienceHeader = styled(Box)({
  marginBottom: '1rem',
})

const ExperienceTitle = styled(Typography)({
  fontSize: '1.1rem',
  fontWeight: 400,
  color: 'var(--terminal-text)',
  marginBottom: '0.5rem',
  letterSpacing: '0.02em',
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",

  '&::before': {
    content: '"> "',
    color: 'var(--terminal-text-dim)',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    fontSize: '1rem',
  },
})

const ExperienceMeta = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.75rem',
  fontSize: '0.875rem',
  color: 'var(--terminal-text-dim)',
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",

  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    flexDirection: 'column',
    gap: '0.25rem',
  },
})

const Company = styled('span')({
  fontWeight: 400,
  color: 'var(--terminal-text)',
})

const Period = styled('span')({
  color: 'var(--terminal-text-dim)',
  fontSize: '0.875rem',
})

const Location = styled('span')({
  color: 'var(--terminal-text-dim)',
})

const Achievements = styled('ul')({
  listStyle: 'none',
  padding: 0,
  marginBottom: '1rem',
  '& li': {
    padding: '0.5rem 0',
    color: 'var(--terminal-text-dim)',
    lineHeight: 1.6,
    position: 'relative',
    paddingLeft: '1rem',
    fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
    fontSize: '0.875rem',
    '&:last-child': {
      paddingBottom: 0,
    },
    '&::before': {
      content: '"• "',
      position: 'absolute',
      left: 0,
      color: 'var(--terminal-text)',
    },
  },
})

const Technologies = styled(Box)({
  '& h4': {
    fontSize: '0.875rem',
    fontWeight: 400,
    color: 'var(--terminal-text)',
    marginBottom: '0.5rem',
    letterSpacing: '0.02em',
    fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
    '&::before': {
      content: '"[tech] "',
      color: 'var(--terminal-text-dim)',
    },
  },
})

const TechTags = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
})

const TechTag = styled('span')({
  color: 'var(--terminal-text-dim)',
  padding: '0.25rem 0.5rem',
  border: '1px solid var(--terminal-border)',
  fontSize: '0.75rem',
  fontWeight: 400,
  background: 'var(--terminal-bg)',
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'var(--terminal-surface)',
    borderColor: 'var(--terminal-text)',
    color: 'var(--terminal-text)',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none !important',
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

const Experience = () => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [animationStates, setAnimationStates] = useState<{ [key: number]: 'in' | 'out' | 'none' }>({})

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
    <ExperienceSection id="experience">
      <Box className="container-fullwidth">
        <Typography 
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 4,
            color: 'var(--terminal-text)',
            fontSize: { xs: '1.5rem', md: '1.75rem' },
            fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
            fontWeight: 400,
            letterSpacing: '0.05em',
            '&::before': {
              content: '"$ "',
              color: 'var(--terminal-text-dim)',
            },
          }}
        >
          Work Experience
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
                />
                
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
