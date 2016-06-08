import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    ToolbarAndroid,
    DrawerLayoutAndroid,
    ScrollView
} from 'react-native'

import dismissKeyboard from 'react-native-dismiss-keyboard'

import assets from './assets'

export default class Toolbar extends Component {
    constructor(props) {
        super(props)
    }

    _navigate(id){
        this.drawer.closeDrawer()
        this.props.navigator.push({id})
    }

    render(){
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={styles.drawerHeader}>
                    <Image source={assets.navigationLogo}></Image>
                    <Text style={styles.drawerHeaderTitle}>IT-ebooks</Text>
                    <Text style={styles.drawerHeaderPoweredBy}>{this.props.i18N.poweredBy}</Text>
                </View>
                <ScrollView>
                    <TouchableHighlight underlayColor={'#dddddd'} onPress={this._navigate.bind(this, 'my-searchs')}>
                        <View style={styles.navigationRow}>
                            <Image source={assets.mySearchs}></Image>
                            <Text style={styles.navigationRowText}>{this.props.i18N.mySearches}</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={'#dddddd'} onPress={this._navigate.bind(this, 'search-form')}>
                        <View style={styles.navigationRow}>
                            <Image source={assets.newSearch}></Image>
                            <Text style={styles.navigationRowText}>{this.props.i18N.newSearch}</Text>
                        </View>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        )

        return (
            <DrawerLayoutAndroid ref={r => this.drawer = r}
                drawerWidth={250}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>
                <View style={styles.container}>
                    <ToolbarAndroid style={styles.toolbar}
                        title={this.props.title}
                        titleColor='#FFFFFF'
                        navIcon={assets.menu}
                        onIconClicked={() => this.drawer.openDrawer() } />
                    {this.props.children}
                </View>
            </DrawerLayoutAndroid>
        )
    }
}

Toolbar.defaultProps = {
    i18N: {
        newSearch: 'New Search',
        mySearches: 'My Searches',
        poweredBy: 'Powered by it-ebooks.info'
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
    drawerHeader: {
        backgroundColor: '#2196F3',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerHeaderTitle: {
        color: '#fff',
        fontSize: 20,
        marginTop: 10
    },
    drawerHeaderPoweredBy: {
        color: 'gold'
    },
    navigationRow: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
        padding: 10
    },
    navigationRowText: {
        flex: 1,
        marginLeft: 5
    }
});
