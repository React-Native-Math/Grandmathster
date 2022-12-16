import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./routes/Routes";
import { useFonts } from "expo-font";
import AdditionProblems from "./components/gameModes/AdditionProblems";

export default function App() {
  let [fontsLoaded] = useFonts({
    Fredericka: require("./assets/fonts/FrederickatheGreat-Regular.ttf"),
    DancingScript: require('./assets/fonts/DancingScript-Regular.ttf'),
    MavenPro: require('./assets/fonts/MavenPro-Regular.ttf'),
    MartianMono: require('./assets/fonts/MartianMono-Regular.ttf'),
    Azeret: require('./assets/fonts/AzeretMono-Regular.ttf')
  });
  return (
    <NavigationContainer>
      {/* <View style={styles.container}> */}
      {/* // <StatusBar style="auto" /> */}
      {/* <> */}
      <Routes />
      {/* </> */}
      {/* </View> */}
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
