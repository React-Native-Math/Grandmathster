import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
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
const screenHeightAdjusted = screen.height - 45; // subtract height of navigation stack bar

const Scores = () => {
  const [addPerfectScore, setAddPerfectScore] = useState(0);
  const [subPerfectScore, setSubPerfectScore] = useState(0);
  const [mulPerfectScore, setMulPerfectScore] = useState(0);
  const [divPerfectScore, setDivPerfectScore] = useState(0);
  const [ranPerfectScore, setRanPerfectScore] = useState(0);
  const [displayOperation, setDisplayOperation] = useState("");

  const badges = [
    {
      img: badgeAdd,
      name: "Addition",
      func: setAddPerfectScore,
      perfectScores: addPerfectScore,
    },
    {
      img: badgeSub,
      name: "Subtraction",
      func: setSubPerfectScore,
      perfectScores: subPerfectScore,
    },
    {
      img: badgeMul,
      name: "Multiplication",
      func: setMulPerfectScore,
      perfectScores: mulPerfectScore,
    },
    {
      img: badgeDiv,
      name: "Division",
      func: setDivPerfectScore,
      perfectScores: divPerfectScore,
    },
    {
      img: badgeRan,
      name: "Random",
      func: setRanPerfectScore,
      perfectScores: ranPerfectScore,
    },
  ];

  useEffect(() => {
    const getPerfectScores = async (idx) => {
      try {
        const operation = badges[idx].name.toLowerCase();
        let jsonValue = await AsyncStorage.getItem(operation);
        if (jsonValue === "undefined") jsonValue = null;
        // console.log('>> ', typeof(jsonValue))
        // TODO: Look into this - dirty fix above -- why is it undefined?
        const output = jsonValue != null ? JSON.parse(jsonValue) : 0;
        badges[idx].func(output);
      } catch (e) {
        console.log("Error at getPerfectScores: ", e);
      }
    };
    badges.forEach((badge, idx) => getPerfectScores(idx));
  }, []);

  return (
    <View>
      <ScrollView>
        {displayOperation ? (
          <OperationScores operation={displayOperation} />
        ) : (
          <ImageBackground
            source={selectBg}
            resizeMode="cover"
            style={styles.outerContainer}
          >
            <View style={styles.topTextContainer}>
              <Text style={styles.topText}>
                Here are all your achievements! Touch each badge to see your
                time attack top scores
              </Text>
            </View>
            {badges.map((badge, idx) => {
              return (
                <View style={styles.badgeContainer} key={idx}>
                  <Pressable onPress={() => setDisplayOperation(badge.name)}>
                    <Image
                      style={styles.badge}
                      source={badge.img}
                      transition={false}
                    />
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
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  outerContainer: {
    height: screenHeightAdjusted,
    width: screen.width,
    backgroundColor: "red",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  topTextContainer: {
    height: screenHeightAdjusted * 0.1,
    width: screen.width,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderBottomColor: "red",
    padding: 10,
  },
  topText: {
    textAlign: "center",
    color: "white",
    fontSize: screenHeightAdjusted * 0.015,
  },
  badgeContainer: {
    height: screenHeightAdjusted / 5.8,
    width: screen.width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: screenHeightAdjusted * 0.02,
    borderWidth: 2,
    borderBottomColor: "red",
  },
  badge: {
    height: screenHeightAdjusted * 0.1,
    width: screenHeightAdjusted * 0.1,
    margin: 5,
  },
  gmText: {
    fontSize: screenHeightAdjusted * 0.02,
    color: "white",
    textShadowColor: "white",
    textShadowRadius: 30,
    fontWeight: "bold",
  },
  ofText: {
    fontSize: screenHeightAdjusted * 0.018,
    color: "red",
  },
  valText: {
    fontSize: screenHeightAdjusted * 0.05,
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
