const transactionRoutes = require('../modules/transaction/routes')
const productRoutes = require('../modules/product/routes')

module.exports = [
  ...transactionRoutes,
  ...productRoutes
];