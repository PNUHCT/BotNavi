import React from 'react';
import { View, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const App = () => {
    const addCollection = firestore().collection('users');
    const DeleteDB = async () => {
        try {
            //   await addCollection.doc('').delete();
            const rows = await addCollection.where('name', '==', 'ssilook');
            rows.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                });
            });
            console.log('Delete Complete!', rows);
        } catch (error) {
            console.log(error.message);
        }
    };
    // ...
    return (
        <View>
            {/* ... */}
            <Button title="Delete DB" onPress={DeleteDB} />
        </View>
    );
};

export default App;