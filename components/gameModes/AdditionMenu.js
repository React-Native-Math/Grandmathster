import React, {useState} from 'react'
import {View, StyleSheet, Text, Button, Pressable} from 'react-native'
import BouncyCheckboxGroup, {ICheckboxButton} from "react-native-bouncy-checkbox-group";
import AdditionProblems from './AdditionProblems'


export default function AdditonMunu ({navigation}){
    const [difficultyFirstNum, setDifficultyFirstNum] = useState(0)
    const [difficultySecondNum, setDifficultySecondNum] = useState(0)
    const [toggle, setToggle] = useState(false)
    const [questionAmount, setQuestionAmount] = useState(10)
    const [timeAttack, setTimeAttack] = useState(false)
    const [timeAmount, setTimeAmount] = useState(1000000000)

    const ICheckboxButton= [
        {
            id:0,
            text:10,
            value:10,
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            textStyle:{
                textDecorationLine:"none",
            }
        },
        {
            id:1,
            text:20,
            value:20,
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            textStyle:{
                textDecorationLine:"none",
            }
        },
        {
            id:2,
            text:30,
            value:30,
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            textStyle:{
                textDecorationLine:"none",
            }
        },
        {
            id:3,
            text:'Unlimited',
            value: Infinity,
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            textStyle:{
                textDecorationLine:"none",
            }
        },
        {
            id:4,
            text:'Time Attack 10 seconds',
            value:'time1',
            textStyle:{
                textDecorationLine:"none",
            }
        },
        {
            id:5,
            text:'Time Attack 30 seconds',
            value:'time2',
            textStyle:{
                textDecorationLine:"none",
            }
        },
        {
            id:6,
            text:'Time Attack 60 seconds',
            value:'time3',
            textStyle:{
                textDecorationLine:"none",
            }
        },
    ]

    const handleDifficulty = (e,first, second) =>{
        setDifficultyFirstNum(first)
        setDifficultySecondNum(second)
        setToggle(!false)
        
    }

    const handleSelection = (selectedItem)=>{
        if(selectedItem.value=='time1'){
            setTimeAttack(true)
            setQuestionAmount(1000)
            setTimeAmount(10)
        }
        else if(selectedItem.value=='time2'){
            setTimeAttack(true)
            setQuestionAmount(1000)
            setTimeAmount(30)
        }
        else if(selectedItem.value=='time3'){
            setTimeAttack(true)
            setQuestionAmount(1000)
            setTimeAmount(60)
        }
        else{
        setQuestionAmount(selectedItem.value)
    }}

    return(
        <View>
            {toggle ? 
                <AdditionProblems 
                firstNum = {difficultyFirstNum} 
                secondNum = {difficultySecondNum}
                maxQuestionsNumber = {questionAmount}
                timeAtt={timeAttack}
                timeAmt={timeAmount}
                /> 
            :
            <View>
                <Text>Number of Questions or set amount of time</Text>
                <BouncyCheckboxGroup
                style={{flexDirection:"column"}}
                data={ICheckboxButton} 
                initial={0}
                onChange={handleSelection}
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
                <Pressable
                    onPress={()=>navigation.navigate('AdvancedSettingsAddition')}
                >
                    <Text>Advanced Settings</Text>
                </Pressable>
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
  });