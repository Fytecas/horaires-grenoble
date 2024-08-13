import { View, Text, StyleSheet, Pressable, StatusBar } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";

// TODO: fix status bar style adapting by textcolor


export function CustomHeader(props) {
    
    return (
        <View style={{...styles.header, backgroundColor: props.route.params ? props.route.params.color : "white"}}>
            <StatusBar barStyle={(props.route.params && (props.route.params.textColor == "FFFFFF")) ? "light-content" : "dark-content"} backgroundColor={props.route.params ? props.route.params.color : "white"}/>
            <View style={{...styles.container}}>
                <View style={styles.left_container}>
                    {props.navigation.canGoBack() && backIcon(props)}
                    {props.route.params ? (
                        <View style={{flexDirection: "row"}}>
                            <Text style={{...styles.title, color: props.route.params.textColor || "black"}}>{props.route.params.type == "line" ? "Ligne " : ""}</Text>
                            <Text style={{...styles.title, fontWeight: "800", color: props.route.params.textColor || "black"}}>{props.route.params.name}</Text>
                            {props.route.name == "line" && <Text style={{...styles.title, color: props.route.params.textColor || "black"}}>{" "}(théorique)</Text>}
                        </View>
                        
                    )
                    : (
                        <Text style={styles.title}>{props.options.title}</Text>
                    )}
                </View>
                {!props.navigation.canGoBack() && (
                <Pressable onPress={() => props.navigation.push("info")} style={styles.iconPressable}>
                    <MaterialCommunityIcons name="information" size={26} style={{...styles.icon, color: props.route.params ? props.route.params.textColor : "black"}}/>
                </Pressable>)}
            </View>
        </View>
    )
}

function backIcon(props){
    return (
        <Pressable onPress={() => props.navigation.goBack()} style={styles.iconPressable}>
            <MaterialCommunityIcons name="arrow-left" size={26} style={{...styles.icon, color: props.route.params ? props.route.params.textColor : "black"}}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 44,
        justifyContent: 'center', //Centered vertically
        backgroundColor: "white",
        borderBottomColor: "black",
        borderBottomWidth: 2,
        paddingLeft: 10,
    },

    title: {
        fontSize: 24,
        fontWeight: "500",
        justifyContent: "center",
        textAlignVertical: 'center',
    },
    container:{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 8
    },

    left_container: {
        flexDirection: "row",
        gap: 8
    },

    icon: {
        width: 26, 
        height: 26,
        alignSelf: "center",
    },
    iconPressable: {
        alignSelf: "center",
        padding: 8,
        paddingRight: 10
    }
})