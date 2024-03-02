import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "react-native-vector-icons";
import { DateTime } from "luxon"
import { TimeContainer } from "./TimeContainer";


export function StopTimesCard(props: {name: String, dests: {name: String, times: number[]}[], color: string, textColor: string, onPress: () => any}) {
    
    return (
        <Pressable style={{...styles.container}} android_ripple={{color: 'gray', borderless: false}} onPress={props.onPress}>
            <View style={styles.title_container}>
                <View style={styles.title_text_container}>
                    <Text style={styles.text}>{"Ligne "}</Text>
                    <Text style={{...styles.text, fontWeight: "800"}}>{props.name}</Text>
                </View>
                <MaterialCommunityIcons name={"arrow-right"} style={styles.icon} size={26}/>
            </View>
            {props.dests.map((v, i) => (
                <View style={{flexDirection: "row"}} key={String(i)}>
                <FontAwesome5 name={"caret-right"} style={{...styles.icon, alignSelf: "baseline", marginTop: 2, marginLeft: 10}} size={26} key={"icon" + String(i)}/>
                <View style={styles.times_text_container} key={"times" + String(i)}>
                    <Text style={styles.text}>{v.name}</Text>
                    <View style={styles.times_container}>
                        {v.times.map((s) => (
                            <TimeContainer color={props.color} textColor={props.textColor} date={DateTime.fromMillis(s*1000).toUTC()}/>
                        ))}
                        
                    </View>
                </View>
            </View>
            ))}
            
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 3,
        borderWidth: 2,
        padding: 10,
    },

    text: {
        fontSize: 22,
        fontWeight: "500"
    },

    title_container: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    title_text_container: {
        flexDirection: "row"
    },
    icon: {
        width: 26,
        height: 26,
        alignSelf: "baseline"
    },
    times_text_container:{
        gap: 4
    },

    times_container: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 4
    }
})