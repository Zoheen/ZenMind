import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [phase, setPhase] = useState('Inhale');
  const [circleSize, setCircleSize] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prevPhase) => (prevPhase === 'Inhale' ? 'Hold' : prevPhase === 'Hold' ? 'Exhale' : 'Inhale'));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase === 'Inhale') {
      setCircleSize(200);
    } else if (phase === 'Exhale') {
      setCircleSize(100);
    }
  }, [phase]);

  return (
    <div className="app">
      <h1>Breathing Exercise</h1>
      <div className="circle" style={{ width: circleSize, height: circleSize }}></div>
      <p className="instruction">{phase}</p>
    </div>
  );
}

export default App;


// import React from 'react';
// import './App.css';

// function App() {
//   return (
//     <div className="app">
//       <h1>Breathing Exercise</h1>
//       <p>This is a simple breathing exercise app.</p>
//     </div>
//   );
// }

// export default App;
