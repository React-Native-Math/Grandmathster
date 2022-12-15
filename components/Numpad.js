import React, {useState} from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const Numpad = () => {
  const clickNum = (e) => {
    const clickedVal = e.target.innerText
    switch(clickedVal) {
      case "":
        setInput(0)
      case "OK":
        setInput(Number(input))
        console.log(Number(input))
        break
      case "⌫":
        const backspacedVal = input.slice(0, input.length - 1)
        console.log(backspacedVal)
        setInput(backspacedVal)
        break
      default:
        setInput(input + clickedVal)
    }
    numPadLight(e);
  };

  const numPadLight = (e) => {
    e.target.style.backgroundColor = "skyblue";
    setTimeout(() => {
      e.target.style.backgroundColor = "silver";
    }, 120);
  };

  const [input, setInput] = useState('')

  return (
    <>
      <Text style={styles.numpadContainer}>
        <View>
          {/* Top Row */}
          <View style={styles.numpadRow}>
            <Pressable style={styles.numpadPress} onPress={clickNum}>
              <Text style={styles.numpadText}>7</Text>
            </Pressable>
            <Pressable style={styles.numpadPress} onPress={clickNum}>
              <Text style={styles.numpadText}>8</Text>
            </Pressable>
            <Pressable style={styles.numpadPress} onPress={clickNum}>
              <Text style={styles.numpadText}>9</Text>
            </Pressable>
          </View>
          {/* Second Row */}
          <View style={styles.numpadRow}>
            <Pressable style={styles.numpadPress} onPress={clickNum}>
              <Text style={styles.numpadText}>4</Text>
            </Pressable>
            <Pressable style={styles.numpadPress} onPress={clickNum}>
              <Text style={styles.numpadText}>5</Text>
            </Pressable>
            <Pressable style={styles.numpadPress} onPress={clickNum}>
              <Text style={styles.numpadText}>6</Text>
            </Pressable>
          </View>
          {/* Third Row */}
          <View style={styles.numpadRow}>
            <Pressable style={styles.numpadPress} onPress={clickNum}>
              <Text style={styles.numpadText}>1</Text>
            </Pressable>
            <Pressable style={styles.numpadPress} onPress={clickNum}>
              <Text style={styles.numpadText}>2</Text>
            </Pressable>
            <Pressable style={styles.numpadPress} onPress={clickNum}>
              <Text style={styles.numpadText}>3</Text>
            </Pressable>
          </View>
          {/* Fourth Row */}
          <View style={styles.numpadRow}>
            <Pressable style={styles.numpadPress} onPress={clickNum}>
              <Text style={styles.numpadText}>0</Text>
            </Pressable>
            <Pressable style={styles.numpadPress} onPress={clickNum}>
              <Text style={styles.numpadText}>OK</Text>
            </Pressable>
            <Pressable style={styles.numpadPress} onPress={clickNum}>
              <Text style={styles.numpadText}>⌫</Text>
            </Pressable>
          </View>
        <Text style={styles.inputField}>{input}</Text>
        </View>

      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  numpadContainer: {
    color: "black",
    fontWeight: "bold",
    fontSize: 50,
    // borderColor: 'black',
    // borderWidth: '1px',
    // backgroundColor: 'red',
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  numpadRow: {
    backgroundColor: "silver",
    display: "flex",
    width: "240px",
    height: "80px",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  numpadPress: {
    // borderColor: 'black',
    // borderWidth: '1px',
    // width: '500px',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  numpadText: {
    borderColor: "black",
    borderWidth: "1px",
    width: "80px",
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
  },
  inputField: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
});

export default Numpad;
