const showRoutes = require('./shows');
const path = require('path');

const constructorMethod = (app) => {
    app.use('/', showRoutes);
    app.get('/about', (req, res) => {
        res.sendFile(path.resolve('static/about.html'));
    });

    app.use('*', (req, res) => {
        res.status(404).sendFile(path.resolve("static/404.html"));
    });
    app.use(function (req, res) {
        res.status(404) .sendFile(path.resolve("static/404.html"));
    });
};

module.exports = constructorMethod;