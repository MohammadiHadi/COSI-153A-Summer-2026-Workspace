import { StyleSheet, TextInput } from "react-native";
import { useTheme } from "../context/ThemeContext";
type SearchBarProps = { onSearch: (text: string) => void; query: string };
export default function SearchBar({ query, onSearch }: SearchBarProps) {
  const { isDarkMode } = useTheme();
  return (
    <TextInput
      value={query}
      style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
      placeholder="Search notes..."
      placeholderTextColor={isDarkMode ? "#999999" : "#777777"}
      onChangeText={onSearch}
      returnKeyType="search"
    />
  );
}
const styles = StyleSheet.create({
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
});
