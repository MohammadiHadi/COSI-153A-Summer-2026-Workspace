import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen(){
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome to Profile Page!</Text>
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