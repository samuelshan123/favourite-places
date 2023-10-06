import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { colors } from "../constants/colors";
import { StyleSheet } from "react-native";



function BtnOutline({onPress,children,icon}){
  return(
    <Pressable style={({pressed})=>[styles.button,pressed && styles.pressed]} onPress={onPress}>
        <Ionicons style={styles.icon} name={icon} size={18} color={colors.primary} />
        <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

export default BtnOutline;

const styles = StyleSheet.create({
    button:{
        paddingHorizontal:12,
        paddingVertical:6,
        margin:4,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:colors.primary
    },
    pressed:{
        opacity:0.7
    },
    icon:{
        marginRight:6
    },
    text:{
        color:colors.primary
    }
})