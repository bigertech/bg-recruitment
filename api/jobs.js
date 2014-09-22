
var when = require('when');
var _ = require('lodash');
var moment = require('moment');

var models = require('../models');
var errors = require('../errors');

var jobs = {

    findAll: function(options) {
        return models.Job.findAll().then(function(jobs) {
            jobs = _.sortBy(jobs, function(job) {
                return 1000000 - job.id;
            });

            jobs.forEach(function(job, index) {
                jobs[index].published_at = moment(job.published_at * 1000).format('YYYY-MM-DD');
            });

            return jobs;
        });
    },

    // findById: function(id) {
    //     return models.Post.findOne({id: id}).then(function(post) {
    //         if (post) {
    //             return post.toJSON();
    //         }

    //         return when.reject(new errors.NotFoundError('Post not found.'));
    //     });
    // },

    add: function(data, options) {
        return models.Job.add(data, options).then(function(job) {
            if (job) {
                return job;
            }

            return when.reject('Failed to add a job.');
        });
    },

    // editById: function(data, id) {
    //     return models.Post.edit(data, {id: id}).then(function(post) {
    //         if (post) {
    //             return post.toJSON();
    //         }

    //         return when.reject(new errors.NotFoundError('Post not found.'));
    //     });
    // },

    // destroyById: function(id) {
    //     return models.Post.destroy({id: id});
    // }
};

module.exports = jobs;
