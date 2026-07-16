import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello, World!</Text>
      <Link href="/course" asChild>
        <Pressable style={styles.pressable}>
          <Text>Go to Course</Text>
        </Pressable>
      </Link>
      <Link href={{ pathname: "/profile" }}>Go to Profile</Link>

      <Link href={{ pathname: "/users/[id]", params: { id: 88 } }} asChild>
        <Pressable style={styles.pressable}>
          <Text>View usere 88</Text>
        </Pressable>
      </Link>

      <Link href={{ pathname: "/users/[id]", params: { id: 98, name: "Alice" } }} asChild>
        <Pressable style={styles.pressable}>
          <Text>View usere 98 - Alice</Text>
        </Pressable>
      </Link>
      <Link href={{ pathname: "/course", params: { name: "CS153A" } }} asChild>
        <Pressable style={styles.pressable}>
          <Text>Go to Course (with name)</Text>
        </Pressable>
      </Link>

      {/* <Link href="/course?name=CS153A" asChild>
        <Pressable style={styles.pressable}>
          <Text>Go to Course (with name)</Text>
        </Pressable>
      </Link> */}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },

  header: {
    fontSize: 20,
    fontWeight: "400",
  },

  pressable: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
});
