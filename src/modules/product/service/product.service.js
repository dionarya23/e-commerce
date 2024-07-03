const ProductModel = require('../model/product.model');
const ProductOutboundService = require('./product.outbound.service');
const DBHelper = require('../../common/helpers/db.common.helper');
const {
  NOT_FOUND_CODE,
  NOT_FOUND_MESSAGE
} = require('../../../lib/errors/error.code')

class ProductService {
  constructor() {
    this.productModel = new ProductModel();
    this.productOutboundService = new ProductOutboundService();
  }

  async getAllProducts({ page, limit, offset, search }) {
    const result = await this.productModel.getAll({ limit, offset, search });
    const resultCount = await this.productModel.getCount({ search });
    DBHelper.throwResultErrorCode(result, NOT_FOUND_CODE, NOT_FOUND_MESSAGE);
    DBHelper.throwResultErrorCode(resultCount);

    return {
      message: 'Success get data',
      page: parseInt(page),
      count: parseInt(resultCount),
      data: result.rows,
    };
  }

  async getDetailProduct({ product_id }) {
    const result = await this.productModel.getById({ product_id });
    DBHelper.throwResultErrorOrEmpty(result);

    return {
      message: 'Success get data',
      data: result.rows[0],
    }
  }

  async deleteProduct({ product_id }) {
    const result = await this.productModel.deleteProductById({ product_id });
    DBHelper.throwResultErrorCode(result);

    return {
      message: 'Success delete data',
    };
  }
}

module.exports = ProductService;
