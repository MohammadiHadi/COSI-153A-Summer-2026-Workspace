import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NotesProvider } from "../context/NotesContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

function RootNavigator() {
  const { isDarkMode } = useTheme();
  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: isDarkMode ? "#121212" : "#ffffff" },
          headerTintColor: isDarkMode ? "#ffffff" : "#222222",
          contentStyle: { backgroundColor: isDarkMode ? "#121212" : "#ffffff" },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="note/new" options={{ title: "New Note", headerBackTitle:"Notes", presentation:"modal"}} />
        <Stack.Screen
          name="note/[id]"
          options={{ title: "Note Details", headerBackTitle:"Notes"}}
        />
      </Stack>
    </>
  );
}
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NotesProvider>
          <RootNavigator />
        </NotesProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
