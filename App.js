import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./routes/Routes";
import { useFonts } from "expo-font";
import VoicePlayground from "./components/VoicePlayground";

export default function App() {
  let [fontsLoaded] = useFonts({
    Fredericka: require("./assets/fonts/FrederickatheGreat-Regular.ttf"),
  });
  return (
    <View>
      <VoicePlayground/>
    </View>
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
