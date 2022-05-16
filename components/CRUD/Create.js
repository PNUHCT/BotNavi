import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const App = () => {
    const [addName, setAddName] = useState('');
    const [addAge, setAddAge] = useState('');
    const addCollection = firestore().collection('users');

    const addText = async () => {
        try {
            await addCollection.add({
                name: addName,
                age: addAge,
            });
            setAddName('');
            setAddAge('');
            console.log('Create Complete!');
        } catch (error) {
            console.log(error.message);
        }
    };
    // ...
    return (
        <View>
            {/* ... */}
            <TextInput
                placeholder="name"
                value={addName}
                onChange={e => setAddName(e.nativeEvent.text)}
            />
            <TextInput
                placeholder="age"
                value={addAge}
                onChange={e => setAddAge(e.nativeEvent.text)}
            />
            <Button title="Add Text" onPress={addText} />
        </View>
    );
};

export default App;