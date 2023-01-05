import React, { useState } from "react";
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


const Scores = () => {
  const [store, setStore] = useGlobalState('count')
  return (
    <View>Scores: {store}</View>
  )
}

export default Scores