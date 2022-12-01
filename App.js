import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainMenu from './components/MainMenu';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MainMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:20,
    paddingLeft: 20,
    paddingRight:20
  },
});
