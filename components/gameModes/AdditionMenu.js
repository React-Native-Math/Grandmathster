import React, {useState} from 'react'
import {View, StyleSheet, Text, Button, Pressable, Image} from 'react-native'
import BouncyCheckboxGroup, {ICheckboxButton} from "react-native-bouncy-checkbox-group";
import AdditionProblems from './AdditionProblems'
import cogPic from '../../assets/img/cog.png'

export default function AdditonMunu({navigation}) {
  const [difficultyFirstNum, setDifficultyFirstNum] = useState(0);
  const [difficultySecondNum, setDifficultySecondNum] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [questionAmount, setQuestionAmount] = useState(10);
  const [timeAttack, setTimeAttack] = useState(false)
  const [timeAmount, setTimeAmount] = useState(1000000000)

  const checkboxOptions = ['10 questions', '20 questions', '30 questions', 'Time attack: unlimited', 'Time attack: 10 seconds', 'Time attack: 30 seconds', 'Time attack: 60 seconds'];
  const valueOptions = [10, 20, 30, Infinity, 'time1', 'time2', 'time3']
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const ICheckboxButton = checkboxOptions.map((option, idx) => {
    return {
      id: idx,
      text: option,
      value: valueOptions[idx],
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

  const handleSelection = (selectedItem)=>{
    if(selectedItem.value=='time1'){
        setTimeAttack(true)
        setQuestionAmount(1000)
        setTimeAmount(10)
    }
    else if(selectedItem.value=='time2'){
        setTimeAttack(true)
        setQuestionAmount(1000)
        setTimeAmount(30)
    }
    else if(selectedItem.value=='time3'){
        setTimeAttack(true)
        setQuestionAmount(1000)
        setTimeAmount(60)
    }
    else{
    setQuestionAmount(selectedItem.value)
}}

  return (
    <View style={styles.menuContainer}>
      {toggle ? (
        <AdditionProblems
          firstNum={difficultyFirstNum}
          secondNum={difficultySecondNum}
          maxQuestionsNumber={questionAmount}
          timeAtt={timeAttack}
          timeAmt={timeAmount}
        />
      ) : (
        <>
            <Text style={styles.sectionHeading}>Select Game Mode</Text>
          <View style={styles.questionAmountContainer}>
            <BouncyCheckboxGroup
              data={ICheckboxButton}
              initial={0}
              style={styles.checkbox}
              onChange={handleSelection}
            />
          </View>
          <Text style={styles.sectionHeading}>Select Difficulty</Text>
          <View style={styles.buttonsContainer}>
            {difficulties.map((difficulty, idx) => {
              const maxNum = 10 ** (idx + 1); // sets the maximum possible number for the selected difficulty
              return (
                <Pressable
                  key={idx}
                  style={styles[`menuButton${idx}`]}
                  onPress={(e) => handleDifficulty(e, maxNum, maxNum)}
                >
                  <Text style={styles.menuText}>{difficulty}</Text>
                </Pressable>
              );
            })}
          </View>
                <Pressable
                    onPress={()=>navigation.navigate('AdvancedSettingsAddition')}
                >
                  <Image
        style={styles.cogPic}
        source={cogPic}
      />
                    <Text style={{marginTop:'25px'}}>Advanced Settings</Text>
                </Pressable>
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
    padding: 15,
    marginTop: 10,
    borderColor: 'grey',
    borderWidth: '2px',
    borderRadius: 10,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    marginTop: 20,
  },
  menuButton0: {
    borderRadius: 50,
    padding: 5,
    margin: 5,
    width: 70,
    height: 35,
    backgroundColor: '#006b3d',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton1: {
    borderRadius: 50,
    padding: 5,
    margin: 5,
    width: 70,
    height: 35,
    backgroundColor: '#fcb606',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton2: {
    borderRadius: 50,
    padding: 5,
    margin: 5,
    width: 70,
    height: 35,
    backgroundColor: '#c23b21',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  separator: {
    marginVertical: 12,
  },
  checkbox: {
    flexDirection: 'column',
  },
  sectionHeading: {
    marginTop: '25px',
  },
  cogPic: {
    height: '20px',
    width: '20px',
  }
});