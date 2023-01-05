import React, {useEffect, useState} from 'react'
import {View, StyleSheet, Text, Pressable, ImageBackground, Dimensions} from 'react-native'
import schoolBackground from '../../assets/img/schoolBackground.png'
const screen = Dimensions.get('screen')
import { useGlobalState } from '../../store/store'


export default function GameOver ({navigation, score, questionAmount, difficulty}) {
    const [message,setMessage]= useState('')
    const [store, setStore] = useGlobalState('count')
    useEffect(()=>{
    const accuracy = Math.floor(score/questionAmount*100)
    if(accuracy===100) { setMessage(`Congratulations you are the Grand Mathster on ${difficulty} mode!`)
    setStore(store + 1) }
    else if(accuracy>90) setMessage(`You are a Mathster on ${difficulty} mode! Keep practicing to become the Grand Mathster!`)
    else if(accuracy>75) setMessage(`You are a Novice on ${difficulty} mode! Keep practicing to become a Mathster!`)
    else if(accuracy>50) setMessage('Keep Practicing!')
    else if(accuracy>0) setMessage('Please review your math facts')
    else if(accuracy===0)setMessage('Stop Guessing')
    },[])
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