import React, {useEffect, useState} from 'react'
import {View, StyleSheet, Text, Pressable, ImageBackground, Dimensions} from 'react-native'
import schoolBackground from '../../assets/img/schoolBackground.png'
const screen = Dimensions.get('screen')


export default function GameOver ({navigation, score, questionAmount, difficulty}) {
    const [message,setMessage]= useState('')
    useEffect(()=>{
    const accuracy = score === 0 ? 0 : Math.floor(score/questionAmount*100)
    if(accuracy===100) setMessage(`Congratulations you are the Grand Mathster on ${difficulty} mode!`)
    else if(accuracy>90) setMessage(`You are a Mathster on ${difficulty} mode! keep practicing to become a Grand Mathster!`)
    else if(accuracy>75) setMessage(`You are a Novice on ${difficulty} mode! keep practicing!`)
    else if(accuracy>50) setMessage('Keep Practicing!')
    else if(accuracy>0) setMessage('Please review your math facts')
    else if(accuracy===0)setMessage('Stop Guessing!!')
    },[])
return(
    <ImageBackground source={schoolBackground} style={styles.background}>
        <View style={styles.outerContainer}>
            <Text style={styles.text}>Statistics</Text>  
            <Text style={styles.text}>Total Score: {score} out of {questionAmount} </Text>
            <Text style={styles.text}>Accuracy: {Math.floor(score/questionAmount*100)}%</Text>
         
            <Text style={styles.text}>{message}</Text>
        <Pressable
        style = {styles.homeButton}
        onPress={()=>navigation.navigate('Home')}
        >
        <Text style={styles.button}>Main Menu</Text>    
        </Pressable>
        </View>
    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background:{
        width:screen.width,
        height:screen.height*.9
    },
    homeButton:{
        borderRadius: 50,
        padding: 5,
        margin: 5,
        width: 100,
        height: 35,
        backgroundColor: '#006b3d',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontFamily:'MavenPro',
        fontSize:20
    },
    button:{
        fontSize:15,
        fontFamily:'MavenPro',
        justifyContent:'center',
        alignItems:'center',
    },
    outerContainer:{
        marginTop:150,
        justifyContent:'center',
        alignItems:'center'
    },
})