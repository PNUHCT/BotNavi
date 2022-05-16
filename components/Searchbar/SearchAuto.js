import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import data from '../data.json';

export default function App({ selectedItem }) {
    const [selectedItem, setSelectedItem] = useState(null);
    let Video = data.Video;


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <AutocompleteDropdown
                    clearOnFocus={false}
                    closeOnBlur={true}
                    closeOnSubmit={false}
                    // initialValue={{id: '0'}} // or just '2'
                    onSelectItem={setSelectedItem}
                    dataSet={[
                        { id: '1', title: 'Alpha' },
                        { id: '2', title: 'Beta' },
                        { id: '3', title: 'Gamma' },
                        { id: '4', title: 'View' },
                        { id: '5', title: 'Blue' },
                        { id: '6', title: 'Red' },
                        { id: '7', title: 'Green' },
                        { id: '8', title: 'White' },
                        { id: '9', title: 'Gold' },
                    ]}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    itemStyle: {
        padding: 10,
    },
});
