import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to the Breathing Exercise App</h1>
      <p>Relax and follow guided breathing techniques.</p>
      <button onClick={() => navigate('/breathing')}>Start Exercise</button>
    </div>
  );
}

export default Home;
