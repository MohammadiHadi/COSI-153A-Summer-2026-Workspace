import { Tabs } from "expo-router";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThmeContext";

export default function TabsLayout() {
  const { isDarkMode } = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: isDarkMode ? "#111" : "#eee" },
        tabBarActiveTintColor: isDarkMode ? "#fff" : "#000",
        tabBarInactiveTintColor: isDarkMode ? "#999" : "#777",
        headerStyle: { backgroundColor: isDarkMode ? "#000" : "#fff" },
        headerTitleStyle: { color: isDarkMode ? "#fff" : "#000" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? "search" : "search-off"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome
              name={focused ? "user" : "user-o"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
