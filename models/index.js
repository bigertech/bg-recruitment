
/**
 * All models here.
 */

var models = null;

models = {
    Base: require('./base'),
    Job: require('./job').Job,
    Type: require('./type').Type
};

module.exports = models;
