import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text, Dimensions, ImageBackground } from "react-native";
import GameOver from "./GameOver";
const screen = Dimensions.get("screen");
import selectBG from '../../assets/img/selectBG.jpg'

export default function AdditionProblems(props) {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [firstNum, setFirstNum] = useState(null);
  const [secondNum, setSecondNum] = useState(null);
  const [change, setChange] = useState(false);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [time, setTime] = useState(0);
  const [textShadow, setTextShadow] = useState('#FFFFFF')

  const textShadowVals = ['#FFFFFF', '#FF355E', '#FFFF66', '#CCFF00', '#FF6EFF', '#AAF0D1', '#00FFFF']

  useEffect(() => {
    setSecondNum(Math.floor(Math.random() * props.secondNum));

    //second number always gets passed as an integer. This takes a random number up to the selection.
        setSecondNum(Math.floor(Math.random()*props.secondNum))
        
    //check to see if props.firstNum is a number or object and then set first number
        if(Number.isInteger(props.firstNum)){
            setFirstNum(Math.floor(Math.random()*props.firstNum))
        }
        else{ let firstNumberArray = Object.entries(props.firstNum)
            firstNumberArray = firstNumberArray.filter(([key, value])=>{
            if(value) 
            return key
        })
        //check to see if user passed in an empty object or with every number being toggled false
        //if false set the first number to be between 0 and 10. else set first number to be a selection of
        //what user put in under advanced options
        firstNumberArray.length===0 ? setFirstNum(Math.floor(Math.random()*10))
        : setFirstNum(Number(firstNumberArray[Math.floor(Math.random()*firstNumberArray.length)][0]))
    }
    },[change])

  if (props.timeAtt) {
    setTimeout(() => {
      setTime(time + 1);
    }, 1000);
  }

  function handleInputAnswer(e) {
    if (firstNum + secondNum === Number(input)) {
      setMessage("Correct!");
      setChange(!change);
      setScore(score + 1);
      setInput("");
      setTextShadow(textShadowVals[Math.floor(Math.random() * textShadowVals.length)]);
      setQuestionNumber(questionNumber + 1);
    } else {
      setMessage(`Incorrect, the answer was ${firstNum + secondNum}`);
      setChange(!change);
      setInput("");
      setQuestionNumber(questionNumber + 1);
    }
  }
  return (
    <ImageBackground source={selectBG} resizeMode='cover'>
    <View>
      {questionNumber < Number(props.maxQuestionsNumber) &&
      props.timeAmt - time > 0 ? (
        <View style={styles.outerContainer}>
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>Score: {score} Question: {questionNumber}
            </Text>
            <Text style={styles.score}>
              
              {questionNumber > 0
                ? `Accuracy: ${Math.floor((score / questionNumber) * 100)}%`
                : "Accuracy: 0%"}
            </Text>
            <Text style={styles.score}>
              {props.timeAtt
                ? `Time Remaining: ${Math.floor(props.timeAmt - time)}`
                : ""}
            </Text>
          </View>
          <View style={styles.problemContainer}>
            <Text style={{...styles.number, textShadowColor: textShadow, textShadowRadius: 30}}>{firstNum}</Text>
            <Text style={{...styles.number, textShadowColor: textShadow, textShadowRadius: 30}}>
            {/* +  −  ×  ÷ */}
              <Text style={styles.operator}>+ </Text>
              {secondNum}
              </Text>
            {/* <Text style={{ color: "black" }}>_______________________</Text> */}
            <TextInput
              style={styles.textInput}
              placeholder={questionNumber !== 0 ? "" : "type your answer"}
              onChangeText={(userInput) => {
                setInput(userInput);
                setMessage("");
              }}
              onSubmitEditing={(e) => handleInputAnswer(e)}
              clearTextOnFocus={true}
              keyboardType="number-pad"
              enablesReturnKeyAutomatically='false'
              value={input}
              returnKeyType="done"
              blurOnSubmit={false}
              autoFocus={true}
              
            />
          </View>
          <View>
            <Text style={styles.message}>{message}</Text>
          </View>
        </View>
      ) : (
        <View>
          <GameOver
            score={score}
            difficulty={props.difficulty}
            questionAmount={questionNumber}
            navigation={props.navigation}
            operation = {'addition'}
            timeAtt = {props.timeAtt}
            timeAmt = {props.timeAmt}
            custom = {props.custom}
          />
        </View>
      )}
    </View>
    </ImageBackground>
  );
}



const styles = StyleSheet.create({
  outerContainer: {
    height: screen.height,
    width: screen.width,
    alignItems: "center",
  },
  operator:{
    color: 'red',
  },
  scoreContainer: {
    justifyContent: 'flex-start', //TODO: using 'left' breaks expo
    alignItems: "center",
    padding: 20,
    borderColor:'#b8100f',
    borderRadius:10,
    borderWidth: 5,
    marginTop: screen.height > 700 ? screen.height*.08 : screen.height*.06,
  },
  textInput: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Azeret",
    color: "white",
    borderWidth: 5,
    width: 210,
    borderColor: "#b8100f",
    marginTop: 5,
    fontWeight:'bold',
    padding:5,
    outlineColor: 'black',
  },
  problemContainer: {
    width: screen.width * 0.65,
    alignItems: "flex-end",
    marginTop: 15,
    marginRight: 15,
  },
  number: {
    fontSize: 70,
    fontFamily: "Azeret",
    color: "white",
  },
  message: {
    paddingTop: 5,
    fontSize: 15,
    fontFamily: "Azeret",
    color: "white",
  },
  score: {
    fontSize: 20,
    fontFamily: "Azeret",
    color: "white",
    justifyContent: 'center',
    alignItems: 'center'
  },
});
