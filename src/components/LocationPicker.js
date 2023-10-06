import { StyleSheet, View, Alert, Image, Text } from "react-native";
import BtnOutline from "../ui/BtnOutline";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useEffect, useState } from "react";
import  {getMapPreview , getAddress } from "../util/location";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";

function LocationPicker({onPickLocation}) {
  const isFocused = useIsFocused();

  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  const [pickedLocation, setPickedLocation] = useState();
  const navigation = useNavigation();
  const route = useRoute();


  useEffect(()=>{
    if(isFocused && route.params){
      const mapPickedLocation = route.params && {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };    
      setPickedLocation(mapPickedLocation);
    }

  },[route,isFocused]);

  useEffect(()=>{

    async function handleLocation(){
    if(pickedLocation){
   const address = await getAddress(pickedLocation.lat,pickedLocation.lng)
    onPickLocation({...pickedLocation,address:address});
    }
  }

  handleLocation();
  },[pickedLocation,onPickLocation])

  async function verifyPermissions() {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permission",
        "You need to give permission to use this app"
      );
      return false;
    }
    return true;
  }

  async function getLocation() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    console.log(location);
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }
  function pickLocation() {
    navigation.navigate("Map");
  }

  let mapPreview = (
    <Text style={styles.altInnerText}>No locations picked yet</Text>
  );

  if (pickedLocation) {
    mapPreview = (
      <Image
        style={styles.imagePreview}
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lang) }}
      />
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.mapPreview}>{mapPreview}</View>
      <View style={styles.action}>
        <BtnOutline icon="location" onPress={getLocation}>
          Locate User
        </BtnOutline>
        <BtnOutline icon="map" onPress={pickLocation}>
          Pick Location
        </BtnOutline>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  mapPreview: {
    height: 200,
    backgroundColor: "white",
    borderRadius: 4,
    width: "100%",
    marginTop: 14,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 4,
  },
  altInnerText: {
    textAlign: "center",
    color: "white",
  },
});
