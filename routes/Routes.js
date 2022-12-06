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
import { Image, Pressable } from 'react-native'
import arrow from '../assets/img/arrow.png'

const Stack = createNativeStackNavigator();

function ArrowButton() {
  return (
    <Pressable onPress={() => console.log('clicked')}>
    <Image
      style={{ width: 30, height: 30 }}
      source={arrow}
    />
    </Pressable>
  );
}

const Navigation = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: 'silver',
      },
      headerTitle: (props) => <ArrowButton />,
      // headerLeft: () => null,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
    >
      <Stack.Screen
        name="Home"
        component={MainMenu}
        options={{ title: "App Name" }}
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
