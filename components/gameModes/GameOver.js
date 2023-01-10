import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ImageBackground,
  Dimensions,
} from "react-native";
import selectBG from "../../assets/img/selectBG.jpg";
const screen = Dimensions.get("screen");
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
}){
  const [message, setMessage] = useState("");
  const [perfectScoresCount, setPerfectScoresCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const perfectScoreAllocation = {
    10: 1,
    20: 2,
    30: 5,
  };

  const [scoreSaved, setScoreSaved] = useState(false)
  //AsyncStorage of High Scores notes:
  //have problems page pass in gameOver screen operation, if timeAtt, and timeAmt
  //Store objects with keys that look like operation_timeAmt so addition_10 or addition_30
  //Do not store custom timeAtt amounts.
  //object will store only 3 scores ie addition_10 = {highScore : 10, midScore : 7, lowScore : 6}
  //Check to see if timeAtt mode and not custom settings. If timeAtt mode pull scores.
  //Correctly store the new score in the object or don't store at all if not a new high score.
  //Write that object to the database overwriting previous object.

  const callReadAndWriteTimAttHighScores = async (score)=>{
    let previousHighScores = await AsyncStorage.getItem(operation+'_'+timeAmt)
    let highScores = previousHighScores ? JSON.parse(previousHighScores) : {highScore:0,midScore:0,lowScore:0}
          if(score>highScores.highScore){
          newHighs = {
              lowScore:highScores.midScore,
              midScore:highScores.highScore,
              highScore:score,
          }
          const jsonValue = JSON.stringify(newHighs);
          await AsyncStorage.setItem(operation+'_'+timeAmt, jsonValue);
      }
      else if(score>highScores.midScore){
          const newHighs ={
              highScore:highScores.highScore,
              lowScore:highScores.midScore,
              midScore:score,
          }
          const jsonValue = JSON.stringify(newHighs);
          await AsyncStorage.setItem(operation+'_'+timeAmt, jsonValue);
      }
      else if(score>highScores.lowScore){
          const newHighs = {
              ...highScores,
              lowScore:score
          }
          const jsonValue = JSON.stringify(newHighs);
          await AsyncStorage.setItem(operation+'_'+timeAmt, jsonValue);
      }

  }
  const storePerfectScores = async () => {
    try {
      const perfectScoresCount = await AsyncStorage.getItem(operation);
      const setVal = (questionAmount) =>
        perfectScoresCount === null
          ? perfectScoreAllocation[questionAmount]
          : +perfectScoresCount + perfectScoreAllocation[questionAmount];
      const jsonValue = JSON.stringify(setVal(questionAmount));
      await AsyncStorage.setItem(operation, jsonValue);
    } catch (e) {
      console.log("Error at storePerfectScores: ", e);
    }
  };
  useEffect(() => {
    const accuracy = Math.floor((score / questionAmount) * 100);
    if(timeAtt && !custom){
      callReadAndWriteTimAttHighScores(score)
    }
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
