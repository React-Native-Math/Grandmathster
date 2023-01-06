import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import { useGlobalState } from "../store/store";
import badgeAdd from "../assets/img/badgeAdd.png";
import badgeSub from "../assets/img/badgeSub.png";
import badgeMul from "../assets/img/badgeMul.png";
import badgeDiv from "../assets/img/badgeDiv.png";
import selectBg from "../assets/img/selectBG.jpg";
const screen = Dimensions.get("screen");
const Scores = () => {
  const [store, setStore] = useGlobalState("count");
  const badges = [
    { img: badgeAdd, name: "Addition" },
    { img: badgeSub, name: "Subtraction" },
    { img: badgeMul, name: "Multiplication" },
    { img: badgeDiv, name: "Division" },
  ];
  return (
    <ImageBackground source={selectBg} resizeMode="cover">
      {badges.map((badge, idx) => {
        return (
          <View style={styles.badgeContainer} key={idx}>
            <Image style={styles.badge} source={badge.img} />
            <View style={styles.textContainer}>
              <Text style={styles.gmText}>Grandmathster</Text>
              <Text style={styles.ofText}>of {badge.name}</Text>
              <Text style={styles.valText}>{store}</Text>
            </View>
          </View>
        );
      })}
    </ImageBackground>
  );
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
    height: 120,
    width: 120,
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

