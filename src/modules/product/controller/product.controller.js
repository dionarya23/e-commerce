const ProductService = require('../service/product.service');
const ResponseHandler = require('../../common/helpers/format.response.common.helper');

class ProductController {
  constructor() {
    this.productService = new ProductService();
    this.responseHandler = new ResponseHandler();
  }

  async getAllProducts(request, h) {
    const { page = 1, limit = 10, q } = request.query;
    const offset = (page - 1) * limit;

    const response = await this.productService.getAllProducts({
      page,
      limit,
      offset,
      search: q
    });

    return ResponseHandler.responseOK(h, response);
  }

  async getDetailProduct(request, h) {
    const { sku } = request.params;
    const response = await this.productService.getDetailProduct({ sku });
    return ResponseHandler.responseOK(h, response);
  }

  async deleteProduct(request, h) {
    const { sku } = request.params;
    const response = await this.productService.deleteProduct({ sku });
    return ResponseHandler.responseOK(h, response);
  }

  async importProduct(request, h) {
    // Implementation for importing products
  }

  async upsertProduct(request, h) {
    const product = request.payload;
    const response = await this.productService.upsertProduct(product);
    return ResponseHandler.responseCreated(h, response);
  }
}

module.exports = ProductController;
