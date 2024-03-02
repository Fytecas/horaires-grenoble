import { View, Text, StyleSheet, Pressable } from "react-native";
import { DateTime } from "luxon"


export function TimeContainer(props: {color: string, textColor: string, date?: DateTime}) {
    return (
        <View style={{backgroundColor: props.color, ...styles.container}}>
            <Text style={{color: props.textColor,...styles.text}}>{props.date? props.date.toLocaleString(DateTime.TIME_SIMPLE) : "----"}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 2,
        padding: 3,
        paddingVertical: 0,
        alignSelf: 'baseline' 
    },

    text: {
        fontWeight: "700",
        fontSize: 15
    }
})