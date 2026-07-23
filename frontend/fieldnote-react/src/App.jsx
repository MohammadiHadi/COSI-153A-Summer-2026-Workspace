import { useState, useEffect } from "react";
import NoteCard from "./components/NoteCard";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch("http://localhost:3000/api/notes");

        if (!response.ok)
          throw new Error(`Failed to fetch notes: ${response.status}`);

        const fetchedNotes = await response.json();
        setNotes(fetchedNotes);
      } catch (error) {
        console.log(error);
      }
    }

    fetchNotes();
  }, []);

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
        <NoteCard
          key={note._id}
          title={note.title}
          body={note.body}
          date={note.date}
        />
        // props = { key: note.id, note:note}
        // props = { key: note.id, title: note.title ...}
      ))}
    </div>
  );
}

export default App;
