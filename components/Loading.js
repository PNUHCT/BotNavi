import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { render } from 'react-dom';
import kakaoLoading from '../assets/kakaoLoading.png';

export default class Loading extends React.Component {
    render() {
        return (
            <ImageBackground
                source={{ kakaoLoading }}
                style={{ width: "100%", height: "100%" }}>
            </ImageBackground>
        );
    }
}