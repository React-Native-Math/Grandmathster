import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text, Dimensions, ImageBackground, Keyboard } from "react-native";
import GameOver from "./GameOver";
import selectBG from '../../assets/img/selectBG.jpg'
const screen = Dimensions.get("screen");
const screenHeightAdjusted = screen.height - 45; // subtract height of navigation stack bar

export default function RandomProblems(props) {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [firstNum, setFirstNum] = useState(null);
  const [secondNum, setSecondNum] = useState(null);
  const [change, setChange] = useState(false);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [time, setTime] = useState(0);
  const [textShadow, setTextShadow] = useState('#FFFFFF')
  const [operation, setOperation] = useState(null)

  const textShadowVals = ['#FFFFFF', '#FF355E', '#FFFF66', '#CCFF00', '#FF6EFF', '#AAF0D1', '#00FFFF']

  const getRandomOperation = ()=>{
    const whichOperation = Math.floor(Math.random()*4)
    if(whichOperation===0) {
      setOperation('+')
      setFirstNum(Math.floor(Math.random()*props.firstNum))
      setSecondNum(Math.floor(Math.random()*props.secondNum))
    }
    if(whichOperation===1) {
      setOperation('-')
      setSecondNum(Math.floor(Math.random()*props.secondNum))
      setFirstNum(Math.floor(Math.random()*props.firstNum+secondNum))
    }
    if(whichOperation===2){
      setOperation('×')
      setFirstNum(Math.floor(Math.random()*props.firstNum))
      setSecondNum(Math.floor(Math.random()*props.secondNum))
    }
    if(whichOperation===3) {
      setOperation('÷')
      setSecondNum(Math.floor(Math.random()*props.secondNum))
      setFirstNum(Math.floor(Math.random()*props.firstNum*secondNum))
    }
  }

  useEffect(()=>{
    getRandomOperation()
  },[change])

  if (props.timeAtt) {
    setTimeout(() => {
      setTime(time + 1);
    }, 1000);
  }

  if(operation==='÷'){
    if(firstNum%secondNum!==0){
      setFirstNum(Math.floor(Math.random()*props.firstNum)*props.secondNum)
    }
    if(secondNum===0){
      setSecondNum(Math.floor(Math.random()*props.secondNum))
      setFirstNum(Math.floor(Math.random()*props.firstNum)*props.secondNum)
    }
  }

  if(operation==='-'){
    if(firstNum-secondNum<0){
      setFirstNum(Math.floor(Math.random()*props.firstNum)+props.secondNum)
    }
  }

  function handleInputAnswer(e) {
    if(operation==='+'){
      if(input===''){
        setMessage(`Incorrect, the answer was ${firstNum + secondNum}`);
        setChange(!change);
        setInput("");
        setQuestionNumber(questionNumber + 1);
      }
      else if (firstNum + secondNum === Number(input)) {
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
    if(operation==='-'){
      if(input===''){
        setMessage(`Incorrect, the answer was ${firstNum - secondNum}`);
        setChange(!change);
        setInput("");
        setQuestionNumber(questionNumber + 1);
      }
      else if (firstNum - secondNum === Number(input)) {
        setMessage("Correct!");
        setChange(!change);
        setScore(score + 1);
        setInput("");
        setTextShadow(textShadowVals[Math.floor(Math.random() * textShadowVals.length)]);
        setQuestionNumber(questionNumber + 1);
      } else {
        setMessage(`Incorrect, the answer was ${firstNum - secondNum}`);
        setChange(!change);
        setInput("");
        setQuestionNumber(questionNumber + 1);
      }
    }
    if(operation==='×'){
      if(input===''){
        setMessage(`Incorrect, the answer was ${firstNum * secondNum}`);
        setChange(!change);
        setInput("");
        setQuestionNumber(questionNumber + 1);
      }
      else if (firstNum * secondNum === Number(input)) {
        setMessage("Correct!");
        setChange(!change);
        setScore(score + 1);
        setInput("");
        setTextShadow(textShadowVals[Math.floor(Math.random() * textShadowVals.length)]);
        setQuestionNumber(questionNumber + 1);
      } else {
        setMessage(`Incorrect, the answer was ${firstNum * secondNum}`);
        setChange(!change);
        setInput("");
        setQuestionNumber(questionNumber + 1);
      }
    }
    if(operation==='÷'){
      if(input===''){
        setMessage(`Incorrect, the answer was ${firstNum / secondNum}`);
        setChange(!change);
        setInput("");
        setQuestionNumber(questionNumber + 1);
      }
      else if (firstNum / secondNum === Number(input)) {
        setMessage("Correct!");
        setChange(!change);
        setScore(score + 1);
        setInput("");
        setTextShadow(textShadowVals[Math.floor(Math.random() * textShadowVals.length)]);
        setQuestionNumber(questionNumber + 1);
      } else {
        setMessage(`Incorrect, the answer was ${firstNum / secondNum}`);
        setChange(!change);
        setInput("");
        setQuestionNumber(questionNumber + 1);
      }
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
              <Text style={styles.operator}>{operation} </Text>
              {secondNum}
              </Text>
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
              value={input}
              returnKeyType="done"
              blurOnSubmit={false}
              autoFocus={true}
              enablesReturnKeyAutomatically= {true}
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
            operation = {'random'}
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
    height: screenHeightAdjusted,
    width: screen.width,
    alignItems: "center",
  },
  operator:{
    color: 'red',
  },
  scoreContainer: {
    justifyContent: 'flex-start',
    alignItems: "center",
    padding: screenHeightAdjusted > 667 ? 20 : 3,
    borderColor:'#b8100f',
    borderRadius:10,
    borderWidth: 5,
    marginTop: screenHeightAdjusted > 700 ? screenHeightAdjusted*.07 : screenHeightAdjusted*.03,
  },
  textInput: {
    textAlign: "center",
    fontSize: screen.height > 900 ? screen.height*.025: 18,
    fontFamily: "Azeret",
    color: "white",
    borderWidth: 5,
    width: screen.width > 600 ? screen.width*.45:screen.width*.65,
    borderColor: "#b8100f",
    marginTop: 5,
    fontWeight:'bold',
    padding:5,
    outlineColor: 'black',
  },
  problemContainer: {
    width: screen.width > 600 ? screen.width*.45 : screen.width * 0.65,
    alignItems: "flex-end",
    marginTop: 15,
    marginRight: 15,
  },
  number: {
    fontSize: screen.height >900 ? screen.height*.1: 70,
    fontFamily: "Azeret",
    color: "white",
  },
  message: {
    paddingTop: 5,
    fontSize: screen.height > 900 ? screen.height*.02: 15,
    fontFamily: "Azeret",
    color: "white",
  },
  score: {
    fontSize: screen.height > 900 ? 25:20,
    fontFamily: "Azeret",
    color: "white",
    justifyContent: 'center',
    alignItems: 'center'
  },
});
