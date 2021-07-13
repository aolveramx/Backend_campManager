let capitalizeFirstLetter = function(string) {
    string=string.trim();
    string=string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
};

let hasBlanckSpace = function(string) {
    let subString1='';
    let subString2='';
    if(string.includes(' ')) {
        const blanckSpace = string.search(/\s/)
        subString1 = string.slice(0, blanckSpace)
        subString2 = capitalizeFirstLetter(string.slice(blanckSpace))
        return subString1.concat(' ',subString2);
    } else {
        return string;
    }
}

let queryCapitalized = function(searchObject) {
    if(searchObject.location) {
        searchObject.location=capitalizeFirstLetter(searchObject.location);
        searchObject.location=hasBlanckSpace(searchObject.location)
        return searchObject;
    }
}

module.exports = { queryCapitalized, hasBlanckSpace }