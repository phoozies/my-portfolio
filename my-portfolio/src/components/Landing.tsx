import { useEffect, useState } from 'react';
import './Landing.css';

const Landing = () => {
  const [displayedName, setDisplayedName] = useState('');
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const name = "Thinh Vo!";
    const title = "I'm a full-stack developer.";
    let nameIndex = 0;
    let titleIndex = 0;
    let isTypingName = true;

    const typeText = () => {
      if (isTypingName && nameIndex < name.length) {
        setDisplayedName(name.slice(0, nameIndex + 1));
        nameIndex++;
        setTimeout(typeText, 100);
      } else if (isTypingName && nameIndex >= name.length) {
        isTypingName = false;
        setTimeout(typeText, 500);
      } else if (!isTypingName && titleIndex < title.length) {
        setDisplayedTitle(title.slice(0, titleIndex + 1));
        titleIndex++;
        setTimeout(typeText, 50);
      } else {
        setTimeout(() => setShowCursor(false), 2000);
      }
    };

    setTimeout(typeText, 500);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="cherry-tree-container">
        <img 
          src="./cherry-tree.png" 
          alt="Cherry Blossom Tree" 
          className="cherry-tree"
        />
      </div>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">{displayedName}</span>
            {showCursor && displayedTitle === '' && <span className="typing-cursor">|</span>}
          </h1>
          <h2 className="hero-subtitle">
            {displayedTitle}
            {showCursor && displayedTitle !== '' && <span className="typing-cursor">|</span>}
          </h2>
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
  );
};

export default Landing;
