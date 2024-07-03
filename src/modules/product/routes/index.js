const ProductController = require('../controller/product.controller');

const productController = new ProductController()

const routes = [
  {
    method: 'GET',
    path: '/product',
    handler: productController.getAllProducts,
  },
  {
    method: 'GET',
    path: '/product/{product_id}',
    handler: productController.getDetailProduct,
  },
  {
    method: 'DELETE',
    path: '/product/{product_id}',
    handler: productController.deleteProduct,
  },
  {
    method: 'GET',
    path: '/product/import',
    handler: productController.importProduct,
  },
  {
    method: 'POST',
    path: '/product',
    handler: productController.upsertProduct,
  }
];

module.exports = routes;