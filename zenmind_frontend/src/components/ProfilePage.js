import React from "react";
import './ProfilePage.css';
const ProfilePage = () => {
  return (
    <div className="journal-wrapper">
      <div className="journal-page">
        <h1>ZenMind Profile</h1>
        <div className="profile-section">
          <img
            src="/profile-pic-placeholder.png"
            alt="Profile"
            className="profile-pic"
          />
          <div className="profile-details">
            <h2>John Doe</h2>
            <p><strong>Email:</strong> johndoe@example.com</p>
            <p><strong>Journaling Streak:</strong> 15 Days</p>
            <p><strong>Favorite Activity:</strong> Deep Breathing</p>
          </div>
        </div>

        <h2>Mindfulness Stats</h2>
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Meditations</h3>
            <p>120</p>
          </div>
          
          <div className="stat-card">
            <h3>Journals Written</h3>
            <p>50</p>
          </div>
        </div>

        <h2>Recent Journals</h2>
        <div className="journal-entries">
          <div className="journal-entry">
            <div className="entry-header">
              <h3>Gratitude Reflection</h3>
              <button className="delete-button">&times;</button>
            </div>
            <div className="entry-meta">
              <span className="entry-date">📅 Feb 10, 2025</span>
              <span className="entry-mood">😊 Calm</span>
            </div>
            <p>Today I felt really grateful for the small things...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;