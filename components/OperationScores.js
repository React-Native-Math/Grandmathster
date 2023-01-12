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
        <View style={styles.scoresContainer}>
          <Text style={styles.timeAttackHeading}>
            {props.operation.toUpperCase()} TIME ATTACK SCORES
          </Text>
          {highScoresArr.length
            ? highScoresArr.map((elem, idx) => {
                if (elem[1]) {
                  let scoreObject = JSON.parse(elem[1]);
                  return (
                    <Text style={styles.timeAttackSubheading} key={idx}>
                      Top Scores ({elem[0].slice(-2)} seconds)
                      <View style={styles.tableContainer}>
                        <Text style={styles.scoreText}>
                          1. {scoreObject.highScore} points
                        </Text>

                        <Text style={styles.scoreText}>
                          2. {scoreObject.midScore} points
                        </Text>
                        <Text style={styles.scoreText}>
                          3. {scoreObject.lowScore} points
                        </Text>
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
    height: screen.height,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  scoresContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    height: screen.height * 0.7,
    width: 250,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
  },
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 100,
    backgroundColor: "black",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 2,
  },
  scoreText: {
    marginTop: 5,
    color: "white",
    textAlign: "right",
  },
  timeAttackHeading: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 15,
  },
  timeAttackSubheading: {
    textAlign: "center",
    color: "white",
    marginBottom: 40,
  },
});
