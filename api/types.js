
var when = require('when');
var _ = require('lodash');
var moment = require('moment');

var models = require('../models');
var errors = require('../errors');

var types = {

    findAll: function(options) {
        return models.Type.findAll();
    }
};

module.exports = types;
