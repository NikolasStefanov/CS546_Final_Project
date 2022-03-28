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
let isNum = (num) => {
    if (typeof num !== 'number') {
        throw 'Error: Not a Number';
    }
    if (isNaN(num)) {
        throw 'Error: Not a Number';
    }
}
async function getPeople() {
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
    let data = await getPeople()
    for (let person of data) {
        if (person.id === id) {
            return person
        }
    }
    throw 'Error: Person not found'

}
const sameStreet = async function sameStreet(streetName, streetSuffix) {
    //Error Checking
    if (!streetName && streetName != 0) {
        throw 'Error: No Input';
    }
    if (!streetSuffix && streetSuffix != 0) {
        throw 'Error: No Input';
    }
    isString(streetName)
    isString(streetSuffix)
    whiteSpace(streetName)
    whiteSpace(streetSuffix)


    //Real Function
    let data = await getPeople()
    let retArr = []
    for (let person of data) {
        if (person.address.home.street_name.toUpperCase() === streetName.toUpperCase() && person.address.home.street_suffix.toUpperCase() === streetSuffix.toUpperCase()) {
            //Person's Home Address
            retArr.push(person)
        }
        else if (person.address.work.street_name.toUpperCase() === streetName.toUpperCase() && person.address.work.street_suffix.toUpperCase() === streetSuffix.toUpperCase()) {
            //Person's Work Address
            retArr.push(person)
        }
        else {
            //No Match
            continue
        }
    }
    if (retArr.length <= 1) {
        throw 'Error: No same streets'
    }
    return retArr
}
const manipulateSsn = async function manipulateSsn() {
    //Real Function
    let data = await getPeople()
    let curLowSSN = Number.MAX_SAFE_INTEGER
    let curLowPerson = {}
    let curHighSSN = 0
    let curHighPerson = {}
    let sum = 0
    let ssn = 0
    for (let person of data) {
        ssn = parseInt(person.ssn.split("-").join("").split("").sort(function (a, b) { return a - b }).join(""))
        if (ssn > curHighSSN) {
            curHighPerson = person
            curHighSSN = ssn
        }
        if (ssn < curLowSSN) {
            curLowPerson = person
            curLowSSN = ssn
        }
        sum = sum + ssn
    }

    let average = Math.floor(sum / data.length)
    let returnObj = {
        highest: {
            firstName: curHighPerson.first_name,
            lastName: curHighPerson.last_name
        },
        lowest: {
            firstName: curLowPerson.first_name,
            lastName: curLowPerson.last_name
        },
        average: average
    }
    return returnObj
}
const sameBirthday = async function sameBirthday(month, day) {
    //Error Checking
    if (!month && month != 0) {
        throw 'Error: No Input';
    }
    if (!day && day != 0) {
        throw 'Error: No Input';
    }
    month = parseInt(month)
    day = parseInt(day)
    isNum(month)
    isNum(day)
    if (!(month >= 1 && month <= 12)) {
        throw "Error: Invalid Month"
    }
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            if (!(day >= 1 && day <= 31)) {
                throw "Error: Invalid Day for 31-Day Month"
            }
            break;
        case 2:
            if (!(day >= 1 && day <= 28)) {
                throw "Error: Invalid Day for February"
            }
            break;
        default:
            if (!(day >= 1 && day <= 30)) {
                throw "Error: Invalid Day for 30-Day Month"
            }
            break;
    }

    //Real Function
    let data = await getPeople()
    let retArr = []
    for (let person of data) {
        if (parseInt(person.date_of_birth.substring(0, 2)) === month && parseInt(person.date_of_birth.substring(3, 5)) === day) {
            //Match
            retArr.push(person.first_name.concat(" ".concat(person.last_name)))
        }
        else {
            //No Match
            continue
        }
    }
    if (retArr.length === 0) {
        throw "Error: No same birthdays"
    }
    return retArr
}
module.exports = {
    getPersonById,
    sameStreet,
    manipulateSsn,
    sameBirthday,
    getPeople
}
