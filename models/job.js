
var _ = require('lodash');
var when = require('when');

var baseBookshelf = require('./base');
var Type = require('./type').Type;

var Job = baseBookshelf.Model.extend({
    tableName: 'job',

    type: function () {
        return this.belongsTo(Type, 'type_id');
    }
}, {
    findAll: function(options) {
        var jobs = null;

        return baseBookshelf.Model.findAll.call(this, options).then(function(result) {
            jobs = result.toJSON();

            var id = [];
            jobs.forEach(function(job, index) {
                id.push(job.type_id);
            });

            return Type.findIn(id);
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

    findOne: function(data, options) {
        var job = null;

        return baseBookshelf.Model.findOne.call(this, data, options).then(function(result) {
            if (_.isEmpty(result)) {
                return result;
            }

            job = result.toJSON();
            return new Type({id: job.type_id }).fetch();
        }).then(function(result) {
            if (_.isEmpty(result)) {
                return job;
            }

            var type = result.toJSON();
            job.type = type.name;

            return job;
        });
    },

    add: function(data, options) {
        var self = this;

        return baseBookshelf.Model.add.call(this, data, options).then(function (job) {
            return self.findOne({id: job.id}, options);
        });
    },

    edit: function(data, options) {
        return baseBookshelf.Model.edit.call(this, data, options);
    },

    destroy: function(options) {
        return baseBookshelf.Model.destroy.call(this, options);
    }
});

var Jobs = baseBookshelf.Collection.extend({
    model: Job
});

module.exports = {
    Job: baseBookshelf.model('Job', Job),
    Jobs: baseBookshelf.collection('Jobs', Jobs)
};
