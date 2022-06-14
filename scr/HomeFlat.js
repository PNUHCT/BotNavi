import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, FlatList, View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Pressable, Alert } from 'react-native';
import { firebase_db } from '../firebaseConfig';
import YoutubePlayer from "react-native-youtube-iframe";
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';

export default function Users() {
    //-------Flatlist 적용을 위한 useState 등 선언부분-----
    const [loading, setLoading] = useState(true); // 로딩 화면 mount시키기 위한 useState
    const [state, setState] = useState([])
    const [cardID, setCardID] = useState(["i4S5hvPG9ZY"])
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [TotalDataSource, setTotalDataSource] = useState([]);
    const [favorite, setFavorite] = useState(false);
    const user_id = Constants.installationId;
    //  HAlbn3WHw6Q 사쿠란보


    // -----iframe 적용부분----------------------------------
    const [playing, setPlaying] = useState(true);
    // HAlbn3WHw6Q
    const onStateChange = (state) => {
        if (state === "ended") {
            setCardID("HAlbn3WHw6Q");
            // ended가 되면=>cardID에 test가 들어감=>test는 videoId가 되어야 함
            // cardID에 들어갈 공식: (선택한 item의 index + 1) = index, Object.keys(index)가 임의의 키값이 나온다면,
            // 그에 대한 .id.videoId
            // cardID가 바뀐 후 다시 playing이 true가 되어, 연속재생됨.
            setPlaying(true);  // <=이거 false로 바꾸면 터치시 바로재생이 안됨.
            //외부 function은 안먹힘
            //console.log는 먹힘
            //즉, 내부에서 선언하는 것은 먹힌다는 소리
            //useState는 먹힘
            return (state)
        }
    };


    const test = ({ item, state }) => {
        // 현재 끝난 item값의 다음 index에 해당하는 videoI로 바뀌도록 반복함수 만들기
        // for(시작조건;끝나는 조건;반복 조건) 사용하기?
        const itemID = Object.keys(item)
        if (onStateChange(state) === 'ended') {
            console.log(itemID) // flatlist에서 test라는 함수를 통해 index = {item}으로 받아올 경우, 선택한 카드의 json데이터 받아옴
            // 만약 index = { index }올 받아올 경우엔 index번호로 받아옴
            // return (testID)
        }
    }

    // const togglePlaying = useCallback(() => {
    //     setPlaying((prev) => !prev);
    // }, []);

    // ---------- CardID에 videoId 할당해주는 부분
    const onPress = ({ item, index }) => {
        // console.log(item.snippet.publishedAt)
        // console.log(Object.keys(item)[0])
        console.log(Object.values(index)[0])
        return (
            setCardID(item.id.videoId)
        )
    }


    // ---Firebase를 대입하기 위한 부분 --------
    useEffect(() => {
        setTimeout(() => {
            setLoading(true);
            firebase_db
                .ref('/items')
                .on('value', (snapshot) => {
                    console.log("items에서 데이터 가져왔습니다!!")
                    const items = (snapshot.val());
                    setState(items)
                    setTotalDataSource(items);
                    setLoading(false);
                })
        }, 300)
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

    // Like 관련 설정 코드 ------------------------------------------------


    function Like({ item }) {
        firebase_db.ref(`/like/${user_id}`).push(item)
            .then(() => { Alert.alert('<찜 완료>'); })
    }

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
            />

            {/* iframe을 보여주기 위한 부분 */}
            <View>
                <YoutubePlayer
                    height={200}
                    play={playing}
                    videoId={cardID}
                    onChangeState={onStateChange}
                // cueVideoById={'HAlbn3WHw6Q'}
                />
                {/* <Button title={playing ? "pause" : "pzzlay"} onPress={togglePlaying} /> */}
            </View>



            {/* Flatlist 부분 */}
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
                                <Text style={styles.cardDate} >{test(index = { item })}</Text>
                            </View>
                            <View style={styles.LikeButton}>
                                <View style={styles.heartBotton}>
                                    <Pressable onPress={() => Like({ item })} >
                                        <AntDesign name="heart" size={30} color="#eb4b4b" />
                                    </Pressable>
                                </View>
                            </View>
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