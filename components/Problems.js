import React, {useState} from 'react'
import {View, StyleSheet, TextInput} from 'react-native'


export default function AdditionProblems (){

    //props.first takes in the selected numbers 0-9
    const propsFirst = [1,3,6]

    firstNum = propsFirst[Math.floor(Math.random()*propsFirst.length)]
    
    //props.second to be 10, 20, 30, 40, 10 would represent 0-10, 30 would represent 0-30
    const propsSecondNum = 10

    const SecondNum = Math.floor(Math.random()*propsSecondNum)

    return(
        <View>

        </View>
    )
}




const styles = Stylesheet.create({


})