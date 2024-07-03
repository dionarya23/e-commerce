const HttpError = require('./http.error');

module.exports = class BadRequestError extends HttpError {
  constructor(errorCode, errorMessage) {
    super(400, errorCode, errorMessage);
  }
}
