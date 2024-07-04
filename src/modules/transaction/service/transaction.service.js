const ProductModel = require('../../product/model/product.model');
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
  
    return {
      message: 'Success get data',
      page: parseInt(page),
      count: parseInt(resultCount.rows[0].total),
      data: result.rows,
    };
  }  

  async getDetailTransaction({ sku }) {
    const result = await this.adjustmentTransactionModel.getDetailById({ sku });
    DBHelper.throwResultErrorOrEmpty(result);
    
    return {
      message: 'Success get data',
      data: result.rows[0],
    }
  }

  async deleteTransaction({ sku }) {
    const resultDeleteTransaction = await this.adjustmentTransactionModel.deleteBySku({ sku });
    const productResult = await this.productModel.getDetailBySku({sku});

    DBHelper.throwResultErrorOrEmpty(resultDeleteTransaction);
    DBHelper.throwResultErrorCode(productResult);
    const { qty } = resultDeleteTransaction.rows[0]
    const { stock } = productResult.rows[0]
    const isPositiveNumber = qty > 0;
    const resultUpdateStockProduct = await this.productModel.updateStockBySku({
      sku,
      stock: isPositiveNumber ? stock - qty : stock + qty,
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
    DBHelper.throwResultErrorCode(productResult);

    if (productResult.rows.length) {
      const resultUpdate = await this.productModel.updateProduct({
        title,
        sku,
        image,
        price,
        description
      })
      DBHelper.throwResultErrorCode(resultUpdate);
    } else {
      const resultInsert = await this.productModel.createProduct({
        title,
        sku,
        image,
        price,
        description
      })
      DBHelper.throwResultErrorCode(resultInsert);
    }

    return {
      message: `success ${productResult.rows.length ? 'update' : 'insert'} data`
    }
  }
}

module.exports = TransactionService;
