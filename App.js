import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, SafeAreaView } from "react-native";
import BotStackScreen from "./components/BotStack";
import { NavigationContainer } from "@react-navigation/native";
import LoadingPage from "./components/Loading";

export default function App() {
  console.disableYellowBox = true;
  // 노란색 팝업창 없애는 코드

  const [loading, setLoading] = useState(true); // 로딩 화면 mount시키기 위한 useState

  useEffect(() => {
    //뒤의 1000 숫자는 1초를 뜻함
    //1초 뒤에 실행되는 코드들이 담겨 있는 함수
    setTimeout(() => {

      setLoading(false);
    }, 1000)

      .catch(err => { setLoading(false); setError(err); })
  }, []);


  //ActivityIndicator는 로딩 중 돌아가는 동그라미
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <View>
        <LoadingPage /> */}
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }


  //fetching 중 에러가 나면 나올 안내화면
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>
          {`fetching 에러다 욘석아~
                     네트워크를 확인해보렴!`}
        </Text>
      </View>
    );
  }

  return (loading ? <LoadingPage /> : (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <BotStackScreen />
      </SafeAreaView>
    </NavigationContainer>
  ));
}
