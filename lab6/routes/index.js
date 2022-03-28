const searchRoutes = require('./search');
const characterRoutes = require('./character');

const constructorMethod = (app) => {
    app.use('/search', searchRoutes);
    app.use('/reviews', reviewsRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;