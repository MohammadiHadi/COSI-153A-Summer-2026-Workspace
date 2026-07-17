import { View, Text} from "react-native";
import { useTheme } from "../../context/ThmeContext";

export default function Home(){
    const { isDarkMode } = useTheme();
    const bgColor = isDarkMode ? "#000" : "#fff";
    const textColor = isDarkMode ? "#fff" : "#000";

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems:"center", backgroundColor: bgColor}}>
            <Text style={{color: textColor}}>👤 Profile Tab</Text>
        </View>
    )
}