import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  Pressable,
  Linking,
} from "react-native";
import badgeOutline from "../assets/img/badgeOutline.png";
const screen = Dimensions.get("screen");

export default function Welcome() {
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.sectionHeading}>About</Text>
          <Text style={styles.sectionInfo}>
            Grandmathster is a game that'll put your mental math skills to the
            test. If you think you're ready for the challenge, select a game
            mode to begin. You can sharpen your skills with digits of different
            lengths or try out the time attack modes.
          </Text>
          <Text style={styles.sectionHeading}>Game Modes</Text>
          <Text style={styles.sectionInfo}>
            The four modes of the game are based on the four mathematical
            operators (+, -, ×, ÷). Once you've nailed these, there's a
            randomized mode you can try too! Some helpful tips:
          </Text>
          {/* Addition Tip */}
          <View style={styles.gameModeContainer}>
            <View style={styles.gameMode}>
              <Text style={styles.tipTitle}>Addition</Text>
              <Text style={styles.tipText}>Learn your doubles really well</Text>
              <Text style={styles.tipText}>
                So if we know:{"\n"}1 + 1 = 2{"\n"}5 + 5 = 10{"\n"}
                {"\n"}5 + 6 = 10 + 1 (= 11)
              </Text>
            </View>
            {/* Multiplication Tip */}
            <View style={styles.gameMode}>
              <Text style={styles.tipTitle}>Multiplication</Text>
              <Text style={styles.tipText}>Can you just add products?</Text>
              <Text style={styles.tipText}>
                So if we know:{"\n"}3 × 20 = 60{"\n"}3 × 4 = 12{"\n"}
                {"\n"}3 × 24 = 60 × 12 (= 72)
              </Text>
            </View>
            {/* Subtraction Tip */}
            <View style={styles.gameMode}>
              <Text style={styles.tipTitle}>Subtraction</Text>
              <Text style={styles.tipText}>Reuse your addition skills!</Text>
              <Text style={styles.tipText}>
                See: 8 - 6 = ?{"\n"}
                Say: 6 plus what number gives 8?{"\n"}
                {"\n"}8 - 6 (= 2)
              </Text>
            </View>
            {/* Division Tip */}
            <View style={styles.gameMode}>
              <Text style={styles.tipTitle}>Division</Text>
              <Text style={styles.tipText}>
                Simplify multiples where possible
              </Text>
              <Text style={styles.tipText}>
                See: 18 ÷ 6 = ?{"\n"}
                Say: Can I divide each number? (e.g. by 2){"\n"}
                {"\n"}
                18 ÷ 6 = 9 ÷ 3 (= 3)
              </Text>
            </View>
          </View>
          <Text style={styles.sectionHeading}>Scores</Text>
          <View style={styles.scoresSectionContainer}>
            <Image source={badgeOutline} style={styles.badge}></Image>
            <Text style={styles.sectionInfo}>
              At the end of each game, you'll achieve a rank and get to see how
              many questions you answered correctly. The more often you become a
              Grandmathster, the more badges you can collect. Check the scores
              page for your achievements and high scores.
            </Text>
          </View>
          <Text style={styles.sectionHeading}>Feedback</Text>
          <Text style={styles.sectionInfo}>
            We hope you enjoy improving your mental math skills with
            Grandmathster. Please help us improve this game in future updates by leaving reviews on the app store. If you would like to provide any other feedback or report issues with the app, please touch below to contact (opens email client):
            {"\n"}
            {"\n"}

            <View style={styles.emailLinksContainer}>
            <Pressable
              style={styles.emailLinks}
              onPress={() =>
                Linking.openURL(
                  "mailto:babbas.uk@gmail.com?subject=SendMail&body=Description"
                )
              }
            >
              babbas.uk@gmail.com
            </Pressable>
            <Pressable
              style={styles.emailLinks}
              onPress={() =>
                Linking.openURL(
                  "mailto:INSERT_EMAIL@gmail.com?subject=SendMail&body=Description"
                )
              }
            >
              INSERT_EMAIL@gmail.com
            </Pressable>
            </View>
          </Text>
        </View>
      </ScrollView>
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
  // modalImg: {
  //   height: screen.height * 0.45,
  //   width: screen.width * 0.80
  // },
  sectionHeading: {
    color: "white",
    fontWeight: "bold",
    fontSize: screen.height * 0.02,
    marginBottom: (screen.height / 2) * 0.01,
    marginTop: (screen.height / 2) * 0.05,
  },
  sectionInfo: {
    fontSize: screen.height * 0.015,
    color: "white",
    textAlign: "center",
  },
  gameModeContainer: {
    display: "flex",
    flexWrap: "wrap",
    height: screen.height * 0.4,
    width: screen.width * 0.8,
    backgroundColor: "#B8100F",
    justifyContent: "center",
    alignItems: "center",
    marginTop: (screen.height / 2) * 0.05,
  },
  gameMode: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: (screen.height * 0.4) / 2,
    width: (screen.width * 0.8) / 2,
    backgroundColor: "black",
    // borderLeftColor: 'red',
    // borderLeftWidth: 1,
    // borderTopColor: 'red',
    // borderTopWidth: 1,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: screen.height * 0.02,
  },
  tipTitle: {
    marginTop: screen.height * 0.015,
    fontWeight: "bold",
    fontSize: screen.height * 0.015,
    color: "white",
  },
  tipText: {
    fontSize: screen.height * 0.015,
    textAlign: "center",
    color: "white",
    margin: 5,
  },
  scoresSectionContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    height: screen.height * 0.1,
    width: screen.height * 0.1,
    marginLeft: screen.height * 0.02,
  },
  emailLinksContainer: {
    display: 'flex',
    justifyContent: "space-around",
    height: screen.height * 0.05,
  },
  emailLinks: {
    color: "white",
    fontWeight: "bold",
    textDecorationLine: "underline",
    textDecorationColor: "red",
    textDecorationStyle: "solid",
  },
});
