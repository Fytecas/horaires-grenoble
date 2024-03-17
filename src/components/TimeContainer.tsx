import { View, Text, StyleSheet, Pressable } from "react-native";
import { DateTime } from "luxon"
import { useState } from "react";


export function TimeContainer(props: { color: string, textColor: string, date?: DateTime }) {
    const [timeToDisplay, setTimeToDisplay] = useState("");
    const {date} = props
    setInterval(() => {
        if (props.date) {
                    const now = DateTime.now()
                    const diffMinutes = Math.floor(date.diff(DateTime.fromMillis(now.hour*60*60*1000 + now.minute*60*1000), "minutes").minutes)
                    
                    if (diffMinutes < 10) {
                        setTimeToDisplay(`${diffMinutes} min`)
                    } else {
                        setTimeToDisplay(date.toLocaleString(DateTime.TIME_SIMPLE));
                    }
                    
                }
        else if (timeToDisplay != "----") setTimeToDisplay("----")
    }, 1000)
    

    return (
        <View style={{ backgroundColor: props.color, ...styles.container }}>
            <Text style={{ color: props.textColor, ...styles.text }}>{timeToDisplay}</Text>
        </View>
    );
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