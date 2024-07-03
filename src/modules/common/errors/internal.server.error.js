const HttpError = require('@common/errors/http.error');
const ErrorCode = require('../../../lib/errors/error.code');

class InternalServerError extends HttpError {
  constructor(message) {
    super(500, ErrorCode.INTERNAL_SERVER_ERROR_CODE, ErrorCode.INTERNAL_SERVER_ERROR_MESSAGE);
    if (message) {
      this.message = JSON.stringify(message);
    }
  }
}

module.exports = InternalServerError;
