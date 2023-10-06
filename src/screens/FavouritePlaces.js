import { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {MaterialIcons} from '@expo/vector-icons';
import PlacesList from "../components/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";


function FavouritePlaces({navigation,route}){


  useLayoutEffect(()=>{
    navigation.setOptions({
        headerRight:()=>{
            return (<MaterialIcons name='add-location-alt' size={18} color='white' onPress={addToFavouritLocation} />)
        }
    })
  },[navigation,addToFavouritLocation]);

  function addToFavouritLocation(){
   navigation.navigate('Add Place');
  }

  const [loadedPlaces,setLoadedPlaces] = useState([]);
 
  const isFocused = useIsFocused();

  useEffect(()=>{

    async function loadPlaces(){
    const places =  await fetchPlaces();
      setLoadedPlaces(places);
    }
    
    if(isFocused){
      loadPlaces();
      // setLoadedPlaces((currentPlaces)=>[...currentPlaces,route.params.place])
    }
  },[isFocused])


    return(
      <PlacesList places={loadedPlaces}/>
    )
}

export default FavouritePlaces;

const styles = StyleSheet.create({
    
})