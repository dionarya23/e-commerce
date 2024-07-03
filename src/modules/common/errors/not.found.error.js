const HttpError = require('./http.error')
const ErrorCode = require('../../../lib/errors/error.code')

module.exports = class NotFoundError extends HttpError {
  constructor() {
    super(404, ErrorCode.NOT_FOUND_CODE, ErrorCode.NOT_FOUND_MESSAGE);
  }
}
