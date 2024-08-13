import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { TimeContainer } from "./TimeContainer";
import { DateTime } from "luxon"


export function LineTimesCard(props: {color: string, textColor: string, name: string, onPress: () => any, trips: any[]}) {
    const offset = new Date().getTimezoneOffset()

    return (
        <Pressable style={styles.container} onPress={props.onPress} android_ripple={{color: 'gray', borderless: false}}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{props.name}</Text>
                <MaterialCommunityIcons name="arrow-right" size={26} style={{
        width: 26,
        height: 26}}/>
            </View>
            <View style={styles.timesContainer}>
                {props.trips.map((s, i) => <TimeContainer textColor={props.textColor} color={props.color} date={s != "|" ? DateTime.fromMillis((s + DateTime.now().set({hour:0, seconds:0, minutes:0}).toSeconds())*1000): null} key={i}/>)}
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 3,
        gap: 8
    },

    textContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    title: {
        fontSize: 22,
        flexWrap: "wrap",
        fontWeight: "800"
    },

    timesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 4
    }
})