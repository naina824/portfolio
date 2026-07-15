import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [projects] = useState(
    [
      {
        id: 1,
        title: "Sentiment Analysis Dashboard - Naive Bayes vs SVM",
        description: "Built an end-to-end NLP system for sentiment classification. Implemented Naive Bayes and SVM models with comparative performance analysis. Developed live prediction dashboard using Python and Streamlit.",
        link: "https://sentiment-analysis-nb-svm.streamlit.app/",
        image: "/sentiment-analysis.jpg" 
      },
      {
        id: 2,
        title: "Customer Churn Prediction - Random Forest(R)",
        description: "Implemented Random Forest classification model to predict customer churn. Analyzed feature importance to identify factors influencing churn. Applied data preprocessing, visualization, and model evaluation techniques.",
        link: "https://github.com/naina824/naina824-customer-churn-random-forest-r",
        image: "/customer-churn.jpg"
      },
      {
        id: 3,
        title: "Handicraft E-Commerce Website (Internship Project)",
        description: "Developed a responsive handicraft website “Craft Universe” to showcase handmade products. Designed user-friendly sections like Home, Shop, Gallery, and Contact with an attractive UI.",
        link: "#",
        image: "/craft-universe.jpg"
      }
    ]
  );

  const skills = {
    "💻 Programming": ["Python", "Java", "C"],
    "🌐 Web Development": ["HTML", "CSS", "JavaScript"],
    "🤖 AI & ML": ["Machine Learning", "NLP", "Model Evaluation"],
    "📊 Database": ["SQL", "DBMS Concepts"],
    "🛠️ Tools & Platforms": ["Git", "GitHub", "VS Code"],
    "📁 Other Skills": ["Excel", "Data Viz", "MS Word"]
  };

  const education = [
    {
      institution: "Stanley College of Engineering and Technology for Women",
      degree: "B.E. in Computer Science and Engineering",
      years: "2023 - 2027",
      grade: "GPA: 8.0/10"
    },
    {
      institution: "Narayana Junior College",
      degree: "Intermediate (MPC)",
      years: "2021 - 2023",
      grade: "Percentage: 84.1%"
    },
    {
      institution: "Ravi High School",
      degree: "SSC",
      years: "2020- 2021",
      grade: "CGPA: 10/10"
    }
  ];

  const certifications = [
    "Pragathi - Path to Future (Infosys Springboard)",
    "Python Programming - Udemy",
    "IOT Bootcamp- NIELIT Aurangabad",
    "DBMS - Scaler",
    "Operating System Basics - Cisco Networking",
    "HTML5 & JavaScript - Infosys Springboard",
    "TechnoHacks - Web Design & Development"
  ];

  const certColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F08080', '#778899'];

  const [formData, setFormData] = useState({ from_name: '', from_email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) setFormErrors({ ...formErrors, [name]: '' });
  };

  const validate = () => {
    const errors = {};
    if (!formData.from_name.trim()) errors.from_name = 'Name is required';
    if (!formData.from_email.trim()) {
      errors.from_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.from_email)) {
      errors.from_email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);

    // Get these from your EmailJS Dashboard: https://dashboard.emailjs.com/
    const serviceId = 'service_dl20r1r';
    const templateId = 'template_cs37u9s';
    const publicKey = 'DBN6HSjWUNWm_L9Oy';

    // Creating an explicit parameters object ensures that the data 
    // is sent with the exact keys your EmailJS template expects.
    const templateParams = {
      user_name: formData.from_name,
      user_email: formData.from_email,
      message: formData.message,
};

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error('Email Error:', error);
        alert('Oops! Something went wrong while sending the message.');
      });
  };

  return (
    <div className={`portfolio ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">DevPortfolio</div>
          <div className="nav-actions">
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} title="Toggle Theme">
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
               <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
            </button>
            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
              <li><a href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a></li>
              <li><a href="#skills" onClick={() => setIsMenuOpen(false)}>Skills</a></li>
              <li><a href="#certifications" onClick={() => setIsMenuOpen(false)}>Certifications</a></li>
              <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <h1>Dharmakkolla Naina</h1>
        <p>Computer Science Engineering Student | Aspiring ML & Web Developer</p>
        <div className="hero-btns">
          <a href="#projects" className="btn">View Projects</a>
          <a href="/resume.pdf" download="Dharmakkolla_Naina_Resume.pdf" className="btn btn-outline">Download Resume</a>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="about">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-image">
            {/* You can replace this URL with your local image path, e.g., src="/my-profile.jpg" */}
            <img src="/profile.jpg" alt="Dharmakkolla Naina Profile" />
          </div>
          <div className="about-details">
            <p className="about-text">
              Motivated Computer Science Engineering student seeking opportunities to apply academic knowledge in practical
              environments. Strong foundation in programming, machine learning basics, and web development with hands-on
              project experience. Eager to learn, adapt, and contribute effectively in a professional setting.
            </p>
            
            <div className="education-summary" style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.2rem', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <span>🎓</span> Education
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {education.map((edu, index) => (
                  <div key={index} style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    background: darkMode ? 'rgba(255,255,255,0.05)' : '#ffffff',
                    borderLeft: '4px solid var(--primary)',
                    boxShadow: 'var(--shadow)',
                    textAlign: 'center'
                  }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{edu.institution}</h4>
                    <p style={{ margin: '0.3rem 0', fontSize: '0.95rem', opacity: 0.9 }}>{edu.degree} ({edu.years})</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--secondary)', fontSize: '0.9rem' }}>{edu.grade}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <h2>Featured Projects</h2>
        <div className="project-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} onError={(e) => { e.target.src = 'https://via.placeholder.com/400x250?text=Project+Output'; }} />
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">View Project &rarr;</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="certifications">
        <h2>Certifications</h2>
        <div className="certifications-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '1.2rem', 
          marginTop: '1.5rem' 
        }}>
          {certifications.map((cert, index) => (
            <div key={index} className="cert-card" style={{ 
              padding: '1.2rem', 
              borderRadius: '10px', 
              background: darkMode ? `${certColors[index % certColors.length]}22` : `${certColors[index % certColors.length]}11`, 
              borderLeft: `6px solid ${certColors[index % certColors.length]}`,
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ marginRight: '12px', fontSize: '1.2rem' }}>📜</span>
              <span style={{ fontWeight: '500' }}>{cert}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Let's Connect</h2>
        <div className="contact-container">
          <form onSubmit={handleContactSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="from_name">👤 Name</label>
              <input 
                type="text" 
                id="from_name"
                name="from_name" 
                value={formData.from_name} 
                onChange={handleInputChange}
                className={formErrors.from_name ? 'input-error' : ''}
                placeholder="Your Name"
              />
              {formErrors.from_name && <span className="error-text">{formErrors.from_name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="from_email">📧 Email</label>
              <input 
                type="email" 
                id="from_email"
                name="from_email" 
                value={formData.from_email} 
                onChange={handleInputChange}
                className={formErrors.from_email ? 'input-error' : ''}
                placeholder="your@email.com"
              />
              {formErrors.from_email && <span className="error-text">{formErrors.from_email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message"
                name="message" 
                value={formData.message} 
                onChange={handleInputChange}
                className={formErrors.message ? 'input-error' : ''}
                placeholder="Tell me about your project..."
                rows="5"
              />
              {formErrors.message && <span className="error-text">{formErrors.message}</span>}
            </div>
            
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {isSuccess && <p className="success-msg">🎉 Message sent successfully!</p>}
          </form>

          <div className="contact-info">
            <p className="contact-pitch">Currently looking for new opportunities. I'd love to hear from you!</p>
            <div className="contact-details">
              <a href="mailto:dharmakkollanaina@gmail.com" className="email-link">dharmakkollanaina@gmail.com</a>
              <a href="tel:+919392679929" className="email-link" style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0.5rem 0' }}>
                <span>📞</span> +91 93926 79929
              </a>
              <p style={{ margin: '0.8rem 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text)' }}>
                <span>📍</span> Hyderabad, India
              </p>
              <div className="social-links">
                <a href="https://linkedin.com/in/naina-dharmakkolla" target="_blank" rel="noopener noreferrer" className="social-btn linkedin">LinkedIn</a>
                <a href="https://github.com/naina-dharmakkolla" target="_blank" rel="noopener noreferrer" className="social-btn github">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} DevPortfolio. Built with React.</p>
      </footer>
    </div>
  )
}

export default App
