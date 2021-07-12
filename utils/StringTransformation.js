let capitalizeFirstLetter = function(string) {
    string=string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
};

let queryCapitalized = function(searchObject) {
    if(searchObject.location) {
        searchObject.location=capitalizeFirstLetter(searchObject.location);
        return searchObject;
    }
}

module.exports =  queryCapitalized;