import './Hero.css'

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Thinh Vo</span>
          </h1>
          <h2 className="hero-subtitle">Software Engineer & Full-Stack Developer</h2>
          <p className="hero-description">
            Computer Science student at Wichita State University with a passion for building 
            innovative software solutions. I specialize in full-stack development, cloud technologies, 
            and creating efficient, scalable applications.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn-primary">Get In Touch</a>
            <a href="#projects" className="btn-secondary">View My Work</a>
          </div>
        </div>
        <div className="hero-image">
          <div className="profile-image">
            <img 
              src="./thinh_vo_headshot.jpg" 
              alt="Thinh Vo - Professional Headshot" 
              className="headshot"
              onError={() => {
                console.error('Failed to load headshot image');
                console.log('Trying fallback...');
              }}
              onLoad={() => console.log('Headshot image loaded successfully')}
            />
          </div>
        </div>
      </div>
      <div className="hero-stats">
        <div className="stat">
          <h3>3.7</h3>
          <p>GPA</p>
        </div>
        <div className="stat">
          <h3>3+</h3>
          <p>Years Experience</p>
        </div>
        <div className="stat">
          <h3>10+</h3>
          <p>Technologies</p>
        </div>
        <div className="stat">
          <h3>Multiple</h3>
          <p>Internships</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
