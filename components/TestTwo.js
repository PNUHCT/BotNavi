import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, Text, Image, StyleSheet } from 'react-native';
import { firebase_db } from '../firebaseConfig';

export default function Users() {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [state, setState] = useState([])

  useEffect(() => {
    firebase_db.ref('/items').once('value').then((snapshot) => {
        console.log("파이어베이스에서 데이터 가져왔습니다!!")
        let items = snapshot.val();

        setState(items)
        setLoading(false);
      });
  
    // Unsubscribe from events when no longer in use
  }, []);


  if (loading) {
    return <ActivityIndicator />;
  }
//ActivityIndicator는 로딩 중 돌아가는 동그라미

  return (
    <FlatList
      data={state}
      renderItem={({ item }) => (
        <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>User ID: {item.snippet.title}</Text>
            <Text>User Name: {item.snippet.channelId}</Text>
        </View>
      )}
    />
  );
}