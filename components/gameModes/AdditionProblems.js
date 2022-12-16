import React, {useState, useEffect} from 'react'
import {View, StyleSheet, TextInput, Text, Dimensions} from 'react-native'
const screen = Dimensions.get('screen')
import GameOver from './GameOver'


export default function AdditionProblems (props){
    const [input, setInput] = useState('')
    const [message, setMessage] = useState('')
    const [firstNum, setFirstNum] = useState(null)
    const [secondNum, setSecondNum] = useState(null)
    const [change,setChange] = useState(false)
    const [score, setScore] = useState(0)
    const [questionNumber, setQuestionNumber] = useState(0)
    const [time, setTime] = useState(0)

    useEffect(()=>{
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

    if(props.timeAtt){
        setTimeout(()=>{
            setTime(time+1)
        },1000)
    }

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
        <View>
            {(questionNumber < Number(props.maxQuestionsNumber)) && (props.timeAmt-time>0)
            ?
            <View style={styles.outerContainer}>
                <View style={styles.scoreContainer}>
                    <Text style={styles.score}>
                        Score: {score}           Question: {questionNumber}
                    </Text>
                    <Text style={styles.score}>
                    {questionNumber > 0 ? `Accuracy: ${Math.floor(score/questionNumber*100)}%`:''}
                    </Text>
                    <Text style={styles.score}>
                    {props.timeAtt ? `Time Remaining: ${Math.floor(props.timeAmt-time)}`:''}
                    </Text>
                </View>
                <View style={styles.problemContainer}>
                    <Text style={styles.number}>
                    {''}   {firstNum}
                    </Text>
                    <Text style={styles.number}>
                    +  {secondNum}
                    </Text>
                    <Text>
                        _______
                    </Text>
                    <TextInput 
                        style={styles.textInput}

                        placeholder={questionNumber !== 0 ? '' : 'type your answer'}
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
                        autoFocus={true}
                    />
                    <Text style={styles.message}>
                        {message}
                    </Text>
                </View>
            </View>
            :
            <View>
             <GameOver
             score = {score}
             difficulty = {props.difficulty}
             questionAmount={questionNumber}
             navigation={props.navigation}
             />
            </View>
            
            }
        </View>
    )
}




const styles = StyleSheet.create({
    outerContainer:{
        backgroundColor:'black'
    },

    scoreContainer:{
        justifyContent:'top',
        paddingTop:15,
        paddingLeft:50
    },
    textInput:{
        textAlign:'center',
        fontSize:25,
        fontFamily:'Fredericka',
        color: 'white',
        borderWidth:2,
        width:200,
        borderColor:'white'
    },
    problemContainer:{  
        justifyContent:'center',
        alignItems:'center',
        paddingTop:20,
    },
    number:{
      fontSize:75,
      fontFamily:'Fredericka',
      color: 'white',
    },
    message:{
        paddingTop: 20,
        fontSize: 20,
        fontFamily:'Fredericka',
        color: 'white',
    },
    score:{
        fontSize:20,
        fontFamily:'Fredericka',
        color: 'white',
    }

})