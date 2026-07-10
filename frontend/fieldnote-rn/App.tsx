import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Alert,
  Image,
  TextInput,
  Button,
} from "react-native";
import { useState } from "react";

export default function App() {
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const notes = [
    {
      id: "1",
      title: "Trailhead observation",
      body: "New signage at the kiosk.",
    },
    { id: "2", title: "Wildlife", body: "Saw a red fox near the meadow." },
    { id: "3", title: "Weather", body: "Sunny with scattered clouds." },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require("./assets/trailhead-photo.jpeg")}
      />
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#ddd" : "#2196F3" },
        ]}
        onPress={() => {
          console.log(`Pressed note: ${item.title}`);
        }}
      >
        <Text style={styles.buttonText}>Tap me</Text>
      </Pressable>
    </View>
  );

  const saveNote = () => {
    setSaving(true);
    console.log("Title:", title);
    console.log("Body:", body);
    console.log("Note saved!");

    setTimeout(() => {
      setSaving(false);
      setTitle("");
      setBody("");
    }, 1000);
  };

  const showOptions = () => {
    Alert.alert("Options", "The Save button was long-pressed!");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
      />
      <View style={styles.form}>
        <Text style={styles.formTitle}>Add a Note</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Type a title"
        ></TextInput>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={body}
          onChangeText={setBody}
          placeholder="Type a body"
          multiline
          textAlignVertical="top"
        ></TextInput>
        <Pressable
          onPress={saveNote}
          onLongPress={showOptions}
          delayLongPress={800}
          hitSlop={10}
          disabled={saving}
          style={({pressed})=>[styles.saveButton, pressed && styles.saveButtonPressed, saving && styles.saveButtonDisabled]}
        >
          <Text style={styles.saveButtonText}>{saving ? "Saving..." : "Save"}</Text>
        </Pressable>
         {/* <Button
    title={saving ? 'Saving…' : 'Add note'}
    onPress={saveNote}
    disabled={saving}
  /> */}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "medium",
    color: "#333",
  },

  body: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
  },

  card: {
    backgroundColor: "#f7efef",
    padding: 20,
    margin: "4%",
    borderRadius: 8,
    width: "85%",
  },

  sViewContent: {
    padding: 16,
  },

  scrollView: {
    height: 200,
    backgroundColor: "lightgray",
  },

  buttonText: { color: "#d31c1c", fontSize: 18, fontWeight: "bold" },

  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },

  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 16,
  },

  form: {
    width: "100%",
    marginTop: 8,
    padding: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },

  formTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#aaaaaa",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },

  multiline: {
    minHeight: 100,
  },

  saveButton: {
    backgroundColor: "#2e7d32",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  saveButtonPressed: {
    opacity: 0.7,
  },

  saveButtonDisabled: {
    backgroundColor: "#999999",
  },
saveButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },

});
