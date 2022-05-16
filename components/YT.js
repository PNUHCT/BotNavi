import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import YouTube from 'react-native-youtube';

const YT = () => {
    return (
        <SafeAreaView style={styles.container}>
            <YouTube
                videoId="KVZ-P-ZI6W4"
                apiKey="AIzaSyDNZL7vx2kDhnoUt6kPQuR95uJR2lRZdfs"
                play={true}
                fullscreen={false}
                loop={false}
                onReady={(e) => console.log('onReady')}
                onChangeState={(e) => console.log('onChangeState:', e.state)}
                onChangeQuality={(e) => console.log('onChangeQuality: ', e.quality)}
                onError={(e) => console.log('onError: ', e.error)}
                style={{ width: '100%', height: 300 }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default YT;
