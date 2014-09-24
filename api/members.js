
var fs = require('fs');

var when = require('when');
var _ = require('lodash');

var models = require('../models');
var errors = require('../errors');
var config = require('../config');

var members = {

    findAll: function(options) {
        return models.Member.findAll().then(function(members) {
            members = _.sortBy(members, function(member) {
                return 1000000 - member.id;
            });

            return members;
        });
    },

    findById: function(id) {
        return models.Member.findOne({id: id}).then(function(member) {
            if (member) {
                return member;
            }

            return when.reject(new errors.NotFoundError('Member not found.'));
        });
    },

    add: function(data, options) {
        return models.Member.add(data, options).then(function(member) {
            if (member) {
                return member;
            }

            return when.reject('Failed to add a member.');
        });
    },

    updateById: function(data, id) {
        return models.Member.edit(data, {id: id}).then(function(member) {
            if (member) {
                return member.toJSON();
            }

            return when.reject(new errors.NotFoundError('Member not found.'));
        });
    },

    deleteById: function(id) {
        return this.findById(id).then(function(member) {
            if (member) {
                return models.Member.destroy({id: id}).then(function() {
                    if (!_.isEmpty(member.img)) {
                        return unlink(config().paths.upload + '/' + member.img);
                    }
                });
            }
        });
    }
};

function unlink(path) {
    var deferred = when.defer();

    fs.unlink(path, function(err) {
        if (err) {
            return deferred.reject(err);
        }

        return deferred.resolve();
    });

    return deferred.promise;
}

module.exports = members;
