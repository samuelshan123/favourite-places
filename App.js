import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigations from './Navigations';
import { useEffect, useState } from 'react';
import { initDatabase } from './src/util/database';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  
  const [dbInitialized,setDbInitialized] = useState();

  useEffect(()=>{
    initDatabase().then(()=>{
      setDbInitialized(true);
    }).catch((err)=>{
      console.error(err);
    })
  },[]);

  if(!dbInitialized){
    SplashScreen.preventAutoHideAsync();
  }
    else {
      SplashScreen.hideAsync();
    }
  
  
  return (
    <>
      <StatusBar style="light" />
      <Navigations></Navigations>
      </>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
