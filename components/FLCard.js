import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, FlatList, View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Pressable } from 'react-native';
import { firebase_db } from '../firebaseConfig';
import YoutubePlayer from "react-native-youtube-iframe";
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { item, state } from '../scr/HomeFlat';

export default function FLCard({ item }) {

    const [favorite, setFavorite] = useState(false);
    const [items, setItems] = useState();
    const [states, setStates] = useState();

    useEffect(() => {
        setItems(item)
        setStates(state)
    }, [])
    function Like() {
        const user_id = Constants.installationId;
        firebase_db.ref('/like/' + user_id + '/Drum/' + states.idx).set(states)
        setFavorite(true);
    }


    function UnLike() {
        const user_id = Constants.installationId;
        const data_remove = firebase_db.ref(`/like/${user_id}/Drum/${states.idx}`).remove()
        // .then(() => {Alert.alert('<찜 해제 완료>', '찜 해제가 완료되었습니다', [{ text: '확인' }]); })
        setFavorite(false);
    }


    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.card} onPress={() => onPress({ items })}>
                <Image style={styles.cardImage} source={{ uri: items.snippet.thumbnails.medium.url }} />
                <View style={styles.cardText}>
                    <Text style={styles.cardTitle} numberOfLines={1}>{items.snippet.title}</Text>
                    <Text style={styles.cardDesc} numberOfLines={3}>{items.snippet.description}</Text>
                    <Text style={styles.cardDate}>{items.snippet.publishedAt}</Text>
                    <Text style={styles.cardDate}>{items.id.videoId}</Text>
                </View>
                <View style={styles.heartBotton}>
                    {favorite ?
                        <Pressable onPress={() => UnLike()}>
                            <AntDesign name="heart" size={30} color="#eb4b4b" />
                        </Pressable>
                        :
                        <Pressable onPress={() => Like()}>
                            <AntDesign name="hearto" size={30} color="#999" />
                        </Pressable>
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    cardContainer: {
        backgroundColor: '#fff',
    },
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
    },
    textContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        fontSize: 20,
        margin: 10,
    },
    heartBotton: {
        alignItems: "center",
        justifyContent: "center"
    }
});