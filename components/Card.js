import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as Linking from 'expo-linking';



export default function YouCard({ content, navigation }) {

    const link = () => {
        Linking.openURL("https://www.youtube.com/watch?v=" + content.id.videoId)
    }

    return (
        <TouchableOpacity style={styles.card} onPress={() => link()}>
            <Image style={styles.cardImage} source={{ uri: content.snippet.thumbnails.medium.url }} />
            <View style={styles.cardText}>
                <Text style={styles.cardTitle} numberOfLines={1}>{content.snippet.title}</Text>
                <Text style={styles.cardDesc} numberOfLines={3}>{content.snippet.description}</Text>
                <Text style={styles.cardDate}>{content.snippet.publishedAt}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({

    card: {
        flex: 1,
        //컨텐츠들을 가로로 나열
        //세로로 나열은 column <- 디폴트 값임
        flexDirection: "row",
        margin: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#eee",
        paddingBottom: 10
    },
    cardImage: {
        flex: 1,
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    cardText: {
        flex: 2,
        flexDirection: "column",
        marginLeft: 10,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "700"
    },
    cardDesc: {
        fontSize: 15
    },
    cardDate: {
        fontSize: 10,
        color: "#A6A6A6",
    }
});