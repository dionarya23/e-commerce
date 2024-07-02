const productService = require('../service/product.service');
const helper = require('../../../helpers');

module.exports = {
  getAllProducts: async (request, h) => {
    const { page = 1, limit = 10, q } = request.query;
    const offset = (page - 1) * limit;
    const response = await productService.getAllProducts({
      page,
      limit,
      offset,
      search: q
    });

    return helper.formatApiResponse(h, response);
  },
  getDetailProduct: async (request, h) => {
    const { product_id } = request.params;
    const response = await productService.getDetailProduct({product_id});
    return helper.formatApiResponse(h, response);
  },
  deleteProduct: async (request, h) => {
  const { product_id } = request.body;
  const response = await productService.deleteProduct({product_id});
  return helper.formatApiResponse(h, response);
  },
  importProduct: async (request, h) => {

  },
  upsertProduct: async (request, h) => {
    
  }
}