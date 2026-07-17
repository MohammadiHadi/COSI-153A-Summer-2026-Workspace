import { StyleSheet, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
type CardProps = { children: React.ReactNode };
export default function Card({ children }: CardProps) {
  const { isDarkMode } = useTheme();
  return (
    <View
      style={[styles.card, isDarkMode ? styles.darkCard : styles.lightCard]}
    >
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  card: { width: "100%", padding: 20, marginBottom: 16, borderRadius: 8 },
  lightCard: { backgroundColor: "#f7efef" },
  darkCard: {
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#333333",
  },
});
