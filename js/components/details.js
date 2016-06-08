import React, {
    Component,
    StyleSheet,
    View,
    Image,
    Text,
    ToolbarAndroid,
    ProgressBarAndroid,
    InteractionManager,
    ScrollView,
    Linking
} from 'react-native'

import Share from 'react-native-share'

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'

import * as api from './../api/books'

import assets from './assets'

let toolbarActions = [
    {title: 'Search', icon: assets.share, show: 'always'},
    {title: 'Go to Web', show: 'never'},
    {title: 'Download', show: 'never'}
]

export default class BookDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            book: null
        }
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions( async () => {
            var _book = await api.details(this.props.book.ID)
            this.setState({
                book: _book
            })
        })
    }

    _onActionSelected(index){
        switch(index){
            case 0:
                if (this.state.book)
                    Share.open({
                        share_text: this.state.book.Title,
                        share_URL: 'http://it-ebooks.info/book/' + this.state.book.ID,
                        title: 'Share Book Link'
                    }, _ => {})
                break
            case 1:
                Linking.openURL('http://it-ebooks.info/book/' + this.state.book.ID)
                break
            case 2:
                break
        }

    }

    render(){
        var book = this.props.book
        var _book = this.state.book

        return (
            <View style={styles.container}>
                <ToolbarAndroid style={styles.toolbar}
                    titleColor='#FFFFFF'
                    subtitleColor='#FFFFFF'
                    navIcon={assets.back}
                    overflowIcon={assets.overflow}
                    onIconClicked={this.props.navigator.pop}
                    actions={toolbarActions}
                    onActionSelected={this._onActionSelected.bind(this)}/>
                <View style={styles.header}>
                    <Text style={styles.title}>{book.Title}</Text>
                    <Text style={styles.subTitle}>{book.SubTitle}</Text>
                </View>
                <ScrollableTabView
                    tabBarUnderlineColor='teal'
                    tabBarActiveTextColor='#757575'
                    tabBarInactiveTextColor='#757575'
                    renderTabBar={() => <DefaultTabBar />}>
                    <ScrollView tabLabel='Book'>
                        <View style={styles.box}>
                            <Text style={styles.boxTitle}>Cover</Text>
                            <View style={styles.boxBody}>
                                <View style={styles.cover}>
                                    <Image style={styles.coverImg} source={{ uri: book.Image }} />
                                    <View style={{flex: 1, justifyContent: 'center'}}>
                                    {
                                        _book == null ? <ProgressBarAndroid /> : (
                                            <View>
                                                <Text style={[styles.coverInfoKey, styles.coverInfoRow]}>
                                                    Year: <Text>{_book.Year}</Text>
                                                </Text>
                                                <Text style={[styles.coverInfoKey, styles.coverInfoRow]}>
                                                    Pages: <Text>{_book.Page}</Text>
                                                </Text>
                                                <Text style={[styles.coverInfoKey, styles.coverInfoRow]}>
                                                    ISBN: <Text>{_book.ISBN}</Text>
                                                </Text>
                                                <Text style={styles.coverInfoKey}>Author(s):</Text>
                                                <Text style={styles.coverInfoValue}>{_book.Author}</Text>
                                            </View>
                                        )
                                    }
                                    </View>
                                </View>
                            </View>
                        </View>
                        {
                            _book == null ? <ProgressBarAndroid style={{marginTop: 10}} /> : (
                                <View style={[styles.box, {marginBottom: 8}]}>
                                    <Text style={styles.boxTitle}>Description</Text>
                                    <View style={styles.boxBody}>
                                        <Text style={styles.description}>{_book.Description}</Text>
                                    </View>
                                </View>
                            )
                        }
                    </ScrollView>
                    <View tabLabel='Notes' style={styles.notesContainer}>
                        <Image source={assets.notes} />
                    </View>
                </ScrollableTabView>
            </View>
        )

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
    header: {
        backgroundColor: '#2196F3',
        paddingTop: 5,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 5
    },
    title: {
        color: '#fff',
        fontSize: 16
    },
    subTitle: {
        fontSize: 13,
        color: '#ddd',
        marginTop: 8,
        marginBottom: 8
    },
    box: {
        backgroundColor: '#fff',
        borderColor: '#F5F5F5',
        borderWidth: 1,
        borderBottomWidth: 2,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5
    },
    boxTitle: {
        margin: 10,
        color: '#2196F3',
        fontSize: 15
    },
    boxBody: {
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
    },
    cover: {
        flexDirection: 'row',
    },
    coverImg: {
        marginRight: 15,
        width: 90,
        height: 128,
    },
    coverInfoKey: {
        fontSize: 15,
        color: '#3E2723'
    },
    coverInfoValue: {
        fontSize: 15,
        marginLeft: 5,
        color: '#3E2723'
    },
    coverInfoRow: {
        marginBottom: 5,
    },
    description: {
        fontSize: 15
    },
    notesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
