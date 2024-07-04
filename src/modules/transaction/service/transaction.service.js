const ProductModel = require('../model/product.model');
const AdjustmentTransactionModel = require('../model/transaction.model');
const DBHelper = require('../../common/helpers/db.common.helper');
const {
  NOT_FOUND_CODE,
  NOT_FOUND_MESSAGE
} = require('../../../lib/errors/error.code')

class TransactionService {
  constructor() {
    this.productModel = new ProductModel();
    this.adjustmentTransactionModel = new AdjustmentTransactionModel();
  }

  async getAllTransactions({ page, limit, offset }) {
    const result = await this.adjustmentTransactionModel.getAll({ limit, offset });
    const resultCount = await this.adjustmentTransactionModel.getCount();
  
    DBHelper.throwResultErrorCode(result, NOT_FOUND_CODE, NOT_FOUND_MESSAGE);
    DBHelper.throwResultErrorCode(resultCount);

    const parsedRows = await Promise.all(result.rows.map(async row => {
      const parsedRow = {
        ...row,
        amount: parseFloat(row.amount),
      };
  
      return parsedRow;
    }));
  
    return {
      message: 'Success get data',
      page: parseInt(page),
      count: parseInt(resultCount.rows[0].total),
      data: parsedRows,
    };
  }  

  async getDetailTransaction({ sku }) {
    const result = await this.adjustmentTransactionModel.getDetailBySku({ sku });
    DBHelper.throwResultErrorOrEmpty(result);
    const row = result.rows[0];
    const parsedRow = {
      ...row,
      amount: parseFloat(row.amount),
    };
    
    return {
      message: 'Success get data',
      data: parsedRow,
    }
  }

  async deleteTransaction({ sku }) {
    const resultDeleteTransaction = await this.adjustmentTransactionModel.deleteBySku({ sku });
    const productResult = await this.productModel.getProductBySku({sku});

    DBHelper.throwResultErrorOrEmpty(resultDeleteTransaction);
    DBHelper.throwResultErrorCode(productResult);
    const { qty } = resultDeleteTransaction.rows[0]
    const { stock } = productResult.rows[0]
    const resultUpdateStockProduct = await this.productModel.updateStockBySku({
      sku,
      stock: stock - qty,
    });
    DBHelper.throwResultErrorCode(resultUpdateStockProduct);
    
    return {
      message: 'Success delete data',
    };
  }

  async upsertTransaction({
    sku,
    qty
  }) {

  const productResult = await this.productModel.getProductBySku({sku});
  const transactionResult = await this.adjustmentTransactionModel.getDetailBySku({sku})
  DBHelper.throwResultErrorOrEmpty(productResult);
  const { stock, price } = productResult.rows[0];
  console.log('stock', stock);
  if (stock === 0) {
    throw new Error('Insufficient stock for adjustment');
  }

  const newStock = stock - qty;
  console.log('newStock', newStock);
  if (newStock < 0) {
    throw new Error('Insufficient stock for adjustment');
  }
  const transaction = {
    sku,
    qty,
    amount: price * qty
  };

    if (transactionResult.rows.length) {
      const resultUpdate = await this.adjustmentTransactionModel.updateTransaction(transaction);
      DBHelper.throwResultErrorCode(resultUpdate);
    } else {
      const resultInsert = await this.adjustmentTransactionModel.createTransaction(transaction);
      DBHelper.throwResultErrorCode(resultInsert);
    }

    await this.productModel.updateStockBySku({
      sku,
      stock: newStock,
    });

    return {
      message: `success ${transactionResult.rows.length ? 'update' : 'insert'} data`
    }
  }
}

module.exports = TransactionService;
