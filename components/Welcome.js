
import {StyleSheet, Text} from 'react-native'

export default function Welcome(){
    return(
        <Text style={styles.text}>
            Welcome to Mental Math, Please select an operation to begin
        </Text>

   
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize:30,
        color:'black',
        alignItems: 'center'
    }
})