import React, {useState, useEffect} from 'react'
import {View, StyleSheet, TextInput, Text, Button, Alert} from 'react-native'
import BouncyCheckboxGroup, {
    ICheckboxButton,
  } from "react-native-bouncy-checkbox-group";
import AdditionProblems from './AdditionProblems'


export default function AdditonMunu (){
    const [difficultyFirstNum, setDifficultyFirstNum] = useState(0)
    const [difficultySecondNum, setDifficultySecondNum] = useState(0)
    const [toggle, setToggle] = useState(false)
    const [questionAmount, setQuestionAmount] = useState(10)

    const checkboxOptions = [10, 20, 30, 'Unlimited']

    const ICheckboxButton = checkboxOptions.map((option, idx) => {
      return {
        id: idx,
        text: option,
        value: option !== "Unlimited" ? Number(option) : Infinity,
        fillColor: "#ff7473",
        unfillColor: "#fbbfbb",
        textStyle: {
          textDecorationLine: "none",
        },
        style: {
          marginTop: 16,
        },
      };
    });

    // const ICheckboxButton= [
    //     {
    //         id:0,
    //         text:10,
    //         value:10,
    //         fillColor: "#ff7473",
    //         unfillColor: "#fbbfbb",
    //         textStyle:{
    //             textDecorationLine:"none",
    //         },
    //         style: {
    //             marginTop: 16,
    //         }
    //     },
    //     {
    //         id:1,
    //         text:20,
    //         value:20,
    //         fillColor: "#ff7473",
    //         unfillColor: "#fbbfbb",
    //         textStyle:{
    //             textDecorationLine:"none",
    //         },
    //         style: {
    //             marginTop: 16,
    //         }
    //     },
    //     {
    //         id:2,
    //         text:30,
    //         value:30,
    //         fillColor: "#ff7473",
    //         unfillColor: "#fbbfbb",
    //         textStyle:{
    //             textDecorationLine:"none",
    //         },
    //         style: {
    //             marginTop: 16,
    //         }
    //     },
    //     {
    //         id:3,
    //         text:'Unlimited',
    //         value: Infinity,
    //         fillColor: "#ff7473",
    //         unfillColor: "#fbbfbb",
    //         textStyle:{
    //             textDecorationLine:"none",
    //         },
    //         style: {
    //             marginTop: 16,
    //         }
    //     },
    // ]

    const handleDifficulty = (e,first, second) =>{
        setDifficultyFirstNum(first)
        setDifficultySecondNum(second)
        setToggle(!false)
    }

    const handleQuestionAmount = (e,maxQuestions) =>{

    }

    return(
        <View>
            {toggle ? 
                <AdditionProblems 
                firstNum = {difficultyFirstNum} 
                secondNum = {difficultySecondNum}
                maxQuestionsNumber = {questionAmount}/> 
            :
            <View>
                <Text>Number of Questions</Text>
                <BouncyCheckboxGroup
                data={ICheckboxButton} 
                initial={0}
                style={styles.checkbox}
                onChange={(selectedItem)=>{
                    setQuestionAmount(selectedItem.value)
                }}
                />
                <Button
                style={styles.menuButton}
                    onPress={(e)=>handleDifficulty(e,10,10)}
                    title = 'Easy'
                >
                </Button>
                
                <Button
                    onPress={(e)=>handleDifficulty(e,100,100)}
                    title = 'Medium'
                >
                    <Text>
                        Medium
                    </Text>
                </Button>
                <Button
                    onPress={(e)=>handleDifficulty(e,1000,1000)}
                    title = 'Hard'
                >
                    <Text>
                        Hard
                    </Text>
                </Button>
            </View>
        }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    menuButton: {
      borderRadius: 100,
      backgroundColor: 'black',
      padding: 5,
      width: 150,
      alignItems: 'center',
    },
    menuText: {
      color: 'white',
    },
    separator: {
      marginVertical: 12,
    },
    checkbox: {
        flexDirection: "column",
    }
  });