import './About.css'

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p className="about-intro">
              I'm a passionate Computer Science student at Wichita State University with a strong 
              foundation in software development and a keen interest in emerging technologies.
            </p>
            <p>
              With hands-on experience from multiple internships at companies like INVISTA, NIAR, 
              and Textron Aviation, I've developed expertise in full-stack development, cloud 
              technologies, and data analytics. I enjoy solving complex problems and building 
              scalable solutions that make a real impact.
            </p>
            <p>
              My academic journey has been complemented by practical experience, where I've worked 
              on GenAI platforms, event-driven architectures, and enterprise-level applications. 
              I'm always eager to learn new technologies and take on challenging projects.
            </p>
            
            <div className="about-highlights">
              <div className="highlight-item">
                <h4>🎓 Education</h4>
                <p>Computer Science with Mathematics Minor</p>
              </div>
              <div className="highlight-item">
                <h4>💼 Experience</h4>
                <p>Software Engineering & Data Analytics</p>
              </div>
              <div className="highlight-item">
                <h4>🌟 Passion</h4>
                <p>Building innovative solutions</p>
              </div>
            </div>
          </div>
          
          <div className="about-details">
            <div className="detail-card">
              <h3>Contact Information</h3>
              <div className="contact-info">
                <p><strong>Location:</strong> Wichita, Kansas, US</p>
                <p><strong>Phone:</strong> (316) 927-8118</p>
                <p><strong>Email:</strong> tpvo.business@gmail.com</p>
                <p><strong>LinkedIn:</strong> linkedin.com/in/thinh-vo-1736062bb</p>
                <p><strong>GitHub:</strong> github.com/phoozies</p>
              </div>
            </div>
            
            <div className="detail-card">
              <h3>Current Focus</h3>
              <ul className="focus-list">
                <li>Graduating December 2025</li>
                <li>Full-stack development</li>
                <li>Cloud technologies (AWS, Azure)</li>
                <li>GenAI and machine learning</li>
                <li>Enterprise software solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
