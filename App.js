import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainMenu from './components/MainMenu';
import AdditionProblems from './components/AdditionProblems';
import {useFonts} from 'expo-font'

export default function App() {
  let [fontsLoaded] = useFonts({
    'Fredericka':require('./assets/fonts/FrederickatheGreat-Regular.ttf')
  })
  return (
    <View >
      {/* <StatusBar style="auto" /> */}
      <AdditionProblems />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 3,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop:20,
//     paddingLeft: 20,
//     paddingRight:20
//   },
// });
