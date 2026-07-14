import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Keyboard,
  Alert,
} from "react-native";

type NoteFormProps = {
  onSave: (title: string, body: string) => void;
};
export default function NoteForm({ onSave }: NoteFormProps) {
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [titleActive, setTitleActive] = useState(false);
  const [bodyActive, setBodyActive] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = (text: string) => {
    setTitle(text);

    if (error !== "") {
      setError("");
    }
  };

  const handleBodyChange = (text: string) => {
    setBody(text);

    if (error !== "") {
      setError("");
    }
  };

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
    setError("");

    onSave(title.trim(), body.trim());

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
    <View style={styles.form}>
      <Text style={styles.formTitle}>Add a Note</Text>
      {error !== "" && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={[styles.input, titleActive && styles.inputFocused]}
        value={title}
        onChangeText={handleTitleChange}
        placeholder="Type a title"
        returnKeyType="default"
        onFocus={() => {
          setTitleActive(true);
        }}
        onBlur={() => {
          setTitleActive(false);
        }}
        submitBehavior="blurAndSubmit"
      ></TextInput>
      <TextInput
        style={[
          styles.input,
          styles.multiline,
          bodyActive && styles.inputFocused,
        ]}
        value={body}
        onChangeText={handleBodyChange}
        placeholder="Type a body"
        multiline
        textAlignVertical="top"
        keyboardType="default"
        autoCapitalize="sentences"
        autoCorrect={true}
        onFocus={() => setBodyActive(true)}
        onBlur={() => setBodyActive(false)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
    padding: 20,
    backgroundColor: "#f2f2f2",
    borderTopWidth: 1,
    borderTopColor: "#dddddd",
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

  inputFocused: {
    borderColor: "#2e7d32",
    borderWidth: 2,
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

  error: {
    color: "#cc0000",
    fontWeight: "bold",
    marginBottom: 10,
  },
});
