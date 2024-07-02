const productService = require('../service/product.service');

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
    return h.response(response).code(response.status);
  },
  getDetailProduct: async (request, h) => {
    const { product_id } = request.params;
    const response = await productService.getDetailProduct({product_id})
    return response;
  },
  deleteProduct: async (request, h) => {

  },
  importProduct: async (request, h) => {

  },
  upsertProduct: async (request, h) => {
    
  }
}