import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import modalImg from "../assets/img/modalPNG.png"
const screen = Dimensions.get('screen');

export default function Welcome() {
  return (
    <>
    <View style={styles.container}>
    <Text style={styles.aboutTitle}>About</Text>
    <Text style={styles.aboutText}>
    Grandmathster is a game that'll put your mental math skills to the test. If you think you're ready for the challenge, select a game mode to begin. You can sharpen your skills with digits of different lengths or try out the time attack modes.
    </Text>
      <Text style={styles.aboutTitle}>Meet the Mathsters</Text>
      <Image source={modalImg} style={styles.modalImg}></Image>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: screen.height * 0.75,
    width: screen.width * 0.8,
  },
  modalImg: {
    height: screen.height * 0.45,
    width: screen.width * 0.80
  },
  aboutTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  aboutText: {
    fontSize: 12,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  }
});
