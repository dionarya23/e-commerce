const {
  getAllProducts,
  getDetailProduct,
  deleteProduct,
  importProduct,
  upsertProduct
} = require('../controller/product.controller');

const routes = [
  {
    method: 'GET',
    path: '/product',
    handler: getAllProducts,
  },
  {
    method: 'GET',
    path: '/product/{product_id}',
    handler: getDetailProduct,
  },
  {
    method: 'DELETE',
    path: '/product/{product_id}',
    handler: deleteProduct,
  },
  {
    method: 'GET',
    path: '/product/import',
    handler: importProduct,
  },
  {
    method: 'POST',
    path: '/product',
    handler: upsertProduct,
  }
];

module.exports = routes;