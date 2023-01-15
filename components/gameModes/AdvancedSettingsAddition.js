import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  PixelRatio,
  Dimensions,
  ImageBackground,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AdditionProblems from "./AdditionProblems";
import selectBG from "../../assets/img/selectBG.jpg";
const screen = Dimensions.get("window");
const screenHeightAdjusted = screen.height - 45 // subtract height of navigation stack bar

export default function AdvancedSettingsAddition({navigation}) {
  const [secondNumMax, setSecondNumMax] = useState(10);
  const [firstNumIncluded, setFirstNumIncluded] = useState({})
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
          difficulty={'custom settings'}
          navigation={navigation}
          custom = {true}
        />
      ) : (
        <ImageBackground
          source={selectBG}
          resizeMode="cover"
          style={styles.background}
        >
          <View style={styles.outerContainer}>
          <View style={styles.questionAmountContainer}>
            <Text style={styles.formTitle}>
              Select possible values for first number
            </Text>
            <View style={styles.checkboxContainer}>
            {checkboxFirstNum.map((elem) => elem)}
            </View>
          </View>
          <View style={styles.container}>
            <Text
              style={styles.formTitle}
            >{`Set max value for 2nd number (default is 10)`}</Text>
            <TextInput
              style={styles.inputContainer}
              onChangeText={(input) => setSecondNumMax(Number(input))}
              keyboardType="number-pad"
              placeholder="type here"
              returnKeyType="done"
            />
          </View>
          <View style={styles.container}>
            <Text
              style={styles.formTitle}
            >{`Set number of questions (default is 10)`}</Text>
            <TextInput
              style={styles.inputContainer}
              onChangeText={(input) => setQuestionAmount(Number(input))}
              keyboardType="number-pad"
              placeholder="type here"
              returnKeyType="done"
            />
          </View>
          <View style={styles.container}>
            <Text
              style={styles.formTitle}
            >{`Set Amount of Time (default is unlimited)`}</Text>
            <TextInput
              style={styles.inputContainer}
              onChangeText={(input) => {
                setTimeAmount(Number(input));
                setTimeAttack(true);
              }}
              keyboardType="number-pad"
              placeholder="type here"
              returnKeyType="done"
            />
          </View>
          <View style={styles.container}>
            <Pressable
              style={styles.menuButton}
              onPress={(e)=>setShowAdditionPage(true)}
              title = 'Ready!'
            >
              <Text style={styles.menuText}>Done</Text>
            </Pressable>
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
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
  },
  outerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeightAdjusted * .85,
    width: screen.width * .85,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "black",
  },
  questionAmountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxContainer: {
    // display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeightAdjusted * 0.30,
    width: screen.width * 0.70,
    backgroundColor: 'black',
  },
  checkbox: {
    height: (screenHeightAdjusted * 0.30) / 5,
    width: (screen.width * 0.70) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 2,
    padding: 2,
    borderColor: '#b8100f',
    borderWidth: 2,
  },
  // menuContainer: {
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   paddingBottom: 5,
  // },
  // inputContainer: {
  //   justifyContent: "center",
  //   textAlign: "center",
  //   borderColor: "white",
  //   borderWidth: 2,
  //   width: 200,
  //   color: "silver",
  // },
  // questionAmountContainer: {
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   textAlign: "center",
  //   marginTop: 10,
  // },
  // buttonsContainer: {
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   height: 220,
  //   marginTop: 20,
  // },
  // menuButton: {
  //   borderRadius: 50,
  //   borderWidth: 2,
  //   borderColor: "#b8100f",
  //   padding: 5,
  //   margin: 5,
  //   width: 150,
  //   height: 60,
  //   color: "white",
  //   backgroundColor: "black",
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // menuText: {
  //   color: "white",
  //   fontSize: 18,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // separator: {
  //   marginVertical: 12,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // checkbox: {
  //   flexDirection: "column",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // formTitle: {
  //   color: "white",
  // },
});
