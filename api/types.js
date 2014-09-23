
var when = require('when');
var _ = require('lodash');
var moment = require('moment');

var models = require('../models');
var errors = require('../errors');

var types = {

    findAll: function(options) {
        return models.Type.findAll().then(function(types) {
            types = _.sortBy(types, function(type) {
                return 1000000 - type.id;
            });

            return types;
        });
    },

    getWithJobs: function(options) {
        var all = [];
        var types = [];

        return this.findAll().then(function(t) {
            types = t;
            types.forEach(function(type, index) {
                types[index].jobs = [];
                all.push(models.Job.where({type_id: type.id}).fetchAll());
            });

            return when.all(all);
        }).then(function(jobs) {
            var items = [];

            jobs.forEach(function(job) {
                job.forEach(function(item) {
                    items.push(item);
                });
            });

            return items;
        }).then(function(jobs) {
            jobs.forEach(function(job) {
                job = job.toJSON();

                types.forEach(function(type, i) {
                    if (type.id == job.type_id) {
                        types[i].jobs.push(_.pick(job, ['name', 'id']));
                        return ;
                    }
                });
            });

            return types;
        });
    },

    findById: function(id) {
        return models.Type.findOne({id: id}).then(function(type) {
            if (type) {
                return type;
            }

            return when.reject(new errors.NotFoundError('Type not found.'));
        });
    },

    add: function(data, options) {
        return models.Type.add(data, options).then(function(type) {
            if (type) {
                return type;
            }

            return when.reject('Failed to add a type.');
        });
    },

    updateById: function(data, id) {
        return models.Type.edit(data, {id: id}).then(function(type) {
            if (type) {
                return type.toJSON();
            }

            return when.reject(new errors.NotFoundError('Type not found.'));
        });
    },

    deleteById: function(id) {
        return models.Type.destroy({id: id}).then(function() {
            return models.Job.where({type_id: id}).destroy();
        });
    }
};

module.exports = types;
