import React, {
    Component,
    StyleSheet,
    View,
    Navigator,
    BackAndroid
} from 'react-native'

import SearchForm from './search-form'
import Search from './search'
import BookDetails from './details'
import MySearchs from './my-searchs'

import * as strings from './../utils/strings'

export default class Main extends Component {
    constructor(props) {
        super(props)
    }

    _navigatorRenderScene(route, navigator) {
        _navigator = navigator

        switch (route.id) {
            case 'search-form':
                return (<SearchForm navigator={navigator} />)
            case 'search':
                return (<Search navigator={navigator} title={route.title} />)
            case 'details':
                    return (<BookDetails navigator={navigator} book={route.book} />)
            case 'my-searchs':
                    return (<MySearchs navigator={navigator} />)
        }
    }

    render() {
        return (
            <Navigator
                style={styles.container}
                initialRoute={{id: 'search-form'}}
                renderScene={this._navigatorRenderScene}
                configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottomAndroid} />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
