import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, SafeAreaView } from "react-native";
import TestFL from '../components/TestOne';
import TesTwo from '../components/TestTwo';

export default function Test() {

    return (
        // <TestFL />
        <TesTwo />
        // <SafeAreaView style={styles.Maincontainer}>
        //     <Text>
        //         {`
        //            이곳은 실험실입니다.

        //            나만의 테스트공간

        //            호롤로롤로
        //         `}
        //     </Text>
        // </SafeAreaView>

    );
}

// const styles = StyleSheet.create({
//     Maincontainer: {
//         justifyContent: "center", alignItems: "center", backgroundColor: '#fff', flex: 1
//     }
// });