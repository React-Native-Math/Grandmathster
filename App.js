import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainMenu from './components/MainMenu';
import AdditionProblems from './components/AdditionProblems';

export default function App() {
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
