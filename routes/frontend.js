

var frontend = require('../controllers/frontend'),
    frontendRoutes;

frontendRoutes = function (app) {
    app.get('/', frontend.index);

    app.get('/job/:id', frontend.job);
};

module.exports = frontendRoutes;
