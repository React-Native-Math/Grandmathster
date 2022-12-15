import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";
import appLogo from '../assets/img/appLogo.png'
import Footer from "./Footer";
import Numpad from "./Numpad";

const Separator = () => <View style={styles.separator} />;
const bg = { uri: "https://i.pinimg.com/736x/b8/38/af/b838afc8dd3a316f75b93ca9f78ce024.jpg" };

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
      <ImageBackground source={bg} resizeMode="contain" style={styles.bg} >
    <View style={styles.container}>
  {about ? <View style={styles.overlayContainer}>
  <View style={styles.overlay}/>
  </View> : <View></View>}
      <Image
        style={styles.logoPic}
        source={appLogo}
      />
      {/* NimbleNums, Grandmathster, Enumer8*/}
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
      {/* <Numpad /> */}
      </View>
    </View>
      </ImageBackground>
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
    width: 100,
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
    height: 100,
    width: 100,
  },
  overlay: {
    position: 'absolute',
    borderRadius: 5,
    zIndex: 1,
    width: 80,
    height: 97,
    backgroundColor: 'red',
    opacity: 1,
  },
  bg: {
    flex: 1,
    justifyContent: "center",
  }
});

export default MainMenu;
