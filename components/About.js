
import {StyleSheet, Text, View} from 'react-native'

export default function Welcome(){
    return(
    <View style={styles.container}>
        <Text>
            Learn math facts with Mental Math
        </Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'pink',
        alignItems: 'baseline',
        justifyContent: 'center'
    }
})