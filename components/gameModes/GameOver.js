import React, {useEffect, useState} from 'react'
import {View, StyleSheet, Text, Pressable, ImageBackground, Dimensions} from 'react-native'
import schoolBackground from '../../assets/img/schoolBackground.png'
const screen = Dimensions.get('screen')
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function GameOver ({navigation, score, questionAmount, difficulty, operation, timeAtt, timeAmt, custom}) {
    const [message,setMessage]= useState('')
    const [previousHighScores, setPreviousHighScores] = useState({})
    const [hit, setHit] = useState(true)
    const [scoreSaved, setScoreSaved] = useState(false)
    //AsyncStorage of High Scores notes:
    //have problems page pass in gameOver screen operation, if timeAtt, and timeAmt
    //Store objects with keys that look like operation_timeAmt so addition_10 or addition_30
    //Do not store custom timeAtt amounts.
    //object will store only 3 scores ie addition_10 = {highScore : 10, midScore : 7, lowScore : 6}
    //Check to see if timeAtt mode and not custom settings. If timeAtt mode pull scores.
    //Correctly store the new score in the object or don't store at all if not a new high score.
    //Write that object to the database overwriting previous object.

    const getHighScores = async () =>{
        try{
            const savedHighScores = await AsyncStorage.getItem(operation + '_' + timeAmt)
            savedHighScores != null ? JSON.parse(savedHighScores) : null
            console.log(savedHighScores)
            if(!savedHighScores){
                setPreviousHighScores({
                    highScore:0,
                    midScore:0,
                    lowScore:0
                })
            }
            else {setPreviousHighScores(savedHighScores)}
        }catch(e){ 
            console.log(e)
        }
    }

    const setHighScores = async (newHighScoreObj) =>{
        try{
            const jsonValue = JSON.stringify(newHighScoreObj)
            await AsyncStorage.setItem(operation + '_' + timeAmt, jsonValue)
        }catch(e){
            console.log(e)
        }
    }
    
    const writeNewScores = async (previousHighScores, score) => {
        if(typeof(previousHighScores)!=='object'){
        previousHighScores = JSON.parse(previousHighScores)
        }
      
        if(score>previousHighScores.highScore){
            const newHighScores = {
                lowScore:previousHighScores.midScore,
                midScore:previousHighScores.highScore,
                highScore:score,
            }
          
            await setHighScores(newHighScores)
        }
        else if(score>previousHighScores.midScore){
            const newHighScores ={
                highScore:previousHighScores.highScore,
                lowScore:previousHighScores.midScore,
                midScore:score,
            }
            await setHighScores(newHighScores)
        }
        else if(score>previousHighScores.lowScore){
            const newHighScores = {
                ...previousHighScores,
                lowScore:score
            }
            await setHighScores(newHighScores)
        }
        setScoreSaved(true)
    }

    useEffect(()=>{
    const accuracy = Math.floor(score/questionAmount*100)
    if(timeAtt && !custom){
        getHighScores()
        
    }
    if(accuracy===100) setMessage(`Congratulations you are the Grand Mathster on ${difficulty} mode!`)
    else if(accuracy>90) setMessage(`You are a Mathster on ${difficulty} mode! Keep practicing to become the Grand Mathster!`)
    else if(accuracy>75) setMessage(`You are a Novice on ${difficulty} mode! Keep practicing to become a Mathster!`)
    else if(accuracy>50) setMessage('Keep Practicing!')
    else if(accuracy>0) setMessage('Please review your math facts')
    else if(accuracy===0)setMessage('Stop Guessing')
    },[hit])
    
return(

    <ImageBackground source={schoolBackground} style={styles.background}>
        <View style={styles.outerContainer}>
            <Text style={styles.text}>Statistics</Text>  
            <Text style={styles.text}>Total Score: {score} out of {questionAmount} </Text>
            <Text style={styles.text}>Accuracy: {Math.floor(score/questionAmount*100)}%</Text>
        <View style={styles.messageContainer}>
            <Text style={styles.text}>{message}</Text>
        </View>
        <Pressable
        style = {styles.homeButton}
        onPress={()=>navigation.navigate('Home')}
        >
        <Text style={styles.buttonText}>Main Menu</Text>    
        </Pressable>
        {timeAtt && !custom && !scoreSaved ?
        <Pressable
        style ={styles.homeButton}
        onPress={()=>writeNewScores(previousHighScores,score)}
        >
        <Text style={styles.buttonText}>Save to High Scores</Text>
        </Pressable> :null}
        </View>
    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background:{
        width:screen.width,
        height:screen.height*.89,
        justifyContent:'center',
        alignItems:'center'
    },
    messageContainer:{
        textAlign:'center',
        marginTop:5
    },
    homeButton:{
        borderRadius: 50,
        padding: 5,
        margin: 10,
        width: 125,
        height: 40,
        backgroundColor: '#006b3d',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontFamily:'MavenPro',
        fontSize:20,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText:{
        fontSize:20,
        fontFamily:'MavenPro',
        justifyContent:'center',
        alignItems:'center',
    },
    outerContainer:{
        justifyContent:'center',
        alignItems:'center',
        width:screen.width*.8,

    },
})