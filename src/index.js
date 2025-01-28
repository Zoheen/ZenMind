// import React from 'react';
// import ReactDOM from 'react-dom';
// import './App.css'; // Ensure this file exists
// import App from './App'; // Ensure this file exists

// ReactDOM.createRoot(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root') // Ensure this matches the id in index.html
// );


import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ Use React 18 method
import './App.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // ✅ Correct method
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
