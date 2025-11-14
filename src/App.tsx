import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import './App.css'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import { pixelTheme } from './theme.ts'
import TerminalHome from './components/Home.tsx'
import MyInfoPage from './pages/MyInfoPage.tsx'
import SkillsPage from './pages/SkillsPage.tsx'
import ExperiencePage from './pages/ExperiencePage.tsx'
import ProjectsPage from './pages/ProjectsPage.tsx'
import MouseTrail from './components/MouseTrail.tsx'

function App() {
  const routerBase = (import.meta as any).env?.BASE_URL || '/'

  return (
    <ThemeProvider theme={pixelTheme}>
      <Router basename={routerBase}>
        <ErrorBoundary>
          <div className="App">
            <main id="main-content">
              <MouseTrail />
              <Routes>
                <Route path="/" element={
                  <ErrorBoundary>
                    <TerminalHome />
                  </ErrorBoundary>
                } />
                <Route path="/myinfo" element={
                  <ErrorBoundary>
                    <MyInfoPage />
                  </ErrorBoundary>
                } />
                <Route path="/skills" element={
                  <ErrorBoundary>
                    <SkillsPage />
                  </ErrorBoundary>
                } />
                <Route path="/experience" element={
                  <ErrorBoundary>
                    <ExperiencePage />
                  </ErrorBoundary>
                } />
                <Route path="/projects" element={
                  <ErrorBoundary>
                    <ProjectsPage />
                  </ErrorBoundary>
                } />
              </Routes>
            </main>
          </div>
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  )
}

export default App
