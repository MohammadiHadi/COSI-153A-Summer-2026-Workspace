import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NoteCard from "../../components/NoteCard";
import SearchBar from "../../components/SearchBar";
import { useNotes } from "../../context/NotesContext";
import { useTheme } from "../../context/ThemeContext";
import type { Note } from "../../types/Note";
export default function NotesScreen() {
  const { notes } = useNotes();
  const { isDarkMode } = useTheme();
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const visibleNotes = notes.filter((note) => {
    if (!normalizedQuery) {
      return true;
    }
    return (
      note.title.toLowerCase().includes(normalizedQuery) ||
      note.body.toLowerCase().includes(normalizedQuery)
    );
  });
  const renderNote = ({ item }: { item: Note }) => {
    return <NoteCard note={item} />;
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        isDarkMode ? styles.darkBackground : styles.lightBackground,
      ]}
      edges={["bottom", "left", "right"]}
    >
      <View style={styles.searchContainer}>
        <SearchBar query={query} onSearch={setQuery} />
      </View>
      <Link href="/note/new" asChild>
        <Pressable
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}> Add New Note </Text>
        </Pressable>
      </Link>
      <FlatList
        data={visibleNotes}
        renderItem={renderNote}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  lightBackground: { backgroundColor: "#ffffff" },
  darkBackground: { backgroundColor: "#121212" },
  searchContainer: { paddingHorizontal: 16, paddingTop: 16 },
  addButton: {
    alignSelf: "flex-end",
    backgroundColor: "#2e7d32",
    marginHorizontal: 16,
    marginTop: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonPressed: { opacity: 0.7 },
  addButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
  listContent: { padding: 16 },
});
