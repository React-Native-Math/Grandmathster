import React, {useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import OperationScores from "./OperationScores";
import badgeAdd from "../assets/img/badgeAdd.png";
import badgeSub from "../assets/img/badgeSub.png";
import badgeMul from "../assets/img/badgeMul.png";
import badgeDiv from "../assets/img/badgeDiv.png";
import badgeRan from "../assets/img/badgeRan.png";
import selectBg from "../assets/img/selectBG.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";


const screen = Dimensions.get("screen");
const Scores = () => {
  const [addPerfectScore, setAddPerfectScore] = useState(0)
  const [subPerfectScore, setSubPerfectScore] = useState(0)
  const [mulPerfectScore, setMulPerfectScore] = useState(0)
  const [divPerfectScore, setDivPerfectScore] = useState(0)
  const [ranPerfectScore, setRanPerfectScore] = useState(0)
  const [displayOperation, setDisplayOperation] = useState('')

  const badges = [
    { img: badgeAdd, name: "Addition", func: setAddPerfectScore, perfectScores: addPerfectScore, },
    { img: badgeSub, name: "Subtraction",  func: setSubPerfectScore, perfectScores: subPerfectScore, },
    { img: badgeMul, name: "Multiplication", func: setMulPerfectScore, perfectScores: mulPerfectScore, },
    { img: badgeDiv, name: "Division", func: setDivPerfectScore, perfectScores: divPerfectScore, },
    { img: badgeRan, name: "Random", func: setRanPerfectScore, perfectScores: ranPerfectScore, }
  ];

  useEffect(() => {
    const getPerfectScores = async (idx) => {
      try {
        const operation = badges[idx].name.toLowerCase()
        let jsonValue = await AsyncStorage.getItem(operation)
        if (jsonValue === 'undefined') jsonValue = null
        // console.log('>> ', typeof(jsonValue))
        // TODO: Look into this - dirty fix above -- why is it undefined?
        const output = jsonValue != null ? JSON.parse(jsonValue) : 0
        badges[idx].func(output)
      } catch (e) {
        console.log("Error at getPerfectScores: ", e)
      }
    }
    badges.forEach((badge, idx) => getPerfectScores(idx)) 
  }, []
  )
  
   return (
    <View>
    {displayOperation ? 
      <OperationScores
      operation = {displayOperation}
      /> :
    <ImageBackground source={selectBg} resizeMode="cover">
      {badges.map((badge, idx) => {
        return (
          <View style={styles.badgeContainer} key={idx}>
            <Pressable onPress={() => setDisplayOperation(badge.name)}>
            <Image style={styles.badge} source={badge.img} />
            </Pressable>
            <View style={styles.textContainer}>
              <Text style={styles.gmText}>Grandmathster</Text>
              <Text style={styles.ofText}>of {badge.name}</Text>
              <Text style={styles.valText}>{badge.perfectScores}</Text>
            </View>
          </View>
        );
      })}
    </ImageBackground>
  }
  </View>)
};
const styles = StyleSheet.create({
  badgeContainer: {
    width: screen.width,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  badge: {
    height: 100,
    width: 100,
    margin: 5,
  },
  gmText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  ofText: {
    fontSize: 16,
    color: "red",
  },
  valText: {
    fontSize: 48,
    color: "white",
    fontWeight: "bold",
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
  },
});
export default Scores;

