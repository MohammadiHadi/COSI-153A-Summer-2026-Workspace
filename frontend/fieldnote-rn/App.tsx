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
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type Note={
  id: string,
  title: string,
  body: string,
}


const initialNotes: Note[] = [
    {
      id: "1",
      title: "Trailhead observation",
      body: "New signage at the kiosk.",
    },
    { id: "2", title: "Wildlife", body: "Saw a red fox near the meadow." },
    { id: "3", title: "Weather", body: "Sunny with scattered clouds." },
  ];

export default function App() {
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [active, setActive] = useState(false);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState<Note[]>(initialNotes)

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
    Keyboard.dismiss();
    if (!title.trim()) {
      setError("Title is required!");
      return;
    }

    if (!body.trim()) {
      setError("Body is required!");
      return;
    }
    setSaving(true);
    // console.log("Title:", title);
    // console.log("Body:", body);
    // console.log("Note saved!");

    const newNote:Note = { id: Date.now().toString(), title: title, body: body}
    setNotes((currentNotes) =>
      [...currentNotes, newNote]
    )
    setError("");

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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top","bottom", "right", "left"]}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.container}>
            <FlatList
              data={notes}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ padding: 16 }}
            />
            <View style={styles.form}>
              <Text style={styles.formTitle}>Add a Note</Text>
              {error !== "" && <Text style={styles.error}>{error}</Text>}
              <TextInput
                style={[styles.input, active && styles.inputFocused]}
                value={title}
                onChangeText={setTitle}
                placeholder="Type a title"
                returnKeyType="default"
                onFocus={() => {
                  setActive(true);
                }}
                onBlur={() => {
                  setActive(false);
                }}
                // onSubmitEditing={saveNote}
                // secureTextEntry={true}
                // maxLength={10}
                submitBehavior="blurAndSubmit"
              ></TextInput>
              <TextInput
                style={[styles.input, styles.multiline]}
                value={body}
                onChangeText={setBody}
                placeholder="Type a body"
                multiline
                textAlignVertical="top"
                keyboardType="default"
                autoCapitalize="sentences"
                autoCorrect={true}
                // submitBehavior="blurAndSubmit"
              ></TextInput>
              <Pressable
                onPress={saveNote}
                onLongPress={showOptions}
                delayLongPress={800}
                hitSlop={10}
                disabled={saving}
                style={({ pressed }) => [
                  styles.saveButton,
                  pressed && styles.saveButtonPressed,
                  saving && styles.saveButtonDisabled,
                ]}
              >
                <Text style={styles.saveButtonText}>
                  {saving ? "Saving..." : "Save"}
                </Text>
              </Pressable>
              {/* <Button
    title={saving ? 'Saving…' : 'Add note'}
    onPress={saveNote}
    disabled={saving}
  /> */}
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
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

  inputFocused: {
    borderColor: "#2e7d32",
    borderWidth: 2,
  },

  error: {
    color: "red",
    fontWeight: "bold",
  },
});
