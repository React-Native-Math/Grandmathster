import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Dimensions
} from "react-native";
import Footer from "./Footer";
import mainMenuBG from "../assets/img/mainMenuBG.jpg"
const screen = Dimensions.get("screen");

const Separator = () => <View style={styles.separator} />;
const bg = { uri: "https://i.pinimg.com/736x/b8/38/af/b838afc8dd3a316f75b93ca9f78ce024.jpg" };

const menuItems = [
  "ADDITION",
  "SUBTRACTION",
  "MULTIPLICATION",
  "DIVISION",
  "RANDOM",
];

const MainMenu = ({ navigation }) => {
  const [about, setAbout] = useState(false)
  const capitalizeFirstChar = (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  return (
      <ImageBackground source={mainMenuBG} resizeMode="stretch" style={styles.bg} >
    <View style={styles.container}>
  {about ? <View style={styles.overlayContainer}>
  <View style={styles.overlay}/>
  </View> : <View></View>}
      <Separator />
      {menuItems.map((item, idx) => {
        return (
          <View key={idx}>
            <Pressable
              style={styles.menuButton}
              onPress={() => navigation.navigate(`${capitalizeFirstChar(item)}Menu`)}
            >
              <Text style={styles.menuText}>{item}</Text>
            </Pressable>
            <Separator />
          </View>
        );
      })}
            <Pressable style={styles.menuButton} onPress={() => navigation.navigate(`Scores`)}>
            <Text style={styles.menuText}>SCORES</Text>
            </Pressable>
      <View style={styles.footer}>
      <Footer/>
      </View>
    </View>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 250,
  },
  logoPic: {
    height: 80,
    width: 80,
  },
  menuButton: {
    borderRadius: 100,
    backgroundColor: "black",
    borderColor: "#B8100F",
    borderWidth: 3,
    padding: 5,
    width: screen.height > 1000 ? 250 : 150,
    height: screen.height > 1000 ? 45 : 30,
    alignItems: "center",
  },
  menuText: {
    color: "white",
    fontWeight: "bold",
    fontSize: screen.height > 1000 ? 20:12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    marginVertical: 12,
  },
  footer: {
    height: 125,
    width: 125,
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
    height: 75,
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
    position: 'flex',
    paddingTop: 50,
  }
});

export default MainMenu;
