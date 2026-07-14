import { Pressable, Text, Image, StyleSheet} from "react-native";
import Card from "./Card";
import { Note } from "../types/Note";

type NoteCardProps = {
    note: Note;
}

export default function NoteCard({note}: NoteCardProps){
    return (
         <Card>
              <Text style={styles.title}>{note.title}</Text>
              <Text style={styles.body}>{note.body}</Text>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={require("../assets/trailhead-photo.jpeg")}
              />
              <Pressable
                style={({ pressed }) => [
                  styles.button, pressed && styles.buttonPressed,
                ]}
                onPress={() => {
                  console.log(`Pressed note: ${note.title}`);
                }}
              >
                <Text style={styles.buttonText}>Tap me</Text>
              </Pressable>
            </Card>
    );
}

const styles = StyleSheet.create({
      title: {
    fontSize: 20,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 6,
  },

  body: {
    fontSize: 16,
    color: "#555555",
    lineHeight: 22,
    marginBottom: 12,
  },

  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 16,
  },

  button: {
    backgroundColor: "#2196f3",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonPressed: {
    backgroundColor: "#dddddd",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },

})