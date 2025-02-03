import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Login</h2>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button onClick={() => navigate('/home')}>Login</button>
      <p>Don't have an account? <span onClick={() => navigate('/signup')}>Sign up</span></p>
    </div>
  );
}

export default Login;
