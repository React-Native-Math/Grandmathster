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
          {highScoresArr.length
            ? highScoresArr.map((elem, idx) => {
                if (elem[1]) {
                  let scoreObject = JSON.parse(elem[1]);
                  return (
                    <Text style={styles.timeAttackSubheading} key={idx}>
                      Top Scores ({elem[0].slice(-2)} seconds)
                      <View style={styles.tableContainer}>
                        <View style={styles.scoreText}>
                        <Text>
                          <Text style={styles.positionHighlight}>1.</Text>     {scoreObject.highScore} points
                        </Text>
                        <View style={styles.separator}></View>
                        <Text>
                        <Text style={styles.positionHighlight}>2.</Text>     {scoreObject.midScore} points
                        </Text>
                        <View style={styles.separator}></View>
                        <Text>
                        <Text style={styles.positionHighlight}>3.</Text>     {scoreObject.lowScore} points
                        </Text>
                        </View>
                      </View>
                    </Text>
                  );
                }
              })
            : null}
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
    padding: 2,
  },
  scoreText: {
    color: "white",
    textAlign: "left",
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
  timeAttackSubheading: {
    textAlign: "center",
    fontWeight: "bold",
    color: "red",
  },
  positionHighlight: {
   color: 'red',
  },
  separator: {
    marginTop: screenHeightAdjusted * 0.0075,
  }
});
