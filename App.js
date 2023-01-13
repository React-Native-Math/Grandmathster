import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import Routes from "./routes/Routes";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { useEffect } from "react";
import {Asset} from 'expo-asset'

export default function App() {
  let [fontsLoaded] = useFonts({
    Fredericka: require("./assets/fonts/FrederickatheGreat-Regular.ttf"),
    DancingScript: require('./assets/fonts/DancingScript-Regular.ttf'),
    MavenPro: require('./assets/fonts/MavenPro-Regular.ttf'),
    MartianMono: require('./assets/fonts/MartianMono-Regular.ttf'),
    Azeret: require('./assets/fonts/AzeretMono-Regular.ttf')
  });
 
  function cacheImages(images) {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  useEffect(()=>{
    const imageAssets = cacheImages([require('./assets/img/badgeAdd.png'), require('./assets/img/badgeDiv.png'), require('./assets/img/badgeMul.png'), require('./assets/img/badgeRan.png'),require('./assets/img/badgeSub.png'), require('./assets/img/cog.png'), require('./assets/img/selectBG.jpg'), require('./assets/img/help.png')])
  },[])
  
  const navigationTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "black",
    },
  };
  return (
    <GestureHandlerRootView style={{flex:1, backgroundColor:'black'}}>
    <NavigationContainer theme = {navigationTheme}>

      <Routes />
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
