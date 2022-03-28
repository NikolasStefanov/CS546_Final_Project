const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const data = require('../data')
const dataFunctions = data.users
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;

router.get('/', async (req, res) => {
    res.render('extras/signup', {
        title: 'Sign Up'
    })
});

router.post('/', async (req, res) => {
    let formData = req.body
    if (!formData.username) {
        res.status(400).render('extras/signup', {
            title: 'Sign Up',
            error: "No Username"
        })
        return
    }
    let username = formData.username
    if (/[^A-Za-z0-9]/g.test(username)) {
        res.status(400).render('extras/signup', {
            title: 'Sign Up',
            error: "Username - Invalid Characters"
        })
        return
    }
    if (username.length < 4) {
        res.status(400).render('extras/signup', {
            title: 'Sign Up',
            error: "Username - Invalid Length"
        })
        return
    }
    username = username.toLowerCase()

    if (!formData.password) {
        res.status(400).render('extras/signup', {
            title: 'Sign Up',
            error: "No Passwod"
        })
        return
    }
    let password = formData.password
    if (password.indexOf(' ') >= 0) {
        res.status(400).render('extras/signup', {
            title: 'Sign Up',
            error: "Password - Contains Spaces"
        })
        return
    }
    if (password.length < 6) {
        res.status(400).render('extras/signup', {
            title: 'Sign Up',
            error: "Password - Invalid Length"
        })
        return
    }
    const userCollection = await users();
    const user = await userCollection.findOne({ username: username });
    if (user !== null) {
        res.status(400).render('extras/signup', {
            title: 'Sign Up',
            error: "Username already in system"
        })
        return
    }
    let goodUser;
    try {
        goodUser = await dataFunctions.createUser(username, password)
    }
    catch (e) {
        res.status(500).render('extras/signup', {
            title: 'Sign Up',
            error: e
        })
    }
    if (goodUser.userInserted === true) {
        req.session.user = { username: username };
        res.redirect('/private');
    }
    else {
        res.status(500).render('extras/signup', {
            title: 'Sign Up',
            error: "An error has occurred"
        })
    }
});

module.exports = router;