import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from "react-native";
import Iframe from '../components/Iframe';
import Card from '../components/Card';
import SearchBar from 'react-native-platform-searchbar';
import { firebase_db } from '../firebaseConfig';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Like() {

    const Searching = () => {
        const [value, setValue] = useState('');
        <SearchBar
            value={value}
            onChangeText={setValue}
            placeholder="Search"
            theme="light"
            platform="default"
            style={styles.searchBar}
        >
            {loading ? (
                <ActivityIndicator style={{ marginRight: 10 }} />
            ) : undefined}
        </SearchBar>;
    };

    const [state, setState] = useState([])
    const [ready, setReady] = useState(true)


    useEffect(() => {
        // console.log(route)
        setTimeout(() => {
            // const { idx } = route.params;
            firebase_db.ref('/items').once('value').then((snapshot) => {
                console.log("파이어베이스에서 데이터 가져왔습니다!!")
                let items = snapshot.val();

                setState(items)
                setReady(false)
            });
        }, 1000)
    }, [])

    const SendID = ({ content } = { getID }) => {
        console.log(content.id.videoId)
        return (
            { content } = content.id.videoId
        )
    }

    // const인데 카드마다 값이 바뀌는 이유?? 단순히 const선언이면, 값이 안바뀌어야 하지 않는가?


    return (
        <ScrollView style={styles.container}>
            <SearchBar />
            {/* <SearchScreen /> */}
            <Iframe />
            <View style={styles.cardContainer}>
                {
                    state.map((content, i) => {
                        return (<TouchableOpacity onPress={() => SendID({ content })}><Card content={content} key={i} /></TouchableOpacity>)
                    })
                }
            </View>
        </ScrollView>
    );
}
// 왜? onPress={() => SendID({ content }) 에서 앞의 ()에는 content가 들어가면 오류가 나지? 뒤의 ()에는 왜 들어가야 하지?


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    cardContainer: {
        marginTop: 10
    }
});