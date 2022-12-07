import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, Button, TextInput } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import AdditionProblems from './AdditionProblems';

export default function AdvancedSettingsAddition() {
  const [secondNumMax, setSecondNumMax] = useState(10);
  const [firstNumIncluded, setFirstNumIncluded] = useState(false)
  const [toggle, setToggle] = useState(false);
  const [questionAmount, setQuestionAmount] = useState(10);
  const [timeAttack, setTimeAttack] = useState(false)
  const [timeAmount, setTimeAmount] = useState(Infinity)

  const checkboxOptions = [0,1,2,3,4,5,6,7,8,9];

  const checkboxFirstNum = checkboxOptions.map((option) => {
    return(
      <BouncyCheckbox
      disableBuiltInState
      text={option}
      fillColor='red'
      iconStyle={{borderColor:'red'}}
      onPress={()=>handlePressFirstNum(option)}
      isChecked={firstNumIncluded[option]}
      key={option}
      textStyle={{textDecorationLine:'none'}}
      />)
  });

  const handlePressFirstNum = (selectedItem) => {
    setFirstNumIncluded({
      ...firstNumIncluded,
      [selectedItem]: !firstNumIncluded[selectedItem]
    })
  };

  return (
    <View style={styles.menuContainer}>
      {toggle ? (
        <AdditionProblems
          firstNum={firstNumIncluded}
          secondNum={secondNumMax}
          maxQuestionsNumber={questionAmount}
          timeAtt={timeAttack}
          timeAmt={timeAmount} 
        />
      ) : (
        <>
          <View style={styles.questionAmountContainer}>
            <Text>Select possible values for first number</Text>
            {checkboxFirstNum.map(elem=>elem)}
          </View>
          <View>
            <Text>{`Set max value for 2nd number (default is 10)`}</Text>
            <TextInput
            onChangeText={(input)=>setSecondNumMax(Number(input))}
            keyboardType='number-pad'
            />
          </View>
          <View>
            <Text>{`Set number of questions (default is 10)`}</Text>
            <TextInput
            onChangeText={(input)=>setQuestionAmount(Number(input))}
            keyboardType='number-pad'
            />
          </View>
          <View>
            <Text>{`Set Amount of Time (default is unlimited)`}</Text>
            <TextInput
            onChangeText={(input)=>{setTimeAmount(Number(input))
              setTimeAttack(true)
            }}
            keyboardType='number-pad'
            />
          </View>
          <View >
            <Pressable
              style={styles.menuButton}
              onPress={(e)=>setToggle(true)}
              title = 'Ready!'
            >
            <Text style={styles.menuText}>Ready!</Text>
            </Pressable>
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