import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainMenu from './components/MainMenu';
import AdditionProblems from './components/AdditionProblems';
import AdditionMenu from './components/AdditionMenu'
import {useFonts} from 'expo-font'


export default function App() {
  let [fontsLoaded] = useFonts({
    'Fredericka':require('./assets/fonts/FrederickatheGreat-Regular.ttf')
  })
  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <AdditionMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});
