import { StyleSheet, Image } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import Routes from "./routes/Routes";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import {Asset} from 'expo-asset';
import * as ScreenOrientation from 'expo-screen-orientation';

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
}

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
    changeScreenOrientation()
    const imageAssets = cacheImages([require('./assets/img/redSwipe.png'), require('./assets/img/badgeOutline.png'), require('./assets/img/badgeAdd.png'), require('./assets/img/badgeDiv.png'), require('./assets/img/badgeMul.png'), require('./assets/img/badgeRan.png'),require('./assets/img/badgeSub.png'), require('./assets/img/cog.png'), require('./assets/img/selectBG.jpg'), require('./assets/img/help.png'),  require('./assets/img/modalPNG.png')])
  },[])
  
  const navigationTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "black",
    },
  };
  return (
    <NavigationContainer theme = {navigationTheme}>
      <Routes/>
    </NavigationContainer>

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
