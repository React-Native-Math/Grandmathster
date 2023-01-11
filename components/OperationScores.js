import React, {useEffect,useState} from "react";
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    Dimensions
  } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import selectBG from '../assets/img/selectBG.jpg'
const screen = Dimensions.get("screen")

export default function OperationScores (props){
    const [highScoresArr,setHighScoresArr]=useState([])
    const [loaded, setLoaded] = useState(false)

    const getHighScores = async (operation)=>{
        const lookUpArr = [`${operation}_10`,`${operation}_30`,`${operation}_60`]
        try{
            const highScores = await AsyncStorage.multiGet(lookUpArr)

            setHighScoresArr(highScores)

            setLoaded(true)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getHighScores(props.operation.toLowerCase())
    },[loaded])

    return(
        <ImageBackground source={selectBG} resizeMode="cover">
        <View style={styles.outerContainer}>
            <Text>
            {props.operation.toUpperCase()} TIME ATTACK SCORES
            </Text>
            {highScoresArr.length ?
            highScoresArr.map((elem, idx)=>{
                if(elem[1]){
                    let scoreObject = JSON.parse(elem[1])
                    return(
                    <Text key={idx}>
                        {props.operation} in {elem[0].slice(-2)} seconds
                        1. {scoreObject.highScore} points
                        2. {scoreObject.midScore} points
                        3. {scoreObject.lowScore} points
                    </Text>)}
            }):null
            }
        </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        height: screen.height,
    }
})