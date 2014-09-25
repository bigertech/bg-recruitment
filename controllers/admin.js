
/**
 * Main controller for frontend
 */

var _ = require('lodash');
var fs = require('fs');
var when = require('when');
var uuid = require('node-uuid');
var toMarkdown = require('to-markdown').toMarkdown;

var api = require('../api');
var config = require('../config');

var adminControllers;

adminControllers = {

    index: function(req, res, next) {
        var jobs = null;
        var where = {};

        _.forOwn(req.query, function(val, key) {
            if (!_.isEmpty(val)) {
                where[key] = val;
            }
        });

        api.jobs.findByWhere(where).then(function(j) {
            jobs = j;

            return api.types.findAll();
        }).then(function(types) {
            res.render('admin/index', { jobs: jobs, types: types, query: req.query });
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
            job.description = toMarkdown(job.description);
            return api.types.findAll();
        }).then(function(types) {
            res.render('admin/edit_job', { job: job, types: types });
        }).otherwise(function(err) {
            console.log(err);
            res.jsonp({err: 'Page not fount.'});
        });
    },

    updateJob: function(req, res, next) {
        var job = req.body;

        api.jobs.updateById(job, job.id).then(function(job) {
            res.jsonp({ status: true });
        }).otherwise(function(err) {
            res.jsonp({ status: false });
        });
    },

    deleteJob: function(req, res, next) {
        var id = req.params.id;

        api.jobs.deleteById(id).then(function() {
            res.jsonp({ status: true });
        }).otherwise(function() {
            res.jsonp({ status: false });
        });
    },

    type: function(req, res, next) {
        api.types.findAll().then(function(types) {
            res.render('admin/type', { types: types });
        });
    },

    addType: function(req, res, next) {
        res.render('admin/add_type');
    },

    createType: function(req, res, next) {
        var type = req.body;

        api.types.add(type).then(function(type) {
            res.jsonp({ status: true });
        }).otherwise(function(err) {
            res.jsonp({ status: false });
        });
    },

    editType: function(req, res, next) {
        var id = req.params.id;

        api.types.findById(id).then(function(type) {
            res.render('admin/edit_type', { type: type });
        }).otherwise(function(err) {
            res.jsonp({err: 'Page not fount.'});
        });
    },

    updateType: function(req, res, next) {
        var type = req.body;

        api.types.updateById(type, type.id).then(function(type) {
            res.jsonp({ status: true });
        }).otherwise(function(err) {
            res.jsonp({ status: false });
        });
    },

    deleteType: function(req, res, next) {
        var id = req.params.id;

        api.types.deleteById(id).then(function() {
            res.jsonp({ status: true });
        }).otherwise(function(err) {
            res.jsonp({ status: false });
        });
    },

    member: function(req, res, next) {
        api.members.findAll().then(function(members) {
            res.render('admin/member', { members: members });
        });
    },

    addMember: function(req, res, next) {
        res.render('admin/add_member');
    },

    createMember: function(req, res, next) {
        var member = req.body;

        if (!_.isEmpty(req.files.img.name)) {
            var img = req.files.img;
            var target = new Date().getTime() + img.name.substr(img.name.lastIndexOf('.'));

            move(img.path, config().paths.upload + '/' + target).then(function() {
                member.img = target;

                return api.members.add(member);
            }).then(function() {
                res.redirect('/admin/member');
            }).otherwise(function(err) {
                res.jsonp({status: false});
            });
        } else {
            return api.members.add(member).then(function() {
                res.redirect('/admin/member');
            }).otherwise(function() {
                res.jsonp({status: false});
            });
        }
    },

    editMember: function(req, res, next) {
        var id = req.params.id;

        api.members.findById(id).then(function(member) {
            res.render('admin/edit_member', { member: member });
        }).otherwise(function(err) {
            res.jsonp({err: 'Page not fount.'});
        });
    },

    updateMember: function(req, res, next) {
        var member = req.body;

        if (!_.isEmpty(req.files.img.name)) {
            var img = req.files.img;
            var target = new Date().getTime() + img.name.substr(img.name.lastIndexOf('.'));

            move(img.path, config().paths.upload + '/' + target).then(function() {
                member.img = target;

                return api.members.updateById(member, member.id);
            }).then(function() {
                res.redirect('/admin/member');
            }).otherwise(function(err) {
                res.jsonp({status: false});
            });
        } else {
            return api.members.updateById(member, member.id).then(function() {
                res.redirect('/admin/member');
            }).otherwise(function() {
                res.jsonp({status: false});
            });
        }
    },

    deleteMember: function(req, res, next) {
        var id = req.params.id;

        api.members.deleteById(id).then(function() {
            res.jsonp({ status: true });
        }).otherwise(function(err) {
            console.log(err);
            res.jsonp({ status: false });
        });
    },

    login: function(req, res, next) {
        res.render('admin/login');
    },

    doLogin: function(req, res, next) {
        var user = {
            username: req.body.username,
            password: req.body.password
        }

        if (user.username == config().user.username &&
            user.password == config().user.password) {
            req.session.user = config().user;
            res.jsonp({ status: true });
        } else {
            res.jsonp({ status: false });
        }
    },
};

function move(src, dest) {
    var deferred = when.defer();

    fs.rename(src, dest, function(err) {
        if (err) {
            return deferred.reject(err);
        }

        return deferred.resolve();
    });

    return deferred.promise;
};

module.exports = adminControllers;
