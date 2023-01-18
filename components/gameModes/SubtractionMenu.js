import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import BouncyCheckboxGroup, {
} from "react-native-bouncy-checkbox-group";
import SubtractionProblems from "./SubtractionProblems";
import cogPic from "../../assets/img/cog.png";
import selectBG from "../../assets/img/selectBG.jpg";
const screen = Dimensions.get("screen");
const screenHeightAdjusted = screen.height - 45; // subtract height of navigation stack bar

export default function SubtractionMenu({ navigation }) {

  const [difficultyFirstNum, setDifficultyFirstNum] = useState(0);
  const [difficultySecondNum, setDifficultySecondNum] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const [showSubtractionPage, setShowSubtractionPage] = useState(false);
  const [questionAmount, setQuestionAmount] = useState(10);
  const [timeAttack, setTimeAttack] = useState(false);
  const [timeAmount, setTimeAmount] = useState(1000000000);

  const checkboxOptions = [
    "10 questions",
    "20 questions",
    "30 questions",
    "Unlimited questions",
    "Time attack: 10 seconds",
    "Time attack: 30 seconds",
    "Time attack: 60 seconds",
  ];
  const valueOptions = [10, 20, 30, Infinity, "time1", "time2", "time3"];
  const difficulties = ["Easy", "Medium", "Hard"];

  const ICheckboxButton = checkboxOptions.map((option, idx) => {
    return {
      id: idx,
      text: option,
      value: valueOptions[idx],
      fillColor: "#b8100f",
      unfillColor: "white",
      textStyle: {
        textDecorationLine: "none",
        color: "white",
      },
      style: {
        marginTop: 10,
      },
      flexDirection: "row",
      bounceEffectIn: 1.5,
    };
  });

  const handleDifficulty = (e, first, second, difficulty) => {
    setDifficultyFirstNum(first);
    setDifficultySecondNum(second);
    setDifficulty(difficulty);
    setShowSubtractionPage(!false);
  };

  const handleSelection = (selectedItem) => {
    if (selectedItem.value == "time1") {
      setTimeAttack(true);
      setQuestionAmount(1000);
      setTimeAmount(10);
    } else if (selectedItem.value == "time2") {
      setTimeAttack(true);
      setQuestionAmount(1000);
      setTimeAmount(30);
    } else if (selectedItem.value == "time3") {
      setTimeAttack(true);
      setQuestionAmount(1000);
      setTimeAmount(60);
    } else {
      setQuestionAmount(selectedItem.value);
      setTimeAttack(false);
    }
  };

  return (
    <View style={styles.menuContainer}>
      {showSubtractionPage ? (
        <SubtractionProblems
          firstNum={difficultyFirstNum}
          secondNum={difficultySecondNum}
          maxQuestionsNumber={questionAmount}
          timeAtt={timeAttack}
          timeAmt={timeAmount}
          difficulty={difficulty}
          navigation={navigation}
          custom={false}
        />
      ) : (
        <ImageBackground
          source={selectBG}
          resizeMode="cover"
          style={styles.background}
        >
          <Text style={styles.sectionHeading}>In-game settings</Text>
          <View style={styles.separator}></View>

          <View style={styles.questionAmountContainer}>
            <Text style={styles.subHeading}>Select game mode</Text>
            <BouncyCheckboxGroup
              data={ICheckboxButton}
              initial={0}
              style={styles.checkbox}
              onChange={handleSelection}
            />
          </View>
          <Pressable
            onPress={() => navigation.navigate("AdvancedSettingsSubtraction")}
            style={styles.advancedSettingsContainer}
          >
            <Image style={styles.cogPic} source={cogPic} />
            <Text style={styles.advancedSettingsText}> Advanced Settings</Text>
          </Pressable>
          <View style={styles.separator}></View>
          <Text style={styles.sectionHeading}>Choose a level to start!</Text>
          <View style={styles.separator}></View>
          <View style={styles.buttonsContainer}>
            {difficulties.map((difficulty, idx) => {
              const maxNum = 10 ** (idx + 1); // sets the maximum possible number for the selected difficulty
              return (
                <Pressable
                  key={idx}
                  style={styles[`menuButton${idx}`]}
                  onPress={(e) =>
                    handleDifficulty(e, maxNum, maxNum, difficulty)
                  }
                >
                  <Text style={styles.menuText}>{difficulty}</Text>
                </Pressable>
              );
            })}
          </View>
        </ImageBackground>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    width: screen.width,
    height: screenHeightAdjusted,
    alignItems: "center",
    justifyContent: "center",
  },
  menuContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  questionAmountContainer: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: screenHeightAdjusted * 0.45,
    width: screen.width * 0.85,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "black",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: screenHeightAdjusted * 0.05,
    marginTop: screenHeightAdjusted * 0.015,
    fontFamily: "DancingScript",
  },
  menuButton0: {
    borderRadius: 50,
    padding: 5,
    margin: 5,
    width: 70,
    height: 50,
    backgroundColor: "black",
    borderWidth: 5,
    borderColor: "#006b3d",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menuButton1: {
    borderRadius: 50,
    padding: 5,
    margin: 5,
    width: 100,
    height: 50,
    backgroundColor: "black",
    borderWidth: 5,
    borderColor: "#fcb606",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menuButton2: {
    borderRadius: 50,
    padding: 5,
    margin: 5,
    width: 70,
    height: 50,
    backgroundColor: "black",
    borderWidth: 5,
    borderColor: "#c23b21",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menuText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  checkbox: {
    display: "flex",
    fontFamily: "DancingScript",
    flexDirection: "column",
    color: "white",
  },
  sectionHeading: {
    fontWeight: "bold",
    textShadowColor: "red",
    textShadowRadius: 30,
    // textTransform: "uppercase",
    fontSize: screenHeightAdjusted * 0.03,
    color: "white",
  },
  subHeading: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: screenHeightAdjusted * 0.023,
    color: "white",
  },
  separator: {
    height: screenHeightAdjusted * 0.015,
    width: 5,
  },
  cogPic: {
    height: screen.width * 0.04,
    width: screen.width * 0.04,
  },
  advancedSettingsContainer: {
    marginTop: 10,
    backgroundColor: "black",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#b8100f",
    padding: 10,
    width: screen.width * 0.6,
    height: screenHeightAdjusted * 0.06,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  advancedSettingsText: {
    color: "white",
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: screenHeightAdjusted * 0.015,
    marginLeft: screenHeightAdjusted * 0.02,
  },
});
