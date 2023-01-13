import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import Routes from "./routes/Routes";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";

export default function App() {
  let [fontsLoaded] = useFonts({
    Fredericka: require("./assets/fonts/FrederickatheGreat-Regular.ttf"),
    DancingScript: require('./assets/fonts/DancingScript-Regular.ttf'),
    MavenPro: require('./assets/fonts/MavenPro-Regular.ttf'),
    MartianMono: require('./assets/fonts/MartianMono-Regular.ttf'),
    Azeret: require('./assets/fonts/AzeretMono-Regular.ttf')
  });
  enableScreens(false)
  
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
