import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  Dimensions,
  ImageBackground,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AdditionProblems from "./AdditionProblems";
import selectBG from "../../assets/img/selectBG.jpg";
const screen = Dimensions.get("window");
const screenHeightAdjusted = screen.height - 45; // subtract height of navigation stack bar

export default function AdvancedSettingsAddition({ navigation }) {
  const [secondNumMax, setSecondNumMax] = useState(10);
  const [firstNumIncluded, setFirstNumIncluded] = useState({});
  const [showAdditionPage, setShowAdditionPage] = useState(false);
  const [questionAmount, setQuestionAmount] = useState(10);
  const [timeAttack, setTimeAttack] = useState(false);
  const [timeAmount, setTimeAmount] = useState(Infinity);

  const checkboxOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const checkboxFirstNum = checkboxOptions.map((option) => {
    return (
      <BouncyCheckbox
        disableBuiltInState
        text={option}
        fillColor="#b8100f"
        iconStyle={{ borderColor: "red" }}
        onPress={() => handlePressFirstNum(option)}
        isChecked={firstNumIncluded[option]}
        key={option}
        textStyle={{ textDecorationLine: "none", color: "white" }}
        bounceEffectIn={1.5}
        style={styles.checkbox}
        size={20}
      />
    );
  });

  const handlePressFirstNum = (selectedItem) => {
    setFirstNumIncluded({
      ...firstNumIncluded,
      [selectedItem]: !firstNumIncluded[selectedItem],
    });
  };

  return (
    <>
      {showAdditionPage ? (
        <AdditionProblems
          firstNum={firstNumIncluded}
          secondNum={secondNumMax}
          maxQuestionsNumber={questionAmount}
          timeAtt={timeAttack}
          timeAmt={timeAmount}
          difficulty={"custom settings"}
          navigation={navigation}
          custom={true}
        />
      ) : (
        <ImageBackground
          source={selectBG}
          resizeMode="cover"
          style={styles.background}
        >
          <Text style={styles.AdvancedSettingsTitle}>Advanced Settings</Text>
          <View style={styles.separator}></View>
          <View style={styles.outerContainer}>
            <View style={styles.questionAmountContainer}>
              <Text style={styles.sectionHeading}>
                Set first number's ending digit
              </Text>
              <View style={styles.separator}></View>
              <View style={styles.checkboxContainer}>
                {checkboxFirstNum.map((elem) => elem)}
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.container}>
                <View style={styles.separator}></View>
                <Text
                  style={styles.sectionHeading}
                >{`Set second number max. value`}</Text>

                <TextInput
                  style={styles.inputField}
                  onChangeText={(input) => setSecondNumMax(Number(input))}
                  keyboardType="number-pad"
                  placeholder="type here (default = 10)"
                  placeholderTextColor="#b8100f"
                  returnKeyType="done"
                />
              </View>
              <View style={styles.separator}></View>
              <Text
                style={styles.sectionHeading}
              >{`Set number of questions`}</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={(input) => setQuestionAmount(Number(input))}
                keyboardType="number-pad"
                placeholder="type here (default = 10)"
                placeholderTextColor="#b8100f"
                returnKeyType="done"
              />
              <View style={styles.separator}></View>

              <Text
                style={styles.sectionHeading}
              >{`Set time, in seconds`}</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={(input) => {
                  setTimeAmount(Number(input));
                  setTimeAttack(true);
                }}
                keyboardType="number-pad"
                placeholder="type here (default = unlimited)"
                placeholderTextColor="#b8100f"
                returnKeyType="done"
              />
              <View style={styles.separator}></View>
              <Pressable
                style={styles.menuButton}
                onPress={(e) => setShowAdditionPage(true)}
                title="Ready!"
              >
                <Text style={styles.menuText}>Done</Text>
              </Pressable>
              {/* </View> */}
            </View>
          </View>
        </ImageBackground>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    height: screenHeightAdjusted,
    width: screen.width,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  outerContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: screenHeightAdjusted * 0.85,
    width: screen.width * 0.85,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "black",
  },
  AdvancedSettingsTitle: {
    color: "white",
    textShadowColor: "red",
    textShadowRadius: 30,
    fontWeight: "bold",
    fontSize: screenHeightAdjusted * 0.03,
  },
  questionAmountContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxContainer: {
    // display: 'flex',
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: screenHeightAdjusted * 0.3,
    width: screen.width * 0.7,
    backgroundColor: "black",
  },
  checkbox: {
    height: (screenHeightAdjusted * 0.3) / 5,
    width: (screen.width * 0.7) / 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    borderColor: "#b8100f",
    borderWidth: 2,
  },
  sectionHeading: {
    fontWeight: "bold",
    textAlign: "center",
    // textTransform: "uppercase",
    fontSize: screenHeightAdjusted * 0.02,
    color: "white",
  },
  separator: {
    height: screenHeightAdjusted * 0.015,
    width: 5,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: screenHeightAdjusted * 0.4,
    width: screen.width * 0.7,
  },
  inputField: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    height: screenHeightAdjusted * 0.05,
    width: screen.width * 0.7,
    color: "white",
    fontSize: screenHeightAdjusted * 0.015,
  },
  menuButton: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#b8100f",
    padding: 5,
    // margin: 5,
    width: screen.width * 0.6,
    height: screenHeightAdjusted * 0.075,
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
});
