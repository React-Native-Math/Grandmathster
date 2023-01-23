import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainMenu from "../components/MainMenu";
import {
  AdditionMenu,
  SubtractionMenu,
  MultiplicationGame,
  DivisionGame,
  RandomMenu,
  AdvancedSettingsAddition,
  AdvancedSettingsSubtraction,
  GameOver,
} from "../components/gameModes";
import About from '../components/About'
import {
  Image,
  Pressable,
  Modal,
  View,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import help from "../assets/img/help.png";
import { useState} from "react";
import Scores from '../components/Scores'

const Stack = createNativeStackNavigator();
const screen = Dimensions.get("screen");

function ArrowButton() {
  const [modalVisible, setModalVisible] = useState(false);

  const modalHandler = () => setModalVisible(!modalVisible);

  return (
    <>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <About />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Done</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.helpIconContainer}>
        <Pressable onPress={modalHandler}>
          <Image style={styles.helpIcon} source={help} />
        </Pressable>
      </View>
    </>
  );
}

const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: (props) => <ArrowButton />,
        headerTintColor: "#B8100F",
        headerStyle: { backgroundColor: 'black', height: 45},
        headerTitleStyle: {
          color: "white",
        },
        // contentStyle: {
        //   borderTopColor: 'red',
        //   borderTopWidth: 3,
        // },
      }}
    >
      <Stack.Screen
        name="Home"
        component={MainMenu}
        options={{ title: "Grandmathster"}}
      />
      <Stack.Screen name="AdditionMenu" component={AdditionMenu} />
      <Stack.Screen name="AdvancedSettingsAddition" component={AdvancedSettingsAddition}/>
      <Stack.Screen name="SubtractionMenu" component={SubtractionMenu} />
      <Stack.Screen name='AdvancedSettingsSubtraction' component={AdvancedSettingsSubtraction}/>
      <Stack.Screen name="MultiplicationGame" component={MultiplicationGame} />
      <Stack.Screen name="DivisionGame" component={DivisionGame} />
      <Stack.Screen name="GameOver" component={GameOver} />
      <Stack.Screen name="Scores" component={Scores} />
      <Stack.Screen name='RandomMenu' component={RandomMenu}/>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  helpIconContainer: {
    position: 'absolute',
    left: 0,
    width: screen.width,
    height: 30,
  },
  helpIcon: {
    position: 'absolute',
    width: 30,
    height: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    height: screen.height * 0.85,
    width: screen.width * 0.9,
    backgroundColor: "black",
    borderRadius: 20,
    borderColor: 'red',
    borderWidth: 2,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "black",
    borderColor: "#B8100F",
    borderWidth: 3,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Navigation;
