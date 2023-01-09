import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ImageBackground,
  Dimensions,
} from "react-native";
// import schoolBackground from "../../assets/img/schoolBackground.png";
import selectBG from "../../assets/img/selectBG.jpg";
const screen = Dimensions.get("screen");
// import { useGlobalState } from '../../store/store'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function GameOver({
  navigation,
  score,
  questionAmount,
  difficulty,
  operation,
  timeAtt,
  timeAmt,
  custom,
}) {
  const [message, setMessage] = useState("");
  const [perfectScoresCount, setPerfectScoresCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const storePerfectScores = async () => {
    try {
      const perfectScoresCount = await AsyncStorage.getItem(
        operation
      );
      let val;
      if (questionAmount === 10) {
        console.log('hit10')
        val = perfectScoresCount === null ? 1 : +perfectScoresCount + 1;
      } else if (questionAmount === 20) {
        console.log('hit20')
        val = perfectScoresCount === null ? 2 : +perfectScoresCount + 2;
      } else {
        console.log('hit30')
        val = perfectScoresCount === null ? 5 : +perfectScoresCount + 5;
      }
    //   const val = perfectScoresCount === null ? 1 : +perfectScoresCount + 1;
      const jsonValue = JSON.stringify(val);
      await AsyncStorage.setItem(operation, jsonValue);
      console.log(
        "jsonValue>>",
        jsonValue,
        "multiget>>",
        await AsyncStorage.multiGet(["addition_3", "addition_10", "addition"])
      );
    } catch (e) {
      console.log("Error at storePerfectScores: ", e);
    }
  };
  useEffect(() => {
    const accuracy = Math.floor((score / questionAmount) * 100);
    if (accuracy === 100) {
      setMessage(
        `Congratulations you are the Grand Mathster on ${difficulty} mode!`
      );
      storePerfectScores();
    } else if (accuracy > 90)
      setMessage(
        `You are a Mathster on ${difficulty} mode! Keep practicing to become the Grand Mathster!`
      );
    else if (accuracy > 75)
      setMessage(
        `You are a Novice on ${difficulty} mode! Keep practicing to become a Mathster!`
      );
    else if (accuracy > 50) setMessage("Keep Practicing!");
    else if (accuracy > 0) setMessage("Please review your math facts");
    else if (accuracy === 0) setMessage("Stop Guessing");
  }, [loading]);
  return (
    <ImageBackground source={selectBG} style={styles.background}>
      <View style={styles.outerContainer}>
        <Text style={styles.menuText}>Statistics</Text>
        <Text style={styles.menuText}>
          Total Score: {score} out of {questionAmount}{" "}
        </Text>
        <Text style={styles.menuText}>
          Accuracy: {Math.floor((score / questionAmount) * 100)}%
        </Text>
        <View style={styles.messageContainer}>
          <Text style={styles.menuText}>{message}</Text>
        </View>
        <Pressable
          style={styles.menuButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.menuText}>Main Menu</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: screen.width,
    height: screen.height * 0.89,
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    textAlign: "center",
    marginTop: 5,
  },
  homeButton: {
    borderRadius: 50,
    padding: 5,
    margin: 10,
    width: 125,
    height: 40,
    backgroundColor: "#006b3d",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menuButton: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#b8100f",
    padding: 5,
    margin: 5,
    width: 150,
    height: 60,
    color: "white",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menuText: {
    color: "white",
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "MavenPro",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "MavenPro",
    justifyContent: "center",
    alignItems: "center",
  },
  outerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: screen.width * 0.8,
  },
});
