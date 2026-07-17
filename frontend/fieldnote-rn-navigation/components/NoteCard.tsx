import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";
import type { Note } from "../types/Note";
import Card from "./Card";
type NoteCardProps = { note: Note };
export default function NoteCard({ note }: NoteCardProps) {
  const { isDarkMode } = useTheme();
  return (
    <Card>
      <Text
        style={[
          styles.title,
          isDarkMode ? styles.darkTitle : styles.lightTitle,
        ]}
      >
        {note.title}
      </Text>
      <Text
        style={[styles.body, isDarkMode ? styles.darkBody : styles.lightBody]}
      >
        {note.body}
      </Text>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require("../assets/trailhead-photo.jpeg")}
      />
      <Link href={{ pathname: "/note/[id]", params: { id: note.id } }} asChild>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}> View Details </Text>
        </Pressable>
      </Link>
    </Card>
  );
}
const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "500", marginBottom: 6 },
  lightTitle: { color: "#333333" },
  darkTitle: { color: "#ffffff" },
  body: { fontSize: 16, lineHeight: 22, marginBottom: 12 },
  lightBody: { color: "#555555" },
  darkBody: { color: "#cccccc" },
  image: { width: "100%", height: 100, borderRadius: 8, marginBottom: 16 },
  button: {
    backgroundColor: "#2196f3",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonPressed: { opacity: 0.7 },
  buttonText: { color: "#ffffff", fontSize: 18, fontWeight: "bold" },
});
