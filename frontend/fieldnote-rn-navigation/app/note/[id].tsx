import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNotes } from "../../context/NotesContext";
import { useTheme } from "../../context/ThemeContext";
export default function NoteDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getNoteById } = useNotes();
  const { isDarkMode } = useTheme();
  const note = getNoteById(id);
  if (!note) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          isDarkMode ? styles.darkBackground : styles.lightBackground,
        ]}
        edges={["bottom", "left", "right"]}
      >
        <View style={styles.content}>
          <Text
            style={[
              styles.notFound,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}
          >
            Note not found.
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      style={[
        styles.container,
        isDarkMode ? styles.darkBackground : styles.lightBackground,
      ]}
      edges={["bottom", "left", "right"]}
    >
      <View style={styles.content}>
        <Text
          style={[
            styles.label,
            isDarkMode ? styles.darkSecondaryText : styles.lightSecondaryText,
          ]}
        >
          Note ID
        </Text>
        <Text
          style={[
            styles.id,
            isDarkMode ? styles.darkSecondaryText : styles.lightSecondaryText,
          ]}
        >
          {note.id}
        </Text>
        <Text
          style={[
            styles.title,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}
        >
          {note.title}
        </Text>
        <Text
          style={[
            styles.body,
            isDarkMode ? styles.darkSecondaryText : styles.lightSecondaryText,
          ]}
        >
          {note.body}
        </Text>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require("../../assets/trailhead-photo.jpeg")}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 24 },
  lightBackground: { backgroundColor: "#ffffff" },
  darkBackground: { backgroundColor: "#121212" },
  lightText: { color: "#222222" },
  darkText: { color: "#ffffff" },
  lightSecondaryText: { color: "#555555" },
  darkSecondaryText: { color: "#cccccc" },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 4 },
  id: { fontSize: 15, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 14 },
  body: { fontSize: 18, lineHeight: 27, marginBottom: 24 },
  image: { width: "100%", height: 220, borderRadius: 8 },
  notFound: { fontSize: 20, fontWeight: "600" },
});
