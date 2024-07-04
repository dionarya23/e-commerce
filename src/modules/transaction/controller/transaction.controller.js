const TransactionService = require('../service/transaction.service');
const ResponseHandler = require('../../common/helpers/format.response.common.helper');

class TransactionController {
  constructor() {
    this.transactionService = new TransactionService();
    this.responseHandler = new ResponseHandler();
  }

  async getAllTransactions(request, h) {
    const { page = 1, limit = 10 } = request.query;
    const offset = (page - 1) * limit;

    const response = await this.transactionService.getAllTransactions({
      page,
      limit,
      offset,
    });

    return ResponseHandler.responseOK(h, response);
  }

  async getDetailTransaction(request, h) {
    const { sku } = request.params;
    const response = await this.transactionService.getDetailTransaction({ sku });
    return ResponseHandler.responseOK(h, response);
  }

  async deleteTransaction(request, h) {
    const { sku } = request.params;
    const response = await this.transactionService.deleteTransaction({ sku });
    return ResponseHandler.responseOK(h, response);
  }

  async upsertTransaction(request, h) {
    const { sku, qty } = request.payload;
    const response = await this.transactionService.upsertTransaction({ sku, qty });
    return ResponseHandler.responseCreated(h, response);
  }
}

module.exports = TransactionController;
