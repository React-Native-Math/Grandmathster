import React, {useState} from 'react'
import {View, StyleSheet, Text, Button, Pressable, ImageBackground, Dimensions} from 'react-native'
import BouncyCheckboxGroup, {ICheckboxButton} from "react-native-bouncy-checkbox-group";
import AdditionProblems from './AdditionProblems'
import schoolBackground from '../../assets/img/schoolBackground.png'

export default function AdditonMunu({navigation}) {
  const screen = Dimensions.get('screen')
  const [difficultyFirstNum, setDifficultyFirstNum] = useState(0);
  const [difficultySecondNum, setDifficultySecondNum] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [questionAmount, setQuestionAmount] = useState(10);
  const [timeAttack, setTimeAttack] = useState(false)
  const [timeAmount, setTimeAmount] = useState(1000000000)

  const checkboxOptions = ['10 Questions', '20 Questions', '30 Question', 'Unlimited', 'Time Attack 10 seconds', 'Time Attack 30 seconds', 'Time Attack 60 seconds'];
  const valueOptions = [10, 20, 30, Infinity, 'time1', 'time2', 'time3']
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const ICheckboxButton = checkboxOptions.map((option, idx) => {
    return {
      id: idx,
      text: option,
      value: valueOptions[idx],
      fillColor: '#0000FF',
      unfillColor: '#ADD8E6',
      textStyle: {
        textDecorationLine: 'none',
        fontFamily: 'DancingScript',
        color:'black'
      },
      style: {
        marginTop: 10,
      },
      flexDirection:'row',
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
        <ImageBackground source={schoolBackground} resizeMode='cover' style={styles.background}>
          <View style={styles.questionAmountContainer}>
            <Text style={{fontFamily: 'DancingScript'}}>Choose how many questions or how much time</Text>
            <BouncyCheckboxGroup
              data={ICheckboxButton}
              initial={0}
              style={styles.checkbox}
              onChange={handleSelection}
              
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
                <Pressable
                    onPress={()=>navigation.navigate('AdvancedSettingsAddition')}
                >
                    <Text style={{fontFamily: 'DancingScript'}}>Advanced Settings</Text>
                </Pressable>
          </View>
        </ImageBackground>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent:'center',
  },
  background:{
    width: screen.width,
    height: screen.height,
    alignItems: 'center',
    justifyContent:'center',

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
    
    width:150,
    height:300,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    fontFamily: 'DancingScript',
  },
  menuButton: {
    borderRadius: 50,
    padding: 5,
    margin: 5,
    width: 150,
    height: 30,
    color: 'white',
    backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'DancingScript'
  },
  separator: {
    marginVertical: 12,
  },
  checkbox: {
    display:'flex',
    fontFamily: 'DancingScript',
    flexDirection:'column',

  },
});
