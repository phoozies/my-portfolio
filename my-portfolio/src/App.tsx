import { useState } from 'react'
import './App.css'
import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import About from './components/About.tsx'
import Skills from './components/Skills.tsx'
import Experience from './components/Experience.tsx'
import Projects from './components/Projects.tsx'
import Education from './components/Education.tsx'
import Contact from './components/Contact.tsx'
import Footer from './components/Footer.tsx'

function App() {
  const [activeSection, setActiveSection] = useState<string>('home')

  return (
    <div className="App">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
