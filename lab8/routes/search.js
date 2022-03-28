const express = require('express');
const router = express.Router();
const data = require('../data');
const searchData = data.search;

router.post('/', async (req, res) => {
    let formData = req.body;
    if (!formData.searchTerm) {
        res.render('extras/error', {
            error: 'No searchTerm was inputted'
        })
        return
    }
    let listOfCharacters = await searchData.getMatches(formData.searchTerm)

    let listBool = true

    if (listOfCharacters.length === 0) {
        listBool = false
        res.render('extras/search', {
            title: 'Characters Found',
            searchTerm: formData.searchTerm,
            listBool: listBool
        })
        return
    }

    res.render('extras/search', {
        title: 'Characters Found',
        searchTerm: formData.searchTerm,
        characterList: listOfCharacters,
        listBool: listBool
    })
})


module.exports = router;