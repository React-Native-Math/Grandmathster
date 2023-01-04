import React, {useState} from 'react'
import {View, StyleSheet, Text, Button, Pressable, Image, ImageBackground, Dimensions} from 'react-native'
import BouncyCheckboxGroup, {ICheckboxButton} from "react-native-bouncy-checkbox-group";
import AdditionProblems from './AdditionProblems'
// import schoolBackground from '../../assets/img/schoolBackground.png'
import cogPic from '../../assets/img/cog.png'
import selectBG from '../../assets/img/selectBG.jpg';
const screen = Dimensions.get('screen')

// const bg = { uri: "https://i.pinimg.com/736x/b8/38/af/b838afc8dd3a316f75b93ca9f78ce024.jpg" };

export default function AdditonMunu({navigation}) {
  const [difficultyFirstNum, setDifficultyFirstNum] = useState(0);
  const [difficultySecondNum, setDifficultySecondNum] = useState(0);
  const [difficulty, setDifficulty] = useState('')
  const [toggle, setToggle] = useState(false);
  const [questionAmount, setQuestionAmount] = useState(10);
  const [timeAttack, setTimeAttack] = useState(false)
  const [timeAmount, setTimeAmount] = useState(1000000000)

  const checkboxOptions = ['10 questions', '20 questions', '30 questions', 'Unlimited questions', 'Time attack: 10 seconds', 'Time attack: 30 seconds', 'Time attack: 60 seconds'];
  const valueOptions = [10, 20, 30, Infinity, 'time1', 'time2', 'time3']
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const ICheckboxButton = checkboxOptions.map((option, idx) => {
    return {
      id: idx,
      text: option,
      value: valueOptions[idx],
      fillColor: '#b8100f',
      unfillColor: 'white',
      textStyle: {
        textDecorationLine: 'none',
        color:'white'
      },
      style: {
        marginTop: 10,
      },
      flexDirection:'row',
      bounceEffectIn:1.5,
     
    };
  });

  const handleDifficulty = (e, first, second, difficulty) => {
    setDifficultyFirstNum(first);
    setDifficultySecondNum(second);
    setDifficulty(difficulty)
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
    setTimeAttack(false)
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
          difficulty={difficulty}
          navigation={navigation}
        />
      ) : (
        <ImageBackground source={selectBG} resizeMode='cover' style={styles.background}>
          <View style={styles.questionAmountContainer}>
            <Text style={styles.sectionHeading}>Select Game Mode</Text>
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
                  onPress={(e) => handleDifficulty(e, maxNum, maxNum, difficulty)}
                >
                  <Text style={styles.menuText}>{difficulty}</Text>
                </Pressable>
              );
            })}
          </View>
                <Pressable
                    onPress={()=>navigation.navigate('AdvancedSettingsAddition')}
                    style={styles.advancedSettingsContainer}
                >
                  <Image
        style={styles.cogPic}
        source={cogPic}
      />
                    <Text style={{color: 'white'}}>  Advanced Settings</Text>
                </Pressable>
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
    height: screen.height*.9,
    alignItems: 'center',
    justifyContent:'center',

  },
  menuContainer: {
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
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'black',

  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    marginTop: 20,
    fontFamily: 'DancingScript',

  },
  menuButton0: {
    borderRadius: 50,
    padding: 5,
    margin: 5,
    width: 70,
    height: 50,
    backgroundColor: 'black',
    borderWidth: 5,
    borderColor: '#006b3d',
    // backgroundColor: '#006b3d',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton1: {
    borderRadius: 50,
    padding: 5,
    margin: 5,
    width: 100,
    height: 50,
    backgroundColor: 'black',
    borderWidth: 5,
    borderColor: '#fcb606',
    // backgroundColor: '#fcb606',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton2: {
    borderRadius: 50,
    padding: 5,
    margin: 5,
    width: 70,
    height: 50,
    backgroundColor: 'black',
    borderWidth: 5,
    borderColor: '#c23b21',
    // backgroundColor: '#c23b21',
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
    display:'flex',
    fontFamily: 'DancingScript',
    flexDirection:'column',
    color: 'white', 
  },
  sectionHeading: {
    marginTop: 25,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  cogPic: {
    height: 15,
    width: 15,
  },
  advancedSettingsContainer: {
    marginTop: 25,
    backgroundColor: 'black',
    borderRadius: 50, 
    borderWidth: 2,
    borderColor: '#b8100f',
    padding: 10,
    height: 65,
    width: 220,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});