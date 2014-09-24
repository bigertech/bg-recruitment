
var _ = require('lodash');
var when = require('when');

var baseBookshelf = require('./base');

var Member = baseBookshelf.Model.extend({
    tableName: 'member',
}, {
    findAll: function(options) {
        var jobs = null;

        return baseBookshelf.Model.findAll.call(this, options).then(function(result) {
            if (!_.isEmpty(result)) {
                return result.toJSON();
            }
        });
    },

    findOne: function(data, options) {
        return baseBookshelf.Model.findOne.call(this, data, options).then(function(result) {
            if (!_.isEmpty) {
                return result.toJSON();
            }
        });
    },

    add: function(data, options) {
        var self = this;

        return baseBookshelf.Model.add.call(this, data, options).then(function (member) {
            return self.findOne({id: member.id}, options);
        });
    },

    edit: function(data, options) {
        return baseBookshelf.Model.edit.call(this, data, options);
    },

    destroy: function(options) {
        return baseBookshelf.Model.destroy.call(this, options);
    }
});

var Members = baseBookshelf.Collection.extend({
    model: Member
});

module.exports = {
    Member: baseBookshelf.model('Member', Member),
    Members: baseBookshelf.collection('Members', Members)
};
