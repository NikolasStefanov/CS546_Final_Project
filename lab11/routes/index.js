const constructorMethod = (app) => {
    app.get('/', (req, res) => {
        res.render('partials/home', {
            title: 'Show Finder'
        })
    });
    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
}

module.exports = constructorMethod;