import { Link } from "expo-router";
import { View, Text, Pressable, Button } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function Home() {
    const { isDarkMode, toggleTheme } = useTheme();
const bg = isDarkMode ? "#000" : "#fff";
const text = isDarkMode ? "#fff" : "#000";
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: bg,
 }}>
      <Text style={{color: text}}>🏠 Home Tab</Text>
      <Link href="/(settings)/general" asChild>
        <Pressable>
          <Text style={{ color: text, marginTop: 10 }}>Go to Settings</Text>
        </Pressable>
      </Link>
            <Text style={{ color: isDarkMode ? "#fff" : "#000", fontSize: 20 }}>
        {isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </Text>
      <Button
        title="Toggle Theme"
        onPress={toggleTheme}
        color={isDarkMode ? "#888" : "#007AFF"}
      />

    </View>
  );
}
