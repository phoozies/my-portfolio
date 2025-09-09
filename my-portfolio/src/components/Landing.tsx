import './Landing.css'

const Landing = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Thinh Vo!</span>
          </h1>
          <h2 className="hero-subtitle">I'm a full-stack developer.</h2>
          <div className="hero-buttons">
            <button onClick={scrollToAbout} className="btn-view-work">
              <span>View My Work</span>
              <svg className="down-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing
