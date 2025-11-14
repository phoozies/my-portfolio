import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Experience from '../components/Experience'
import './PageLayout.css'

const ExperiencePage = () => {
  const navigate = useNavigate()

  return (
    <div className="page-layout">
      <BackButton onClick={() => navigate('/')} />
      <div className="page-content">
        <Experience />
      </div>
    </div>
  )
}

export default ExperiencePage
