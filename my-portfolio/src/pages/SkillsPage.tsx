import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Skills from '../components/Skills'
import './PageLayout.css'

interface SkillsPageProps {
  unlockAchievement: (sectionId: string) => void
}

const SkillsPage = ({ unlockAchievement }: SkillsPageProps) => {
  const navigate = useNavigate()

  return (
    <div className="page-layout">
      <BackButton onClick={() => navigate('/')} />
      <div className="page-content">
        <Skills unlockAchievement={unlockAchievement} />
      </div>
    </div>
  )
}

export default SkillsPage
