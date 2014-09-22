
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

    add: function(data, options) {
        return models.Type.add(data, options).then(function(type) {
            if (type) {
                return type;
            }

            return when.reject('Failed to add a type.');
        });
    }
};

module.exports = types;
