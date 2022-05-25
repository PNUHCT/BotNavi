import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, SafeAreaView } from "react-native";
import TestOne from '../components/TestOne';

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
    }
});