import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

function Sidebar() {
  const [extended, setExtended] = useState(false);
  const { onSent } = useContext(Context);

  const handleToolClick = (prompt) => {
    onSent(prompt);
  };

  return (
    <div className='sidebar'>
      <div className="top">
        <img 
          onClick={() => setExtended(prev => !prev)} 
          src={assets.menu_icon} 
          alt="Menu" 
          className="menu" 
        />
        <div className="new-chat" onClick={() => window.location.reload()}>
          <img src={assets.plus_icon} alt="New Chat" />
          {extended ? <p>New Session</p> : null}
        </div>

        {extended ? (
          <div className="categories-container">
            {/* Student Zone */}
            <div className="sidebar-category">
              <p className="category-title">📚 Student Zone</p>
              <div className="category-item" onClick={() => handleToolClick("Help me set up a 25-minute Pomodoro focus session with a goal.")}>
                <img src={assets.bulb_icon} alt="Focus" />
                <p>Focus Mode</p>
              </div>
              <div className="category-item" onClick={() => handleToolClick("I have an exam coming up and I feel very anxious. Give me a 2-minute text based grounding exercise.")}>
                <img src={assets.message_icon} alt="Anxiety" />
                <p>Exam Anxiety Relief</p>
              </div>
            </div>

            {/* Teacher Lounge */}
            <div className="sidebar-category">
              <p className="category-title">☕ Teacher Lounge</p>
              <div className="category-item" onClick={() => handleToolClick("I am a teacher experiencing burnout. What are some immediate 5-minute recovery steps I can take after class?")}>
                <img src={assets.compass_icon} alt="Recovery" />
                <p>Burnout Recovery</p>
              </div>
              <div className="category-item" onClick={() => handleToolClick("Give me a quick vocal cord relaxation exercise.")}>
                <img src={assets.mic_icon} alt="Voice" />
                <p>Vocal Rest</p>
              </div>
            </div>

            {/* General Wellness */}
            <div className="sidebar-category">
              <p className="category-title">🌿 General Wellness</p>
              <div className="category-item" onClick={() => handleToolClick("Give me 5 highly positive daily affirmations to start my day.")}>
                <img src={assets.code_icon} alt="Affirmations" />
                <p>Daily Affirmations</p>
              </div>
              <div className="category-item" onClick={() => handleToolClick("How do I improve my sleep hygiene? Give me a quick checklist.")}>
                <img src={assets.history_icon} alt="Sleep" />
                <p>Sleep Tracker Tips</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom-item category-item">
          <img src={assets.question_icon} alt="Help" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item category-item">
          <img src={assets.setting_icon} alt="Settings" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
