import { launchCameraAsync, useCameraPermissions ,PermissionStatus } from "expo-image-picker";
import { useState } from "react";
import { StyleSheet, View, Text , Alert, Image } from "react-native";
import BtnOutline from "../ui/BtnOutline";

function ImagePicker({onTakeImage}) {
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  const [pickedImage,setPickedImage] = useState("");
  async function verifyPermission() {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permission",
        "You need to give permission to use this app"
      );
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();

    if(!hasPermission){
        return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  }

  let imagePreview = <Text style={styles.altInnerText}>No image taken yet</Text>
 if(pickedImage){
    imagePreview = <Image style={styles.imagePreview} source={{uri:pickedImage}} />
 }


  return (
    <View style={styles.container}>
           <View style={styles.altContiner}>
            {imagePreview}
        </View>
        <BtnOutline icon="camera" onPress={takeImageHandler} >Take image</BtnOutline>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20
    },
  altContiner: {
    height: 200,
    backgroundColor: "white",
    borderRadius: 4,
    width: "100%",
    marginTop: 14,
    marginBottom: 10,
    justifyContent:'center',
    backgroundColor:'grey'
  },
  imagePreview:{
   width:'100%',
   height:200,
   borderRadius:4
  },

  altInnerText: {
    textAlign: "center",
    color:'white'
  },
});
