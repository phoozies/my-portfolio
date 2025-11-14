import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Projects from '../components/Projects'
import './PageLayout.css'

const ProjectsPage = () => {
  const navigate = useNavigate()

  return (
    <div className="page-layout">
      <BackButton onClick={() => navigate('/')} />
      <div className="page-content">
        <Projects />
      </div>
    </div>
  )
}

export default ProjectsPage
