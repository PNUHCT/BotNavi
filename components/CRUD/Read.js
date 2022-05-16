import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function Read() {
    const [users, setUsers] = useState();
    const usersCollection = firestore().collection('users');

    const _callApi = async () => {
        try {
            const data = await usersCollection.get();
            setUsers(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
            console.log(users);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <View>
            <Button title="데이터 불러오기" onPress={_callApi} />
            {users?.map((row, idx) => {
                return <Text>{row.id}</Text>;
            })}
        </View>
    );
}