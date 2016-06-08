import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    InteractionManager,
    ListView
} from 'react-native'

import dismissKeyboard from 'react-native-dismiss-keyboard'

import * as api from './../api/books'
import {browse as mySearchs} from './../api/searchs'

import assets from './assets'
import Toolbar from './toolbar'

export default class MySearchs extends Component {
    constructor(props) {
        super(props)

        var ds =  new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        })

        this.state = {
            dataSource: ds.cloneWithRows([])
        }
    }

    _onSearch(text){
        this.props.navigator.push({
            id: 'search',
            title: text
        })
    }

    _renderRow(text){
        return (
            <TouchableHighlight underlayColor='#dddddd' style={styles.row} onPress={this._onSearch.bind(this, text)}>
                <Text style={styles.rowText}>{text}</Text>
            </TouchableHighlight>
        )
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(async () => {
            let searchTerms = await mySearchs()
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(searchTerms)
            })
        })
    }

    render() {
        return (
            <Toolbar navigator={this.props.navigator} title='My searchs'>
                <ListView
                    style={styles.list}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections={true}  />
            </Toolbar>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        paddingTop: 3,
        paddingLeft: 8,
        paddingRight: 8
    },
    row: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cfd8dc',
    },
    rowText: {
        fontSize: 15
    }
});
