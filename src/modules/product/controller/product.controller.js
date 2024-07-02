const productService = require('../service/product.service');

module.exports = {
  getAllProducts: async (request, h) => {
    const { page = 1, limit = 10, q } = request.query;
    const offset = (page - 1) * limit;
    const responseService = await productService.getAllProducts({
      page,
      limit,
      offset,
      search: q
    });
    const { status, ...response } = responseService
    return h.response(response).code(status);
  },
  getDetailProduct: async (request, h) => {
    const { product_id } = request.params;
    const responseService = await productService.getDetailProduct({product_id});
    const { status, ...response } = responseService;

    return h.response(response).code(status);
  },
  deleteProduct: async (request, h) => {
  
  },
  importProduct: async (request, h) => {

  },
  upsertProduct: async (request, h) => {
    
  }
}