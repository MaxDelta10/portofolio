import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  User, 
  Cpu, 
  Briefcase, 
  Layers, 
  Mail, 
  FileText, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Moon,
  Sun,
  Tv,
  Award,
  BookOpen,
  Send,
  Download
} from 'lucide-react';

// Custom inline SVG icons for social platforms to ensure build robustness
const GithubIconSvg = ({ size = 20, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIconSvg = ({ size = 20, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [bootLines, setBootLines] = useState([]);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [scanlines, setScanlines] = useState(true);
  const [expandedProject, setExpandedProject] = useState(null);

  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const logs = [
    'SYSTEM BOOTING...',
    'LOADING YUSRA_OS v2.1.0...',
    'INITIALIZING SYSTEMS... OK',
    'RETRIEVING QUEST RECORDS... 3 COMPLETED QUESTS',
    'CONNECTING TO SKILL MODULES... 100% LOADED',
    'ESTABLISHING DATABASE CONNECTION... PORT 5432 SECURE',
    'SYSTEM READY.'
  ];

  // Simulating booting sequence
  useEffect(() => {
    if (!loading) return;

    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setBootLines(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      }
    }, 250);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(logInterval);
          setTimeout(() => {
            setLoading(false);
          }, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, []);

  // Theme application
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 5000);
    }
  };

  const toggleProject = (index) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  if (loading) {
    return (
      <div className="boot-screen">
        <div className="boot-content">
          <div className="boot-title">💾 YUSRA SAKTI WARDHANA PORTOFOLIO</div>
          <div className="boot-lines">
            {bootLines.map((line, idx) => (
              <div key={idx} className="boot-line">
                <span style={{ color: '#00ff88' }}>&gt;</span> {line}
              </div>
            ))}
            {bootLines.length < logs.length && (
              <div className="boot-line">
                <span className="cursor-blink"></span>
              </div>
            )}
          </div>
          <div className="boot-progress-container">
            <div className="boot-progress-bar" style={{ width: `${progress}%` }}></div>
            <div className="boot-progress-pct">{progress}%</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Subtle CRT Overlay */}
      <div className={`scanline-overlay ${!scanlines ? 'off' : ''}`}></div>

      <div className="app-container fade-in">
        {/* Navigation Bar */}
        <nav className="nav-bar">
          <div className="logo-container">
            <Terminal className="section-icon" size={24} />
            <div>
              <div className="logo-text title-pixel">YUSRA_OS v2.1</div>
              <div className="logo-sub">Data Analyst Portfolio</div>
            </div>
          </div>
          <div className="nav-links">
            <a href="#about" className="nav-link">ABOUT</a>
            <a href="#skills" className="nav-link">SKILLS</a>
            <a href="#experience" className="nav-link">QUESTS</a>
            <a href="#projects" className="nav-link">LEVELS</a>
            <a href="#contact" className="nav-link">CONTACT</a>
            
            <button onClick={toggleTheme} className="control-btn" title="Toggle Theme" aria-label="Toggle Theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setScanlines(!scanlines)} className="control-btn" title="Toggle CRT Filter" aria-label="Toggle CRT Filter">
              <Tv size={18} style={{ color: scanlines ? 'var(--accent-cyan)' : 'inherit' }} />
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="hero-section">
          <div className="avatar-wrapper">
            <div className="avatar-image-container">
              <img src={`${import.meta.env.BASE_URL}avatar.png`} alt="Yusra Sakti Wardhana avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          <span className="hero-badge">PLAYER LEVEL 25</span>
          <h1 className="hero-name">YUSRA SAKTI WARDHANA</h1>
          <p className="hero-sub">Data Scientist / Data Analyst specializing in building scalable scraping modules, high-performance ETL pipelines, and dashboard integrations.</p>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">3 YEARS</div>
              <div className="stat-label">EXP LEVEL</div>
              <div className="stat-desc">Professional Data Experience</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3 MAIN</div>
              <div className="stat-label">COMPLETED PROJECTS</div>
              <div className="stat-desc">Steam NLP, Media Intel & Alerts</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3.76 GPA</div>
              <div className="stat-label">ACADEMIC SCORE</div>
              <div className="stat-desc">Statistics Degree, UII</div>
            </div>
          </div>
        </header>

        {/* About Section */}
        <section id="about" className="section-wrapper">
          <div className="section-header">
            <User className="section-icon" size={24} />
            <h2 className="section-title">Character Profile</h2>
          </div>
          <div className="about-grid">
            <div className="about-card">
              <div className="about-card-title">
                <span>[CHARACTER_SHEET]</span>
                <span style={{ color: 'var(--accent-cyan)' }}>ACTIVE</span>
              </div>
              <p className="about-text">
                Statisticians-turned-Data Professionals with a passion for designing automated architectures. 
                I bridge the gap between complex statistical formulas and high-efficiency engineering systems, 
                specializing in web scraping, pipeline modeling, and search engines like Elasticsearch.
              </p>
              <div className="profile-stats-list">
                <div className="profile-stat-item">
                  <span className="profile-stat-name">CLASS</span>
                  <span className="profile-stat-val">Data Analyst / Scientist</span>
                </div>
                <div className="profile-stat-item">
                  <span className="profile-stat-name">GUILD</span>
                  <span className="profile-stat-val">PT Ebdesk Teknologi</span>
                </div>
                <div className="profile-stat-item">
                  <span className="profile-stat-name">WEAPONS</span>
                  <span className="profile-stat-val">Python, Airflow, Elasticsearch, SQL</span>
                </div>
                <div className="profile-stat-item">
                  <span className="profile-stat-name">LOCATION</span>
                  <span className="profile-stat-val">Indonesia</span>
                </div>
              </div>
            </div>

            <div className="badge-grid">
              <div className="badge-item">
                <div className="badge-icon-box">
                  <Award size={20} />
                </div>
                <div className="badge-details">
                  <div className="badge-title" style={{ color: 'var(--accent-gold)' }}>EDUCATION ACCOMPLISHMENT</div>
                  <div className="badge-institution">Bachelor of Statistics</div>
                  <div className="badge-meta">Universitas Islam Indonesia (UII) | GPA 3.76/4.00</div>
                </div>
              </div>

              <div className="badge-item">
                <div className="badge-icon-box">
                  <BookOpen size={20} />
                </div>
                <div className="badge-details">
                  <div className="badge-title" style={{ color: 'var(--accent-gold)' }}>CORE FOCUS</div>
                  <div className="badge-institution">Automation & Search Engine</div>
                  <div className="badge-meta">ETL workflows, indices indexing & data structures</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section-wrapper">
          <div className="section-header">
            <Cpu className="section-icon" size={24} />
            <h2 className="section-title">Skill Arsenal</h2>
          </div>
          <div className="skills-grid">
            <div className="skill-category-card">
              <h3 className="skill-category-title">
                <span style={{ color: 'var(--accent-cyan)' }}>■</span> Core Querying & Databases
              </h3>
              <div className="skill-pill-container">
                <span className="skill-pill">Python</span>
                <span className="skill-pill">SQL</span>
                <span className="skill-pill">PostgreSQL</span>
                <span className="skill-pill">Elasticsearch</span>
                <span className="skill-pill">MongoDB</span>
                <span className="skill-pill">Redis</span>
              </div>
            </div>

            <div className="skill-category-card">
              <h3 className="skill-category-title">
                <span style={{ color: 'var(--accent-gold)' }}>■</span> Data Engineering
              </h3>
              <div className="skill-pill-container">
                <span className="skill-pill">Apache Airflow</span>
                <span className="skill-pill">ETL Pipelines</span>
                <span className="skill-pill">Web Scraping</span>
                <span className="skill-pill">Polars</span>
                <span className="skill-pill">Pandas</span>
                <span className="skill-pill">API Integration</span>
              </div>
            </div>

            <div className="skill-category-card">
              <h3 className="skill-category-title">
                <span style={{ color: 'var(--accent-magenta)' }}>■</span> Visualization & Tools
              </h3>
              <div className="skill-pill-container">
                <span className="skill-pill">Kibana</span>
                <span className="skill-pill">Metabase</span>
                <span className="skill-pill">Tableau</span>
                <span className="skill-pill">Git</span>
                <span className="skill-pill">Docker</span>
                <span className="skill-pill">Linux Shell</span>
              </div>
            </div>

            <div className="skill-category-card">
              <h3 className="skill-category-title">
                <span style={{ color: 'var(--accent-mint)' }}>■</span> Professional Traits
              </h3>
              <div className="skill-pill-container">
                <span className="skill-pill">Analytical Thinking</span>
                <span className="skill-pill">Problem Solving</span>
                <span className="skill-pill">Team Collaboration</span>
                <span className="skill-pill">Agile Methodologies</span>
              </div>
            </div>
          </div>
        </section>

        {/* Experience / Quest Log Section */}
        <section id="experience" className="section-wrapper">
          <div className="section-header">
            <Briefcase className="section-icon" size={24} />
            <h2 className="section-title">Quest Log (Experience)</h2>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-title">Data Analyst & Scientist</h3>
                    <div className="timeline-company">PT Ebdesk Teknologi</div>
                  </div>
                  <span className="timeline-date">2023 - PRESENT</span>
                </div>
                <p className="timeline-desc">
                  Working with large-scale media databases, designing robust automated systems for media monitoring, 
                  analyzing raw social feeds, and constructing complex index queries for customer-facing dashboards.
                </p>
                <ul className="timeline-tasks">
                  <li className="timeline-task-item">
                    Designed and optimized ETL pipelines processing millions of social media and news records daily using Apache Airflow and Elasticsearch.
                  </li>
                  <li className="timeline-task-item">
                    Developed high-performance scraping bots and data ingestion agents to pull real-time data from various platforms securely.
                  </li>
                  <li className="timeline-task-item">
                    Formulated search queries, structured Elasticsearch indices, and designed analytical aggregations for customer-facing dashboards.
                  </li>
                  <li className="timeline-task-item">
                    Integrated NLP models for sentiment analysis, entity extraction, and classification of streaming documents.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects / Level Select Section */}
        <section id="projects" className="section-wrapper">
          <div className="section-header">
            <Layers className="section-icon" size={24} />
            <h2 className="section-title">Level Select (Projects)</h2>
          </div>
          <div className="project-card-grid">
            {/* Level 1 Project */}
            <div className={`project-card ${expandedProject === 0 ? 'highlight' : ''}`}>
              <div className="project-card-header" onClick={() => toggleProject(0)}>
                <div className="project-title-area">
                  <span className="project-level-badge">LVL 01</span>
                  <h3 className="project-title">Steam Review NLP Analyzer</h3>
                </div>
                <div>
                  {expandedProject === 0 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>
              <div className="project-card-body">
                <p className="project-desc">
                  Machine learning pipeline designed to analyze and classify reviews from the Steam gaming platform. 
                  Employs natural language processing to extract user sentiments and categories.
                </p>
                <div className="project-tags">
                  <span className="project-tag">Python</span>
                  <span className="project-tag">Scikit-Learn</span>
                  <span className="project-tag">NLTK</span>
                  <span className="project-tag">Streamlit</span>
                </div>
                
                {expandedProject === 0 && (
                  <div className="project-details-expanded fade-in">
                    <h4 className="project-detail-title">Key Quest Accomplishments</h4>
                    <ul className="project-features">
                      <li className="project-feature-item">Built cleaning pipelines resolving word-contracting issues and gaming slang.</li>
                      <li className="project-feature-item">Implemented TF-IDF and Naive Bayes models with 85%+ accuracy.</li>
                      <li className="project-feature-item">Deployed a clean Streamlit interface with interactive review-testing modules.</li>
                    </ul>
                  </div>
                )}
                
                <div style={{ marginTop: '16px' }}>
                  <a href="https://github.com/MaxDelta10" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    VIEW ON GITHUB <ExternalLink size={14} style={{ marginLeft: '4px' }} />
                  </a>
                </div>
              </div>
            </div>

            {/* Level 2 Project */}
            <div className={`project-card ${expandedProject === 1 ? 'highlight' : ''}`}>
              <div className="project-card-header" onClick={() => toggleProject(1)}>
                <div className="project-title-area">
                  <span className="project-level-badge">LVL 02</span>
                  <h3 className="project-title">Media Intelligence Dashboard</h3>
                </div>
                <div>
                  {expandedProject === 1 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>
              <div className="project-card-body">
                <p className="project-desc">
                  Executive analytics dashboard visualizing public sentiment, trending news stories, and 
                  institutional metrics based on raw streaming elastic search datasets.
                </p>
                <div className="project-tags">
                  <span className="project-tag">React</span>
                  <span className="project-tag">Elasticsearch</span>
                  <span className="project-tag">Kibana</span>
                  <span className="project-tag">Node.js</span>
                </div>
                
                {expandedProject === 1 && (
                  <div className="project-details-expanded fade-in">
                    <h4 className="project-detail-title">Key Quest Accomplishments</h4>
                    <ul className="project-features">
                      <li className="project-feature-item">Constructed responsive React components reflecting real-time query counters.</li>
                      <li className="project-feature-item">Engineered custom Elasticsearch aggregations reducing query execution latency by 40%.</li>
                      <li className="project-feature-item">Designed elegant skeleton screen loaders for a smooth, high-fidelity user experience.</li>
                    </ul>
                  </div>
                )}
                
                <div style={{ marginTop: '16px' }}>
                  <a href="https://github.com/MaxDelta10" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    VIEW ON GITHUB <ExternalLink size={14} style={{ marginLeft: '4px' }} />
                  </a>
                </div>
              </div>
            </div>

            {/* Level 3 Project */}
            <div className={`project-card ${expandedProject === 2 ? 'highlight' : ''}`}>
              <div className="project-card-header" onClick={() => toggleProject(2)}>
                <div className="project-title-area">
                  <span className="project-level-badge">LVL 03</span>
                  <h3 className="project-title">WA Alert Agent System</h3>
                </div>
                <div>
                  {expandedProject === 2 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>
              <div className="project-card-body">
                <p className="project-desc">
                  Automated notification agent broadcasting critical alerts, anomaly reports, and daily intelligence summaries 
                  straight to WhatsApp groups.
                </p>
                <div className="project-tags">
                  <span className="project-tag">Python</span>
                  <span className="project-tag">FastAPI</span>
                  <span className="project-tag">Redis</span>
                  <span className="project-tag">OpenAI</span>
                  <span className="project-tag">WhatsApp API</span>
                </div>
                
                {expandedProject === 2 && (
                  <div className="project-details-expanded fade-in">
                    <h4 className="project-detail-title">Key Quest Accomplishments</h4>
                    <ul className="project-features">
                      <li className="project-feature-item">Integrated OpenAI API to condense massive news alerts into readable TL;DR briefings.</li>
                      <li className="project-feature-item">Implemented Redis task queues ensuring zero-loss alert message deliveries.</li>
                      <li className="project-feature-item">Designed FastAPI webhook handlers responding autonomously to group inquiries.</li>
                    </ul>
                  </div>
                )}
                
                <div style={{ marginTop: '16px' }}>
                  <a href="https://github.com/MaxDelta10" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    VIEW ON GITHUB <ExternalLink size={14} style={{ marginLeft: '4px' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-wrapper">
          <div className="section-header">
            <Mail className="section-icon" size={24} />
            <h2 className="section-title">Save Game (Contact)</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <h3 style={{ fontSize: '0.75rem', marginBottom: '16px', color: 'var(--accent-cyan)' }}>[SEND_TRANSMISSION]</h3>
              {formSubmitted ? (
                <div className="boot-line" style={{ color: 'var(--accent-mint)', padding: '20px 0' }}>
                  &gt; TRANSMISSION SENT SECURELY. DATA SAVED. THANK YOU!
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Name</label>
                    <input 
                      type="text" 
                      id="contact-name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleFormChange} 
                      className="form-input" 
                      placeholder="e.g. Recruiter" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email</label>
                    <input 
                      type="email" 
                      id="contact-email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleFormChange} 
                      className="form-input" 
                      placeholder="e.g. agent@agency.com" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-message">Message</label>
                    <textarea 
                      id="contact-message" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleFormChange} 
                      className="form-input form-textarea" 
                      placeholder="Type your quest details here..." 
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                    SAVE GAME & SEND <Send size={14} />
                  </button>
                </form>
              )}
            </div>

            <div className="contact-info-panel">
              <a href="mailto:sakti.wardhana10@gmail.com" className="info-item">
                <div className="info-icon-box">
                  <Mail size={18} />
                </div>
                <div className="info-details">
                  <div className="info-label">Email</div>
                  <div className="info-val">sakti.wardhana10@gmail.com</div>
                </div>
              </a>

              <a href="https://github.com/MaxDelta10" target="_blank" rel="noopener noreferrer" className="info-item">
                <div className="info-icon-box">
                  <GithubIconSvg size={18} />
                </div>
                <div className="info-details">
                  <div className="info-label">GitHub</div>
                  <div className="info-val">MaxDelta10</div>
                </div>
              </a>

              <a href="https://linkedin.com/in/yusra-sakti-wardhana" target="_blank" rel="noopener noreferrer" className="info-item">
                <div className="info-icon-box">
                  <LinkedinIconSvg size={18} />
                </div>
                <div className="info-details">
                  <div className="info-label">LinkedIn</div>
                  <div className="info-val">Yusra Sakti Wardhana</div>
                </div>
              </a>

              {/* Save Game (Resume Download) */}
              <a href={`${import.meta.env.BASE_URL}resume.pdf`} download className="btn-primary" style={{ marginTop: '10px' }}>
                DOWNLOAD RESUME <Download size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p className="footer-text">© {new Date().getFullYear()} Yusra Sakti Wardhana. Designed with clean retro values.</p>
          <p className="footer-retro">INSERT COIN TO CONTINUE • ALL RIGHTS RESERVED</p>
        </footer>
      </div>
    </>
  );
}

export default App;
