import AddPlaceForm from "../components/AddPlaceForm";
import { insertPlace } from "../util/database";


function AddPlace({navigation}){
    

   async function createPlaceHandler(place){
      // console.log(place);
      await insertPlace(place);
      navigation.navigate('Favourite Places');
    }
    return(
     <AddPlaceForm onCreatePlace={createPlaceHandler}/>
    )
}

export default AddPlace;
