import React from 'react';
import { ImageBackground, View } from "react-native";
import kakaoLoading from '../assets/kakaoLoading.png';

export default function App() {

    return (
        <View>
            <ImageBackground
                source={{ kakaoLoading }}
                style={{ width: "100%", height: "100%" }}>
            </ImageBackground>
        </View>
    );
}