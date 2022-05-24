import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import BotStackScreen from "./components/BotStack";
import { NavigationContainer } from "@react-navigation/native";
import Loading from "./components/Loading";
import data from './data.json';

export default function App() {
  console.disableYellowBox = true;
  // 노란색 팝업창 없애는 코드


  // const [state, setState] = useState([])
  // const [ready, setReady] = useState(true)

  // useEffect(() => {
  //   //뒤의 1000 숫자는 1초를 뜻함
  //   //1초 뒤에 실행되는 코드들이 담겨 있는 함수
  //   setTimeout(() => {
  //     firebase_db.ref('/Video').once('value').then((snapshot) => {
  //       console.log("파이어베이스에서 데이터 가져왔습니다!!")
  //       let items = snapshot.val();

  //     //   setState(Video)
  //     //   setCateState(Video)
  //     //   setReady(false)
  //     // });
  //     setState(items)
  //     // setCateState(data.Video)
  //     setReady(false)
  //   }, 1000)


  // }, [])

  // return (ready ? <Loading /> : (
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <BotStackScreen />
      </SafeAreaView>
    </NavigationContainer>
  );
}
