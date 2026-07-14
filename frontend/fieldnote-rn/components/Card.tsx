import { View, StyleSheet } from "react-native";

type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f7efef",
    padding: 20,
    marginBottom: 16,
    borderRadius: 8,
    width: "100%",
  },
});
