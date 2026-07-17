import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTheme } from "../../context/ThemeContext";
export default function TabsLayout() {
  const { isDarkMode } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: isDarkMode ? "#121212" : "#ffffff" },
        headerTintColor: isDarkMode ? "#ffffff" : "#222222",
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#181818" : "#f2f2f2",
          borderTopColor: isDarkMode ? "#333333" : "#dddddd",
        },
        tabBarActiveTintColor: isDarkMode ? "#81c784" : "#2e7d32",
        tabBarInactiveTintColor: isDarkMode ? "#999999" : "#666666",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Notes",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "document-text" : "document-text-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
