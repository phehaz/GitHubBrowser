'use-strict';

import React, { Component } from 'react';
import { 
    Text,
    StyleSheet,
    View,
    ListView,
    Image,
} from 'react-native';

var moment = require('moment');

class PushPayload extends Component {
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.onRenderRow = this.onRenderRow.bind(this);

        this.state = {
            dataSource: ds,
            pushEvent: props.pushEvent
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.avaterImage} source= {{uri: this.state.pushEvent.actor.avatar_url}} />
                <Text style={styles.plainText}>{moment(this.state.pushEvent.created_at).fromNow()}</Text>
                <Text>@{this.state.pushEvent.repo.name}</Text>
                <ListView 
                    dataSource={this.state.dataSource}
                    renderRow={this.onRenderRow}
                />
            </View>
        );
    }

    onRenderRow() {
        return (
            <View style={styles.commentRow}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: 8,
      marginTop: 65,
      justifyContent: 'flex-start',
      alignItems: 'center'
  },
  avaterImage: {
      height: 120,
      width: 120,
      borderRadius: 60
  },
  plainText: {
      marginTop: 20,
      marginBottom: 20,
      fontSize: 20
  },
  commentRow: {
      flex: 1,
      justifyContent: 'center'
  }
});

module.exports = PushPayload;