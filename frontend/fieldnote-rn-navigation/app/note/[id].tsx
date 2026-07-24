import { useLocalSearchParams } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNotes } from "../../context/NotesContext";
import { useTheme } from "../../context/ThemeContext";
import { router } from "expo-router";
import { useState } from "react";

export default function NoteDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getNoteById, deleteNote, updateNote } = useNotes();
  const { isDarkMode } = useTheme();
  const note = getNoteById(id);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note ? note.title : "");
  const [editedBody, setEditedBody] = useState(note ? note.body : "");

  const onUpdate = () => {
    if (!id) return;
    updateNote({ title: editedTitle, body: editedBody }, id);
    setIsEditing(false);
  };

  const onRemove = () => {
    if (!id) return;
    deleteNote(id);
    router.back();
  };
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
      {isEditing ? (
        <View style={styles.content}>
          <Text
            style={[styles.h1, { color: isDarkMode ? "#ffffff" : "#222222" }]}
          >
            Edit Note
          </Text>
          <TextInput
            value={editedTitle}
            onChangeText={setEditedTitle}
            placeholder="Title"
            placeholderTextColor={isDarkMode ? "#777" : "#aaa"}
            style={[
              styles.input,
              {
                color: isDarkMode ? "#ffffff" : "#222222",
                backgroundColor: isDarkMode ? "#1e1e1e" : "#f9f9f9",
              },
            ]}
          />
          <TextInput
            value={editedBody}
            onChangeText={setEditedBody}
            placeholder="Body"
            placeholderTextColor={isDarkMode ? "#777" : "#aaa"}
            multiline
            style={[
              styles.input,
              styles.multiline,
              {
                color: isDarkMode ? "#ffffff" : "#222222",
                backgroundColor: isDarkMode ? "#1e1e1e" : "#f9f9f9",
              },
            ]}
          />
          <View style={styles.row}>
            <Pressable onPress={() => setIsEditing(false)}>
              <Text style={[styles.link, { color: "#888" }]}>Cancel</Text>
            </Pressable>
            <Pressable onPress={onUpdate}>
              <Text style={[styles.link, { color: "#1f6feb" }]}>Save</Text>
            </Pressable>
          </View>
        </View>
      ) : (
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
            {note._id}
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
          <View style={styles.row}>
            <Pressable onPress={() => setIsEditing(true)}>
              <Text style={[styles.link, { color: "#1f6feb" }]}>Edit</Text>
            </Pressable>
            <Pressable onPress={onRemove}>
              <Text style={{ color: "tomato" }}>Delete</Text>
            </Pressable>
          </View>
        </View>
      )}
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

  h1: { fontSize: 20, fontWeight: "700" },
  row: { flexDirection: "row", gap: 16, marginTop: 12 },
  link: { color: "#1f6feb", fontWeight: "600" },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    padding: 10,
  },
  multiline: {
    minHeight: 120,
    textAlignVertical: "top",
  },
});
