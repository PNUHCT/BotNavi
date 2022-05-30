import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert, LogBox } from 'react-native';
import LikeCard from '../components/LikeCard';
import Loading from '../components/Loading';
import { StatusBar } from 'expo-status-bar';
import { firebase_db } from "../firebaseConfig"
import Constants from 'expo-constants';

export default function LikePage({ navigation, route }) {
    LogBox.ignoreAllLogs();
    const [state, setState] = useState([])

    const [ready, setReady] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            navigation.setOptions({
                title: '꿀팁 찜'
            })
            const user_id = Constants.installationId;
            firebase_db.ref(`/like/${user_id}`).once('value').then((snapshot) => { // 데이터를 가져와서 (숙제 1)
                let items = snapshot.val();
                console.log(items); //데이터가 null인지 확인
                if (items === null) { //데이터가 없으면, alert -> 확인 누르면 MainPage로 페이지 이동 (숙제 2) == LikePage에서 데이터 다 삭제했을 때도 alert 작동하게
                    Alert.alert('<찜 목록 없음>', '찜한 꿀팁이 없습니다!', [{ text: '확인', onPress: () => { navigation.navigate('HomeFlat') } }])
                }
                else { //데이터가 있으면, setTip해서 데이터를 보여준다.  (숙제 1)
                    setState(Object.values(items))
                    setReady(false)
                }
                console.log(items.length);
                console.log(ready);
            })
        }, 300);
    })

    return ready ? <Loading /> : (
        <ScrollView style={styles.container}>
            {
                state.map((content, i) => {
                    return (<LikeCard key={i} content={content} navigation={navigation} />)
                }
                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})
