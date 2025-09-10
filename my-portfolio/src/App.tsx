import { useState } from 'react'
import './App.css'
import Header from './components/Header.tsx'
import Landing from './components/Landing.tsx'
import About from './components/About.tsx'
import Skills from './components/Skills.tsx'
import Experience from './components/Experience.tsx'
import Projects from './components/Projects.tsx'
import Contact from './components/Contact.tsx'
import Footer from './components/Footer.tsx'
import BackToTop from './components/BackToTop.tsx'

function App() {
  const [activeSection, setActiveSection] = useState<string>('home')

  return (
    <div className="App">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <Landing />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default App
