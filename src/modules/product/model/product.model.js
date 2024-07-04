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
          stock,
          description
      FROM ${this.tableName}
      WHERE sku = $1
    `;
    const result = await this.db.query(query, params);
    return result;
  }

  async getAll({ limit, offset, search }) {
    const params = [limit, offset];

    let query = `
       SELECT 
          p.title, 
          p.sku, 
          p.image, 
          p.price, 
          COALESCE(SUM(at.qty), 0) AS stock
        FROM ${this.tableName} p
        LEFT JOIN ${this.adjustmentTransactionsTableName} at ON p.id = at.product_id
        WHERE p.is_deleted = FALSE AND (at.is_deleted = FALSE OR at.is_deleted IS NULL)
    `;

    if (search) {
      query += ` AND p.title LIKE $1`
      query += ` GROUP BY p.id, p.title, p.sku, p.image, p.price
        ORDER BY p.id
        LIMIT $2 OFFSET $3`
      params.unshift(`%${search}%`)
    } else {
      query += ` GROUP BY p.id, p.title, p.sku, p.image, p.price
        ORDER BY p.id
        LIMIT $1 OFFSET $2`;
    }

    const result = await this.db.query(query, params);
    return result;
  }

  async getCount({ search }) {
    const params = [];
    let query = `SELECT COUNT(*) as total FROM ${this.tableName} WHERE 1=1`;

    if (search) {
      query += ` AND title LIKE $1`;
      params.push(`%${search}%`);
    }

    const result = await this.db.query(query, params);
    return result.rows[0].total;
  }

  async getDetailBySku({ sku }) {
    const params = [sku];
    const query = `
      SELECT 
        p.title, 
        p.sku, 
        p.image, 
        p.price, 
        p.description,
        COALESCE(SUM(at.qty), 0) AS stock
      FROM  ${this.tableName} p
      LEFT JOIN ${this.adjustmentTransactionsTableName} at ON p.id = at.product_id
      WHERE p.sku = $1 
      AND p.is_deleted = FALSE 
      AND (at.is_deleted = FALSE OR at.is_deleted IS NULL)
      GROUP BY p.id, p.title, p.sku, p.image, p.price, p.description;
    `;
    const result = await this.db.query(query, params);
    return result;
  }

  async deleteProductBySku({ sku }) {
    const params = [true, sku];
    const query = `
      UPDATE ${this.tableName}
      SET deleted_at = CURRENT_TIMESTAMP,
      is_deleted = $1
      WHERE sku = $2
      RETURNING id
    `;
    const result = await this.db.update(query, params);
    return result;
  }

  async createProduct({
    title,
    sku,
    image,
    price,
    description
  }) {
    const params = [
      title,
      sku,
      image,
      price,
      description
    ]

    const query = `INSERT INTO products (title, sku, image, price, description) VALUES ($1, $2, $3, $4, $5)`;
    return await this.db.queryWithThrows(query, params);
  }

  async updateProduct({
    title,
    sku,
    image,
    price,
    description
  }) {
    const params = [
      title,
      image,
      price,
      description,
      sku,
    ]

    const query = `
       UPDATE products SET title = $1, image = $2, price = $3, description = $4 WHERE sku = $5
    `;

    return await this.db.update(query, params);
  }
}

module.exports = ProductModel;
