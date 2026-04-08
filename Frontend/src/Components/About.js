import React from 'react'
import '../home.css'

function About() {
  return (
  <div className="about-container">
  <div className="about-card">
    <h1 className="about-title">🚀 Notes App</h1>

    <p className="about-subtitle">
      Organize your thoughts. Stay productive. Keep everything in one place.
    </p>

    <div className="about-features">
      <div className="feature">
        <h3>📝 Create</h3>
        <p>Add notes quickly and easily</p>
      </div>

      <div className="feature">
        <h3>✏️ Edit</h3>
        <p>Update your notes anytime</p>
      </div>

      <div className="feature">
        <h3>🗑️ Delete</h3>
        <p>Clean up what you don’t need</p>
      </div>
    </div>

    <div className="about-footer">
      <p>Built with React ⚡</p>
    </div>
  </div>
</div>
  )
}

export default About
