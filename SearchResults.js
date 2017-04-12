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
} from 'react-native';

class SearchResults extends Component {
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: ds,
            showProgress: true,
            searchQuery: props.searchQuery
        }
    }

    componentDidMount() {
        this.doSearch();
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

    doSearch(){
        console.log('Doing search for: ' + this.state.searchQuery);
        var url = 'https://api.github.com/search/repositories?q=' + encodeURIComponent(this.state.searchQuery);

        fetch(url)
            .then( (response) => response.json())
            .then( (responseData) => {
                this.setState({
                    repositories: responseData.repositories,
                    dataSource: this.state.dataSource.cloneWithRows(responseData.items)
                });
            })
            .finally( () => {
                this.setState({
                    showProgress: false
                })
            })
    }

    renderRow(rowData, sectionID, rowID) {
        return (
                <View style={styles.mainView}>
                    <Text style={styles.rowText}>{rowData.full_name}</Text>
                    <View style={styles.listViewInnerContainer}>
                        <View style={styles.repoIconContainer}>
                            <Image style={styles.listViewItemIcon} source={require('./img/star.png')}></Image>
                            <Text style={styles.listViewItemText}>{rowData.stargazers_count}</Text>
                        </View>
                        <View style={styles.repoIconContainer}>
                            <Image style={styles.listViewItemIcon} source={require('./img/fork.png')}></Image>
                            <Text style={styles.listViewItemText}>{rowData.forks}</Text>
                        </View>
                        <View style={styles.repoIconContainer}>
                            <Image style={styles.listViewItemIcon} source={require('./img/issues.png')}></Image>
                            <Text style={styles.listViewItemText}>{rowData.open_issues}</Text>
                        </View>
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingTop: 65,
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
  repoIconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  listViewInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
  listViewItemIcon: {
    width: 20,
    height: 20
  },
  listViewItemText: {
      textAlign: 'center'
  }
});

module.exports = SearchResults;