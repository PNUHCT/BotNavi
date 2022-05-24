import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, FlatList, View, Text, Image, StyleSheet, TouchableOpacity, Button, Alert, TextInput } from 'react-native';
import { firebase_db } from '../firebaseConfig';
import YoutubePlayer from "react-native-youtube-iframe";
import filter from 'lodash.filter';


export default function Users() {
    //-------Flatlist 적용을 위한 useState 등 선언부분-----
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [state, setState] = useState([])
    const [cardID, setCardID] = useState(["i4S5hvPG9ZY"])
    const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState([]);
    const [error, setError] = useState(null);


    // -----iframe 적용부분----------------------------------
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);


    // ---------- console.log로 video 확인할 수 있는 함수부분
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

                setFullData(items.snippet);

                setLoading(false);
            })
            // .then(response => response.json())
            // .then(response => {
            //     setData(response.items);

            //     // ADD THIS
            //     setFullData(response.items);

            //     setLoading(false);
            // })
            .catch(err => { setLoading(false); setError(err); })
    }, []);


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

    // Searchbar를 위한 함수선언단계

    function renderHeader() {
        return (
            <View
                style={{
                    backgroundColor: '#fff',
                    padding: 10,
                    marginVertical: 10,
                    borderRadius: 20
                }}
            >
                <TextInput
                    autoCapitalize="none"   // 자동 대문자
                    // autoCorrect={false}   // 자동수정
                    // autoComplete  // 자동완성 (Android 한정). 끄려면 off
                    // clearTextOnFocus={true}  // true일 경우, 텍스트 자동지움됨
                    // maxLength={1000} // 글자수 제한
                    clearButtonMode="always"  // 텍스트 보기의 오른쪽에 지우기 버튼 표시됨. 기본값은 never
                    keyboardType="defualt"
                    style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
                    placeholder="Search"
                    value={query}
                    onChangeText={queryText => SearchForQuery(queryText)}
                />
            </View>
        );
    }


    // SaerchBar의 기능을 구현하기 위한 부분
    const SearchForQuery = text => {
        const formattedQuery = text.toLowerCase();
        const filteredData = filter(fullData, user => {
            return contains(user, formattedQuery);
        });
        setState(filteredData);
        setQuery(text);
    };

    const contains = ({ title }, query) => {
        const { first, last } = title;

        if (first.includes(query) || last.includes(query)) {
            return true;
        }

        return false;
    };





    // return부분 -----
    return (
        <View>

            {/* iframe을 보여주기 위한 부분 */}
            <View>
                <YoutubePlayer
                    height={200}
                    play={playing}
                    videoId={cardID}
                    onChangeState={onStateChange}
                />
                <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
            </View>


            {/* Flatlist 부분 */}
            <FlatList data={state}
                ListHeaderComponent={renderHeader}
                keyExtractor={item => item.id}
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
        // marginTop: 10,
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
    }
});