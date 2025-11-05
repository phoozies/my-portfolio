import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Experience from '../components/Experience'
import './PageLayout.css'

interface ExperiencePageProps {
  unlockAchievement: (sectionId: string) => void
}

const ExperiencePage = ({ unlockAchievement }: ExperiencePageProps) => {
  const navigate = useNavigate()

  return (
    <div className="page-layout">
      <BackButton onClick={() => navigate('/')} />
      <div className="page-content">
        <Experience unlockAchievement={unlockAchievement} />
      </div>
    </div>
  )
}

export default ExperiencePage
