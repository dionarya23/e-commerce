const { TABLE_NAME } = require('../../../definitions/index');
const DBCommonService = require('../../common/services/db.common.service');

class ProductModel {
  constructor() {
    this.tableName = TABLE_NAME.PRODUCT;
    this.adjustmentTransactionsTableName = TABLE_NAME.ADJUSTMENT_TRANSACTIONS;
    this.db = new DBCommonService()
  }

  async getProductBySku({sku}) {
    const params = [sku];
    const query = `
      SELECT 
          title,
          sku,
          image, 
          price, 
          description,
          stock
      FROM ${this.tableName}
      WHERE sku = $1
      AND is_deleted = FALSE
      AND deleted_at is NULL
    `;
    const result = await this.db.query(query, params);
    return result;
  }
  
  async updateStockBySku({
    sku,
    stock
  }) {
    const params = [
      stock,
      sku
    ]

    const query = `
       UPDATE ${this.tableName} SET stock = $1 WHERE sku = $2
       AND is_deleted=false
    `;

    return await this.db.update(query, params);
  }
}

module.exports = ProductModel;
