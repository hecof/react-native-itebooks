import React, {
    Component,
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    Image,
    BackAndroid,
    ProgressBarAndroid,
    ListView,
    InteractionManager,
    ToastAndroid,
    TouchableHighlight
} from 'react-native'

import * as api from './../api/books'

import {add as saveSearch} from './../api/searchs'

import BookRow from './book-row'

import assets from './assets'

let toolbarActions = [
    {title: 'Save search', icon: assets.save, show: 'always'}
]

export default class Search extends Component {
    constructor(props) {
        super(props)

        var ds =  new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        })

        this._books = []

        this.state = {
            init: true,
            fetching: false,
            page: 1,
            dataSource: ds.cloneWithRows(this._books),
            loadingView: true
        }

        this._onHardwareBackPress = this._onHardwareBackPress.bind(this)
    }

    componentDidMount(){
        BackAndroid.addEventListener('hardwareBackPress', this._onHardwareBackPress)

        InteractionManager.runAfterInteractions(() => {
            this.setState({
                loadingView: false,
                fetching: true
            }, async () => {
                let response = await api.browse(this.props.title)

                if (response.Books)
                    this._books = response.Books

                let toolBarSubTitle = ''
                if (response.Total == 1)
                    toolBarSubTitle = this.props.i18N.oneBookFound
                else if (response.Total > 1)
                    toolBarSubTitle = this.props.i18N.xBooksFounds.format(response.Total)

                this.setState({
                    init: false,
                    fetching: false,
                    toolBarSubTitle: toolBarSubTitle,
                    total: response.Total,
                    dataSource: this.state.dataSource.cloneWithRows(this._books)
                })
            })
        })
    }

    componentWillUnmount(){
        BackAndroid.removeEventListener('hardwareBackPress', this._onHardwareBackPress)
    }

    _onHardwareBackPress(){
        var navigator = this.props.navigator
        if (navigator.getCurrentRoutes().length === 1 )
            return false

        navigator.pop()
        return true
    }

    _onActionSelected(){
        saveSearch(this.props.title)
        ToastAndroid.show(this.props.i18N.searchSaved, ToastAndroid.SHORT)
    }

    async _onEndReached(){
        if (this.state.loading)
            return

        this.setState({
            fetching: true
        })

        var page = this.state.page + 1
        let response = await api.browse(this.props.title, page)

        if (!response.Books){
            this.setState({
                fetching: false
            })
            return
        }


        this._books = this._books.concat(response.Books)

        this.setState({
            fetching: false,
            page: page,
            dataSource: this.state.dataSource.cloneWithRows(this._books)
        })
    }

    _renderFooter(){
        return <ProgressBarAndroid styleAttr='Small' style={styles.listFooter} />
    }

    _renderResult(){
        if (this.state.total <= 0)
            return(
                <View style={styles.noBooks}>
                    <Image source={assets.notFound} />
                    <Text style={styles.oops}>Ooops!</Text>
                    <Text style={styles.noBooksFoundText}>{this.props.i18N.noBooksFound}</Text>
                </View>
            )

        return(
            <ListView
                style={styles.list}
                dataSource={this.state.dataSource}
                renderRow={ rowData => <BookRow book={rowData} navigator={this.props.navigator} /> }
                onEndReachedThreshold={10}
                onEndReached={ this._onEndReached.bind(this) }
                renderFooter={ this.state.fetching ? this._renderFooter.bind(this) : null }  />
        )
    }

    render() {
        if (this.state.loadingView)
            return null

        return (
            <View style={styles.container}>
                <ToolbarAndroid style={styles.toolbar}
                    title={this.props.title}
                    titleColor='#FFFFFF'
                    subtitle={this.state.toolBarSubTitle}
                    subtitleColor='#FFFFFF'
                    navIcon={assets.back}
                    onIconClicked={this.props.navigator.pop}
                    actions={toolbarActions}
                    onActionSelected={this._onActionSelected.bind(this)} />

                {
                    this.state.init ?
                        <View style={styles.loadingBox}>
                            <ProgressBarAndroid  />
                            <Text>{this.props.i18N.loadingWait}</Text>
                        </View> :
                        this._renderResult()
                }
            </View>
        )
    }
}

Search.defaultProps = {
    i18N: {
        searchSaved: 'Your search have been saved',
        xBooksFounds: '{0} books found',
        oneBookFound: '1 book found',
        noBooksFound: 'We could not find any book',
        pleaseTryAgain: 'Please try again',
        loadingWait: 'Loading, wait...'
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    toolbar: {
        height: 56,
        backgroundColor: '#2196F3'
    },
    loadingBox: {
        alignItems: 'center',
        marginTop: 50
    },
    listContainer: {
        paddingLeft: 8,
        paddingRight: 8,
        flex: 1
    },
    list: {
        flex: 1,
    },
    listFooter: {
        marginTop: 10,
        marginBottom: 10

    },
    noBooks: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    oops: {
        fontSize: 30,
        marginBottom: 10
    },
    noBooksFoundText: {
        fontSize: 20
    },
    tryAgainText: {
        color: '#48BBEC',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 5
    }
})
