import { useState, Suspense, lazy } from 'react'
import './App.css'
import Header from './components/Header.tsx'
import Landing from './components/Landing.tsx'
import CherryPetals from './components/CherryPetals.tsx'

// Lazy load components that are not immediately visible
const About = lazy(() => import('./components/About.tsx'))
const Skills = lazy(() => import('./components/Skills.tsx'))
const Experience = lazy(() => import('./components/Experience.tsx'))
const Projects = lazy(() => import('./components/Projects.tsx'))
const Contact = lazy(() => import('./components/Contact.tsx'))
const Footer = lazy(() => import('./components/Footer.tsx'))
const BackToTop = lazy(() => import('./components/BackToTop.tsx'))

// Loading component for Suspense fallback
const SectionLoader = () => (
  <div style={{
    minHeight: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FF8FA3'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid rgba(255, 183, 197, 0.3)',
      borderTop: '4px solid #FF8FA3',
      borderRadius: '0',
      animation: 'spin 1s linear infinite'
    }} />
  </div>
)

function App() {
  const [activeSection, setActiveSection] = useState<string>('home')

  return (
    <div className="App">
      <CherryPetals />
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <Landing />
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
    </div>
  )
}

export default App
