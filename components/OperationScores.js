import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import selectBG from "../assets/img/selectBG.jpg";

const screen = Dimensions.get("screen");
const screenHeightAdjusted = screen.height - 45; // subtract height of navigation stack bar

export default function OperationScores(props) {
  const [highScoresArr, setHighScoresArr] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getHighScores = async (operation) => {
    const lookUpArr = [`${operation}_10`, `${operation}_30`, `${operation}_60`];
    try {
      const highScores = await AsyncStorage.multiGet(lookUpArr);

      setHighScoresArr(highScores);

      setLoaded(true);
    } catch (e) {
      console.log(e);
    }
  };

  const checkHighScores = (highScoresArr) => {
    return highScoresArr.reduce((acc, val) => {
      if (val[1]) {
        acc += 1;
        return acc;
      } else {
        return acc;
      }
    }, 0);
  };

  useEffect(() => {
    getHighScores(props.operation.toLowerCase());
  }, [loaded]);

  return (
    <ImageBackground source={selectBG} resizeMode="cover">
      <View style={styles.outerContainer}>
        <Text style={styles.timeAttackHeading}>
          {props.operation} time attack scores
        </Text>
        <View style={styles.scoresContainer}>
          {console.log(checkHighScores(highScoresArr))}
          {highScoresArr.length && checkHighScores(highScoresArr) > 0 ? (
            highScoresArr.map((elem, idx) => {
              if (elem[1]) {
                let scoreObject = JSON.parse(elem[1]);
                return (
                  <View style={styles.timeAttackContainer} key={idx}>
                    <Text style={styles.timeAttackSubheading}>
                      Top Scores ({elem[0].slice(-2)} seconds)
                    </Text>
                    <View style={styles.tableContainer}>
                      <View
                        style={{
                          ...styles.scoreLine,
                          backgroundColor: "#b8100f",
                        }}
                      >
                        <Text style={{ ...styles.scoreNum, color: "white" }}>
                          1.
                        </Text>
                        <Text style={{ ...styles.scoreVal, color: "white" }}>
                          {scoreObject.highScore} points
                        </Text>
                      </View>
                      <View style={styles.separator}></View>
                      <View style={styles.scoreLine}>
                        <Text style={styles.scoreNum}>2.</Text>
                        <Text style={styles.scoreVal}>
                          {scoreObject.midScore} points
                        </Text>
                      </View>
                      <View style={styles.separator}></View>
                      <View style={styles.scoreLine}>
                        <Text style={styles.scoreNum}>3.</Text>
                        <Text style={styles.scoreVal}>
                          {scoreObject.lowScore} points
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }
            })
          ) : (
            <View>
              <Text
                style={{
                  ...styles.timeAttackSubheading,
                  padding: screen.height * 0.025,
                }}
              >
                You haven't played this time attack game yet! Your scores will
                appear here once you've correctly answered some questions
              </Text>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    height: screenHeightAdjusted,
    width: screen.width,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  scoresContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    height: screenHeightAdjusted * 0.65,
    width: screen.width * 0.85,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
    backgroundColor: "black",
  },
  tableContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: screen.width * 0.5,
    height: screenHeightAdjusted * 0.1,
    backgroundColor: "black",
    marginTop: screenHeightAdjusted * 0.02,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
    padding: screenHeightAdjusted * 0.01,
  },
  timeAttackHeading: {
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "red",
    textShadowRadius: 30,
    marginBottom: screenHeightAdjusted * 0.025,
    fontSize: screenHeightAdjusted * 0.025,
    color: "white",
  },
  timeAttackContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  timeAttackSubheading: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  positionHighlight: {
    color: "red",
  },
  separator: {
    marginTop: screenHeightAdjusted * 0.0075,
  },
  scoreLine: {
    width: screen.width * 0.49,
    fontWeight: "bold",
    fontSize: screenHeightAdjusted * 0.015,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scoreNum: {
    color: "white",
    fontWeight: "bold",
    fontSize: screenHeightAdjusted * 0.015,
    marginLeft: screen.width * 0.02,
  },
  scoreVal: {
    color: "white",
    fontWeight: "bold",
    fontSize: screenHeightAdjusted * 0.015,
    marginRight: screen.width * 0.02,
  },
});
