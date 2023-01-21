import React from "react";
import {Text, StyleSheet } from "react-native";

const Footer = () => {
  return (
    <>
      <Text style={styles.footerText}>© 2022 BABM Creations</Text>
    </>
  );
};

const styles = StyleSheet.create({
  footerText: {
    color: 'grey',
    fontSize: 10,
  }
})


export default Footer;
