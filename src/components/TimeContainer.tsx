import { View, Text, StyleSheet, Pressable } from "react-native";
import { DateTime } from "luxon"


export function TimeContainer(props: {color: string, textColor: string, date?: DateTime}) {
    
    if (props.date) {
        
        const now = DateTime.now() 
        const date = props.date
        
        const diff = -(now.diff(date, ["minutes"]).minutes) // Todo: remove the -60 and fix the offset
        
        if (diff < 10) {
            return (
            <View style={{ backgroundColor: props.color,...styles.container }}>
                <Text style={{ color: props.textColor,...styles.text }}>
                {Math.floor(diff)} min
                </Text>
            </View>
            )
        } else {
            return (
            <View style={{ backgroundColor: props.color,...styles.container }}>
                <Text style={{ color: props.textColor,...styles.text }}>
                    {date.toLocaleString(DateTime.TIME_SIMPLE)}
                </Text>
            </View>
            )
        }
    }

        return (
            <View style={{ backgroundColor: props.color,...styles.container }}>
                <Text style={{ color: props.textColor,...styles.text }}>
                ----
                </Text>
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