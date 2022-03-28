var axios = require('axios');

let isString = (str) => {
    if (typeof str !== 'string') {
        throw 'Error: Not a String';
    }
}
let whiteSpace = (str) => {
    if (!str.replace(/\s/g, '').length) {
        //https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces/50971250
        throw 'Error: String is just whitespace'
    }
}

async function getAllPeople() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data // this will be the array of people objects
}
const getPersonById = async function getPersonById(id) {
    //Error Checking
    if (!id && id != 0) {
        throw 'Error: No Input';
    }
    isString(id)
    id = id.trim()
    whiteSpace(id)

    //Real Function
    let data = await getAllPeople()
    for (let person of data) {
        if (person.id === id) {
            return person
        }
    }
    throw 'Error: Person not found'

}

module.exports = {
    getPersonById,
    getAllPeople
}
