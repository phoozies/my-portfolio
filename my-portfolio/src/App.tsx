import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import './App.css'
import PacManGame from './components/PacManGame.tsx'
import Achievement from './components/Achievement.tsx'
import { useAchievements } from './hooks/useAchievements.ts'
import { pixelTheme } from './theme.ts'
import ArcadeHome from './components/ArcadeHome.tsx'
import AboutPage from './pages/AboutPage.tsx'
import SkillsPage from './pages/SkillsPage.tsx'
import ExperiencePage from './pages/ExperiencePage.tsx'
import ProjectsPage from './pages/ProjectsPage.tsx'

function App() {
  const { 
    currentAchievement, 
    showAchievement, 
    unlockAchievement, 
    hideAchievement
  } = useAchievements()

  return (
    <ThemeProvider theme={pixelTheme}>
      <Router>
        <div className="App">
          <PacManGame />
          
          {currentAchievement && (
            <Achievement
              title={currentAchievement.title}
              description={currentAchievement.description}
              icon={currentAchievement.icon}
              show={showAchievement}
              onHide={hideAchievement}
            />
          )}
          
          <Routes>
          <Route path="/" element={<ArcadeHome />} />
          <Route path="/about" element={<AboutPage unlockAchievement={unlockAchievement} />} />
          <Route path="/skills" element={<SkillsPage unlockAchievement={unlockAchievement} />} />
          <Route path="/experience" element={<ExperiencePage unlockAchievement={unlockAchievement} />} />
          <Route path="/projects" element={<ProjectsPage unlockAchievement={unlockAchievement} />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
