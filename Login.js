'use-strict';

import React, { Component } from 'react';
import { 
    AppRegistry,
    Text,
    TextInput, 
    StyleSheet,
    View,
    Image,
    Button,
    ActivityIndicator
} from 'react-native';

class Login extends Component {
    constructor(props){
        super(props);

        this.onLoginPressed = this.onLoginPressed.bind(this);
        this.state = {
            showProgress: false,
        }
    }

    render() {
        var errorCtrl = <View />;

        if(!this.state.success && this.state.badCredentials){
            errorCtrl = <Text style={styles.error}>Wrong login info</Text>;
        }

        if(!this.state.success && this.state.unknownError){
            errorCtrl = <Text style={styles.error}>Something went wrong</Text>;
        }

        return (
            <View style={styles.container}>
                <Image 
                    style={styles.logo} 
                    source={require('./img/Octocat.png')} 
                />
                <Text style={styles.heading}>GitHub Browser</Text>
                <TextInput style={styles.inputField} placeholder="GitHub Account" onChangeText={(text) => this.setState({username: text})}/>
                <TextInput style={styles.inputField} placeholder="GitHub Password" secureTextEntry={true} onChangeText={(text) => this.setState({password: text})}/>
                <Button style={styles.loginButton} title="Log in" color="#48bbbc" onPress={this.onLoginPressed}/>

                {errorCtrl}

                <ActivityIndicator
                    animating={this.state.showProgress}
                    size="large"
                    color="#48bbbc"
                    style={styles.loading}
                />
            </View>
        );
    }

    onLoginPressed(){
        console.log('Attempting login with: { ' + this.state.username + ' }');
        this.setState({showProgress: true});
        
        var authService = require('./AuthService.js');
        authService.login({
            username: this.state.username,
            password: this.state.password
        }, (results) => {
            this.setState(Object.assign({
                showProgress: false
            },results));
            
            if(results.success && this.props.onLogin){
                this.props.onLogin();
            }
        });
    } 
 }

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D0E9F9',
        padding: 10,
        paddingTop: 40,
        alignItems: 'center'
    },
    logo: {
        width: 66,
        height: 55,
    },
    heading: {
        fontSize: 30,
        margin: 10,
    },
    inputField: {
        height:50,
        marginTop: 10,
        padding: 8,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbbc'
    },
    loginButton: {
        height: 50,
        margin: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',   
    },
    loading: {
        marginTop: 10
    },
    error: {
        color: '#990000',
        marginTop: 10
    }
})

module.exports = Login;