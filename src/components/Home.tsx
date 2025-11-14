import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { CONTACT_INFO, BREAKPOINTS } from '../constants'

interface HistoryEntry {
  type: 'command' | 'output' | 'error'
  content: string | React.ReactNode
}

// Terminal container
const TerminalContainer = styled(Box)({
  minHeight: '100vh',
  background: 'var(--terminal-bg)',
  color: 'var(--terminal-text)',
  padding: '2rem',
  fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
  overflow: 'auto',

  [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
    padding: '1.5rem',
  },

  [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
    padding: '1rem',
  },
})



// Prompt symbol
const Prompt = styled('span')({
  color: 'var(--terminal-text-dim)',
  marginRight: '0.5rem',
  userSelect: 'none',
})

// Command text
const Command = styled('span')({
  color: 'var(--terminal-text)',
  fontWeight: 500,
})



const TerminalHome = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalEndRef = useRef<HTMLDivElement>(null)
  const hasShownWelcome = useRef(false)

  const addToHistory = (type: 'command' | 'output' | 'error', content: string | React.ReactNode) => {
    setHistory(prev => [...prev, { type, content }])
  }

  const showWelcomeMessage = () => {
    addToHistory('output', (
      <Box sx={{ color: 'var(--terminal-grey)' }}>
        <pre style={{ 
          margin: 0, 
          fontFamily: 'inherit', 
          fontSize: 'clamp(0.3rem, 2vw, 1rem)',
          color: 'var(--terminal-text)',
          lineHeight: 1.2,
          overflowX: 'auto',
          whiteSpace: 'pre'
        }}>
{`
 ████████╗██╗  ██╗██╗███╗   ██╗██╗  ██╗    ██╗   ██╗ ██████╗ 
 ╚══██╔══╝██║  ██║██║████╗  ██║██║  ██║    ██║   ██║██╔═══██╗
    ██║   ███████║██║██╔██╗ ██║███████║    ██║   ██║██║   ██║
    ██║   ██╔══██║██║██║╚██╗██║██╔══██║    ╚██╗ ██╔╝██║   ██║
    ██║   ██║  ██║██║██║ ╚████║██║  ██║     ╚████╔╝ ╚██████╔╝
    ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝      ╚═══╝   ╚═════╝ 
`}
        </pre>
        <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit', mb: 1 }}>
          Type <Box component="span" sx={{ color: 'var(--terminal-text)', fontWeight: 500 }}>help</Box> to see available commands.
        </Typography>
      </Box>
    ))
  }

  const commands: Record<string, { description: string; action: (args?: string[]) => void }> = {
    help: {
      description: 'Show available commands',
      action: () => {
        const helpText = (
          <Box sx={{ color: 'var(--terminal-grey)' }}>
            <Typography sx={{ mb: 1, fontFamily: 'inherit', fontSize: 'inherit' }}>
              Available commands:
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {Object.entries(commands).map(([cmd, { description }]) => (
                <li key={cmd}>
                  <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
                    <Box component="span" sx={{ color: 'var(--terminal-text)', fontWeight: 500 }}>
                      {cmd.padEnd(15)}
                    </Box>
                    {description}
                  </Typography>
                </li>
              ))}
            </Box>
          </Box>
        )
        addToHistory('output', helpText)
      }
    },
    myinfo: {
      description: 'Learn more about me',
      action: () => {
        addToHistory('output', 'Navigating to My Info page...')
        setTimeout(() => navigate('/myinfo'), 500)
      }
    },
    skills: {
      description: 'See my technical skills',
      action: () => {
        addToHistory('output', 'Navigating to Skills page...')
        setTimeout(() => navigate('/skills'), 500)
      }
    },
    experience: {
      description: 'Look at my work experience',
      action: () => {
        addToHistory('output', 'Navigating to Experience page...')
        setTimeout(() => navigate('/experience'), 500)
      }
    },
    projects: {
      description: 'View my projects',
      action: () => {
        addToHistory('output', 'Navigating to Projects page...')
        setTimeout(() => navigate('/projects'), 500)
      }
    },
    social: {
      description: 'Display social media links',
      action: () => {
        const socialLinks = (
          <Box sx={{ color: 'var(--terminal-grey)' }}>
            {CONTACT_INFO.map((contact) => (
              <Typography key={contact.label} sx={{ fontFamily: 'inherit', fontSize: 'inherit', mb: 0.5 }}>
                {contact.label}:{' '}
                <Box
                  component="a"
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'var(--terminal-text)',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    },
                  }}
                >
                  {contact.label === 'Email' ? contact.value : contact.link}
                </Box>
              </Typography>
            ))}
          </Box>
        )
        addToHistory('output', socialLinks)
      }
    },
    resume: {
      description: 'Download my resume',
      action: () => {
        const link = document.createElement('a')
        const baseUrl = (import.meta as any).env?.BASE_URL || '/'
        link.href = `${baseUrl}THINH_VO_RESUME.pdf`
        link.download = 'THINH_VO_RESUME.pdf'
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        addToHistory('output', 'Downloading resume...')
      }
    },
    clear: {
      description: 'Clear terminal screen',
      action: () => {
        setHistory([])
        showWelcomeMessage()
      }
    },
  }

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim()
    if (!trimmedCmd) return

    addToHistory('command', trimmedCmd)
    setCommandHistory(prev => [...prev, trimmedCmd])
    setHistoryIndex(-1)

    const [command, ...args] = trimmedCmd.toLowerCase().split(' ')

    if (commands[command]) {
      commands[command].action(args)
    } else {
      addToHistory('error', `Command not found: ${command}. Type 'help' for available commands.`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex)
          setInput(commandHistory[commandHistory.length - 1 - newIndex])
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  useEffect(() => {
    inputRef.current?.focus()
    if (!hasShownWelcome.current) {
      showWelcomeMessage()
      hasShownWelcome.current = true
    }
  }, [])

  return (
    <TerminalContainer onClick={() => inputRef.current?.focus()}>
      {/* Terminal output history */}
      <Box sx={{ marginBottom: '2rem' }}>
        {history.map((entry, index) => (
          <Box key={index} sx={{ marginBottom: '1rem' }}>
            {entry.type === 'command' ? (
              <Typography
                sx={{
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  color: 'var(--terminal-text)',
                  fontFamily: 'inherit',
                }}
              >
                <Prompt>$</Prompt>
                <Command>{entry.content as string}</Command>
              </Typography>
            ) : entry.type === 'error' ? (
              <Typography
                sx={{
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  color: 'var(--terminal-error)',
                  fontFamily: 'inherit',
                  marginLeft: '1.5rem',
                }}
              >
                {entry.content as string}
              </Typography>
            ) : (
              <Box sx={{ marginLeft: '1.5rem', fontSize: { xs: '0.9rem', md: '1rem' } }}>
                {typeof entry.content === 'string' ? (
                  <Typography
                    sx={{
                      color: 'var(--terminal-grey)',
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                    }}
                  >
                    {entry.content}
                  </Typography>
                ) : (
                  entry.content
                )}
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {/* Input line */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontSize: { xs: '0.9rem', md: '1rem' },
        }}
      >
        <Prompt>$</Prompt>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--terminal-text)',
            fontFamily: "'Courier New', 'SF Mono', 'Monaco', monospace",
            fontSize: 'inherit',
            caretColor: 'var(--terminal-text)',
          }}
          autoFocus
          spellCheck={false}
        />
      </Box>

      <div ref={terminalEndRef} />
    </TerminalContainer>
  )
}

export default TerminalHome
