const express = require('express');
const router = express.Router();
const data = require('../data');
const characterData = data.characters;

router.get('/:id', async (req, res) => {

    let characterInfo = await characterData.getInfo(req.params.id)

    if (characterInfo === 404) {
        res.render('extras/error', {
            error: "Error 404: Character Not Found"
        }
        )
        return
    }

    if (!characterInfo) {
        res.render('extras/error', {
            error: 'Character had no info'
        })
        return
    }

    let description = characterInfo.description.trim()
    if (description === "") {
        description = "Description Not Available"
    }

    let comics = characterInfo.comics.items

    let comicBool = true
    if (comics.length === 0) {
        comics = "No Comics Available"
        comicBool = false
    }

    res.render('extras/character', {
        title: characterInfo.name,
        charName: characterInfo.name,
        img_path: characterInfo.thumbnail.path,
        img_ext: characterInfo.thumbnail.extension,
        desc: description,
        comicBool: comicBool,
        comics: comics
    })
})


module.exports = router;