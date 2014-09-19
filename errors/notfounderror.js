/**
 * Not Found Error
 */

function NotFoundError(message) {
    this.message = message;
    this.stack = new Error().stack;
    this.code = 404;
    this.type = this.name;
}

NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.name = 'NotFoundError';

module.exports = NotFoundError;
