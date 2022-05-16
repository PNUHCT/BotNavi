import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from "react-native";


export default function Test() {

    return (
        <ScrollView style={styles.container}>
            <Text>Hello</Text>
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