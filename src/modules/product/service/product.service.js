const ProductModel = require('../model/product.model');
const ProductOutboundService = require('./product.outbound.service');

class ProductService {
  constructor() {
    this.productModel = new ProductModel();
    this.productOutboundService = new ProductOutboundService();
  }

  async getAllProducts({ page, limit, offset, search }) {
    const result = await this.productModel.getAll({ limit, offset, search });
    const resultCount = await this.productModel.getCount({ search });

    return {
      status: 200,
      message: 'Success get data',
      page: parseInt(page),
      count: parseInt(resultCount),
      data: result,
    };
  }

  async getDetailProduct({ product_id }) {
    const result = await this.productModel.getById({ product_id });
    if (!result.length) return { status: 404, message: `Product not found with id ${product_id}` };

    return {
      status: 200,
      message: 'Success get data',
      data: result[0],
    };
  }

  async deleteProduct({ product_id }) {
    const result = await this.productModel.deleteProductById({ product_id });
    return {
      status: 200,
      message: 'Success delete data',
    };
  }
}

module.exports = ProductService;
