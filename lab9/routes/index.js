const path = require('path');
const constructorMethod = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(path.resolve('static/home.html'));
    });

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;