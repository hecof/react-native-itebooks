import React, {
    AsyncStorage
} from 'react-native'

const MY_SEARCHS = 'MY_SEARCHS'


export async function add(searchTerm){
    AsyncStorage.multiGet([MY_SEARCHS], (err, stores) => {
        let searches = []

        if (stores && stores[0][1])
            searches = JSON.parse(stores[0][1])

        if (searches.indexOf(searchTerm) == -1){
            searches.push(searchTerm)
            JSON.stringify(searches)
            AsyncStorage.setItem(MY_SEARCHS, JSON.stringify(searches))
        }
    })
}

export async function browse(){
    let searches = []
    stores = await AsyncStorage.multiGet([MY_SEARCHS])

    if (stores)
        return JSON.parse(stores[0][1])
    else
        return []
}
