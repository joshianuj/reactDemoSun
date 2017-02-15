
export function checkStatus(response){
    if (!response.statusCode ||(response.statusCode >= 200 && response.statusCode < 300)) {
        return response
    } else {
        throw response
    }
}

export function parseJSON(response) {
    return response.json()
}