import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Skills from '../components/Skills'
import './PageLayout.css'

const SkillsPage = () => {
  const navigate = useNavigate()

  return (
    <div className="page-layout">
      <BackButton onClick={() => navigate('/')} />
      <div className="page-content">
        <Skills />
      </div>
    </div>
  )
}

export default SkillsPage
