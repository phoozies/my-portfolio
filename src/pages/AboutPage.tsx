import { useNavigate } from 'react-router-dom'
import About from '../components/About'
import Contact from '../components/Contact'
import BackButton from '../components/BackButton'
import './PageLayout.css'

interface AboutPageProps {
  unlockAchievement: (sectionId: string) => void
}

const AboutPage = ({ unlockAchievement }: AboutPageProps) => {
  const navigate = useNavigate()

  return (
    <div className="page-layout">
      <BackButton onClick={() => navigate('/')} />
      <div className="page-content">
        <About unlockAchievement={unlockAchievement} />
        <Contact unlockAchievement={unlockAchievement} />
      </div>
    </div>
  )
}

export default AboutPage
