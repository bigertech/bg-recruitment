/**
 * Created by liuxing on 14-9-26.
 */
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
                password : 'root',
                database : 'bg_zhaopin',
                charset  : 'UTF8_GENERAL_CI',
            },

            debug: true
        },

        server: {
            host: '172.16.46.194',
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
