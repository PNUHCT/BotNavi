import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { firebase_db } from '../firebaseConfig';

export default function Users() {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .onSnapshot(() => {
        // see next step
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        const users = [];
  
        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
        setUsers(users);
        setLoading(false);
      });
  
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);




  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>User ID: {item.id}</Text>
          <Text>User Name: {item.name}</Text>
        </View>
      )}
    />
  );
}