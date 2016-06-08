import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image
} from 'react-native'

import dismissKeyboard from 'react-native-dismiss-keyboard'

import * as api from './../api/books'

import assets from './assets'
import Toolbar from './toolbar'

export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }

    onSearch(){
        dismissKeyboard()

        this.props.navigator.push({
            id: 'search',
            title: this.state.text
        })
    }

    render() {

        return (
            <Toolbar navigator={this.props.navigator} title='Search for it-books'>
                <View style={styles.form}>
                    <TextInput style={styles.searchInput} placeholder="Book title" onChange={ (e) => this.setState({text: e.nativeEvent.text}) }>
                        
                    </TextInput>
                    <TouchableHighlight style={styles.button} underlayColor='#dddddd' onPress={this.onSearch.bind(this)}>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableHighlight>
                </View>
            </Toolbar>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'center'
    },
    searchInput: {
        paddingLeft: 6,
        paddingRight: 6,
        paddingBottom: 2,
        fontSize: 16
    },
    button: {
        paddingTop: 7,
        paddingBottom: 7,
        backgroundColor: 'teal',
        borderRadius: 2,
        alignItems: 'center',
        margin: 10
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 17
    }
});
