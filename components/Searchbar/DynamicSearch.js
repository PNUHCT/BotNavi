import React, { Component } from "react";
import { View } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";

export default class Test extends Component {
    handleOnChangeText = (text) => {
        // ? Visible the spinner
        this.setState({
            searchText: text,
            spinnerVisibility: true,
        });

        // ? After you've done to implement your use-case
        // ? Do not forget to set false to spinner's visibility
        this.setState({
            spinnerVisibility: false,
        });
    };

    render() {
        const { spinnerVisibility } = this.state;
        return (
            <View>
                <SearchBar
                    height={50}
                    fontSize={24}
                    fontColor="#fdfdfd"
                    iconColor="#fdfdfd"
                    shadowColor="#282828"
                    cancelIconColor="#fdfdfd"
                    backgroundColor="#ba312f"
                    spinnerVisibility={spinnerVisibility}
                    placeholder="Search any cosmetics ..."
                    fontFamily="BurbankBigCondensed-Black"
                    shadowStyle={styles.searchBarShadowStyle}
                    onChangeText={this.handleOnChangeText}
                />
            </View>
        );
    }
}