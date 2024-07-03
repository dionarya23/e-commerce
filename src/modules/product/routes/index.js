const ProductController = require('../controller/product.controller');
const productController = new ProductController()

const routes = [
  {
    method: 'GET',
    path: '/product',
    handler: productController.getAllProducts.bind(productController),
  },
  {
    method: 'GET',
    path: '/product/{product_id}',
    handler: productController.getDetailProduct.bind(productController),
  },
  {
    method: 'DELETE',
    path: '/product/{product_id}',
    handler: productController.deleteProduct.bind(productController),
  },
  {
    method: 'GET',
    path: '/product/import',
    handler: productController.importProduct.bind(productController),
  },
  {
    method: 'POST',
    path: '/product',
    handler: productController.upsertProduct.bind(productController),
  }
];

module.exports = routes;