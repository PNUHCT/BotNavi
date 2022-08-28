import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ActivityIndicator, FlatList, View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Pressable, Alert, Button } from 'react-native';
import { firebase_db } from '../firebaseConfig';
import YoutubePlayer from "react-native-youtube-iframe";
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import YTSearch from 'youtube-api-search';


// 1. 검색 토글 넣기
// 2. 검색 토글 누를 시에만 검색되게하기
// 3. 유튜브API Key없이도 검색 가능하게 하기
// 4. 연속재생 보정하기 (state값이 거의 무제한이라..)

export default function Test() {
    const [keywords, setKeywords] = useState()
    const [state, setState] = useState()
    const [cardID, setCardID] = useState(["i4S5hvPG9ZY"])
    const [TotalDataSource, setTotalDataSource] = useState([]);
    const [FBKeys, setFBKeys] = useState();
    const [QueList, setQueList] = useState();
    const [playing, setPlaying] = useState(true);
    const [search, setSearch] = useState('');
    const user_id = Constants.installationId;


    // Youtube API parameters 설정부분
    const params = {
        key: "AIzaSyDNZL7vx2kDhnoUt6kPQuR95uJR2lRZdfs",
        part: 'snippet',
        term: `${keywords}`,
        maxResults: 5,
        type: 'video',
    };


    // 유튜브 API searching 기능 부분
    YTSearch({ key: "AIzaSyDNZL7vx2kDhnoUt6kPQuR95uJR2lRZdfs", part: 'snippet', q: `${keywords}`, maxResults: 5, type: 'video' }, result => {
        console.log(result);
        setState(result);
        // setTotalDataSource(result);
    });


    // iframe 상태부분
    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(true);
        }
    });


    // 컨텐츠 선택 및 연속재생부분
    const onPress = ({ item, index }) => {
        const SelectedKey = FBKeys[index]
        const result = [];
        for (let i = SelectedKey; i < state.length; i++) {
            result.push(state[i].id.videoId)
        }
        return (
            setQueList(result),
            setCardID(item.id.videoId)
        )
    }

    const searchFilter = (text) => {
        if (text) {
            const newData = TotalDataSource.filter(function (item) {
                const itemData = item.snippet.title
                    ? item.snippet.title.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setState(newData);
            setSearch(text);
        } else {
            setState(TotalDataSource);
            setSearch(text);
        }
    };

    // 렌더링 부분
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textContainer}
                onChangeText={(text) => searchFilter(text)} // text로 검색어 전달 (검색기능 토글 추가하기)
                placeholder="검색어를 입력하세요!"
                underlineColorAndroid="transparent"
                onEndEditing={(event) => this.setKeywords({ value: event.nativeEvent.text })}
                // onEndEditing={(text) => setKeywords(text)}
                value={search}>
            </TextInput>

            <View>
                <YoutubePlayer
                    height={200}
                    play={playing}
                    videoId={cardID}
                    onChangeState={onStateChange}
                    playList={QueList}
                    onFullScreenChange={0}
                    playerVars={{
                        background: 1
                    }}
                />
            </View>

            <FlatList
                data={state}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => (
                    <View style={styles.cardContainer}>
                        <TouchableOpacity style={styles.card} onPress={() => onPress({ item, index })}>
                            <Image style={styles.cardImage} source={{ uri: item.snippet.thumbnails.medium.url }} />
                            <View style={styles.cardText}>
                                <Text style={styles.cardTitle} numberOfLines={1}>{item.snippet.title}</Text>
                                <Text style={styles.cardDesc} numberOfLines={3}>{item.snippet.description}</Text>
                                <Text style={styles.cardDate}>{item.snippet.publishedAt}</Text>
                                <Text style={styles.cardDate}>{item.id.videoId}</Text>
                                <Text style={styles.cardDate} >{index}</Text>
                            </View>
                        </TouchableOpacity>
                    </View >
                )
                } />

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
    },
    LikeButton: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
});
