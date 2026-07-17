import { createContext, useContext, useState } from "react";
import { initialNotes } from "../data/initialNotes";
import type { Note } from "../types/Note";

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
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const addNote = (title: string, body: string) => {
    const newNote: Note = { id: Date.now().toString(), title, body };
    setNotes((currentNotes) => [...currentNotes, newNote]);
  };
  const getNoteById = (id: string) => {
    return notes.find((note) => note.id === id);
  };
  const value = { notes, addNote, getNoteById };
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}
export function useNotes() {
  return useContext(NotesContext);
}
