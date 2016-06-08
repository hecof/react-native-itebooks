import React, {
    Component,
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    Image,
    TouchableHighlight
} from 'react-native'

import BookImage from './book-image'

export default class SearchResult extends Component {
    constructor(props) {
        super(props)
    }

    onBookClick(id){
        this.props.navigator.push({
            id: 'details',
            book: this.props.book
        })
    }

    render() {
        var book = this.props.book
        return (
            <TouchableHighlight underlayColor='#dddddd' style={styles.container} onPress={this.onBookClick.bind(this)}>
                <View style={styles.row}>
                    <BookImage book={book} />
                    <View style={styles.info}>
                        <Text numberOfLines={2} style={styles.title}>{book.Title}</Text>
                        <Text numberOfLines={2} style={styles.subTitle}>{book.SubTitle}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#cfd8dc',
        paddingBottom: 10
    },
    info: {
        paddingRight: 5,
        flex: 1
    },
    title: {
        fontSize: 16,
        color: '#48BBEC',
        fontWeight: 'bold',
        paddingRight: 3
    },
    subTitle: {
        marginTop: 3,
        fontSize: 14
    }
})
