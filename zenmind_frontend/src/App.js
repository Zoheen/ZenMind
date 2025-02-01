import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LandingPage from './LandingPage';
// import Meditation from './Meditation';  
// import BreathingTechniques from './BreathingTechniques';
// import SoundLibrary from './SoundLibrary';
// import MoodTracking from './MoodTracking';
import Journaling from "./components/Journaling";
// import MeditationTimer from './MeditationTimer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Journaling />} />
      </Routes>
    </Router>
  );
}

export default App;

