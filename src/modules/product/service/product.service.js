const productModel = require('../model/product.model')

module.exports = {
  getAllProducts: async ({
    page,
    limit,
    offset,
    search,
  }) => {
    const result = await productModel.getAll({
      limit,
      offset,
      search,
    });

    const resultCount = await productModel.getCount({
      search,
    });

    return {
      status: 200,
      message: 'Success get data',
      page: parseInt(page),
      count: parseInt(resultCount),
      data: result
    };
  },
  getDetailProduct: async ({product_id}) => {
    const result = await productModel.getById({product_id});
    if (!result.length) return { status: 404, message: `product not found with id ${product_id}` }
   
    return {
      data: result[0]
    }
  }
}