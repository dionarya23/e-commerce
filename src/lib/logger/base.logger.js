const dotenv = require('dotenv');
const pino = require('pino');

dotenv.config();

const millisToMidnight = () => {
  const d = new Date();
  return ((-d + d.setHours(24, 0, 0, 0)) / 6e4) * 60 * 1000 + 1000;
};

class BaseLogger {
  constructor(type, name) {
    this.latestLogger = null;
    this.type = type;
    this.name = name;
    this.initLogger();
  }

  initLogger() {
    if (!this.latestLogger) {
      this.latestLogger = this.reCreateLogger(this.type, this.name);
    }
  }

  reCreateLogger(type, name) {
    const date = new Date();
    const fileName = `./logs/e-commerce-${type}-${date.toISOString().substring(0, 10)}.log`;

    setTimeout(() => {
      this.latestLogger = this.reCreateLogger(type, name);
    }, millisToMidnight());

    return pino({
      name: `Log ${name}`,
      level: process.env.LOG_LEVEL,
    }, fileName);
  }

  getLatestLogger() {
    return this.latestLogger;
  }
}

module.exports = BaseLogger;
