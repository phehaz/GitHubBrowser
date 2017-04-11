/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use-strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

var Login = require('./Login');
var AppContainer = require('./AppContainer');
var AuthService = require('./AuthService');

export default class GithubBrowser extends Component {
  constructor() {
    super();

    this.onLogin = this.onLogin.bind(this);

    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    }
  }

  render() {
    if(this.state.checkingAuth){
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size="large"
            style={styles.loader}
          />
        </View>
      );
    }

    if(this.state.isLoggedIn){
      return(
        <AppContainer />
      );
    }else{
      return (
          <Login onLogin={this.onLogin}/>
      );
    }
  }

  componentDidMount() {
    AuthService.getAuthInfo( (err, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    });
  }

  onLogin() {
    AuthService.getAuthInfo( (err, authInfo) => {
      console.log(err);
      console.log(authInfo);
    });
    console.log('Login success - setting isLoggedIn state');
    this.setState({isLoggedIn: true});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
