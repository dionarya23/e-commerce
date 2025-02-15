const ProductModel = require('../model/product.model');
const AdjustmentTransactionModel = require('../model/adjustment_transaction.model');
const ProductOutboundService = require('./product.outbound.service');
const DBHelper = require('../../common/helpers/db.common.helper');
const {
  NOT_FOUND_CODE,
  NOT_FOUND_MESSAGE
} = require('../../../lib/errors/error.code')

class ProductService {
  constructor() {
    this.productModel = new ProductModel();
    this.adjustmentTransactionModel = new AdjustmentTransactionModel();
    this.productOutboundService = new ProductOutboundService();
  }

  async getAllProducts({ page, limit, offset, search }) {
    const result = await this.productModel.getAll({ limit, offset, search });
    const resultCount = await this.productModel.getCount({ search });
  
    DBHelper.throwResultErrorCode(result, NOT_FOUND_CODE, NOT_FOUND_MESSAGE);
    DBHelper.throwResultErrorCode(resultCount);
  
    const parsedRows = await Promise.all(result.rows.map(async row => {
      const parsedRow = {
        ...row,
        price: parseFloat(row.price),
        stock: parseInt(row.stock, 10),
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

  async getDetailProduct({ sku }) {
    const result = await this.productModel.getDetailBySku({ sku });
    DBHelper.throwResultErrorOrEmpty(result);
      const row = result.rows[0];
      const parsedRow = {
        ...row,
        price: parseFloat(row.price),
        stock: parseInt(row.stock, 10),
      };

    return {
      message: 'Success get data',
      data: parsedRow,
    }
  }

  async deleteProduct({ sku }) {
    const resultDeleteProduct = await this.productModel.deleteProductBySku({ sku });
    DBHelper.throwResultErrorCode(resultDeleteProduct);

    const resultDeleteAdjusmentTransaction = await this.adjustmentTransactionModel.deleteAdjustmentTransactionByProductId({
      sku: resultDeleteProduct.rows[0].sku
    });
    DBHelper.throwResultErrorCode(resultDeleteAdjusmentTransaction);


    return {
      message: 'Success delete data',
    };
  }

  async upsertProduct({
    title,
    sku,
    image,
    price,
    description
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

  async importProduct() {
    const externalProducts = await this.productOutboundService.getProducts();

    for (const product of externalProducts) {
      const { title, description, price, sku, thumbnail: image, stock } = product;

      const existingProduct = await this.productModel.getProductBySku({ sku });
      if (existingProduct.rows.length === 0) {
        await this.productModel.createProduct({ title, sku, image, price, description, stock });
      }
    }

    return {
      message: 'success import products',
    }
  }
}

module.exports = ProductService;
