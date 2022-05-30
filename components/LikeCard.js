import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { firebase_db } from '../firebaseConfig';
import Constants from 'expo-constants';
//MainPage로 부터 navigation 속성을 전달받아 Card 컴포넌트 안에서 사용
export default function Card({ content, navigation }) {

    const remove = () => {
        const user_id = Constants.installationId;
        const data_remove = firebase_db.ref(`/like/${user_id}/${content.idx}`).remove().then(() => {
            Alert.alert('<찜 해제 완료>', '찜 해제가 완료되었습니다',
                [{ text: '확인', onPress: () => { navigation.navigate('LikePage') } }]);
        }).catch(() => {
            Alert.alert('삭제하기 실패!');

        }) //데이터 삭제하면, <찜 해제 완료> 팝업 -> 확인 누르면 LikePage로 navigate / 실패하면 팝업 표시
    }

    return (
        //카드 자체가 버튼역할로써 누르게되면 상세페이지로 넘어가게끔 TouchableOpacity를 사용
        <View style={styles.card} onPress={() => { navigation.navigate('DetailPage', content) }}>
            {/* <Image style={styles.cardImage} source={{ uri: content.image }} />
            <View style={styles.cardText}>
                <Text style={styles.cardTitle} numberOfLines={1}>{content.title}</Text>
                <Text style={styles.cardDesc} numberOfLines={3}>{content.desc}</Text>
                <Text style={styles.cardDate}>{content.date}</Text>
                <View style={styles.button_box}>
                    <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('DetailPage', { idx: content.idx }) }}>
                        <Text style={styles.button_text}>자세히보기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => remove()}>
                        <Text style={styles.button_text}>찜 해제</Text>
                    </TouchableOpacity>
                </View>
            </View> */}

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
                            <View style={styles.heartBotton}>
                                {favorite ?
                                    <Pressable onPress={() => Like()}>
                                        <AntDesign name="heart" size={30} color="#eb4b4b" />
                                    </Pressable>
                                    :
                                    <Pressable onPress={() => Like()}>
                                        <AntDesign name="hearto" size={30} color="#999" />
                                    </Pressable>
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                )} />
        </View> //숙제 3,4,5
    )
}