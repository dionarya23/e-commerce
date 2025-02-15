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

  async getAll({ limit, offset, search }) {
    const params = [limit, offset];

    let query = `
       SELECT 
          p.title, 
          p.sku, 
          p.image, 
          p.price, 
          (p.stock - COALESCE(SUM(at.qty), 0)) AS stock
        FROM ${this.tableName} p
        LEFT JOIN ${this.adjustmentTransactionsTableName} at ON p.sku = at.sku AND (at.is_deleted = FALSE OR at.is_deleted IS NULL)
        WHERE p.is_deleted = FALSE
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
    return result;
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
        (p.stock - COALESCE(SUM(at.qty), 0)) AS stock
      FROM  ${this.tableName} p
      LEFT JOIN ${this.adjustmentTransactionsTableName} at ON p.sku = at.sku AND (at.is_deleted = FALSE OR at.is_deleted IS NULL)
      WHERE p.sku = $1 
      AND p.is_deleted = FALSE 
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
      RETURNING sku
    `;
    const result = await this.db.update(query, params);
    return result;
  }

  async createProduct({
    title,
    sku,
    image,
    price,
    description,
    stock = 0
  }) {
    const params = [
      title,
      sku,
      image,
      price,
      description,
      stock
    ]

    const query = `INSERT INTO  ${this.tableName} (title, sku, image, price, description, stock) VALUES ($1, $2, $3, $4, $5, $6)`;
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
       UPDATE  ${this.tableName} SET title = $1, image = $2, price = $3, description = $4 
       WHERE sku = $5
       AND is_deleted = false
    `;

    return await this.db.update(query, params);
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
