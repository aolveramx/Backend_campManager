let deleteCommas = function(idArray) {
    const idEdit = idArray.join('')
    return(idEdit)
}

let capitalizeID = function(ID) {
    let idArray = []
    let idsplit = ID.match(/[a-zA-Z]+|[0-9]+(?:\.[0-9]+|)/g)
    idsplit.forEach(part => {
        let partEdited = part.toUpperCase()
        idArray.push(partEdited)
    })
    let idFinal = deleteCommas(idArray)
    return (idFinal)
}


module.exports = { capitalizeID }