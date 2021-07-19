let capitalizeFirstLetter = function(string) {
    string=string.trim();
    string=string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
};

let hasBlanckSpace = function(string) {
    let subString1=''
    let subString2=''
    let subString3=''
    let subString4=''
    let subString5=''
    let subString6=''
    if(string.includes(' ')) {
        const blanckSpace = string.search(/\s/)
        subString1 = string.slice(0, blanckSpace)
        subString2 = capitalizeFirstLetter(string.slice(blanckSpace))
        if(subString2.includes(' ')){
            const blanckSpace2 = subString2.search(/\s/)
            subString3 = subString2.slice(0, blanckSpace2)
            subString4 = capitalizeFirstLetter(subString2.slice(blanckSpace2))
            if(subString4.includes(' ')){
                const blanckSpace3 = subString4.search(/\s/)
                subString5 = subString4.slice(0, blanckSpace3)
                subString6 = capitalizeFirstLetter(subString4.slice(blanckSpace3))
                return subString1.concat(' ',subString3,' ',subString5,' ',subString6)
                //Example: Villa Magistral Del Aventino
            } else {
                return subString1.concat(' ',subString3,' ',subString4)
                //Example: Malta Order Summer
            }
        } else {
            return subString1.concat(' ',subString2)
            //Example: Humanitarian Diplomacy
        }
    } else {
        return string
    }
}


let queryCapitalized = function(searchObject) {
    if(searchObject.location) {
        searchObject.location=capitalizeFirstLetter(searchObject.location)
        searchObject.location=hasBlanckSpace(searchObject.location)
    }
    if(searchObject.name) {
        searchObject.name=capitalizeFirstLetter(searchObject.name)
        searchObject.name=hasBlanckSpace(searchObject.name)
    }
    return searchObject
}

module.exports = { queryCapitalized, hasBlanckSpace }