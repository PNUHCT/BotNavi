import React, { useState, useEffect, useCallback, Children } from 'react';
import { ActivityIndicator, FlatList, View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Pressable, Alert, SafeAreaView } from 'react-native';
import TestOne from '../components/TestOne';
import { firebase_db } from '../firebaseConfig';
import YoutubePlayer from "react-native-youtube-iframe";
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';


export default function Test() {


    return (
        // <TestOne />
        <SafeAreaView style={styles.Maincontainer}>
            <Text>
                {`
                   이곳은 실험실입니다.

                   나만의 테스트공간

                   호롤로롤로
                `}
            </Text>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    Maincontainer: {
        justifyContent: "center", alignItems: "center", backgroundColor: '#fff', flex: 1
    },

});