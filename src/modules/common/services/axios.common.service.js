const axios = require('axios');
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');
const ErrorCode = require('../../../lib/errors/error.code');
const Logger = require('../../../lib/logger/internal.logger');

class AxiosCommonService {
  constructor(config) {
    const defaultConfig = {
      baseURL: '',
    };

    const options = Object.assign(defaultConfig, config);

    this.Axios = axios.create(options);
    this.config = {};
    this.method = null;
  }

  responseHandler(response, url) {
    let result = null;

    if (response.data !== undefined) {
      result = {
        httpCode: response.status,
        data: response.data,
      };
    }

    if (response.response !== undefined) {
      result = {
        httpCode: response.response.status,
        error: response.response.data,
      };
    }

    if (result) {
      Logger().info(`AxiosCommonService::${this.method} RS ${this.Axios.defaults.baseURL}${url} ${JSON.stringify(result)}`);
      return result;
    }

    Logger().error(`AxiosCommonService::${this.method} RS ${this.Axios.defaults.baseURL}${url} ${JSON.stringify(response)}`);
    return {
      httpCode: INTERNAL_SERVER_ERROR,
      error: {
        errorCode: ErrorCode.INTERNAL_SERVER_ERROR_CODE,
        message: ErrorCode.INTERNAL_SERVER_ERROR_MESSAGE,
      },
    };
  }

  logRequest(url, data) {
    Logger().info(`AxiosCommonService::${this.method} RQ ${this.Axios.defaults.baseURL}${url} ${JSON.stringify(data)}`);
  }

  async get(url, param, header) {
    this.method = 'GET';
    this.config.params = param;
    if (header) {
      this.config.headers = header;
    }

    try {
      this.logRequest(url, param);
      const response = await this.Axios.get(url, this.config);
      return this.responseHandler(response, url);
    } catch (error) {
      return this.responseHandler(error, url);
    }
  }
}

module.exports = AxiosCommonService;
