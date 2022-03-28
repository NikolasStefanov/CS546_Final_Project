var axios = require('axios');

async function getMatches(searchTerm) {
    const md5 = require('blueimp-md5');
    const publickey = '034db87042e2d2df1665fbe308e9e220';
    const privatekey = '5c915e68f16801b81c75625fad98524dc4413da9';
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    const url = baseUrl + '?nameStartsWith=' + searchTerm + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    let query = await axios.get(url)
    return query.data.data.results
}

module.exports = {
    getMatches
}