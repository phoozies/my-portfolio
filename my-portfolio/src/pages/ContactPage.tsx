import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Contact from '../components/Contact'
import './PageLayout.css'

interface ContactPageProps {
  unlockAchievement: (sectionId: string) => void
}

const ContactPage = ({ unlockAchievement }: ContactPageProps) => {
  const navigate = useNavigate()

  return (
    <div className="page-layout">
      <BackButton onClick={() => navigate('/')} />
      <div className="page-content">
        <Contact unlockAchievement={unlockAchievement} />
      </div>
    </div>
  )
}

export default ContactPage
