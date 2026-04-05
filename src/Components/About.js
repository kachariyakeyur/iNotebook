import React from 'react'
import '../home.css'

function About() {
  return (
    <div className="abg">
    <div className='container'>
      <div className="about-container">
        <div className="about-card">
          <h1>About iNotebook</h1>
          <p>
            <strong>iNotebook</strong> is a secure and user-friendly note-taking
            web application built using the <strong>MERN Stack</strong>
            (MongoDB, Express.js, React.js, and Node.js).
          </p>

          <p>
            This project allows users to create, edit, delete, and manage their
            personal notes efficiently in one place. It is designed to help users
            stay organized and keep important information easily accessible.
          </p>

          <h3>Key Features</h3>
          <ul>
            <li>User authentication with Login and Signup</li>
            <li>Secure notes management for each user</li>
            <li>Add new notes quickly</li>
            <li>Edit existing notes anytime</li>
            <li>Delete notes when no longer needed</li>
            <li>Responsive and simple user interface</li>
          </ul>

          <h3>Technologies Used</h3>
          <ul>
            <li>React.js for frontend</li>
            <li>Node.js and Express.js for backend</li>
            <li>MongoDB for database</li>
            <li>Bootstrap and custom CSS for styling</li>
            <li>JWT Authentication for secure access</li>
          </ul>

          <h3>Project Purpose</h3>
          <p>
            The main purpose of iNotebook is to provide a simple and secure
            platform where users can store and manage their personal notes from
            anywhere.
          </p>

          <p className="about-footer">
            Built with ❤️ using MERN Stack
          </p>
        </div>
      </div>

    </div>
    </div>
  )
}

export default About
