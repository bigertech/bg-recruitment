
var path = require('path');

var config;

config = {
    development: {
        url: 'http://my-blog.com',

        database: {
            client: 'mysql',
            connection: {
                host     : 'localhost',
                user     : 'root',
                password : 'happen',
                database : 'bg_zhaopin',
                charset  : 'utf8',
            },

            debug: true
        },

        server: {
            host: '127.0.0.1',
            port: '3000'
        },

        paths: {
            static: path.resolve('../', 'public'),
            views: path.resolve('../', 'views'),
            upload: path.resolve(__dirname, '..', 'public', 'uploads')
        },

        user: {
            username: '',
            password: ''
        },

        flash: {
            number: 4
        }
    },

    production: {
        url: 'http://my-blog.com',

        database: {
            client: 'mysql',
            connection: {
                host     : 'localhost',
                user     : 'remote',
                password : 'mypasswd',
                database : 'dbname',
                charset  : 'UTF8_GENERAL_CI'
            }
        },

        server: {
            host: '127.0.0.1',
            port: '3000'
        }
    },

    testing: {
        url: 'http://127.0.0.1:3000',

        database: {
            client: 'mysql',
            connection: {
                host     : 'localhost',
                user     : 'root',
                password : '',
                database : 'dbname',
                charset  : 'UTF8_GENERAL_CI'
            }
        },

        server: {
            host: '127.0.0.1',
            port: '3000'
        },

        logging: false
    }
};

module.exports = config;
