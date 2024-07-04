const { TABLE_NAME } = require('../../../definitions/index');
const DBCommonService = require('../../common/services/db.common.service');

class AdjustmentTransactionModel {
  constructor() {
    this.tableName = TABLE_NAME.ADJUSTMENT_TRANSACTIONS;
    this.db = new DBCommonService()
  }

  async deleteAdjustmentTransactionByProductId({sku}) {
    const params = [sku];
    const query = `
       UPDATE ${TABLE_NAME.ADJUSTMENT_TRANSACTIONS}
        SET is_deleted = TRUE, deleted_at = CURRENT_TIMESTAMP
        WHERE sku = $1 AND is_deleted = FALSE;
    `;
    const result = await this.db.query(query, params);
    return result;
  }
}

module.exports = AdjustmentTransactionModel;
