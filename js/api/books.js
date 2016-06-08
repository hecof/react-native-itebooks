export async function browse(title, page = 0){
    try {
        let response = await fetch('http://it-ebooks-api.info/v1/search/' + title + '/page/' + page)
        let responseJson = await response.json()
        return responseJson
    } catch(error) {
        console.error(error)
    }
}

export async function details(id){
    try {
        let response = await fetch('http://it-ebooks-api.info/v1/book/' + id)
        let responseJson = await response.json()
        return responseJson
    } catch(error) {
        console.error(error)
    }
}
