import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainMenu from "../components/MainMenu";
import Numpad from "../components/Numpad";
import {
  AdditionMenu,
  SubtractionGame,
  MultiplicationGame,
  DivisionGame,
  RandomGame,
  AdvancedSettingsAddition,
} from "../components/gameModes";
import { Image, Pressable, View, StyleSheet } from "react-native";
// import arrow from '../assets/img/arrow.png'
import help from '../assets/img/help.png'
import { useState, useEffect } from "react";

const Stack = createNativeStackNavigator();

function ArrowButton() {

  // const [about, setAbout] = useState(false)
  // const handleHelpClick = () => {
  //   setAbout(!about)
  //   console.log(about)
  // }

  // useEffect(handleHelpClick, [])

  return (
    <>
    {/* {about ? <View style={styles.overlayContainer}>
  <View style={styles.overlay}/></View> : <View></View>} */}
    <Pressable onPress={() => {}}>
      <Image
      style={{ width: 30, height: 30 }}
      source={help}
    />
    </Pressable>
    </>
  );
}

const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "silver",
        },
        headerTitle: (props) => <ArrowButton />,
        // headerLeft: () => null,
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={MainMenu}
        options={{ title: "App Name" }}
      />
      <Stack.Screen name="AdditionMenu" component={AdditionMenu} />
      <Stack.Screen
        name="AdvancedSettingsAddition"
        component={AdvancedSettingsAddition}
      />
      <Stack.Screen name="SubtractionGame" component={SubtractionGame} />
      <Stack.Screen name="MultiplicationGame" component={MultiplicationGame} />
      <Stack.Screen name="DivisionGame" component={DivisionGame} />
      <Stack.Screen name="RandomGame" component={RandomGame} />
    </Stack.Navigator>
  );
};

// const styles = StyleSheet({ // TODO: check why this doesn't work
//   // helpImg: { // 
//   //   height: 30,
//   //   width: 30,
//   // },
//   overlayContainer: {
//     display: 'flex',
//     zIndex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     height: 100,
//     width: 100,
//   },
//   overlay: {
//     position: 'absolute',
//     borderRadius: 5,
//     zIndex: 10,
//     width: 80,
//     height: 97,
//     backgroundColor: 'red',
//     opacity: 1,
//   },
// })

export default Navigation;
