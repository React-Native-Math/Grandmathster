import React, {useState, useEffect} from 'react'
import {View, StyleSheet, TextInput, Text, ImageBackgroundComponent,} from 'react-native'


export default function AdditionProblems (){
    const [input, setInput] = useState(null)
    const [message, setMessage] = useState('')
    const [firstNum, setFirstNum] = useState(null)
    const [secondNum, setSecondNum] = useState(null)
    const [change,setChange] = useState(false)
    const [score, setScore] = useState(0)
    const [questionNumber, setQuestionNumber] = useState(0)
    const propOperation = '+'
  
    useEffect(()=>{
        //props.first takes in the selected numbers 0-9 as an array
    const propsFirst = [1,3,6]

    setFirstNum(propsFirst[Math.floor(Math.random()*propsFirst.length)])
    
        //props.second to be 10, 20, 30, 40, 10 would represent 0-10, 30 would represent 0-30
    const propsSecondNum = 10

    setSecondNum(Math.floor(Math.random()*propsSecondNum))
    },[change])
    

    function handleInputAnswer (e) {
        if(firstNum+secondNum===Number(input)){
            setMessage('Correct!')
            setChange(!change)
            setScore(score+1)
            setInput('')
            setQuestionNumber(questionNumber+1)
            
        }
        else{
            setMessage(`Incorrect, the correct answer was ${firstNum + secondNum}`)
            setChange(!change)
            setInput('')
            setQuestionNumber(questionNumber+1)
               
        }
    }
    return(
        <View style={styles.outerContainer}>
   
            <View style={styles.scoreContainer}>
                <Text style={styles.score}>
                    Score: {score}            {questionNumber > 0 ? `Accuracy: ${Math.floor(score/questionNumber*100)}%`:''}
                </Text>
                
            </View>

            <View style={styles.problemContainer}>
                <Text style={styles.number}>
                {''}   {firstNum}
                </Text>
                <Text style={styles.number}>
                {propOperation}  {secondNum}
                </Text>
                <Text>
                    _______
                </Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder={questionNumber === 0 ? 'type your answer' : ''}
                    onChangeText={(userInput)=>{setInput(userInput)
                        setMessage('')
                    }}
                    onSubmitEditing={(e)=>handleInputAnswer(e)} 
                    clearTextOnFocus={true}
                    keyboardType='number-pad'
                    enablesReturnKeyAutomatically='true'
                    value={input}
                    returnKeyType='done'
                    blurOnSubmit={false}
                />
                <Text style={styles.message}>
                    {message}
                </Text>
            </View>
        </View>
    )
}




const styles = StyleSheet.create({
    outerContainer:{
      
    },
    scoreContainer:{
        justifyContent:'top',
        paddingTop:15,
        paddingLeft:50
    },
    textInput:{
        textAlign:'center',
        fontSize:20,
        fontFamily:'Fredericka',
        fontColor: 'white',
    },
    problemContainer:{  
        justifyContent:'center',
        alignItems:'center',
        paddingTop:150,
    },
    number:{
      fontSize:25,
      fontFamily:'Fredericka',
      fontColor: 'white',
    },
    message:{
        paddingTop: 20,
        fontSize: 15,
        fontFamily:'Fredericka',
        fontColor: 'white'
    },
    score:{
        fontSize:20,
        fontFamily:'Fredericka',
        fontColor: 'white',
    }

})