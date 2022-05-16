import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from "react-native";
import Iframe from '../components/Iframe';
import Card from '../components/Card';
import SearchBar from 'react-native-platform-searchbar';
import { firebase_db } from '../firebaseConfig';

export default function Like() {

    const Example = () => {
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


    return (
        <ScrollView style={styles.container}>
            <SearchBar />
            {/* <SearchScreen /> */}
            <Iframe />
            <View style={styles.cardContainer}>
                {
                    state.map((content, i) => {
                        return (<Card content={content} key={i} />)
                    })
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    cardContainer: {
        marginTop: 10
    }
});