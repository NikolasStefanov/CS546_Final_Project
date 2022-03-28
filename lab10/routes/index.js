const signUpRoutes = require('./signup');
const data = require('../data')
const dataFunctions = data.users

const constructorMethod = (app) => {
    app.use('/signup', signUpRoutes);

    app.get('/', (req, res) => {
        res.render('extras/home', {
            title: 'Home'
        })
    });

    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.render('extras/logout', {
            title: "Log Out"
        })
    });

    app.get("/private", (req, res) => {
        res.render("extras/private", { username: req.session.user.username });
    });

    app.post('/login', async (req, res) => {
        let formData = req.body
        if (!formData.username) {
            res.status(400).render('extras/home', {
                title: 'Home',
                error: "No Username"
            })
            return
        }
        let username = formData.username
        if (/[^A-Za-z0-9]/g.test(username)) {
            res.status(400).render('extras/home', {
                title: 'Home',
                error: "Username - Invalid Characters"
            })
            return
        }
        if (username.length < 4) {
            res.status(400).render('extras/home', {
                title: 'Home',
                error: "Username - Invalid Length"
            })
            return
        }
        username = username.toLowerCase()

        if (!formData.password) {
            res.status(400).render('extras/home', {
                title: 'Home',
                error: "No Password"
            })
            return
        }
        let password = formData.password
        if (password.indexOf(' ') >= 0) {
            res.status(400).render('extras/home', {
                title: 'Home',
                error: "Password - Contains Spaces"
            })
            return
        }
        if (password.length < 6) {
            res.status(400).render('extras/home', {
                title: 'Home',
                error: "Password - Invalid Length"
            })
            return
        }

        let goodUser;
        try {
            goodUser = await dataFunctions.checkUser(username, password)
        }
        catch (e) {
            res.status(500).render('extras/home', {
                title: 'Home',
                error: e
            })
            return
        }

        if (goodUser.authenticated) {
            req.session.user = { username: username };
            res.redirect('/private');
        }
        else {
            res.status(500).render('extras/home', {
                title: 'Home',
                error: "Invalid Username/Password"
            })
        }
    });

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;
