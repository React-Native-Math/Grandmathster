import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainMenu from "../components/MainMenu";
import AdditionGame from "../components/gameModes/AdditionGame";
import SubtractionGame from "../components/gameModes/SubtractionGame";
import MultiplicationGame from "../components/gameModes/MultiplicationGame";
import DivisionGame from "../components/gameModes/DivisionGame";
import RandomGame from "../components/gameModes/RandomGame";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MainMenu}
        options={{ title: "App Name" }}
      />
      <Stack.Screen name="AdditionGame" component={AdditionGame} />
      <Stack.Screen name="SubtractionGame" component={SubtractionGame} />
      <Stack.Screen name="MultiplicationGame" component={MultiplicationGame} />
      <Stack.Screen name="DivisionGame" component={DivisionGame} />
      <Stack.Screen name="RandomGame" component={RandomGame} />
    </Stack.Navigator>
  );
};

export default Navigation;
