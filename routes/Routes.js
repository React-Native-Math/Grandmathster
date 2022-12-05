import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Home from '../components/MainMenu'
import { View, Text, Button } from "react-native";
import MainMenu from "../components/MainMenu";
import AdditionGame from "../components/gameModes/AdditionGame";
import SubtractionGame from "../components/gameModes/SubtractionGame"
import MultiplicationGame from "../components/gameModes/MultiplicationGame";
import DivisionGame from "../components/gameModes/DivisionGame";
import RandomGame from "../components/gameModes/RandomGame";


// function HomeScreen({navigation}) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Home Screen</Text>
//       <Button
//       title="Go to"
//       onPress={() => navigation.navigate('Details')} />
//     </View>
//   );
// }

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();
// const menuItems = [
//   {Addition: AdditionGame},
//   {Subtraction: SubtractionGame},
//   {Multiplication: MultiplicationGame},
//   {Division: DivisionGame},
//   {Random: RandomGame},
// ];
// const menuItems = [
//   'Addition',
//   'Subtraction',
//   'Multiplication',
//   'Division',
//   'Random',
// ];

const Navigation = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MainMenu} options={{ title: 'App Name'}} />
        <Stack.Screen name="AdditionGame" component={AdditionGame} />
        <Stack.Screen name="SubtractionGame" component={SubtractionGame} />
        <Stack.Screen name="MultiplicationGame" component={MultiplicationGame} />
        <Stack.Screen name="DivisionGame" component={DivisionGame} />

      </Stack.Navigator>
  );
};

export default Navigation;
