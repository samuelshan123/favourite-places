import { useCallback, useState } from "react";
import {  ScrollView, StyleSheet, TextInput, View } from "react-native";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import { Place } from "../../models/places";

function AddPlaceForm({onCreatePlace}){

    const [title,setTitle] =useState("");
    const [image,setImage] =useState("");
    const [pickedLocation,setPickedLocation] =useState("");
    
    function titleHandler(title){
      setTitle(title);
    }
    function takeImageHandler(imageUri){
      setImage(imageUri);
    }
    const pickLocationHandler = useCallback((location)=>{
      setPickedLocation(location);
    },[])


    function savePlace(){
      const placeData = new Place(title,image,pickedLocation.address,pickedLocation)
      onCreatePlace(placeData);
    }

    return(
      <ScrollView>
          <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Place name" onChangeText={titleHandler} value={title}></TextInput>
        </View>
        <ImagePicker onTakeImage={takeImageHandler}/>
        <LocationPicker onPickLocation={pickLocationHandler}/>
        <Button onPress={savePlace}>Add Place</Button>
      </ScrollView>
    )
}

export default AddPlaceForm;


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        margin:20
    },
    input:{
      borderColor:'#f4511e',
      borderWidth:2,
      borderRadius:4,
      padding:6,
      width:'100%'
    }
})