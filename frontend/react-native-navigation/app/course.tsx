import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function CourseScreen(){
    const {name} = useLocalSearchParams<{name?: string}>()

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Hello, Class!</Text>
            <Text style={styles.header}>{name ? `Welcome to ${name}!` : ""}</Text>
        </View>
    );
}

const styles= StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
    },

    header: {
        fontSize: 20,
        fontWeight: "400"
    }
})