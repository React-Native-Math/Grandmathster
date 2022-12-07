import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import AdditionProblems from './AdditionProblems';

export default function AdditonMunu() {
  const [difficultyFirstNum, setDifficultyFirstNum] = useState(0);
  const [difficultySecondNum, setDifficultySecondNum] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [questionAmount, setQuestionAmount] = useState(10);

  const checkboxOptions = [10, 20, 30, 'Unlimited'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const ICheckboxButton = checkboxOptions.map((option, idx) => {
    return {
      id: idx,
      text: option,
      value: option !== 'Unlimited' ? Number(option) : Infinity,
      fillColor: '#ff7473',
      unfillColor: '#fbbfbb',
      textStyle: {
        textDecorationLine: 'none',
      },
      style: {
        marginTop: 10,
      },
    };
  });

  const handleDifficulty = (e, first, second) => {
    setDifficultyFirstNum(first);
    setDifficultySecondNum(second);
    setToggle(!false);
  };

  const handleQuestionAmount = (e, maxQuestions) => {};

  return (
    <View style={styles.menuContainer}>
      {toggle ? (
        <AdditionProblems
          firstNum={difficultyFirstNum}
          secondNum={difficultySecondNum}
          maxQuestionsNumber={questionAmount}
        />
      ) : (
        <>
          <View style={styles.questionAmountContainer}>
            <Text>Number of Questions</Text>
            <BouncyCheckboxGroup
              data={ICheckboxButton}
              initial={0}
              style={styles.checkbox}
              onChange={(selectedItem) => {
                setQuestionAmount(selectedItem.value);
              }}
            />
          </View>
          <View style={styles.buttonsContainer}>
            {difficulties.map((difficulty, idx) => {
              const maxNum = 10 ** (idx + 1); // sets the maximum possible number for the selected difficulty
              return (
                <Pressable
                  key={idx}
                  style={styles.menuButton}
                  onPress={(e) => handleDifficulty(e, maxNum, maxNum)}
                >
                  <Text style={styles.menuText}>{difficulty}</Text>
                </Pressable>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  menuContainer: {
    // width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  questionAmountContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 220,
    marginTop: 20,
  },
  menuButton: {
    borderRadius: 50,
    padding: 5,
    margin: 5,
    width: 150,
    height: 60,
    color: 'white',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    color: 'white',
    fontSize: 18,
  },
  separator: {
    marginVertical: 12,
  },
  checkbox: {
    flexDirection: 'column',
  },
});
