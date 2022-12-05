import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";

const Separator = () => <View style={styles.separator} />;

const menuItems = [
  "Addition",
  "Subtraction",
  "Multiplication",
  "Division",
  "Random",
];

const MainMenu = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Image
        style={styles.logoPic}
        source={{
          uri: "https://www.mathunion.org/fileadmin/IMU/Logo/IMU-logo-wt.png",
        }}
      />
      <Text>App Name / instructions</Text>
      <Separator />
      <Separator />
      {menuItems.map((item, idx) => {
        return (
          <View key={idx}>
            <Pressable
              style={styles.menuButton}
              onPress={() => navigation.navigate(`${item}Game`)}
            >
              <Text style={styles.menuText}>{item}</Text>
            </Pressable>
            <Separator />
          </View>
        );
      })}
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
});

export default MainMenu;
