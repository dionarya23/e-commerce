const { TABLE_NAME } = require('../../../definitions/index');
const DBCommonService = require('../../common/services/db.common.service');

class ProductService {
  constructor() {
    this.tableName = TABLE_NAME.PRODUCT;
    this.db = new DBCommonService()
  }

  async getAll({ limit, offset, search }) {
    const params = [limit, offset];
    let query = `
      SELECT 
          title,
          sku,
          image, 
          price, 
          stock 
      FROM ${this.tableName} 
      WHERE 1=1
    `;

    if (search) {
      query += ` AND title LIKE $1`
      query += ` LIMIT $2 OFFSET $3`
      params.unshift(`%${search}%`)
    } else {
      query += ` LIMIT $1 OFFSET $2`
    }

    const result = await this.db.query(query, params);
    // console.log('result', result);
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

  async getById({ product_id }) {
    const params = [product_id];
    const query = `
      SELECT 
          title,
          sku,
          image, 
          price, 
          stock,
          description
      FROM ${this.tableName}
      WHERE id = $1
    `;
    const result = await this.db.query(query, params);
    return result;
  }

  async deleteProductById({ product_id }) {
    const params = [product_id, true];
    const query = `
      UPDATE ${this.tableName}
      SET deleted_at = NOW(),
      is_deleted = $1
      WHERE id = $2
      RETURNING *
    `;
    const result = await this.db.update(query, params);
    return result.rows[0];
  }
}

module.exports = ProductService;
