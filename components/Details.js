import React from "react";
import {
  View,
  Text,
  Image,
} from "react-native";

const Details = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logoPic}
        source={{
          uri: "https://www.mathunion.org/fileadmin/IMU/Logo/IMU-logo-wt.png",
        }}
      />
      <Text>App Name</Text>
    </View>
  );
};

export default Details;
