import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ImageBackground,
  Dimensions,
} from "react-native";
import selectBG from "../../assets/img/selectBG.jpg";
const screen = Dimensions.get("screen");
import AsyncStorage from "@react-native-async-storage/async-storage";
import badgeOutline from "../../assets/img/badgeOutline.png";
import redSwipe from "../../assets/img/redSwipe.png";

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
  const perfectScoreAllocation = {
    10: 1,
    20: 2,
    30: 5,
  };
  const [showBadge, setShowBadge] = useState(false);

  const storePerfectScores = async () => {
    try {
      const perfectScoresCount = await AsyncStorage.getItem(operation);
      const setVal = (questionAmount) =>
        perfectScoresCount === null
          ? perfectScoreAllocation[questionAmount]
          : +perfectScoresCount + perfectScoreAllocation[questionAmount];
      const jsonValue = JSON.stringify(setVal(questionAmount));
      await AsyncStorage.setItem(operation, jsonValue);
      console.log(
        "jsonValue>>",
        jsonValue,
        "getItem>>",
        await AsyncStorage.getItem("addition")
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
      setShowBadge(true);
    } else if (accuracy > 90)
      setMessage(
        `You are a Mathster on ${difficulty} mode! Keep practicing to become the Grand Mathster!`
      );
    else if (accuracy > 75)
      setMessage(
        `You are a Novice on ${difficulty} mode! Keep practicing to become a Mathster!`
      );
    else if (accuracy > 50)
      setMessage(
        "Good effort. Keep working hard and you can become a grandmathster soon!"
      );
    else if (accuracy > 0) setMessage("Please review your math facts");
    else if (accuracy === 0) setMessage("Stop Guessing");
  }, [loading]);
  return (
    <ImageBackground source={selectBG} style={styles.background}>
      <View style={styles.outerContainer}>
        {showBadge ? (
          <Pressable onPress={() => navigation.navigate("Scores")}>
            <Image source={badgeOutline} style={styles.badgeOutline}></Image>
          </Pressable>
        ) : (
          <></>
        )}
        <View style={styles.resultsContainer}>
          <View style={styles.qAmountContainer}>
            <Text style={styles.qAmountText}>
              {questionAmount} QUESTIONS ANSWERED
            </Text>
          </View>

          <View style={styles.scoreSwipeContainer}>
            <View style={styles.scoreContainer}>
            <Image source={redSwipe} style={styles.redSwipe}></Image>
            <View style={styles.yourScoreContainer}>
              <Text style={styles.yourScore}>YOUR SCORE</Text>
              <Text style={styles.scoreResult}>{score}</Text>
              </View>
            </View>
          </View>

          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              Your accuracy was {Math.floor((score / questionAmount) * 100)}%{" "}
              {message}
            </Text>
          </View>
          <Pressable
            style={styles.menuButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.menuText}>Main Menu</Text>
          </Pressable>
        </View>
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
  badgeOutline: {
    height: 65,
    width: 65,
    marginBottom: 5,
  },
  resultsContainer: {
    height: screen.height * 0.5,
    width: screen.width * 0.65,
    backgroundColor: "black",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreAchieved: {
    fontStyle: "bold",
    fontSize: 24,
  },
  qAmountContainer: {
    position: "absolute",
    top: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: screen.height * 0.05,
    width: screen.width * 0.6,
    // backgroundColor: "red",
  },
  qAmountText: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  scoreSwipeContainer: {
    height: 70,
    width: 220,
    // backgroundColor: "yellow",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreContainer: {
    height: screen.height * 0.05,
    width: 220,
    // backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    // zIndex: 0,
  },
  redSwipe: {
    height: 90,
    // backgroundColor: 'white',
    width: 200,
    // zIndex: 10,
  },
  yourScoreContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    // backgroundColor: 'pink',
    height: 40,
    width: 150,
  },
  yourScore: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 12,
  },
  scoreResult: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 32,
  },
});

{
  /* <View style={styles.scoreSwipeContainer}>
          <Image source={redSwipe} style={styles.redSwipe}></Image>
          <View style={styles.scoreContainer}>
          <Text style={styles.yourScore}>YOUR SCORE</Text>
          <Text style={styles.scoreResult}>{score}</Text>
          </View>
          </View> */
}
