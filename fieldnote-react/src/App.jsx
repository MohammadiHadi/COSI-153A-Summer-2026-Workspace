import { useState } from "react";
import "./App.css";

function NoteCard({ note }) {
  return (
    <article className="note-card">
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <small>{note.date}</small>
    </article>
  );
}


function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Trailhead observation",
      body: "New signage at the kiosk.",
      date: "2025-08-26",
    },
  ]);

  return (
    <div className="container">
      <header>
        <h1>FieldNote</h1>
        <p className="tagline">
          A simple place to log outdoor observations: plants, weather, trails,
          anything you notice.
        </p>
      </header>
      <h2>Notes ({notes.length})</h2>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}

export default App;
