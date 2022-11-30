import React from 'react';
import { View, Text, Image, StyleSheet, Button, Alert, Pressable } from 'react-native';

const Separator = () => (
  <View style={styles.separator} />
);


const MainMenu = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logoPic}
        source={{
          uri: 'https://www.mathunion.org/fileadmin/IMU/Logo/IMU-logo-wt.png',
        }}
      />
      <Text>App Name</Text>
      <Separator />
      <Separator />
      

      <Pressable
      style={styles.menuButton}
        onPress={() => Alert.alert('Addition pressed')}>
          <Text style={styles.menuText}>Addition</Text>
          </Pressable>
      <Separator />
      <Pressable
      style={styles.menuButton}
        onPress={() => Alert.alert('Subtraction pressed')}>
          <Text style={styles.menuText}>Subtraction</Text>
          </Pressable>
      <Separator />
      <Pressable
      style={styles.menuButton}
        onPress={() => Alert.alert('Multiplication pressed')}>
          <Text style={styles.menuText}>Multiplication</Text>
          </Pressable>
      <Separator />
      <Pressable
      style={styles.menuButton}
        onPress={() => Alert.alert('Division pressed')}>
          <Text style={styles.menuText}>Division</Text>
          </Pressable>
      <Separator />
      <Pressable
      style={styles.menuButton}
        onPress={() => Alert.alert('Random pressed')}>
          <Text style={styles.menuText}>Random</Text>
          </Pressable>
      <Separator />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoPic: {
    height: 80,
    width: 80,
  },
  menuButton: {
    borderRadius: 100,
    backgroundColor: 'navy',
    padding: 5,
    width: 150,
    alignItems: 'center',
  },
  menuText: {
    color: 'white',
  },
  separator: {
    marginVertical: 12,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default MainMenu;
