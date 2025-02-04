import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './components/HomePage';
import Breathing from './components/Breathing';
import Navbar from './components/Navbar';
import Journaling from "./components/Journaling";
import Todo from './components/Todo';
function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/Journaling" element={<Journaling />} />
        <Route path="/Todo" element={<Todo />} />
        <Route path="/Breathing-exercise" element={<Breathing />} />
      </Routes>
    </Router>
  );
}

export default App;

