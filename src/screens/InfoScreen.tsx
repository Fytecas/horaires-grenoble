import { A } from "@expo/html-elements";
import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Button, Divider } from "react-native-paper";
import { getItemsData } from "../api";

export function InfoScreen({ navigation, ...props }) {
    const [loading, setLoading] = useState(false)
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>
                Cette application n’est pas une application gouvernementale ou officielle, elle utilise le réseau public data.mobilites-m.fr pour fournir les horaires en temps réel des transports en communs de la ville de Grenoble. Le développeur n’est pas affilié à MTag.
            </Text>
            <A style={styles.link} href="https://fytecas.github.io/horaires-grenoble/">
                Règles de confidentialité
                <MaterialCommunityIcons name="arrow-top-right" style={styles.icon} size={20} />
            </A>
            <Text style={styles.text}>
                Les horaires affichés dans la vue de ligne sont, pour des raisons techniques, théoriques.
                Tout les autres horaires affichés sont en temps réel.
            </Text>
            <Text style={styles.title}>Paramètres</Text>
            <Divider bold={true} style={styles.divider}/>
            <Button
                mode="contained" 
                buttonColor="#337AB7"
                icon="refresh"
                loading={loading}
                disabled={loading}
                onPress={() => {
                    setLoading(true)
                    getItemsData().then(() => {
                        setLoading(false)
                    })
                }}
            >
                Mettre à jour les lignes et arrets
            </Button>

            <Text style={styles.title}>Contact</Text>
            <Divider bold={true} style={styles.divider}/>
            <A style={styles.link} href="mailto:dario.lehy@gmail.com">
                dario.lehy@gmail.com
                <MaterialCommunityIcons name="arrow-top-right" style={styles.icon} size={20} />
            </A>
            <A style={styles.link} href="https://github.com/Fytecas/horaires-grenoble">
                Contribuer
                <MaterialCommunityIcons name="github" style={styles.icon} size={20} />
            </A>
            <Text style={styles.text}>
                © Dario Le HY 2024
            </Text>
            <Text style={styles.text}>
                Licenced under MIT licence
            </Text>
        </ScrollView>)
    }

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 8,
        flex: 1,
        backgroundColor: "white"
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: "bold"
    },
    title: {
        fontSize: 22,
        fontWeight: "800"
    },
    link: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#337AB7"
    },
    icon: {
        padding: 8,
        textAlignVertical: "bottom",
        alignSelf: "baseline"
    },
    divider: {
        marginBottom: 8
    }

})