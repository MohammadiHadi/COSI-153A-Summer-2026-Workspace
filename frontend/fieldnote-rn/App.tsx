import {
  StyleSheet,
  View,
  FlatList,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import type { Note } from "./types/Note";
import { initialNotes } from "./data/initialNotes";
import SearchBar from "./components/SearchBar";
import NoteCard from "./components/NoteCard";
import NoteForm from "./components/NoteForm";

export default function App() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [query, setQuery] = useState<string>("");

  const renderNote = ({ item }: { item: Note }) => <NoteCard note={item} />;

  const normalizedQuery = query.trim().toLowerCase();

  const visibleNotes = notes.filter((note) => {
    if (!normalizedQuery) return true;
    return (
      note.title.toLowerCase().includes(normalizedQuery) ||
      note.body.toLowerCase().includes(normalizedQuery)
    );
  });

  const addNote = (title: string, body: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: title,
      body: body,
    };

    setNotes((currentNotes) => [...currentNotes, newNote]);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        edges={["top", "bottom", "right", "left"]}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.container}>
            <View style={styles.searchContainer}>
              <SearchBar query={query} onSearch={setQuery} />
            </View>
            <FlatList
              data={visibleNotes}
              renderItem={renderNote}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
            />
            <NoteForm onSave={addNote} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
