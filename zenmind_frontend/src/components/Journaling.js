import React, { useState } from "react";
import "./Journaling.css"; // External CSS for styling

const Journaling = () => {
  const [entry, setEntry] = useState({ mood: "", date: "", journal: "" });
  const [entries, setEntries] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  const handleAddEntry = () => {
    if (entry.mood && entry.date && entry.journal) {
      setEntries([...entries, entry]);
      setEntry({ mood: "", date: "", journal: "" });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="journal-page">
      <h1>My Journal</h1>
      <div className="journal-form">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={entry.date}
          onChange={handleInputChange}
        />

        <label htmlFor="mood">Mood</label>
        <select
          id="mood"
          name="mood"
          value={entry.mood}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Select your mood
          </option>
          <option value="Happy">Happy 😊</option>
          <option value="Sad">Sad 😢</option>
          <option value="Excited">Excited 🎉</option>
          <option value="Anxious">Anxious 😰</option>
          <option value="Calm">Calm 🌿</option>
        </select>

        <label htmlFor="journal">Journal Entry</label>
        <textarea
          id="journal"
          name="journal"
          value={entry.journal}
          onChange={handleInputChange}
          placeholder="Write your thoughts here..."
        />

        <button onClick={handleAddEntry}>Add Entry</button>
      </div>

      <div className="journal-entries">
        <h2>Past Entries</h2>
        {entries.length > 0 ? (
          entries.map((e, index) => (
            <div key={index} className="journal-entry">
              <p>
                <strong>Date:</strong> {e.date}
              </p>
              <p>
                <strong>Mood:</strong> {e.mood}
              </p>
              <p>
                <strong>Entry:</strong> {e.journal}
              </p>
            </div>
          ))
        ) : (
          <p>No entries yet. Start journaling!</p>
        )}
      </div>
    </div>
  );
};

export default Journaling;
