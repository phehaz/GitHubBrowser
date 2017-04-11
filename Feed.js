'use-strict';

import React, { Component } from 'react';
import { 
    Text,
    StyleSheet,
    View,
    ListView,
    ActivityIndicator,
    Image,
    TouchableHighlight,
    NavigatorIOS
} from 'react-native';

var moment = require('moment');

class Feed extends Component {
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.renderRow = this.renderRow.bind(this);
        // this.onRowSelected = this.onRowSelected.bind(this);

        this.state = {
            dataSource: ds,
            showProgress: true
        }
    }

    componentDidMount() {
        this.fetchFeed();
    }

    render() {
        if(this.state.showProgress){
            return(
                <View style={styles.loadingHolder}>
                    <ActivityIndicator
                        animating={true}
                        size='large'
                    />
                </View>
            )
        }
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
                        .cloneWithRows(feedItems),
                    showProgress: false
                });
            });
        });
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight onPress={ () => {
                        this.onRowSelected(sectionID, rowID);
                    }
                }
                underlayColor='lightgray'
            >
                <View style={styles.listViewRow}>
                    <Image style={styles.avatarImage} source={{uri: rowData.actor.avatar_url}}/>
                    <View style={styles.rowTextContainer}>
                        <Text style={styles.rowText}>{moment(rowData.created_at).fromNow()}</Text>
                        <Text style={[styles.rowText, styles.authorText]}>{rowData.actor.login}</Text>
                        <Text style={styles.rowText}>at <Text style={[styles.rowText, styles.repoText]}>{rowData.repo.name}</Text></Text>
                        
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    onRowSelected(sectionID, rowID) {
        console.log('Selected row: ' + rowID);
        var rowData = this.state.dataSource.getRowData(0, rowID);
        console.log(rowData);
    }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  loadingHolder: {
    flex: 1,
    justifyContent: 'center',
  },
  rowText: {
    color: '#333333',
    fontSize: 12
  },
  authorText: {
    fontWeight: '900',
  },
  repoText: {
      fontWeight: '100',
      fontStyle: 'italic'
  },
  listViewRow: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderColor: 'lightgray',
    borderBottomWidth: 1
  },
  avatarImage: {
      height:36,
      width: 36,
      borderRadius: 18
  },
  rowTextContainer: {
      marginLeft: 20
  },
});

module.exports = Feed;