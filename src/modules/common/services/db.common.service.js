const pool = require('../../../drivers/database');
const Logger = require('../../../lib/logger/internal.logger');
const moment = require('moment');
const Boom = require('@hapi/boom');

class DBCommonService {
  async queryWithThrows(query, data = []) {
    if (process.env.NODE_ENV !== 'production') {
      Logger().info(`DB Query : ${query} ${JSON.stringify(data)}`);
    }

    try {
      const result = await pool.query(query, data);
      return result;
    } catch (ex) {
      Logger().error(`Postgres Query Error : ${ex.code} - ${JSON.stringify(ex)}`);
      throw new Boom.internal(ex.message);
    }
  }

  async query(query, data = []) {
    try {
      const result = await this.queryWithThrows(query, data);
      return result;
    } catch (ex) {
      return { errorCode: JSON.parse(ex.message).errorCode };
    }
  }

  async updateWithThrows(query, params = []) {
    const data = this.manipulateParam(params);
    return this.queryWithThrows(query, data);
  }

  async update(query, params = []) {
    try {
      const result = await this.updateWithThrows(query, params);
      return result;
    } catch (ex) {
      return { errorCode: JSON.parse(ex.message).errorCode };
    }
  }

  manipulateParam(params) {
    if (!params) {
      return params;
    }
    const updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const isArray = params instanceof Array;
    const isObject = typeof params === 'object';
    if (isArray && params.length > 0 && typeof params[0] === 'object') {
      params[0].updated_at = updatedAt;
    } else if (isObject) {
      const objectLength = Object.keys(params).length;
      if (objectLength) {
        params.updated_at = updatedAt;
      }
    }
    return params;
  }
}

module.exports = DBCommonService;
