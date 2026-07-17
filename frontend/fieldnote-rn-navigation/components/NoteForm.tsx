import { useState } from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
type NoteFormProps = { onSave: (title: string, body: string) => void };
export default function NoteForm({ onSave }: NoteFormProps) {
  const { isDarkMode } = useTheme();
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
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
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    if (!trimmedTitle) {
      setError("Title is required!");
      return;
    }
    if (!trimmedBody) {
      setError("Body is required!");
      return;
    }
    setSaving(true);
    setError("");
    onSave(trimmedTitle, trimmedBody);
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
    <View
      style={[styles.form, isDarkMode ? styles.darkForm : styles.lightForm]}
    >
      <Text
        style={[
          styles.formTitle,
          isDarkMode ? styles.darkText : styles.lightText,
        ]}
      >
        Add a Note
      </Text>
      {error !== "" && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={[
          styles.input,
          isDarkMode ? styles.darkInput : styles.lightInput,
          titleActive && styles.inputFocused,
        ]}
        value={title}
        onChangeText={handleTitleChange}
        placeholder="Type a title"
        placeholderTextColor={isDarkMode ? "#999999" : "#777777"}
        returnKeyType="default"
        onFocus={() => setTitleActive(true)}
        onBlur={() => setTitleActive(false)}
        submitBehavior="blurAndSubmit"
      />
      <TextInput
        style={[
          styles.input,
          styles.multiline,
          isDarkMode ? styles.darkInput : styles.lightInput,
          bodyActive && styles.inputFocused,
        ]}
        value={body}
        onChangeText={handleBodyChange}
        placeholder="Type a body"
        placeholderTextColor={isDarkMode ? "#999999" : "#777777"}
        multiline
        textAlignVertical="top"
        keyboardType="default"
        autoCapitalize="sentences"
        autoCorrect
        onFocus={() => setBodyActive(true)}
        onBlur={() => setBodyActive(false)}
      />
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
  form: { width: "100%", padding: 20, borderRadius: 8 },
  lightForm: { backgroundColor: "#f2f2f2" },
  darkForm: {
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#333333",
  },
  formTitle: { fontSize: 20, fontWeight: "600", marginBottom: 12 },
  lightText: { color: "#222222" },
  darkText: { color: "#ffffff" },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  lightInput: {
    borderColor: "#aaaaaa",
    backgroundColor: "#ffffff",
    color: "#222222",
  },
  darkInput: {
    borderColor: "#555555",
    backgroundColor: "#242424",
    color: "#ffffff",
  },
  inputFocused: { borderColor: "#2e7d32", borderWidth: 2 },
  multiline: { minHeight: 120 },
  saveButton: {
    backgroundColor: "#2e7d32",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonPressed: { opacity: 0.7 },
  saveButtonDisabled: { backgroundColor: "#777777" },
  saveButtonText: { color: "#ffffff", fontSize: 18, fontWeight: "bold" },
  error: { color: "#e53935", fontWeight: "bold", marginBottom: 10 },
});
