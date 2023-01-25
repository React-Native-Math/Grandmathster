import React from "react";
import { Text, StyleSheet, Dimensions } from "react-native";
const screen = Dimensions.get("window");
const screenHeightAdjusted = screen.height - 45; // subtract height of navigation stack bar

const Footer = () => {
  return (
    <>
      <Text style={styles.footerText}>© 2023 BABM Creations</Text>
    </>
  );
};

const styles = StyleSheet.create({
  footerText: {
    color: "red",
    fontSize: screenHeightAdjusted * 0.0125,
    textAlign: "center",
    width: screen.width,
  },
});

export default Footer;
