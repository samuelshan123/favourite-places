import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../constants/colors";


function Button({onPress,children}){

    return (
        // <Pressable style={(pressed)=>[styles.button, pressed && styles.pressed]} onPress={onPress}>
        <Pressable style={(pressed)=>[styles.button]} onPress={onPress}>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}

export default Button;

const styles = StyleSheet.create({
    button:{
        paddingHorizontal:12,
        paddingVertical:6,
        margin:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        // borderWidth:1,
        // borderColor:colors.primary
        backgroundColor:colors.primary,
        borderRadius:4
    },
    pressed:{
        opacity:0.7
    },
    text:{
        color:'white',
        fontWeight:'bold'
    }
})