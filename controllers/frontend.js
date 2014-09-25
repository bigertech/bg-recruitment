
/**
 * Main controller for frontend
 */

var _ = require('lodash');

var api = require('../api');
var config = require('../config');

var frontendControllers;

frontendControllers = {

    index: function(req, res, next) {
        var types = null;

        api.types.getWithJobs().then(function(t) {
            types = t;
            return api.members.findAll();
        }).then(function(m) {
            var random = [];
            var members = [];
            var len = m.length;
            var maxLen = config().flash.number;

            if (len > maxLen) {
                for (; random.length < maxLen;) {
                    random.push(parseInt(Math.random() * len));
                    random = _.uniq(random);
                }

                random.forEach(function(rand) {
                    members.push(m[rand]);
                });
            } else {
                members = m;
            }

            var data = {
                title: 'Bigertech',
                meta_title: 'Let\' it go.',
                types: types,
                members: members
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
