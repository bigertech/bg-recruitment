
/**
 * Main controller for frontend
 */

var api = require('../api');

var frontendControllers;

frontendControllers = {

    index: function(req, res, next) {
        api.types.getWithJobs().then(function(types) {
            var data = {
                title: 'Bigertech',
                meta_title: 'Let\' it go.',
                types: types
            }

            res.render('index', data);
        });
    },

    job: function(req, res, next) {
        api.jobs.findById(req.params.id).then(function(job) {
            res.jsonp(job);
        }).otherwise(function(err) {
            res.jsonp(null);
        });
    }
};

module.exports = frontendControllers;
