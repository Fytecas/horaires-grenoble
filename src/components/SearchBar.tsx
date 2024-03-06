import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";

export function SearchBar(props: {onChangeText: (text) => any}) {
    
    return (
        <Pressable onPress={() => this.TextInput.focus()} style={styles.container}>
            <MaterialIcons name="search" size={26} style={styles.icon} />
            <TextInput 
                ref={(input) => { this.TextInput = input; }}
                style={styles.input} 
                placeholder="Rechercher..." 
                onChangeText={props.onChangeText}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderRadius: 3, 
        flexDirection: "row", 
        padding: 8,
        paddingTop: 4,
        paddingBottom: 4,
        gap: 8
    },

    input: {
        borderWidth: 0,
        fontSize: 22,
        width: "100%"
    },
    
    icon: {
        marginTop: 3
    }
})