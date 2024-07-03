const InternalServerError = require('../errors/internal.server.error');
const BadRequestError = require('../errors/bad.request.error');

export default class DBHelper {
  static throwResultErrorOrEmpty(data, errorCode = 'DATA_IS_NOT_FOUND', errorMessage = 'Data is not found') {
    if (data.errorCode) throw new InternalServerError(data);
    return this.checkEmpty(data, errorCode, errorMessage);
  }

  static checkEmpty(data, errorCode, errorMessage) {
    if (data.length === 0) throw new BadRequestError(errorCode, errorMessage);
    return data[0];
  }

  static throwResultErrorCode(data) {
    if (data.errorCode) throw new InternalServerError(data);
    return data[0];
  }

  static throwResultsErrorCode(data) {
    data.forEach((promise) => {
      if (promise?.errorCode || promise?.error) {
        throw new InternalServerError(promise);
      }
    });
  }
}
