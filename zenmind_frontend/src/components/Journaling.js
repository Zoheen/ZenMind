import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./Journaling.css";


const Journaling = () => {
  const [entry, setEntry] = useState({
    title: "",
    mood: "",
    date: "",
    journal: "",
    tags: []
  });
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [tag, setTag] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  // Load entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem("journalEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage
  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tag && !entry.tags.includes(tag)) {
      setEntry({ ...entry, tags: [...entry.tags, tag] });
      setTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setEntry({
      ...entry,
      tags: entry.tags.filter((t) => t !== tagToRemove)
    });
  };

  const handleAddEntry = () => {
    if (entry.title && entry.mood && entry.date && entry.journal) {
      const newEntry = {
        ...entry,
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString()
      };
      setEntries([newEntry, ...entries]);
      setEntry({ title: "", mood: "", date: "", journal: "", tags: [] });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleDeleteEntry = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      setEntries(entries.filter((e) => e.id !== id));
    }
  };

  const filteredEntries = entries
    .filter((e) => {
      if (filter === "all") return true;
      return e.mood === filter;
    })
    .filter((e) =>
      Object.values(e).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  const getMoodEmoji = (mood) => {
    const moodEmojis = {
      Happy: "😊",
      Sad: "😢",
      Excited: "🎉",
      Anxious: "😰",
      Calm: "🌿",
      Energetic: "⚡",
      Tired: "😴",
      Creative: "🎨"
    };
    return moodEmojis[mood] || "";
  };

  return (
    <div className="journal-wrapper">
    <div className="journal-page">

      <h1>My Daily Journal</h1>
      
      <div className="search-filter-container">
      <Link to="/HeatMap" className="primary-button">View Heatmap</Link>
      <Link to="/JournalEntries" className="primary-button">View Previous Enteries</Link>
      <br></br>
        <input
          type="text"
          placeholder="Search entries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mood-filter"
        >
          <option value="all">All Moods</option>
          <option value="Happy">Happy 😊</option>
          <option value="Sad">Sad 😢</option>
          <option value="Excited">Excited 🎉</option>
          <option value="Anxious">Anxious 😰</option>
          <option value="Calm">Calm 🌿</option>
          <option value="Energetic">Energetic ⚡</option>
          <option value="Tired">Tired 😴</option>
          <option value="Creative">Creative 🎨</option>
        </select>
      </div>

      <div className="journal-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={entry.title}
            onChange={handleInputChange}
            placeholder="Give your entry a title..."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={entry.date}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="mood">Mood *</label>
            <select
              id="mood"
              name="mood"
              value={entry.mood}
              onChange={handleInputChange}
            >
              <option value="" disabled>Select your mood</option>
              <option value="Happy">Happy 😊</option>
              <option value="Sad">Sad 😢</option>
              <option value="Excited">Excited 🎉</option>
              <option value="Anxious">Anxious 😰</option>
              <option value="Calm">Calm 🌿</option>
              <option value="Energetic">Energetic ⚡</option>
              <option value="Tired">Tired 😴</option>
              <option value="Creative">Creative 🎨</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="journal">Journal Entry *</label>
          <textarea
            id="journal"
            name="journal"
            value={entry.journal}
            onChange={handleInputChange}
            placeholder="Write your thoughts here..."
          />
        </div>

        <div className="tags-section">
          <div className="tag-input-group">
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Add tags..."
              className="tag-input"
            />
            <button onClick={handleAddTag} className="tag-button">
              Add Tag
            </button>
          </div>
          <div className="tags-container">
            {entry.tags.map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="tag-remove"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button onClick={handleAddEntry} className="submit-button">
          Save Entry
        </button>
      </div>

      <div className="journal-entries">
        <h2>Past Entries ({filteredEntries.length})</h2>
        {filteredEntries.length > 0 ? (
          filteredEntries.map((e) => (
            <div key={e.id} className="journal-entry">
              <div className="entry-header">
                <h3>{e.title}</h3>
                <button
                  onClick={() => handleDeleteEntry(e.id)}
                  className="delete-button"
                >
                  ×
                </button>
              </div>
              <div className="entry-meta">
                <span className="entry-date">
                  📅 {e.date} at {e.timestamp}
                </span>
                <span className="entry-mood">
                  {getMoodEmoji(e.mood)} {e.mood}
                </span>
              </div>
              <p className="entry-content">{e.journal}</p>
              {e.tags.length > 0 && (
                <div className="entry-tags">
                  {e.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-entries">No entries found. Start journaling!</p>
        )}
      </div>

      {showConfetti && <div className="confetti">🎉</div>}
    </div>
    </div>
  );
};

export default Journaling;