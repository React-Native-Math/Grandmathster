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
import AsyncStorage from "@react-native-async-storage/async-storage";
import badgeOutline from "../../assets/img/badgeOutline.png";
import redSwipe from "../../assets/img/redSwipe.png";

const screen = Dimensions.get("screen");
const screenHeightAdjusted = screen.height - 45; // subtract height of navigation stack bar

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

  const [scoreSaved, setScoreSaved] = useState(false);
  //AsyncStorage of High Scores notes:
  //have problems page pass in gameOver screen operation, if timeAtt, and timeAmt
  //Store objects with keys that look like operation_timeAmt so addition_10 or addition_30
  //Do not store custom timeAtt amounts.
  //object will store only 3 scores ie addition_10 = {highScore : 10, midScore : 7, lowScore : 6}
  //Check to see if timeAtt mode and not custom settings. If timeAtt mode pull scores.
  //Correctly store the new score in the object or don't store at all if not a new high score.
  //Write that object to the database overwriting previous object.

  const callReadAndWriteTimAttHighScores = async (score) => {
    let newHighs;
    let previousHighScores = await AsyncStorage.getItem(
      operation + "_" + timeAmt
    );
    let highScores = previousHighScores
      ? JSON.parse(previousHighScores)
      : { highScore: 0, midScore: 0, lowScore: 0 };
    if (score > highScores.highScore) {
      newHighs = {
        lowScore: highScores.midScore,
        midScore: highScores.highScore,
        highScore: score,
      };
      const jsonValue = JSON.stringify(newHighs);
      await AsyncStorage.setItem(operation + "_" + timeAmt, jsonValue);
    } else if (score > highScores.midScore) {
      const newHighs = {
        highScore: highScores.highScore,
        lowScore: highScores.midScore,
        midScore: score,
      };
      const jsonValue = JSON.stringify(newHighs);
      await AsyncStorage.setItem(operation + "_" + timeAmt, jsonValue);
    } else if (score > highScores.lowScore) {
      const newHighs = {
        ...highScores,
        lowScore: score,
      };
      const jsonValue = JSON.stringify(newHighs);
      await AsyncStorage.setItem(operation + "_" + timeAmt, jsonValue);
    }
  };
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
    const difficultyLower = difficulty.toLowerCase();
    if (timeAtt && !custom) {
      callReadAndWriteTimAttHighScores(score);
    }
    if (accuracy === 100) {
      setMessage(
        `Congratulations on achieving GRANDMATHSTER on ${difficultyLower} mode! You earned a new '${operation} badge'`
      );
      if (!timeAtt) {
        storePerfectScores();
        setShowBadge(true);
      }
    } else if (accuracy >= 90)
      setMessage(
        `Achieved MATHSTER level on ${difficultyLower} mode!`
      );
    else if (accuracy >= 75)
      setMessage(
        `You achieved NOVICE level on ${difficultyLower} mode!`
      );
    else if (accuracy >= 50)
      setMessage("Good effort but there's room for improvement!");
    else if (accuracy >= 0)
      setMessage("Check the help button (❓) above if you're struggling");
    // else if (accuracy === 0) setMessage("Stop Guessing");
  }, [loading]);
  return (
    <ImageBackground source={selectBG} style={styles.background}>
      <View style={styles.outerContainer}>
        {showBadge && !timeAtt ? (
          <Pressable onPress={() => navigation.navigate("Scores")}>
            <View style={styles.badgeContainer}>
              <Image source={badgeOutline} style={styles.badgeOutline}></Image>
              <View style={styles.badgeTextContainer}>
                <Text style={styles.badgeText}>
                  Touch the badge to view your achievements
                </Text>
              </View>
            </View>
          </Pressable>
        ) : (
          <></>
        )}
        <View style={styles.qAmountContainer}>
            <Text style={styles.qAmountText}>
              {questionAmount} QUESTIONS ANSWERED
            </Text>
          </View>
        <View style={styles.resultsContainer}>

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
            <Text
              // numberOfLines={2}
              // adjustsFontSizeToFit
              style={styles.messageTextTop}
            >
              This means your accuracy was
              <Text style={styles.messageAcc}>
                {" "}
                {Math.floor((score / questionAmount) * 100)}%{" "}
              </Text>
              
            </Text>

            <Text
              // numberOfLines={4}
              // adjustsFontSizeToFit
              style={styles.messageTextBottom}
            >
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
    height: screen.height,
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    height: screenHeightAdjusted * 0.35,
    width: screen.width * 0.7,
    backgroundColor: 'black'
  },
  messageTextTop: {
    color: "white",
    fontSize: screenHeightAdjusted * 0.02,
    padding: 10,
    textAlign: 'center',
  },
  messageTextBottom: {
    color: "white",
    marginTop: screenHeightAdjusted * 0.02,
    fontSize: screenHeightAdjusted *0.02,
    padding: 10,
    textAlign: 'center',
  },
  messageAcc: {
    color: "red",
    fontWeight: "bold",
    fontSize: screenHeightAdjusted * 0.025,
  },
  menuButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#b8100f",
    padding: 5,
    margin: 15,
    height: screenHeightAdjusted * 0.05,
    width: screen.width * 0.6,
    color: "white",
    backgroundColor: "black",
  },
  menuText: {
    color: "white",
    fontSize: screenHeightAdjusted * 0.02,
    alignItems: "center",
    justifyContent: "center",
  },
  outerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: screen.width * 0.8,
  },
  resultsContainer: {
    height: screenHeightAdjusted * 0.7,
    width: screen.width * 0.85,
    backgroundColor: "black",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  badgeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: screen.height * 0.05,
    width: screen.width * 0.75,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "gold",
    marginBottom: screenHeightAdjusted * 0.01,
  },
  badgeOutline: {
    height: screenHeightAdjusted * 0.07,
    width: screenHeightAdjusted * 0.07,
    marginLeft: screen.width * 0.03,
  },
  badgeTextContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: screen.width * 0.65,
    paddingLeft: screen.width * 0.025,
  },
  badgeText: {
    color: "white",
    textShadowColor: 'yellow',
    textShadowRadius: 30,
    fontSize: screenHeightAdjusted * 0.015,
    fontWeight: "bold",
    color: "gold",
    textAlign: "center",
  },
  qAmountContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: screen.height * 0.05,
    width: screen.width * 0.85,
  },
  qAmountText: {
      fontWeight: "bold",
      textAlign: "center",
      fontSize: screenHeightAdjusted * 0.02,
      color: "white",
  },
  scoreSwipeContainer: {
    height: screenHeightAdjusted * 0.10,
    width: screen.width * 0.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreContainer: {
    height: screen.height * 0.05,
    width: screen.width * 0.7,
    alignItems: "center",
    justifyContent: "center",
  },
  redSwipe: {
    height: screenHeightAdjusted * 0.15,
    width: screenHeightAdjusted * 0.35,
  },
  yourScoreContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    height: screenHeightAdjusted * 0.15,
    width: screen.width * 0.7,
  },
  yourScore: {
    color: "white",
    marginTop: screenHeightAdjusted * 0.01,
    fontWeight: "bold",
    fontSize: screenHeightAdjusted * 0.015,
  },
  scoreResult: {
    color: "white",
    fontWeight: "bold",
    fontSize: screenHeightAdjusted * 0.05,
  },
});
