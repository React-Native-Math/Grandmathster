import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useGlobalState } from "../store/store";
import OperationScores from "./OperationScores";


const Scores = () => {
  const [store, setStore] = useGlobalState('count')
  const [displayOperation, setDisplayOperation] = useState('')
  const displayOptions = ['Addition','Subtraction,','Multiplication','Division','Mixed Operations']

  return (
    <View>
    {displayOperation ? 
      <OperationScores
        operation={displayOperation}
      />
     :
    <View>
      {displayOptions.map((option, idx)=>{
        return(
          <Pressable
          key ={idx}
          style = {styles.menuButton}
          onPress={(e)=>
            setDisplayOperation(option)
          }>
            <Text style={styles.menuText}>
              {option}
            </Text>
          </Pressable>
        )
      })}
    </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  menuButton: {
    borderRadius: 50,
    padding: 5,
    margin: 5,
    width: 70,
    height: 50,
    backgroundColor: "black",
    borderWidth: 5,
    borderColor: "#006b3d",
    // backgroundColor: '#006b3d',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menuText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
})

export default Scores