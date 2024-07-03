const BaseLogger = require('./base.logger');

const logger = new BaseLogger('system', 'System');

module.exports = () => (logger.getLatestLogger());
