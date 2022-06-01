import React, { useState, useEffect, useCallback, Children } from 'react';
import { ActivityIndicator, FlatList, View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Pressable, Alert } from 'react-native';
import { firebase_db } from '../firebaseConfig';
import YoutubePlayer from "react-native-youtube-iframe";
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { merge } from 'lodash';


export default function Users() {
    //-------Flatlist 적용을 위한 useState 등 선언부분-----
    const [loading, setLoading] = useState(true); // 로딩 화면 mount시키기 위한 useState
    const [state, setState] = useState([])
    const [cardID, setCardID] = useState(["i4S5hvPG9ZY"])
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [TotalDataSource, setTotalDataSource] = useState([]);
    const [favorite, setFavorite] = useState(false);


    // -----iframe 적용부분----------------------------------
    const [playing, setPlaying] = useState(true);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(true);
        }
    }, []);

    // const togglePlaying = useCallback(() => {
    //     setPlaying((prev) => !prev);
    // }, []);


    // ---------- CardID에 videoId 할당해주는 부분
    const onPress = ({ item }) => {
        return (
            setCardID(item.id.videoId)
        )
    }


    // ---Firebase를 대입하기 위한 부분 --------
    useEffect(() => {
        setLoading(true);

        firebase_db.ref('/items')
            .once('value')
            .then((snapshot) => {
                console.log("파이어베이스에서 데이터 가져왔습니다!!")
                let items = snapshot.val()
                setState(items)
                // setFullData(items.snippet);
                setTotalDataSource(items);

                setLoading(false);
            })
            .catch(err => { setLoading(false); setError(err); })
    }, []);


    // SearchBar 검색기능 선언부분--------------------------------------------------------

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


    //FlatList 하이라이트 기능 선언부분 (꼭 필요 x)
    // const ItemSeparatorView = () => {
    //     return (
    //         // Flat List Item Separator
    //         <View
    //             style={{
    //                 height: 0.5,
    //                 width: '100%',
    //                 backgroundColor: '#C8C8C8',
    //             }}
    //         />
    //     );
    // };

    // Like 관련 설정 코드 ------------------------------------------------


    function Like({ item, index }) {
        const user_id = Constants.installationId;
        firebase_db.ref('/like/' + user_id + index).push(item)
            .then(() => { Alert.alert('<찜 완료>'); })
        setFavorite(true);
    }


    function UnLike({ item }) {
        const user_id = Constants.installationId;
        const data_remove = firebase_db.ref(`/like/${user_id}` + item.idx)
            .remove()
            .then(() => { Alert.alert('<찜 해제 완료>'); })
        setFavorite(false);
    }



    // function UnLike({ item, key }) {
    //     const user_id = Constants.installationId;
    //     const data_remove = firebase_db.ref(`/like/${user_id}/${item.idx}/`).remove()
    //         .then(() => { Alert.alert('<찜 해제 완료>'); })
    //     setFavorite(false);
    // }
    // //리스트 전체삭제

    // function Like() {
    //     const user_id = Constants.installationId;

    //     if (setFavorite(false)) {
    //         firebase_db.ref('/like/' + user_id + '/Drum/' + state.idx).set(state)
    //         setFavorite(true);
    //     }
    //     else if (setFavorite(true)) {
    //         const data_remove = firebase_db.ref(`/like/${user_id}/Drum/${state.idx}`).remove()
    //         setFavorite(false);
    //     }
    // }



    //ActivityIndicator는 로딩 중 돌아가는 동그라미
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#5500dc" />
            </View>
        );
    }


    //fetching 중 에러가 나면 나올 안내화면
    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>
                    {`fetching 에러다 욘석아~
                     네트워크를 확인해보렴!`}
                </Text>
            </View>
        );
    }

    // 렌더링용 메인 return부분 ------------------------------------------------------
    return (
        <View style={styles.container}>

            {/* SarchBar 부분 */}
            <TextInput
                style={styles.textContainer}
                onChangeText={(text) => searchFilter(text)}
                value={search}
                underlineColorAndroid="transparent"
                placeholder="검색어를 입력하세요!"
                autoCorrect={true}   // 자동수정
            // autoCapitalize="none"   // 자동 대문자

            // autoComplete  // 자동완성 (Android 한정). 끄려면 off
            // clearTextOnFocus={true}  // true일 경우, 텍스트 자동지움됨
            // maxLength={1000} // 글자수 제한
            // clearButtonMode="always"  // 텍스트 보기의 오른쪽에 지우기 버튼 표시됨. 기본값은 never
            // keyboardType="defualt"
            />

            {/* iframe을 보여주기 위한 부분 */}
            <View>
                <YoutubePlayer
                    height={200}
                    play={playing}
                    videoId={cardID}
                    onChangeState={onStateChange}

                />
                {/* <Button title={playing ? "pause" : "play"} onPress={togglePlaying} /> */}
            </View>


            {/* Flatlist 부분 */}
            <FlatList
                data={state}
                // ItemSeparatorComponent={ItemSeparatorView}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cardContainer}>
                        <TouchableOpacity style={styles.card} onPress={() => onPress({ item })}>
                            <Image style={styles.cardImage} source={{ uri: item.snippet.thumbnails.medium.url }} />
                            <View style={styles.cardText}>
                                <Text style={styles.cardTitle} numberOfLines={1}>{item.snippet.title}</Text>
                                <Text style={styles.cardDesc} numberOfLines={3}>{item.snippet.description}</Text>
                                <Text style={styles.cardDate}>{item.snippet.publishedAt}</Text>
                                <Text style={styles.cardDate}>{item.id.videoId}</Text>
                            </View>
                            <View style={styles.LikeButton}>
                                <View style={styles.heartBotton}>
                                    <Pressable onPress={() => Like({ item })} >
                                        <AntDesign name="heart" size={30} color="#eb4b4b" />
                                    </Pressable>
                                </View>
                                <View style={styles.heartBotton}>
                                    <Pressable onPress={() => UnLike({ item })} >
                                        <AntDesign name="hearto" size={30} color="#999" />
                                    </Pressable>
                                </View>
                            </View>
                            {/* <View style={styles.heartBotton}>
                                {favorite ?
                                    <Pressable onPress={() => UnLike({ item })} >
                                        <AntDesign name="heart" size={30} color="#eb4b4b" />
                                    </Pressable>
                                    :
                                    <Pressable onPress={() => Like({ item })} >
                                        <AntDesign name="hearto" size={30} color="#999" />
                                    </Pressable>
                                }
                            </View> */}
                        </TouchableOpacity>
                    </View >
                )
                } />
        </View >
    );
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