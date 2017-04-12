'use-strict';

import React, { Component } from 'react';
import { 
    Text,
    StyleSheet,
    View,
    TabBarIOS,
    NavigatorIOS
} from 'react-native';

var Feed = require('./Feed');
var Search = require('./Search');

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
                    <NavigatorIOS
                        style={styles.navigator}
                        initialRoute={{
                            component: Feed,
                            title: 'Feed'
                        }}
                    />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Search"
                    icon={require('./img/search.png')}
                    selected={this.state.selectedTab == 'search'}
                    onPress={ () => {this.setState({selectedTab: 'search'})}}>
                    <NavigatorIOS
                        style={styles.navigator}
                        initialRoute={{
                            component: Search,
                            title: 'Search'
                        }}
                    />
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
  navigator: {
      flex: 1
  }
});

module.exports = AppContainer;