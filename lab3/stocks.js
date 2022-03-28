var axios = require('axios')
const people = require("./people")

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
async function getStocks() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data // this will be the array of people objects
}
const getPersonById = async function getPersonById(id, data) {
    //Real Function
    for (let person of data) {
        if (person.id === id) {
            return person
        }
    }
    throw "Error: ID not found"
}
const getPersonByName = async function getPersonByName(firstName, lastName, data) {
    //Real Function
    for (let person of data) {
        if (person.first_name === firstName && person.last_name === lastName) {
            return person
        }
    }
    throw "Error: ID not found"
}
const listShareholders = async function listShareholders() {
    //Real Function
    let stockData = await getStocks()
    let returnArr = []
    let users = []
    let data = await people.getPeople()
    for (let stock of stockData) {
        users = []
        for (let user of stock.shareholders) {
            let person = await getPersonById(user.userId, data)
            users.push({
                first_name: person.first_name,
                last_name: person.last_name,
                number_of_shares: user.number_of_shares
            })
        }
        returnArr.push({
            id: stock.id,
            stock_name: stock.stock_name,
            shareholders: users
        })
    }
    return returnArr

}
const topShareholder = async function topShareholder(stockName) {
    //Error Checking
    if (!stockName && stockName != 0) {
        throw 'Error: No Input';
    }
    isString(stockName)
    stockName = stockName.trim()
    whiteSpace(stockName)
    //Real Function
    let stockData = await getStocks()
    let curMax = 0
    let curMaxUser = {}
    let data = await people.getPeople()
    let bool = false
    for (let stock of stockData) {
        if (stock.stock_name === stockName) {
            bool = true
            if (stock.shareholders.length === 0) {
                return stockName + " currently has no shareholders."
            }
            for (let user of stock.shareholders) {
                if (user.number_of_shares > curMax) {
                    let person = await getPersonById(user.userId, data)
                    curMax = user.number_of_shares
                    curMaxUser = person
                }
            }
        }
    }
    if (!bool) {
        throw 'Error: Stock not found'
    }
    return "With " + curMax + " shares in " + stockName + ", " + curMaxUser.first_name + " " + curMaxUser.last_name + " is the top shareholder."
}
const listStocks = async function listStocks(firstName, lastName) {
    //Error Checking
    if (!firstName && firstName != 0) {
        throw 'Error: No Input for First Name';
    }
    if (!lastName && lastName != 0) {
        throw 'Error: No Input for Last Name';
    }
    isString(firstName)
    isString(lastName)
    firstName = firstName.trim()
    lastName = lastName.trim()
    whiteSpace(firstName)
    whiteSpace(lastName)
    //Real Function
    let stockData = await getStocks()
    let data = await people.getPeople()
    let person = await getPersonByName(firstName, lastName, data)
    let retArr = []
    for (let stock of stockData) {
        for (let user of stock.shareholders) {
            if (user.userId === person.id) {
                retArr.push({
                    stock_name: stock.stock_name,
                    number_of_shares: user.number_of_shares
                })
            }
        }
    }
    if (retArr.length === 0) {
        throw "Error: User has no shares"
    }
    return retArr
}
const getStockById = async function getStockById(id) {
    //Error Checking
    if (!id && id != 0) {
        throw 'Error: No Input';
    }
    isString(id)
    id = id.trim()
    whiteSpace(id)

    //Real Function
    let data = await getStocks()
    for (let stock of data) {
        if (stock.id === id) {
            return stock
        }
    }
    throw 'Error: ID not found'
}
module.exports = {
    listShareholders,
    topShareholder,
    listStocks,
    getStockById
}
