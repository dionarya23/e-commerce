const BaseLogger = require('./base.logger');

const logger = new BaseLogger('http', 'Http Request');

module.exports = () => (logger.getLatestLogger());
