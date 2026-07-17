import { View, Text, Pressable, Button } from "react-native";
import { Link } from "expo-router";
import { useTheme } from "../../context/ThmeContext";

export default function Home() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isDarkMode ? "#000" : "#ffff",
      }}
    >
      <Text style={{color: isDarkMode ? "#fff" : "#000"}}>Home Tab</Text>
      <Link href="/(settings)/general" asChild>
        <Pressable>
          <Text style={{ color: "blue", marginTop: 10 }}>Go to Settings</Text>
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
