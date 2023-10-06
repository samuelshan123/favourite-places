import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import FavouritePlaces from "./src/screens/FavouritePlaces";
import AddPlace from "./src/screens/AddPlace";
import { colors } from "./src/constants/colors";
import Map from "./src/screens/Map";


function Navigations(){
    const Stack = createNativeStackNavigator();

    return(
        <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle:{
            backgroundColor:colors.primary, 
          },
          headerTintColor: "#fff",
        }}>
            <Stack.Screen name='Favourite Places' component={FavouritePlaces}/>
            <Stack.Screen name='Add Place' component={AddPlace}/>
            <Stack.Screen name='Map' component={Map}/>

        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default Navigations;