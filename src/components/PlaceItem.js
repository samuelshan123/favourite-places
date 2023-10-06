import { Pressable, View, Image, Text, StyleSheet } from "react-native";
import { colors } from "../constants/colors";

function PlaceItem({ place, onSelect }) {
  console.log('====================================');
  console.log(place);
  console.log('====================================');
  return (
    <Pressable style={styles.item} onPress={onSelect}>
      <Image style={styles.imagePreview} source={{ uri: place.item.imageUrl }} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.item.title}</Text>
        <Text style={styles.address}>{place.item.address}</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
     imagePreview:{
      height:110,
      flex:1,
      borderTopLeftRadius:4,
      borderBottomLeftRadius:4
     },
     item:{
      flexDirection:'row',
      alignItems:'flex-start',
      borderRadius:6,
      marginVertical:12,
      backgroundColor:'white',
      elevation:3,
      height:110,
      shadowColor:'black',
      shadowOpacity:0.15,
      shadowRadius:2,
      shadowOffset:{width:1,h:1}
     },
     info:{
      flex:2,
      padding:12
     },
     title:{
      fontWeight:'bold',
      color:colors.primary,
      fontSize:16
     },
    address:{
      fontSize:12,
      // color:colors.primary
    },
     pressed:{
      opacity:0.9
     }
})
