import React, { useState, useEffect } from 'react';
import './PomodoroTimer.css';


const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // 'work' or 'break'
  const [cycles, setCycles] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Timer completed
          clearInterval(interval);
          
          // Play sound
          const audio = new Audio('/notification.mp3');
          audio.play().catch(err => console.log('Audio playback error:', err));
          
          // Show confetti
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
          
          // Toggle between work and break
          if (mode === 'work') {
            setMode('break');
            setMinutes(5);
            setCycles(cycles + 1);
          } else {
            setMode('work');
            setMinutes(25);
          }
          
          setIsActive(false);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, mode, cycles]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'work') {
      setMinutes(25);
    } else {
      setMinutes(5);
    }
    setSeconds(0);
  };

  const toggleMode = () => {
    setIsActive(false);
    if (mode === 'work') {
      setMode('break');
      setMinutes(5);
    } else {
      setMode('work');
      setMinutes(25);
    }
    setSeconds(0);
  };

  const formatTime = (min, sec) => {
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="journal-wrapper">
      <div className="journal-page">
        <h1>Pomodoro Timer</h1>
        
        <div className="journal-form">
          <div className="pomodoro-container">
            <div 
              className="pomodoro-timer" 
              style={{
                textAlign: 'center',
                fontSize: '5rem',
                fontWeight: 'bold',
                color: mode === 'work' ? 'var(--text-color)' : 'var(--primary-button)',
                marginBottom: '30px'
              }}
            >
              {formatTime(minutes, seconds)}
            </div>
            
            <div className="pomodoro-mode" style={{textAlign: 'center', marginBottom: '40px'}}>
              <span 
                style={{
                  fontSize: '1.5rem', 
                  fontWeight: 'bold',
                  backgroundColor: mode === 'work' ? 'var(--text-color)' : 'var(--primary-button)',
                  color: 'white',
                  padding: '8px 20px',
                  borderRadius: '20px'
                }}
              >
                {mode === 'work' ? 'Work Time' : 'Break Time'}
              </span>
              {cycles > 0 && 
                <div style={{marginTop: '10px', fontSize: '1rem'}}>
                  Completed cycles: {cycles}
                </div>
              }
            </div>
            
            <div className="pomodoro-controls" style={{display: 'flex', justifyContent: 'center', gap: '15px'}}>
              <button 
                onClick={toggleTimer}
                style={{
                  backgroundColor: isActive ? 'var(--hover-red)' : 'var(--primary-button)',
                  color: 'white',
                  padding: '16px 32px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  minWidth: '150px'
                }}
              >
                {isActive ? 'Pause' : 'Start'}
              </button>
              
              <button 
                onClick={resetTimer}
                style={{
                  backgroundColor: 'var(--header-color)',
                  color: 'white',
                  padding: '16px 32px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  minWidth: '150px'
                }}
              >
                Reset
              </button>
              
              <button 
                onClick={toggleMode}
                style={{
                  backgroundColor: 'var(--somecolor)',
                  color: 'var(--text-color)',
                  padding: '16px 32px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  minWidth: '150px'
                }}
              >
                Switch to {mode === 'work' ? 'Break' : 'Work'}
              </button>
            </div>
          </div>
          
          <div className="pomodoro-info" style={{marginTop: '50px', backgroundColor: 'var(--background-color)', padding: '20px', borderRadius: '12px'}}>
            <h2 style={{textAlign: 'center', marginTop: '0'}}>How to Use the Pomodoro Technique</h2>
            <ol style={{lineHeight: '1.6', paddingLeft: '30px'}}>
              <li>Set the timer for 25 minutes and focus entirely on one task</li>
              <li>When the timer rings, take a 5-minute break</li>
              <li>After completing four pomodoros, take a longer 15-30 minute break</li>
              <li>Repeat the process throughout your workday</li>
            </ol>
            <p style={{marginTop: '20px', textAlign: 'center', fontStyle: 'italic'}}>
              This technique helps improve focus, reduce distractions, and manage mental fatigue.
            </p>
          </div>
        </div>
      </div>
      
      {showConfetti && (
        <div className="confetti">
          {mode === 'work' ? '🎉' : '☕'}
        </div>
      )}
    </div>
  );
};

export default PomodoroTimer;