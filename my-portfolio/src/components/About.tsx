import './About.css'

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p className="about-intro">
              Driven by the belief that technology should make life better, I'm a full-stack developer committed to building solutions that matter.
              I'm constantly exploring new technologies and methodologies, always asking "how can we do this better?" 
              Beyond development, I like to unwind through playing video games such as Valorant and Roblox, and spending quality time with friends.
            </p>
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
      </div>
    </section>
  )
}

export default About
