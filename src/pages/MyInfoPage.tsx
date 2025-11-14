import { useNavigate } from 'react-router-dom'
import About from '../components/About'
import Contact from '../components/Contact'
import BackButton from '../components/BackButton'
import './PageLayout.css'

const MyInfoPage = () => {
  const navigate = useNavigate()

  return (
    <div className="page-layout">
      <BackButton onClick={() => navigate('/')} />
      <div className="page-content">
        <About />
        <Contact />
      </div>
    </div>
  )
}

export default MyInfoPage
