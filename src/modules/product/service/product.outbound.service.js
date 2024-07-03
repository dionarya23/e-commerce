const AxiosCommonService = require('../../common/services/axios.common.service');

class PrescriptionOutboundService {
  constructor() {
    const config = {
      baseURL: `${process.env.PRODUCT_URL}`,
    };
    this.axiosCommonService = new AxiosCommonService(config);
  }

  async importProduct() {
    const response = await this.axiosCommonService.get('products');
    return response;
  }

}

module.exports = PrescriptionOutboundService;
