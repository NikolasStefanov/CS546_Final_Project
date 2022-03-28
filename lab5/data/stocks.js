var axios = require('axios')

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

async function getAllStocks() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data // this will be the array of people objects
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
    let data = await getAllStocks()
    for (let stock of data) {
        if (stock.id === id) {
            return stock
        }
    }
    throw 'Error: ID not found'
}

module.exports = {
    getStockById,
    getAllStocks
}
