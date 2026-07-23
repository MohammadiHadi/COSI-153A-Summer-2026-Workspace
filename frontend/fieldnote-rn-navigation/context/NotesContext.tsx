import { createContext, useContext, useState, useEffect } from "react";
import type { Note } from "../types/Note";
import { BASE_URL } from "../config";

type NotesContextType = {
  notes: Note[];
  addNote: (title: string, body: string) => void;
  getNoteById: (id: string) => Note | undefined;
};
const NotesContext = createContext<NotesContextType>({
  notes: [],
  addNote: () => {},
  getNoteById: () => undefined,
});
export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch(`${BASE_URL}/api/notes`);

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


 const addNote = async (title: string, body: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add note: ${response.status}`);
      }

      const createdNote: Note = await response.json();

      setNotes((currentNotes) => [...currentNotes, createdNote]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const getNoteById = (id: string) => {
    return notes.find((note) => note._id === id);
  };
  const value = { notes, addNote, getNoteById };
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}
export function useNotes() {
  return useContext(NotesContext);
}
