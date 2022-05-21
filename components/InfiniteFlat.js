import React from 'react';
import { View, Image, Text, FlatList, StyleSheet } from 'react-native';

export default class App extends React.Component {

    state = {
        data: [],
        page: 1, // here
        refreshing: false
    };

    _renderItem = ({ item }) => (
        <View style={styles.FLcontainer}>
            <Image source={{ uri: item.url }} style={{ height: 50 }} />
            <Text>{item.title}</Text>
            <Text>{item.id}</Text>
        </View>
    )
    //카드 렌더링 파트

    _handleRefresh = () => {
        this.setState({
            refreshing: true,
            page: 1,
        }, this._getData);
    }


    // _getData 함수 수정
    _getData = () => {
        const url = 'https://jsonplaceholder.typicode.com/photos?_limit=10&_page=' + this.state.page;
        fetch(url)
            .then(r => r.json())
            .then(data => {
                this.setState({
                    data: this.state.refreshing ? data : this.state.data.concat(data),
                    page: this.state.page + 1,
                    refreshing: false
                })
            });
    }

    componentDidMount() {
        this._getData();
    }

    // here
    _handleLoadMore = () => {
        this._getData();
    }

    render() {
        return (
            <FlatList
                data={this.state.data}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => item.id}
                onEndReached={this._handleLoadMore}
                onEndReachedThreshold={1}
                refreshing={this.state.refreshing}
                onRefresh={this._handleRefresh}
            />
        );
    }
}


const styles = StyleSheet.create({
    FLcontainer: {
        borderBottomWidth: 1,
        marginTop: 20
    },
});