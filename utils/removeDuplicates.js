const removeDuplicates = (duplicates) => {
    const flag = {}
    const unique = []
    duplicates.forEach(elem => {
        if(!flag[elem]) {
            flag[elem] = true;
            unique.push(elem)
        }
    })
    return unique
}

const onlyGetDuplicates = (duplicates) => {
    const uniqueElements = new Set(duplicates)
    const filteredElements = duplicates.filter(elem => {
        if(uniqueElements.has(elem)) {
            uniqueElements.delete(elem)
        } else {
            return elem
        }
    })
    return [... new Set(filteredElements)]
}


module.exports = { removeDuplicates, onlyGetDuplicates }