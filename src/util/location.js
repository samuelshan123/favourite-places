
const API_KEY = ''
export function getMapPreview(lat,lng){
  const imagePreview =`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x300&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${API_KEY}`;
  return imagePreview;
}

export async function getAddress(lat,lng){
  const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`
 const response = await fetch(url);
 
 if(!response.ok){
  throw new Error("Failed to fetch address");  
 }
 const data =await response.json();
 const address = data.display_name;
 console.log(address);
 return address;

}

