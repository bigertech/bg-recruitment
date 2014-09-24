
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
<<<<<<< HEAD
                password : 'root',
                database : 'bg_zhaopin',
                charset  : 'utf8'
=======
                password : '',
                database : '',
                charset  : 'utf8',
>>>>>>> 0198863781a01deac3d013d68490ee0b14eee513
            }
        },

        server: {
            host: '127.0.0.1',
            port: '3000'
        },

        paths: {
            static: path.resolve('../', 'public'),
            views: path.resolve('../', 'views')
        },

        user: {
            username: '',
            password: ''
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
