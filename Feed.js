'use-strict';

import React, { Component } from 'react';
import { 
    Text,
    StyleSheet,
    View,
    ListView
} from 'react-native';

class Feed extends Component {
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.renderRow = this.renderRow.bind(this);

        this.state = {
            dataSource: ds.cloneWithRows(['A', 'B', 'C'])
        }
    }

    componentDidMount() {
        this.fetchFeed();
    }

    render() {
        return(
            <View style={styles.mainView}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }

    fetchFeed(){
        require('./AuthService').getAuthInfo( (err, authInfo) => {
            if(err){
                throw err;
            }

            var url = 'https://api.github.com/users/' + authInfo.user.login + '/received_events';
            fetch(url, {
                headers: authInfo.header
            })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                var feedItems = responseData;
                    // responseData.filter( (ev) => 
                    //     ev.type == 'PushEvent');
                this.setState({
                    dataSource: this.state.dataSource
                        .cloneWithRows(feedItems)}
                    );
            })
        });
    }

    renderRow(rowData, sectionID, rowID) {
        return <Text style={styles.rowText}>{rowData}</Text>
    }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCF0',
  },
  rowText: {
    color: '#333333',
    alignSelf: 'center'
  },
});

module.exports = Feed;