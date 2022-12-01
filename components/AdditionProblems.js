import React, {useState, useEffect} from 'react'
import {View, StyleSheet, TextInput, Text} from 'react-native'


export default function AdditionProblems (){
    const [input, setInput] = useState(null)
    const [message, setMessage] = useState('')
    const [firstNum, setFirstNum] = useState(null)
    const [secondNum, setSecondNum] = useState(null)
    const [change,setChange] = useState(false)
    const [score, setScore] = useState(0)

    //props.first takes in the selected numbers 0-9 as an array
    useEffect(()=>{
    const propsFirst = [1,3,6]

    setFirstNum(propsFirst[Math.floor(Math.random()*propsFirst.length)])
    
    //props.second to be 10, 20, 30, 40, 10 would represent 0-10, 30 would represent 0-30
    const propsSecondNum = 10

    setSecondNum(Math.floor(Math.random()*propsSecondNum))
    },[change])
    

    function handleInputAnswer (e) {
        if(e.code==='Enter'){
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
        }}
    }

    return(
        <View style={styles.outerContainer}>
            <View style={styles.scoreContainer}>
                <Text style={styles.score}>
                Score: {score}
                </Text>
            </View>
            <View style={styles.problemContainer}>
                <div style={styles.number}>
                    {firstNum}
                </div>
                <div style={styles.number}>
                    +
                </div>
                <div style={styles.number}>
                    {secondNum}
                </div>
                <div>
                    ______
                </div>
                <div>
                    <TextInput 
                    style={styles.number}
                     placeholder='type your answer'
                     onChangeText={(userInput)=>setInput(userInput)}
                     onKeyPress={(e)=> handleInputAnswer(e) } 
                     clearTextOnFocus={true}
                     keyboardType='numeric'
                     enablesReturnKeyAutomatically='true'
                     value={input}
                     blurOnSubmit={false}
                     />
           
                </div>
                <div style={styles.message}>
                    {message}
                </div>
            </View>
        </View>
    )
}




const styles = StyleSheet.create({
    outerContainer:{
        
    },
    scoreContainer:{
        justifyContent:'top',
        flex:1,
    },
    problemContainer:{
        flex:5,
        justifyContent:'center',
        alignItems:'center',
        paddingTop:150,
    },
    number:{
      fontSize:25,
      fontStyle: 'Arial'
    },
    message:{
        paddingTop: 80,
        fontStyle: "Arial",
        fontSize: 25
    },
    score:{
        fontSize:40,
        fontStyle: "Arial"
    }

})