'use-strict';

import React, { Component } from 'react';
import { 
    Text,
    TextInput, 
    StyleSheet,
    View,
    Image,
    Button
} from 'react-native';

var SearchResults = require('./SearchResults');

class Search extends Component {
    constructor(props){
        super(props);

        this.onSearchPressed = this.onSearchPressed.bind(this);

        this.state = {
            
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputField} placeholder="Search" onChangeText={(text) => this.setState({searchQuery: text})}/>
                <Button style={styles.loginButton} title="Search" color="#48bbbc" onPress={this.onSearchPressed}/>
            </View>
        );
    }

    onSearchPressed() {
        this.props.navigator.push({
            component: SearchResults,
            title: 'Results',
            passProps: {
                searchQuery: this.state.searchQuery
            }
        });
    }
 }

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D0E9F9',
        padding: 10,
        paddingTop: 65,
        alignItems: 'center'
    },
    inputField: {
        height:50,
        marginTop: 10,
        padding: 8,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbbc'
    },
    searchButton: {
        height: 50,
        margin: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',   
    },
})

module.exports = Search;