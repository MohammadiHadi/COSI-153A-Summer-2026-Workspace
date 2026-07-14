import { TextInput, StyleSheet } from "react-native";

type SearchBarProps = {
  onSearch: (text: string) => void;
  query: string;
};

export default function SearchBar({ query, onSearch }: SearchBarProps) {
  return (
    <TextInput
    value={query}
      style={styles.input}
      placeholder="Search notes...."
      onChangeText={onSearch}
    />
  );
}

const styles = StyleSheet.create({
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
});
