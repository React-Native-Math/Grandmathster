import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './components/Welcome';
import About from './components/About'

export default function App() {
  return (
   <View style={styles.container}>
    <Welcome />
    <About/>
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
