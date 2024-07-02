const db = require('../../../drivers/database');
const { TABLE_NAME } = require('../../../definitions/index');

module.exports = {
  getAll: async ({ limit, offset, search }) => {
    const params = [limit, offset];
    let query = `
    SELECT 
        title,
        sku,
        image, 
        price, 
        stock 
    FROM ${TABLE_NAME.PRODUCT} 
    WHERE 1=1
    `;

    if (search) {
      query += ` AND title LIKE $1`
      query += ` LIMIT $2 OFFSET $3`
      params.unshift(`%${search}%`)
    } else {
      query += ` LIMIT $1 OFFSET $2`
    }

    const result = await db.query(query, params)
    return result.rows;
  },

  getCount: async ({ search }) => {
    const params = [];
    let query = `SELECT COUNT(*) as total FROM ${TABLE_NAME.PRODUCT} WHERE 1=1`;

    if (search) {
      query += ` AND title LIKE $1`;
      params.push(`%${search}%`);
    }

    const result = await db.query(query, params);
    return result.rows[0].total;
  },

  getById: async ({product_id}) => {
    const params = [product_id];
    const query = `
    SELECT 
        title,
        sku,
        image, 
        price, 
        stock,
        description
    FROM ${TABLE_NAME.PRODUCT}
    WHERE id = $1
    `
    const result = await db.query(query, params);
    return result.rows;
  }
};
