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
    const [cardID, setCardID] = useState()
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [TotalDataSource, setTotalDataSource] = useState([]);
    const [QueList, setQueList] = useState();
    const [FBKeys, setFBKeys] = useState();
    const [playing, setPlaying] = useState(true);
    const user_id = Constants.installationId;
    //  HAlbn3WHw6Q 사쿠란보

    // -----iframe 적용부분----------------------------------

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(true);
        }
    });

    // const togglePlaying = useCallback(() => {
    //     setPlaying((prev) => !prev);
    // }, []);


    // ---------- CardID에 videoId 할당해주는 부분
    const onPress = ({ item, index }) => {
        const result = [];
        for (let i = index; i < state.length; i++) {
            result.push(state[i].id.videoId)
        }
        return (
            setQueList(result),
            setCardID(item.id.videoId)
        )
    }

    // 파이어베이스의 인덱스 넘버를 기준으로 쓸 경우
    // const onPress = ({ item, index }) => {
    //     // console.log(Object.keys(item)[0])
    //     const SelectedKey = FBKeys[index]  // 선택된 index. 즉, realtime database내 item의 index로 된 키값 중 선택된 index키값만(인덱스에 맞는 키값)
    //     // console.log(FBKeys[index])
    //     // console.log(VID)
    //     // 선택한 카드의 인덱스 넘버~리스트 끝 인덱스 넘버까지 반복문으로 얻음
    //     const result = []; // 빈 Array로써, 인덱스값에 따른 videoID들이 push된다. // 새로 누르면, 기존 데이터에 update혹은 set으로 덮어쓰기 구현해야함.
    //     for (let i = SelectedKey; i < state.length; i++) {
    //         result.push(state[i].id.videoId)
    //     }
    //     // console.log(result)
    //     //현재는 videoID를 불러와 Array로 만들어주기까지만 성공
    //     return (
    //         setQueList(result),
    //         setCardID(item.id.videoId)
    //     )
    // }


    // ---Firebase를 대입하기 위한 부분 --------
    useEffect(() => {
        setTimeout(() => {
            setLoading(true);
            firebase_db
                .ref('/WorkSong')
                .on('value', (snapshot) => {
                    console.log("WorkSong에서 데이터 가져왔습니다!!")
                    const items = (snapshot.val());
                    // setFBKeys(Object.keys(items)) // realtime database의 item에 있는 인덱스 넘버로 된 키값들 // 파이어베이스 인덱스 쓸 경우 사용
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
            <View style={styles.textContainerContainer}>
                <TextInput
                    style={styles.textContainer}
                    onChangeText={(text) => searchFilter(text)}
                    value={search}
                    underlineColorAndroid="transparent"
                    placeholder="검색어를 입력하세요!"
                    // onEndEditing={() => console.log("onEndEditing")}
                    // onSubmitEditing
                    autoCorrect   // 자동수정
                />
            </View>

            {/* iframe을 보여주기 위한 부분 */}
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
                                {/* <Text style={styles.cardDate} >{index}</Text> */}
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
        backgroundColor: '#000',
    },
    cardContainer: {
        backgroundColor: '#000',
    },
    card: {
        flex: 1,
        //컨텐츠들을 가로로 나열
        //세로로 나열은 column <- 디폴트 값임
        flexDirection: "row",
        margin: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#A6A6A6",
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
        fontWeight: "700",
        color: '#fff'
    },
    cardDesc: {
        fontSize: 15,
        color: '#A6A6A6'
    },
    cardDate: {
        fontSize: 10,
        color: "#A6A6A6",
    },
    textContainerContainer: {
        backgroundColor: '#fff',
        fontSize: 20,
        margin: 5,
    },
    textContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        fontSize: 20,
        margin: 5,
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