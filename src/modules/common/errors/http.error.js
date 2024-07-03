class HttpError extends Error {
  constructor(httpCode, errorCode, errorMessage) {
    super();
    this.httpCode = httpCode;
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }

  getHttpCode() {
    return this.httpCode;
  }

  getError() {
    return {
      errorCode: this.errorCode,
      message: this.errorMessage,
    };
  }
}

module.exports = HttpError;
