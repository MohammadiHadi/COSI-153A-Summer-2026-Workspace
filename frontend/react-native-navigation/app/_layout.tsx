import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#15b740" },
            headerTintColor: "#0e0101",
            headerTitleStyle: { fontWeight: "semibold" },
          }}
        >
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="course" options={{ title: "Course" }} />
          <Stack.Screen name="profile" options={{ title: "Profile" }} />
          <Stack.Screen name="users/[id]" options={{ title: "User Profile" }} />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
