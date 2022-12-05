import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import MainMenu from './components/MainMenu';

import { NavigationContainer } from '@react-navigation/native'
import Home from './routes/homeStack'

export default function App() {
  return (
    // <NavigationContainer>
    // <View style={styles.container}>
      // <StatusBar style="auto" />
      <>
      <Home />
      </>
    // </View>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
