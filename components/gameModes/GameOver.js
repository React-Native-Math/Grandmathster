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
    if (timeAtt && !custom) {
      callReadAndWriteTimAttHighScores(score);
    }
    if (accuracy === 100) {
      setMessage(
        `Congratulations you're a Grandmathster on ${difficulty.toLowerCase()} mode! You earned a new '${operation} badge'`
      );
      if (!timeAtt) {
        storePerfectScores();
        setShowBadge(true);
      } 
    } else if (accuracy > 90)
      setMessage(
        `You are a Mathster on ${difficulty} mode! Keep practicing to become the Grandmathster!`
      );
    else if (accuracy > 75)
      setMessage(
        `You are a Novice on ${difficulty} mode! Keep practicing to become a Mathster!`
      );
    else if (accuracy > 50)
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
            <View style={styles.badgeTextContainer}><Text style={styles.badgeText}>Touch the badge to view your achievements</Text></View>
          </View>
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
            <Text style={styles.messageTextTop}>
              This means your accuracy was
              <Text style={styles.messageAcc}>
                {" "}
                {Math.floor((score / questionAmount) * 100)}%{" "}
              </Text>
            </Text>

            <Text style={styles.messageTextBottom}>{message}</Text>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    width: screen.width * 0.5,
    height: screen.height * 0.2,
  },
  messageTextTop: {
    color: "white",
  },
  messageTextBottom: {
    color: "white",
    marginTop: 15,
  },
  messageAcc: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
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
    margin: 15,
    width: 150,
    height: 40,
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
  resultsContainer: {
    height: screen.height * 0.45,
    width: screen.width * 0.65,
    backgroundColor: "black",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badgeContainer: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: "center",
    height: screen.height * 0.05,
    width: screen.width * 0.65,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "gold",
    marginBottom: 15,
  },
  badgeOutline: {
    height: 65,
    width: 65,
    marginBottom: 5,
  },
  badgeTextContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: screen.width * 0.4,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    color: "gold",
    textAlign: 'center',
  },
  scoreAchieved: {
    fontStyle: "bold",
    fontSize: 24,
  },
  qAmountContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: screen.height * 0.05,
    width: screen.width * 0.6,
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreContainer: {
    height: screen.height * 0.05,
    width: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  redSwipe: {
    height: 90,
    width: 200,
  },
  yourScoreContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    height: 40,
    width: 150,
  },
  yourScore: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  scoreResult: {
    color: "white",
    fontWeight: "bold",
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
