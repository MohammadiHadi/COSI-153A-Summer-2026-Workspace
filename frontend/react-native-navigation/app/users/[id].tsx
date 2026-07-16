import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ProfileScreen(){
    const {id, name} = useLocalSearchParams<{id: string, name?: string}>();
    return (
        <View style={styles.container}>
            <Text style={styles.header}>User #{id} {name? `name: ${name}` : ""}</Text>
        </View>
    )
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