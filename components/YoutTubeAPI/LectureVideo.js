import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import YouTube from 'react-native-youtube';
import { normalize } from 'react-entsnative-elem';

const LectureVideo = ({ navigation }) => {
    return (
        <ScrollView style={style.container}>
            <YouTube
                apiKey={env.AIzaSyDNZL7vx2kDhnoUt6kPQuR95uJR2lRZdfs} //여러분의 API_KEY 보안 잘해주세요^^!
                videoId={navigation.getParam('videoId')} // 리스트에서 보낸 videoId를 받아옴
                style={{ alignSelf: 'stretch', height: 270 }}
            />
            <Text style={style.title}>{navigation.getParam('title')}</Text>
            {/* <TouchableOpacity onPress= {()=> webComponent()}> */}
            <Text style={style.admin}>제작: 바울랩 </Text>
            {/* </TouchableOpacity> */}
            <Text style={style.body}>{navigation.getParam('desc')}</Text>
        </ScrollView>
    );
};

export default LectureVideo;