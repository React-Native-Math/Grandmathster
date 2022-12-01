import React, {useState, useEffect} from 'react'
import {View, StyleSheet, TextInput, Text} from 'react-native'


export default function AdditionProblems (){
    const [input, setInput] = useState(null)
    const [message, setMessage] = useState('')
    const [firstNum, setFirstNum] = useState(null)
    const [secondNum, setSecondNum] = useState(null)
    const [change,setChange] = useState(false)
    const [score, setScore] = useState(0)

  
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
            setMessage('Your previous answer was correct!')
            setChange(!change)
            setScore(score+1)
            setInput('')
        }
        else{
            setMessage(`Your previous answer was incorrect, the correct answer is ${firstNum+secondNum}`)
            setChange(!change)
            setInput('')
        }
    }

    return(
        <View >
            <View style={styles.scoreContainer}>
                <Text style={styles.score}>
                Score: {score}
                </Text>
            </View>
            <View style={styles.problemContainer}>
                <Text style={styles.number}>
                    {firstNum}
                </Text>
                <Text style={styles.number}>
                    +
                </Text>
                <Text style={styles.number}>
                    {secondNum}
                </Text>
                <Text>
                    ______
                </Text>
                <TextInput 
                    style={styles.number}
                     placeholder='type your answer'
                     onChangeText={(userInput)=>setInput(userInput)}
                     onSubmitEditing={(e)=>handleInputAnswer(e)} 
                     clearTextOnFocus={true}
                     keyboardType='numbers-and-punctuation'
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
    scoreContainer:{
        justifyContent:'top',
       
    },
    problemContainer:{
        
        justifyContent:'center',
        alignItems:'center',
        paddingTop:150,
    },
    number:{
      fontSize:25,
    },
    message:{
        paddingTop: 20,
        fontSize: 15
    },
    score:{
        fontSize:40,
    }

})