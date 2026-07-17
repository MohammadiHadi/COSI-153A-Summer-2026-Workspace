import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThmeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(settings)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
