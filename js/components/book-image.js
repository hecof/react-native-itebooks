import React, {
    Component,
    StyleSheet,
    Image,
    Text
} from 'react-native'

export default class BookImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    _showDefault(){
        if (this.state.loading)
            return <Image source={require('./../../img/book.png')}></Image>
        return null
    }

    render(){
        var book = this.props.book

        return (
            <Image source={{ uri: book.Image }} style={styles.img}  onLoadEnd={ () => this.setState({loading: false}) } >
                {this._showDefault()}
            </Image>
        )

    }
}

const styles = StyleSheet.create({
    img: {
        width: 60,
        height: 85,
        marginRight: 15,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
