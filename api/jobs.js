
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

    findById: function(id) {
        return models.Job.findOne({id: id}).then(function(job) {
            if (job) {
                return job;
            }

            return when.reject(new errors.NotFoundError('Job not found.'));
        });
    },

    findByWhere: function(where) {
        where = _.pick(where, ['name', 'type_id', 'address']);

        var jobs = null;
        return models.Job.query(function(qb) {
            if (where.name) {
                qb = qb.where('name', 'like', '%' + where.name + '%');
                delete where.name;
                qb = qb.orWhere(where);
            } else {
                qb = qb.orWhere(where);
            }
        }).fetchAll().then(function(j) {
            jobs = j;
            if (_.isEmpty(jobs)) {
                return [];
            } else {
                jobs = jobs.toJSON();
            }

            jobs = _.sortBy(jobs, function(job) {
                return 1000000 - job.id;
            });

            var id = [];
            jobs.forEach(function(job, index) {
                id.push(job.type_id);
                jobs[index].published_at = moment(job.published_at * 1000).format('YYYY-MM-DD');
            });

            return models.Type.findIn(id);
        }).then(function(result) {
            if (!_.isEmpty(result)) {
                var types = result.toJSON();

                types.forEach(function(type, i) {
                    jobs.forEach(function(job, j) {
                        if (job.type_id == type.id) {
                            jobs[j].type = type.name;
                        }
                    });
                });
            }

            return jobs;
        });
    },

    add: function(data, options) {
        return models.Job.add(data, options).then(function(job) {
            if (job) {
                return job;
            }

            return when.reject('Failed to add a job.');
        });
    },

    updateById: function(data, id) {
        return models.Job.edit(data, {id: id}).then(function(job) {
            if (job) {
                return job.toJSON();
            }

            return when.reject(new errors.NotFoundError('Job not found.'));
        });
    },

    deleteById: function(id) {
        return models.Job.destroy({id: id});
    }
};

module.exports = jobs;
