const TransactionController = require('../controller/transaction.controller');

const transactionController = new TransactionController()
const routes = [
  {
    method: 'GET',
    path: '/transaction',
    handler: transactionController.getAllTransactions.bind(transactionController),
  },
  {
    method: 'GET',
    path: '/transaction/{sku}',
    handler: transactionController.getDetailTransaction.bind(transactionController),
  },
  {
    method: 'DELETE',
    path: '/transaction/{sku}',
    handler: transactionController.deleteTransaction.bind(transactionController),
  },
  {
    method: 'POST',
    path: '/transaction',
    handler: transactionController.upsertTransaction.bind(transactionController),
  }
];

module.exports = routes;