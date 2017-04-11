'use-strict';

import React, { Component } from 'react';
import { 
    Text,
    StyleSheet,
    View,
    TabBarIOS
} from 'react-native';

var Feed = require('./Feed');

class AppContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedTab: 'feed'
        }
    }

    render() {
        return(
            <TabBarIOS style={styles.container}>
                <TabBarIOS.Item
                    title='Feed'
                    icon={require('./img/inbox.png')}
                    selected={this.state.selectedTab == 'feed'}
                    onPress={ () => {this.setState({selectedTab: 'feed'})}}>
                    <Feed />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Search"
                    icon={require('./img/search.png')}
                    selected={this.state.selectedTab == 'search'}
                    onPress={ () => {this.setState({selectedTab: 'search'})}}>
                    <Text style={styles.welcome}>Tab 2</Text>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 16,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

module.exports = AppContainer;