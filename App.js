import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./routes/Routes";
import { useFonts } from "expo-font";

export default function App() {
  let [fontsLoaded] = useFonts({
    Fredericka: require("./assets/fonts/FrederickatheGreat-Regular.ttf"),
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
