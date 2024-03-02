import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";


export function ItemCard(props: {icon?: string, color?: string, textColor?: string, type: string, name: string, onPress: () => any}) {
    return (
        <Pressable style={{...styles.container, flexDirection: "row", justifyContent: "space-between"}} onPress={props.onPress} android_ripple={{color: 'gray', borderless: false}}>
                <View style={styles.content}>
                    <View style={{...styles.icon_container, backgroundColor: props.color ? props.color : "transparent"}}>
                        <MaterialCommunityIcons name={props.icon ? props.icon : "tram"} style={styles.icon} size={26} color={props.textColor ? props.textColor:"black"}/>
                    </View>
                    <View style={styles.text_container}>
                        <Text style={styles.type}>{props.type}</Text>
                        <Text style={styles.name}>{props.name}</Text>
                    </View>
                </View>
                <MaterialCommunityIcons name="arrow-right" style={styles.icon} size={26} />
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

    type: {
        fontSize: 22,
        alignSelf: "baseline"
    },

    name: {
        fontSize: 22,
        alignSelf: "center",
        fontWeight: "800",
        maxWidth: "100%"
    },

    icon: {
        alignSelf: "center",
        width: 26,
        height: 26
    },

    icon_container: {
        borderWidth: 2,
        borderRadius: 1,
        justifyContent: "center",
        height: 38,
        padding: 4,
    },

    text_container: {
        flexDirection: "row",
        alignSelf: "center",
        maxWidth: '75%'
    },
    
    content: {
        flexDirection: "row",
        gap: 8
    }
})