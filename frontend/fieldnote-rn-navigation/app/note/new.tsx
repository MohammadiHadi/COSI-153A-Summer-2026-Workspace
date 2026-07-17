import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NoteForm from "../../components/NoteForm";
import { useNotes } from "../../context/NotesContext";
import { useTheme } from "../../context/ThemeContext";
export default function NewNoteScreen() {
  const { addNote } = useNotes();
  const { isDarkMode } = useTheme();
  const handleSave = (title: string, body: string) => {
    addNote(title, body);
    router.back();
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        isDarkMode ? styles.darkBackground : styles.lightBackground,
      ]}
      edges={["bottom", "left", "right"]}
    >
      <View style={styles.content}>
        <NoteForm onSave={handleSave} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 16 },
  lightBackground: { backgroundColor: "#ffffff" },
  darkBackground: { backgroundColor: "#121212" },
});
