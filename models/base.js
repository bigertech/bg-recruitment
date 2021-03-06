
/**
 * Base models here.
 */

var bookshelf = require('bookshelf');
var moment = require('moment');
var _ = require('lodash');
var when = require('when');

var schema = require('../data/schema');
var validation = require('../data/validation');
var autocompletion = require('../data/autocompletion');
var config = require('../config');

// 实例化一个bookshelf对象
var baseBookshelf = bookshelf(config().database.knex);
baseBookshelf.plugin('registry');

baseBookshelf.Model = baseBookshelf.Model.extend({
    // 数据表中的字段
    permittedAttributes: function() {
        return _.keys(schema.tables[this.tableName]);
    },

    // 对象初始化
    initialize: function() {
        var self = this;
        var options = arguments[1] || {};

        if (options.include) {
            this.include = _.clone(options.include);
        }

        this.on('creating', this.creating, this);
        this.on('saving', function(model, attributes, options) {
            return when(self.saving(model, attributes, options)).then(function() {
                return self.validate(model, attributes, options);
            });
        });
    },

    // 验证对象中属性的数据
    validate: function() {
        return validation.validateSchema(this.tableName, this.toJSON());
    },

    autocomplete: function(attrs) {
        return autocompletion.autocomplete(this.tableName, attrs);
    },

    // 创建数据时触发
    creating: function(newObj, attr, options) {
    },

    // 保存数据时触发
    saving: function (newObj, attr, options) {
        // 移除所有不属于该模型中的属性
        this.attributes = this.pick(this.permittedAttributes());
        // 保存更新之前的属性
        this._updatedAttributes = newObj.previousAttributes();
        this._isSave = true;
    },

    // 保存到数据库之前格式化数据
    format: function (attrs) {
        var isSve = this._isSave || false;
        this._isSave = false;

        if (isSve) {
            return this.autocomplete(attrs);
        }

        return attrs;
    },

    // 从数据库中取出数据时，对数据进行格式化
    parse: function (attrs) {
        return attrs;
    },

    // 对象转为json数据
    toJSON: function (options) {
        var attrs = _.extend({}, this.attributes);
        var self = this;
        options = options || {};

        if (options && options.shallow) {
            return attrs;
        }

        if (options && options.idOnly) {
            return attrs.id;
        }

        if (options && options.include) {
            this.include = _.union(this.include, options.include);
        }

        _.each(this.relations, function (relation, key) {
            if (key.substring(0, 7) !== '_pivot_') {
                var fullKey = _.isEmpty(options.name) ? key : options.name + '.' + key;
                if (_.contains(self.include, fullKey)) {
                    attrs[key] = relation.toJSON({name: fullKey, include: self.include});
                } else if (relation.hasOwnProperty('length')) {
                    attrs[key] = relation.toJSON({idOnly: true});
                }
            }
        });

        return attrs;
    },

    // 过滤对象的属性值
    sanitize: function (attr) {
        return sanitize(this.get(attr)).xss();
    },

    updatedAttributes: function () {
        return this._updatedAttributes || {};
    },

    updated: function (attr) {
        return this.updatedAttributes()[attr];
    }
}, {
    /**
     * 得到所有的数据
     * @param  {Object} options options对象
     * @return {Object}         数据集合
     */
    findAll:  function (options) {
        return baseBookshelf.Collection.forge([], {model: this}).fetch(options).then(function (result) {
            return result;
        });
    },

    /**
     * 从id中查找
     * @param  {Array}   ids ID集合
     * @return {Promise}
     */
    findIn: function(ids) {
        if (_.isEmpty(ids) || !_.isArray(ids)) {
            return when.resolve([]);
        }

        var posts = null;
        return this.query(function(qb) {
            qb.where('id', 'IN', ids);
        }).fetchAll();
    },

    /**
     * 按data条件得到指定的数据
     * @param  {Object} data    条件数据
     * @param  {Object} options options数据
     * @return {Object}         数据对象
     */
    findOne: function (data, options) {
        return this.forge(data).fetch(options);
    },

    /**
     * 按data条件修改指定的数据
     * @param  {Object} data    条件数据
     * @param  {Object} options options数据
     * @return {Object}         数据对象
     */
    edit: function (data, options) {
        var id = options.id;

        return this.forge({id: id}).fetch(options).then(function (object) {
            if (object) {
                return object.save(data, options);
            }

            return when.reject(null);
        });
    },

    /**
     * 按data添加新的数据
     * @param  {Object} data    添加数据
     * @param  {Object} options options数据
     * @return {Object}         数据对象
     */
    add: function (data, options) {
        var instance = this.forge(data);
        return instance.save(null, options);
    },

    /**
     * 按options.id来删除指定的数据
     * @param  {Object} options options.id指定删除的对象
     * @return {NULL}
     */
    destroy: function (options) {
        var id = options.id;
        return this.forge({id: id}).destroy(options);
    }
});

module.exports = baseBookshelf;
