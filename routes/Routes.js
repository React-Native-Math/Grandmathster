import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainMenu from "../components/MainMenu";
import {
  AdditionMenu,
  SubtractionGame,
  MultiplicationGame,
  DivisionGame,
  RandomGame,
} from "../components/gameModes";
import { Image } from 'react-native'
import arrow from '../assets/img/arrow.png'

const Stack = createNativeStackNavigator();

function ArrowButton() {
  return (
    <Image
      style={{ width: 30, height: 30 }}
      source={arrow}
    />
  );
}

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MainMenu}
        options={{ headerTitle: (props) => <ArrowButton /> }}
        // options={{ title: "App Name" }}
      />
      <Stack.Screen name="AdditionGame" component={AdditionMenu} />
      <Stack.Screen name="SubtractionGame" component={SubtractionGame} />
      <Stack.Screen name="MultiplicationGame" component={MultiplicationGame} />
      <Stack.Screen name="DivisionGame" component={DivisionGame} />
      <Stack.Screen name="RandomGame" component={RandomGame} />
    </Stack.Navigator>
  );
};

export default Navigation;
