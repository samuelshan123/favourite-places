import { Ionicons } from '@expo/vector-icons';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView,{Marker} from 'react-native-maps'

function Map({navigation}){

    const [selectedLocation,setSelectedLocation] = useState();
    const region = {
        latitude:37.78,
        longitude:-122.43,
        latitudeDelta:0.0922,
        longitudeDelta:0.0421
    }

    function selectLocationHandler(event){
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({lat:lat,lng:lng})
    }

    const savePickedLocation= useCallback(()=>{
        if(!selectedLocation){
            Alert.alert("No location picked",
            "You have a picked location to continue");
            return;
        }
        
        navigation.navigate('Add Place',{pickedLat:selectedLocation.lat,
            pickedLng:selectedLocation.lng});
    },[navigation,selectedLocation])
   

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:({tintColor})=><Ionicons name='save' size={18} color={tintColor} onPress={savePickedLocation}/>
        })
    },[navigation,savePickedLocation])

  return(
    <MapView style ={styles.map} initialRegion={region} onPress={selectLocationHandler}>
        {selectedLocation && <Marker title='Picked Location' coordinate={{latitude:selectedLocation.lat,longitude:selectedLocation.lng}}/>}
    </MapView>
  )
}

export default Map;

const styles = StyleSheet.create({
    map:{
        flex:1
    }
})