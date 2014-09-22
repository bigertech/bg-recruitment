
var baseBookshelf = require('./base');

var Type = baseBookshelf.Model.extend({
    tableName: 'type',

    job: function () {
        return this.hasMany(require('./job').Job, 'type_id');
    }
}, {
    findAll: function(options) {
        return baseBookshelf.Model.findAll.call(this, options).then(function(result) {
            return result.toJSON();
        });
    },

    findOne: function(data, options) {
        return baseBookshelf.Model.findOne.call(this, data, options);
    },

    add: function(data, options) {
        var self = this;

        return baseBookshelf.Model.add.call(this, data, options).then(function (type) {
            return self.findOne({id: type.id}, options);
        });
    },

    edit: function(data, options) {
        return baseBookshelf.Model.edit.call(this, data, options);
    },

    destroy: function(options) {
        return baseBookshelf.Model.destroy.call(this, options);
    }
});

var Types = baseBookshelf.Collection.extend({
    model: Type
});

module.exports = {
    Type: baseBookshelf.model('Type', Type),
    Types: baseBookshelf.collection('Types', Types)
};
