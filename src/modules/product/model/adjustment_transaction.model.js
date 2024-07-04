const { TABLE_NAME } = require('../../../definitions/index');
const DBCommonService = require('../../common/services/db.common.service');

class AdjustmentTransactionModel {
  constructor() {
    this.tableName = TABLE_NAME.ADJUSTMENT_TRANSACTIONS;
    this.db = new DBCommonService()
  }

  async deleteAdjustmentTransactionByProductId({product_id}) {
    const params = [product_id];
    const query = `
       UPDATE adjustment_transactions
        SET is_deleted = TRUE, deleted_at = CURRENT_TIMESTAMP
        WHERE product_id = $1 AND is_deleted = FALSE;
    `;
    const result = await this.db.query(query, params);
    return result;
  }
}

module.exports = AdjustmentTransactionModel;
