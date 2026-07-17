import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
export default function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useTheme();
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
            styles.title,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}
        >
          Appearance
        </Text>
        <Text
          style={[
            styles.description,
            isDarkMode ? styles.darkSecondaryText : styles.lightSecondaryText,
          ]}
        >
          Current theme: {isDarkMode ? "Dark" : "Light"}
        </Text>
        <Pressable
          onPress={toggleTheme}
          style={({ pressed }) => [
            styles.themeButton,
            pressed && styles.themeButtonPressed,
          ]}
        >
          <Text style={styles.themeButtonText}>
            Switch to {isDarkMode ? "Light" : "Dark"} Mode{" "}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 24 },
  lightBackground: { backgroundColor: "#ffffff" },
  darkBackground: { backgroundColor: "#121212" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 12 },
  description: { fontSize: 17, marginBottom: 24 },
  lightText: { color: "#222222" },
  darkText: { color: "#ffffff" },
  lightSecondaryText: { color: "#555555" },
  darkSecondaryText: { color: "#cccccc" },
  themeButton: {
    backgroundColor: "#2e7d32",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: "center",
  },
  themeButtonPressed: { opacity: 0.7 },
  themeButtonText: { color: "#ffffff", fontSize: 17, fontWeight: "600" },
});
