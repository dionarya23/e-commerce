const Boom = require('@hapi/boom');
const { INTERNAL_SERVER_ERROR_MESSAGE } = require('../../../lib/errors/error.code');

module.exports = class DBHelper {
  static throwResultErrorOrEmpty(data, errorMessage = 'Data is not found') {
    if (data.errorCode) throw Boom.internal(INTERNAL_SERVER_ERROR_MESSAGE);
    return this.checkEmpty(data, errorMessage);
  }

  static checkEmpty(data, errorMessage) {
    if (data.rows.length === 0) throw Boom.notFound(errorMessage);
    return data.rows;
  }

  static throwResultErrorCode(data) {
    if (data.errorCode) throw Boom.internal(INTERNAL_SERVER_ERROR_MESSAGE);
    return data.rows;
  }
}
