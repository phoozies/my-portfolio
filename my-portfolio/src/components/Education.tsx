import './Education.css'

const Education = () => {
  return (
    <section id="education" className="education">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="education-content">
          <div className="education-card">
            <div className="education-header">
              <div className="university-info">
                <h3 className="degree">Bachelor of Science in Computer Science</h3>
                <h4 className="university">Wichita State University</h4>
                <p className="minor">Minor in Mathematics</p>
              </div>
              <div className="education-meta">
                <span className="graduation-date">DEC 2025</span>
                <span className="gpa">GPA: 3.7</span>
              </div>
            </div>
            
            <div className="education-details">
              <div className="academic-highlights">
                <h4>Academic Highlights</h4>
                <ul>
                  <li>Computer Science Major with Mathematics Minor</li>
                  <li>Maintaining 3.7 GPA throughout the program</li>
                  <li>Expected graduation in December 2025</li>
                  <li>Focus on software engineering and data analytics</li>
                  <li>Active participation in senior design project</li>
                </ul>
              </div>
              
              <div className="relevant-coursework">
                <h4>Relevant Coursework</h4>
                <div className="coursework-grid">
                  <div className="course-category">
                    <h5>Programming & Software Engineering</h5>
                    <ul>
                      <li>Data Structures & Algorithms</li>
                      <li>Object-Oriented Programming</li>
                      <li>Software Engineering</li>
                      <li>Database Systems</li>
                      <li>Web Development</li>
                    </ul>
                  </div>
                  
                  <div className="course-category">
                    <h5>Mathematics & Analytics</h5>
                    <ul>
                      <li>Calculus I, II, III</li>
                      <li>Linear Algebra</li>
                      <li>Statistics & Probability</li>
                      <li>Discrete Mathematics</li>
                      <li>Data Analysis</li>
                    </ul>
                  </div>
                  
                  <div className="course-category">
                    <h5>Computer Science Core</h5>
                    <ul>
                      <li>Computer Architecture</li>
                      <li>Operating Systems</li>
                      <li>Computer Networks</li>
                      <li>Software Design Patterns</li>
                      <li>Senior Design Project</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="education-stats">
            <div className="stat-card">
              <h3>3.7</h3>
              <p>Current GPA</p>
            </div>
            <div className="stat-card">
              <h3>2025</h3>
              <p>Graduation Year</p>
            </div>
            <div className="stat-card">
              <h3>CS + Math</h3>
              <p>Dual Focus</p>
            </div>
            <div className="stat-card">
              <h3>WSU</h3>
              <p>University</p>
            </div>
          </div>
          
          <div className="education-achievements">
            <h3>Academic Achievements & Activities</h3>
            <div className="achievements-grid">
              <div className="achievement-item">
                <h4>🎓 Academic Excellence</h4>
                <p>Maintained high GPA while balancing multiple internships and work commitments</p>
              </div>
              <div className="achievement-item">
                <h4>💼 Professional Experience</h4>
                <p>Gained real-world experience through internships during academic years</p>
              </div>
              <div className="achievement-item">
                <h4>🚀 Senior Design Project</h4>
                <p>Leading full-stack development project sponsored by Electromech Technologies</p>
              </div>
              <div className="achievement-item">
                <h4>📊 Practical Application</h4>
                <p>Applied classroom knowledge to solve real business problems in internships</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
