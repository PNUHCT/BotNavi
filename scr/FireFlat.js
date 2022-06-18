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
    const [QueList, setQueList] = useState();
    const [FBKeys, setFBKeys] = useState();
    const user_id = Constants.installationId;
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
    const onPress = ({ item, index }) => {
        // console.log(Object.keys(item)[0])
        const SelectedKey = FBKeys[index]  // 선택된 index. 즉, realtime database내 item의 index로 된 키값 중 선택된 index키값만(인덱스에 맞는 키값)
        // console.log(FBKeys[index])
        // console.log(VID)
        // 선택한 카드의 인덱스 넘버~리스트 끝 인덱스 넘버까지 반복문으로 얻음
        const result = []; // 빈 Array로써, 인덱스값에 따른 videoID들이 push된다. // 새로 누르면, 기존 데이터에 update혹은 set으로 덮어쓰기 구현해야함.
        for (let i = SelectedKey; i < state.length; i++) {
            result.push(state[i].id.videoId)
        }
        // console.log(result)
        //현재는 videoID를 불러와 Array로 만들어주기까지만 성공
        return (
            setQueList(result),
            setCardID(item.id.videoId)
        )
    }


    // ---Firebase를 대입하기 위한 부분 --------
    useEffect(() => {
        setTimeout(() => {
            setLoading(true);
            firebase_db
                .ref('/TGBSitems')
                .on('value', (snapshot) => {
                    console.log("TGBS에서 데이터 가져왔습니다!!")
                    const TGBSitems = (snapshot.val());
                    setFBKeys(Object.keys(TGBSitems)) // realtime database의 item에 있는 인덱스 넘버로 된 키값들
                    setState(TGBSitems)
                    setTotalDataSource(TGBSitems);
                    setLoading(false);
                    console.log(Object.keys(TGBSitems)[4])
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


    // 찜 기능
    function Like({ item }) {
        firebase_db.ref(`/like/${user_id}`).push(item)
            .then(() => { Alert.alert('<찜 완료>'); })
    }


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
                autoCorrect={true}
            />

            {/* iframe을 보여주기 위한 부분 */}
            <View>
                <YoutubePlayer
                    height={200}
                    play={playing}
                    videoId={cardID}
                    // playList={[비디오아이디리스트] 또는 playlist코드}
                    // playListStartIndex={인덱스 넘버}
                    onChangeState={onStateChange}
                    playList={QueList}
                    playerVars={{
                        background: 1
                    }}
                />
                {/* <Button title={playing ? "pause" : "play"} onPress={togglePlaying} /> */}
            </View>


            {/* Flatlist 부분 */}
            <FlatList
                data={state}
                // keyExtractor={(index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.cardContainer}>
                        <TouchableOpacity style={styles.card} onPress={() => onPress({ item, index })}>
                            <Image style={styles.cardImage} source={{ uri: item.snippet.thumbnails.medium.url }} />
                            <View style={styles.cardText}>
                                <Text style={styles.cardTitle} numberOfLines={1}>{item.snippet.title}</Text>
                                <Text style={styles.cardDesc} numberOfLines={3}>{item.snippet.description}</Text>
                                <Text style={styles.cardDate}>{item.snippet.publishedAt}</Text>
                                <Text style={styles.cardDate}>{item.id.videoId}</Text>
                                <Text style={styles.cardDate}>{index}</Text>
                            </View>
                            <View style={styles.LikeButton}>
                                <View style={styles.heartBotton}>
                                    <Pressable onPress={() => Like({ item })} >
                                        <AntDesign name="heart" size={30} color="#eb4b4b" />
                                    </Pressable>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                )} />
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