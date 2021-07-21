const moment = require('moment')

//Capitalize fisrt letter the strings
let capitalizeFirstLetter = function(string) {
    string=string.trim();
    string=string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
};

//Transformation of string with blanck spaced into a format accepted by DB
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

//Transformation of req.query.from and req.query.to into objects to search into DB
let datesConversion = function(searchObject) {
    let from={}
    let to={}
    if(searchObject.from) {
        from = {
            'year':parseInt(searchObject.from.split('-')[0]), 
            'month':parseInt(searchObject.from.split('-')[1]),
            'day':parseInt(searchObject.from.split('-')[2])
        }
    } else {
        from = {
            'year':parseInt(moment().format('YYYY-MM-DD').split('-')[0]),
            'month':parseInt(moment().format('YYYY-MM-DD').split('-')[1]),
            'day':parseInt(moment().format('YYYY-MM-DD').split('-')[2])
        }
    }
    if(searchObject.to) {
        to = {
            'year':parseInt(searchObject.to.split('-')[0]),
            'month':parseInt(searchObject.to.split('-')[1]),
            'day':parseInt(searchObject.to.split('-')[2])
        }
    }/* else {
        to = {
            'year':parseInt(moment().add(2,'years').format('YYYY-MM-DD').split('-')[0]),
            'month':parseInt(moment().add(2,'years').format('YYYY-MM-DD').split('-')[1]),
            'day':parseInt(moment().add(2,'years').format('YYYY-MM-DD').split('-')[2])
        }
    }*/
    return {from,to}
}

let datesStringConversion = function(string) {
    return dateConverted = {
        'year':parseInt(string.split('-')[0]), 
        'month':parseInt(string.split('-')[1]),
        'day':parseInt(string.split('-')[2])
    }
}

module.exports = { queryCapitalized, datesConversion, datesStringConversion }