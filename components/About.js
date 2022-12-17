import { StyleSheet, Text, View, Dimensions } from "react-native";
const screen = Dimensions.get('screen');

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text>Learn math facts with Mental Math</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "baseline",
    justifyContent: "center",
    height: screen.height * 0.75,
    width: screen.width * 0.8,
  },
});
