import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import ListItemSwipeable from 'react-native-elements/dist/list/ListItemSwipeable';
import ABCDrum from '../ABCDrum.json'

const LIMIT = 10;

export default function App() {
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        setLoading(true);
        fetch("http://jsonplaceholder.typicode.com/posts")
            .then((res) => res.json())
            .then((res) => setData(data.concat(res.slice(offset, offset + LIMIT))))
            .then(() => {
                setOffset(offset + LIMIT);
                setLoading(false);
            })
            .catch((e) => {
                setLoading(false);
            });
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <View><Text>user id : {item.userId}</Text></View>
                <View><Text>id : {item.id}</Text></View>
                <View><Text>title : {item.title}</Text></View>
                <View><Text>body : {item.body}</Text></View>
            </View>
        );
    };

    const onEndReached = () => {
        if (loading) {
            return;
        } else {
            getData();
        }
    };


    return (
        <SafeAreaView style={styles.itemContainer}>
            <FlatList
                data={data}
                //데이터를 만들고자 하는 리스트의 source를 담는 props
                renderItem={renderItem}
                //1개의 item을 reder시키는 props. item이라고 이름짓는것은 약속이라고 한다.
                keyExtractor={(item) => String(item.id)}
                //지정된 인덱스에서 지정된 항목에 대한 고유 키를 추출하는데 사용된다.
                //키는 ㅐ싱에 사용되며 항목 재절렬을 추적하는 반응키로 사용된다고 한다.
                onEndReachedThreshold={0.8}
                //목록의 가장 마지막 아이템 전에 어느 높이에 도달시 onEndReached가 수행되는지 지정. 즉
                //(값: 0~1, 높을수록 빨리 수행됨)
                onEndReached={onEndReached}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    itemContainer: {
        padding: 8,
    },
});