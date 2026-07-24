import { createContext, useContext, useState, useEffect } from "react";
import type { Note } from "../types/Note";
import { BASE_URL } from "../config";
import { Try } from "expo-router/build/views/Try";

type NotesContextType = {
  notes: Note[];
  addNote: (title: string, body: string) => void;
  deleteNote: (id: string) => void;
  updateNote: (note: Omit<Note, "_id" | "createdAt">, id: string) => void;
  getNoteById: (id: string) => Note | undefined;
};
const NotesContext = createContext<NotesContextType>({
  notes: [],
  addNote: () => {},
  deleteNote: () => {},
  updateNote: (note: Omit<Note, "_id" | "createdAt">, id: string) => {},
  getNoteById: () => undefined,
});
export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function getNotes() {
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

    getNotes();
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

  const deleteNote = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/notes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete note");

      setNotes((currentNotes) => currentNotes.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const updateNote = async (
    note: Omit<Note, "_id" | "createdAt">,
    id: string
  ) => {
    if (!note || !id) return;

    try {
      const res = await fetch(`${BASE_URL}/api/notes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });

      if (!res.ok) throw new Error(`Failed to update: ${res.status}`);

      const updatedNote = await res.json();
      setNotes((currentNotes) =>
        currentNotes.map((n) => (n._id === id ? updatedNote : n)),
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const getNoteById = (id: string) => {
    return notes.find((note) => note._id === id);
  };
  const value = { notes, addNote, getNoteById, deleteNote, updateNote };
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}
export function useNotes() {
  return useContext(NotesContext);
}
