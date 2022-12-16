import React, { useState, } from 'react';
import { View, StyleSheet, Text, Pressable, TextInput, ScrollView, Dimensions, ImageBackground } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AdditionProblems from './AdditionProblems';
import schoolBackground2 from '../../assets/img/schoolBackground2.png'

export default function AdvancedSettingsAddition() {
  const window = Dimensions.get('window')
  const [secondNumMax, setSecondNumMax] = useState(10);
  const [firstNumIncluded, setFirstNumIncluded] = useState({})
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
      fillColor='blue'
      iconStyle={{borderColor:'blue'}}
      onPress={()=>handlePressFirstNum(option)}
      isChecked={firstNumIncluded[option]}
      key={option}
      textStyle={{textDecorationLine:'none'}}
      />)
  });
  
  console.log(firstNumIncluded)

  const handlePressFirstNum = (selectedItem) => {
    setFirstNumIncluded({
      ...firstNumIncluded,
      [selectedItem]: !firstNumIncluded[selectedItem]
    })
  };

  return (
    <ScrollView >
      {toggle ? (
        <AdditionProblems
          firstNum={firstNumIncluded}
          secondNum={secondNumMax}
          maxQuestionsNumber={questionAmount}
          timeAtt={timeAttack}
          timeAmt={timeAmount} 
        />
      ) : (
        <ImageBackground source={schoolBackground2} style={styles.backgound}>
          <View style={styles.questionAmountContainer}>
            <Text>Select possible values for first number</Text>
            {checkboxFirstNum.map(elem=>elem)}
          </View>
          <View style={styles.container}>
            <Text>{`Set max value for 2nd number (default is 10)`}</Text>
            <TextInput
            style={styles.inputContainer}
            onChangeText={(input)=>setSecondNumMax(Number(input))}
            keyboardType='number-pad'
            placeholder='type here'
            returnKeyType='done'
            />
          </View>
          <View style={styles.container}>
            <Text>{`Set number of questions (default is 10)`}</Text>
            <TextInput
            style={styles.inputContainer}
            onChangeText={(input)=>setQuestionAmount(Number(input))}
            keyboardType='number-pad'
            placeholder='type here'
            returnKeyType='done'
            />
          </View>
          <View style={styles.container}>
            <Text>{`Set Amount of Time (default is unlimited)`}</Text>
            <TextInput
            style={styles.inputContainer}
            onChangeText={(input)=>{setTimeAmount(Number(input))
              setTimeAttack(true)
            }}
            keyboardType='number-pad'
            placeholder='type here'
            returnKeyType='done'
            />
          </View>
          <View style={styles.container}>
            <Pressable
              style={styles.menuButton}
              onPress={(e)=>setToggle(true)}
              title = 'Ready!'
            >
            <Text style={styles.menuText}>Ready!</Text>
            </Pressable>
          </View>
          <View style={styles.footer}>
          
          </View>
        </ImageBackground>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  background:{
    width: window.width,
    height: window.height,
    alignItems: 'center',
    justifyContent:'center',

  },
  menuContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  inputContainer:{
    justifyContent:'center',
    textAlign: 'center',
    borderColor: 'black',
    borderWidth: 2,
    width: 200,
    color: 'green'
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  separator: {
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkbox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer:{
    paddingTop:300
  },
});