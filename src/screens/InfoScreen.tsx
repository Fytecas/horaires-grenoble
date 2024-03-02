import { A } from "@expo/html-elements";
import React, {  } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as StoreReview from 'expo-store-review';

export function InfoScreen({ navigation, ...props }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
            Cette application n’est pas une application gouvernementale ou officielle, elle utilise le réseau public data.mobilites-m.fr pour fournir les horaires en temps réel des transports en communs de la ville de Grenoble. Le développeur n’est pas affilié à MTag.
            </Text>
            <A style={{...styles.text, color: "blue"}} href="https://fytecas.github.io/horaires-grenoble/">
                Règles de confidentialité
            </A>
            <Text style={{...styles.text, color: "blue"}} onPress={() => StoreReview.requestReview()}>
                Noter cette application
            </Text>
        </View>)
  }

const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
    text: {
        fontSize: 16,
        padding: 8,
        fontWeight: "bold"
    }
})