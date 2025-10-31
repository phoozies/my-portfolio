import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Projects from '../components/Projects'
import './PageLayout.css'

interface ProjectsPageProps {
  unlockAchievement: (sectionId: string) => void
}

const ProjectsPage = ({ unlockAchievement }: ProjectsPageProps) => {
  const navigate = useNavigate()

  return (
    <div className="page-layout page-layout-fixed">
      <BackButton onClick={() => navigate('/')} />
      <div className="page-content">
        <Projects unlockAchievement={unlockAchievement} />
      </div>
    </div>
  )
}

export default ProjectsPage
