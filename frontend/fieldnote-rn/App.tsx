import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";

export default function App() {
  const notes = [
    {
      id: "1",
      title: "Trailhead observation",
      body: "New signage at the kiosk.",
    },
    { id: "2", title: "Wildlife", body: "Saw a red fox near the meadow." },
    { id: "3", title: "Weather", body: "Sunny with scattered clouds." },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "medium",
    color: "#333",
  },

  body: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
  },

  card: {
    backgroundColor: "#f7efef",
    padding: 20,
    margin: "4%",
    borderRadius: 8,
    width: "85%",
  },

  sViewContent: {
    padding: 16,
  },

  scrollView: {
    height: 200,
    backgroundColor: "lightgray",
  },
});
