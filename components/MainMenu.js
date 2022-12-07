import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import appLogo from '../assets/img/appLogo.png'
import Footer from "./Footer";

const Separator = () => <View style={styles.separator} />;

const menuItems = [
  "Addition",
  "Subtraction",
  "Multiplication",
  "Division",
  "Random",
];

const MainMenu = ({ navigation }) => {
  const [about, setAbout] = useState(false)
  return (
    <View style={styles.container}>
  {about ? <View style={styles.overlayContainer}>
  <View style={styles.overlay}/>
  </View> : <View></View>}
      <Image
        style={styles.logoPic}
        source={appLogo}
      />
      <Text>App Name / instructions</Text>
      <Separator />
      <Separator />
      {menuItems.map((item, idx) => {
        return (
          <View key={idx}>
            <Pressable
              style={styles.menuButton}
              onPress={() => navigation.navigate(`${item}Menu`)}
            >
              <Text style={styles.menuText}>{item}</Text>
            </Pressable>
            <Separator />
          </View>
        );
      })}
      <Pressable
              style={styles.menuButton}
              onPress={() => setAbout(!about)}
            >
              <Text style={styles.menuText}>About</Text>
            </Pressable>
      <View style={styles.footer}>
      <Footer/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  logoPic: {
    height: 80,
    width: 80,
  },
  menuButton: {
    borderRadius: 100,
    backgroundColor: "navy",
    padding: 5,
    width: 150,
    alignItems: "center",
  },
  menuText: {
    color: "white",
  },
  separator: {
    marginVertical: 12,
    // borderBottomColor: '#737373',
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },
  footer: {
    height: 100,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlayContainer: {
    display: 'flex',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    borderRadius: 5,
    zIndex: 1,
    width: '80%',
    height: '97%',
    backgroundColor: 'red',
    opacity: 1,
  }
});

export default MainMenu;
