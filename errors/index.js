
/**
 * All errors here.
 */

var _ = require('lodash');
var when = require('when');
var hbs = require('express-hbs');
var colors = require('colors');

var NotFoundError = require('./notfounderror');
var ValidationError = require('./validationerror');

// error页面
var errorTplPath = 'error';

/**
 * Basic error handling helpers
 */
errors = {
    rejectError: function (err) {
        return when.reject(err);
    },

    throwError: function (err) {
        if (!err) {
            err = new Error("An error occurred");
        }

        if (_.isString(err)) {
            throw new Error(err);
        }

        throw err;
    },

    logError: function (err, context, help) {
        var stack = err ? err.stack : null;
        var msgs;

        if (err) {
            err = err.message || err || 'An unknown error occurred.';
        } else {
            err = 'An unknown error occurred.';
        }

        if ((process.env.NODE_ENV === 'development'
             || process.env.NODE_ENV === 'staging'
             || process.env.NODE_ENV === 'production')) {

            msgs = ['\nERROR:'.red, err.red, '\n'];

            if (context) {
                msgs.push(context.white, '\n');
            }

            if (help) {
                msgs.push(help.green);
            }

            // add a new line
            msgs.push('\n');

            if (stack) {
                msgs.push(stack, '\n');
            }

            console.error.apply(console, msgs);
        }
    },

    error404: function (req, res, next) {
        var message = "Page Not Found";

        // do not cache 404 error
        res.set({'Cache-Control': 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'});
        if (req.method === 'GET') {
            this.renderErrorPage(404, message, req, res, next);
        } else {
            res.send(404, message);
        }
    },

    error500: function (err, req, res, next) {
        // 500 errors should never be cached
        res.set({'Cache-Control': 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'});

        if (err.status === 404) {
            return this.error404(req, res, next);
        }

        if (req.method === 'GET') {
            if (!err || !(err instanceof Error)) {
                next();
            }
            errors.renderErrorPage(err.status || 500, err, req, res, next);
        } else {
            res.send(err.status || 500, err);
        }
    },

    renderErrorPage: function (code, err, req, res, next) {
        var self = this;

        function parseStack(stack) {
            if (!_.isString(stack)) {
                return stack;
            }

            var stackRegex = /\s*at\s*(\w+)?\s*\(([^\)]+)\)\s*/i;

            return (
                stack
                    .split(/[\r\n]+/)
                    .slice(1)
                    .map(function (line) {
                        var parts = line.match(stackRegex);
                        if (!parts) {
                            return null;
                        }

                        return {
                            'function': parts[1],
                            'at': parts[2]
                        };
                    })
                    .filter(function (line) {
                        return !!line;
                    })
            );
        }

        // Render the error!
        function renderErrorInt(errorView) {
            var stack = null;

            if (process.env.NODE_ENV !== 'production' && err.stack) {
                stack = parseStack(err.stack);
            }

            res.status(code).render((errorView || 'error'), {
                message: err.message || err,
                code: code,
                stack: stack
            }, function (templateErr, html) {
                if (!templateErr) {
                    return res.send(code, html);
                }

                // There was an error trying to render the error page, output the error
                self.logError(templateErr, 'Error whilst rendering error page', 'Error template has an error');

                // And then try to explain things to the user...
                // Cheat and output the error using handlebars escapeExpression
                return res.send(500, "<h1>Oops, seems there is an an error in the error template.</h1>"
                    + "<p>Encountered the error: </p>"
                    + "<pre>" + hbs.handlebars.Utils.escapeExpression(templateErr.message || templateErr) + "</pre>"
                    + "<br ><p>whilst trying to render an error page for the error: </p>"
                    + code + " " + "<pre>"  + hbs.handlebars.Utils.escapeExpression(err.message || err) + "</pre>"
                );
            });
        }

        if (code >= 500) {
            this.logError(err, "Rendering Error Page");
        }

        // Are we admin? If so, don't worry about the user template
        // if ((res.isAdmin
        //      && req.session && req.session.user)
        //      || userErrorTemplateExists === true) {
        //     return renderErrorInt();
        // }

        // We're not admin and the template doesn't exist. Render the default.
        return renderErrorInt(errorTplPath);
    }
};

module.exports = errors;
module.exports.NotFoundError = NotFoundError;
module.exports.ValidationError = ValidationError;
