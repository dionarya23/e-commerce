const ProductService = require('../service/product.service');
const ResponseHandler = require('../../common/helpers/formatApiResponse');

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

    return this.responseHandler.formatApiResponse(h, response);
  }

  async getDetailProduct(request, h) {
    const { product_id } = request.params;
    const response = await this.productService.getDetailProduct({ product_id });
    return this.responseHandler.formatApiResponse(h, response);
  }

  async deleteProduct(request, h) {
    const { product_id } = request.payload;
    const response = await this.productService.deleteProduct({ product_id });
    return this.responseHandler.formatApiResponse(h, response);
  }

  async importProduct(request, h) {
    // Implementation for importing products
  }

  async upsertProduct(request, h) {
    // Implementation for upserting products
  }
}

module.exports = ProductController;
