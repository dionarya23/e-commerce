const { TABLE_NAME } = require('../../../definitions/index');
const DBCommonService = require('../../common/services/db.common.service');

class TransactionModel {
  constructor() {
    this.tableName = TABLE_NAME.ADJUSTMENT_TRANSACTIONS;
    this.db = new DBCommonService()
  }

  async deleteBySku({sku}) {
    const params = [sku];
    const query = `
       UPDATE ${TABLE_NAME.ADJUSTMENT_TRANSACTIONS}
        SET is_deleted = TRUE, deleted_at = CURRENT_TIMESTAMP
        WHERE sku = $1 AND is_deleted = FALSE
        RETURNING qty;
    `;
    const result = await this.db.query(query, params);
    return result;
  }

  async getAll({
    limit, offset
  }) {
    const params = [limit, offset];

    let query = `
       SELECT 
        sku,
        qty, 
        amount
      FROM ${this.tableName}
      WHERE is_deleted = FALSE
      ORDER BY created_at
      LIMIT $1 OFFSET $2
    `;

    const result = await this.db.query(query, params);
    return result;
  }

  async getCount() {
    let query = `
       SELECT 
        count(*) as total
      FROM ${this.tableName}
      WHERE is_deleted = FALSE
    `;

    const result = await this.db.query(query);
    return result;
  }

  async getDetailBySku({
    sku
  }) {
    const params = [sku];

    let query = `
       SELECT 
        sku,
        qty, 
        amount
      FROM ${this.tableName}
      WHERE is_deleted = FALSE
      AND sku = $1
    `;

    const result = await this.db.query(query, params);
    return result;
  }

  async updateTransaction({
    sku,
    qty,
    amount
  }) {
    const params = [
      qty,
      amount,
      sku
    ]

    const query = `
       UPDATE  ${this.tableName} SET qty = $1, amount = $2
       WHERE sku = $3
       AND is_deleted = false
    `;

    return await this.db.update(query, params);
  }

  async createTransaction({
    sku,
    qty,
    amount
  }) {
    const params = [
      sku,
      qty,
      amount
    ];

    const query = `INSERT INTO  ${this.tableName} (sku, qty, amount) VALUES ($1, $2, $3)`;
    return await this.db.queryWithThrows(query, params);
  }
}

module.exports = TransactionModel;
