
/**
 * All validator here.
 */

var validator = require('validator');
var _ = require('lodash');

validator.extend('isEmpty', function (str) {
    return _.isEmpty(str);
});

module.exports = validator;
