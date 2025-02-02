import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MeditationTimer from './MeditationTimer.jsx';
import Soundscape from './Soundscape.jsx';
import HabitTracker from './HabitTracker.jsx';
import './HabitTracker.css';
import './app.css';

// App.js (updated)
const Home = () => {
  return (
    <div className="landing-container">
      {/* Animated background elements */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      <div className="bg-shape shape-3"></div>
      <div className="bg-shape shape-4"></div>
      <div className="bg-shape shape-5"></div>
      
      <div className="content-wrapper">
        <img 
          src="/med.png" 
          alt="Meditation" 
          className="center-image floating" 
        />
        <h1 className="main-heading animate-text">
          Welcome to <span>ZenMind</span>
        </h1>
        <p className="subheading animate-subtitle">
          Find peace with meditation and soothing soundscapes
        </p>
        
        <div className="options-container">
          <Link to="/timer" className="option-box timer hover-shine">
            <div className="icon-circle">
              <span className="icon">🧘</span>
            </div>
            <h2>Meditation Timer</h2>
          </Link>
          <Link to="/soundscape" className="option-box soundscape hover-shine">
            <div className="icon-circle">
              <span className="icon">🎵</span>
            </div>
            <h2>Soundscape</h2>
          </Link>
          <Link to="/habit" className="option-box timer hover-shine">
            <div className="icon-circle">
              <span className="icon">💯</span>
            </div>
            <h2>Habit Tracker</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timer" element={<div className="fullscreen"><MeditationTimer /></div>} />
        <Route path="/soundscape" element={<div className="fullscreen"><Soundscape /></div>} />
        <Route path="/habit" element={<div className="fullscreen"><HabitTracker /></div>} />
      </Routes>
    </Router>
  );
};

export default App;
