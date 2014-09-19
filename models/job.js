
var baseBookshelf = require('./base');

var Type = require('./type').Type;

var Job = baseBookshelf.Model.extend({
    tableName: 'job',

    type: function () {
        return this.belongsTo(Type, 'type_id');
    }
}, {
    findAll: function(options) {
        return baseBookshelf.Model.findAll.call(this, options);
    },

    findOne: function(data, options) {
        return baseBookshelf.Model.findOne.call(this, data, options);
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
