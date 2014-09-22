
/**
 * Main controller for frontend
 */

var api = require('../api');

var adminControllers;

adminControllers = {

    index: function(req, res, next) {
        api.jobs.findAll().then(function(jobs) {
            res.render('admin/index', { jobs: jobs });
        });
    },

    addJob: function(req, res, next) {
        api.types.findAll().then(function(types) {
            res.render('admin/add_job', { types: types });
        });
    },

    createJob: function(req, res, next) {
        var job = req.body;

        api.jobs.add(job).then(function(job) {
            res.jsonp({ status: true });
        }).otherwise(function(err) {
            res.jsonp({ status: false });
        });
    },

    editJob: function(req, res, next) {
        var id = req.params.id;
        var job = null;

        api.jobs.findById(id).then(function(j) {
            job = j;
            return api.types.findAll();
        }).then(function(types) {
            res.render('admin/edit_job', { job: job, types: types });
        }).otherwise(function(err) {
            res.jsonp({err: 'Page not fount.'});
        });
    },

    updateJob: function(req, res, next) {
        var job = req.body;

        api.jobs.updateById(job, job.id).then(function(job) {
            res.jsonp({ status: true });
        }).otherwise(function(err) {
            console.log(err);
            res.jsonp({ status: err });
        });
    },

    type: function(req, res, next) {
        res.render('admin/type');
    },

    addType: function(req, res, next) {
        res.render('admin/add_type');
    },

    editType: function(req, res, next) {
        res.render('admin/edit)type');
    }
};

module.exports = adminControllers;
