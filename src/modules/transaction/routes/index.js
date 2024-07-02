const {
  getAllTransactions,
  getDetailTransaction,
  deleteTransaction,
  upsertTransaction
} = require('../controller/transaction.controller');

const routes = [
  {
    method: 'GET',
    path: '/transaction',
    handler: getAllTransactions,
  },
  {
    method: 'GET',
    path: '/transaction/{transaction_id}',
    handler: getDetailTransaction,
  },
  {
    method: 'DELETE',
    path: '/transaction/{transaction_id}',
    handler: deleteTransaction,
  },
  {
    method: 'POST',
    path: '/transaction',
    handler: upsertTransaction,
  }
];

module.exports = routes;