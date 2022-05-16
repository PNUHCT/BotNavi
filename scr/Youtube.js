import React, { useRef, useState } from "react";
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useFocusEffect } from "@react-navigation/native";
import { WebView } from "react-native-webview";

const INJECTED_JAVASCRIPT = `(function() {
  AsyncStorage.setItem("memberCode", 1);
  AsyncStorage.setItem("isApp", true);
})();`;

// 아래의 WebView 부분이 컴포넌트 이름
export default function Youtube({ url }) {
    const navigation = useNavigation();
    const webview = useRef(null);
    const [canGoBack, SetCanGoBack] = useState(false);

    // 안드로이드의 하드웨어적인 뒤로가기 설정
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (webview.current && canGoBack) {
                    webview.current.goBack();
                    return true;
                } else {
                    return false;
                }
            };
            BackHandler.addEventListener("hardwareBackPress", onBackPress);
            return () =>
                BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        }, [canGoBack])
    );

    // 안드로이드의 소프트웨어적인 뒤로가기 설정
    const backPress = (navState) => {
        const { canGoBack } = navState;

        if (canGoBack) {
            navigation.setParams({
                isCanBack: {
                    title: "",
                    onPress: () => webview.current.goBack(),
                },
            });
        } else {
            navigation.setParams({
                isCanBack: null,
            });
        }
    };

    // 실제로 화면에 띄울 WebView화면 구성
    return (
        <WebView
            source={{
                uri: "https://www.youtube.com/results?search_query=7080%EB%AC%B4%EB%A3%8C%EB%93%A3%EA%B8%B0",
            }}
            ref={webview}
            onNavigationStateChange={(navState) => {
                SetCanGoBack(navState.canGoBack) + backPress(navState);
            }}
            injectedJavaScript={INJECTED_JAVASCRIPT}
            onMessage={(event) => { }}
        />
    )
};