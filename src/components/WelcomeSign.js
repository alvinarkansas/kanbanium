import React from 'react'
import ReactTypingEffect from 'react-typing-effect';
import logoKanbanium from '../assets/logo-kanbanium.png';

export default function WelcomeSign() {
  return (
    <div className="welcome-container">
      <div>
        <img src={logoKanbanium} alt="logo" />
      </div>
      <ReactTypingEffect
        text={["Get productive", "Always deliver more"]}
        speed={100}
        className="welcome-text"
        typingDelay={500}
      />
    </div>
  )
}
