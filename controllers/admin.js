
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
        res.render('admin/add_job');
    },

    editJob: function(req, res, next) {
        res.render('admin/edit_job');
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
