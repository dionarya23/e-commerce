const AxiosCommonService = require('../../common/services/axios.common.service');

class PrescriptionOutboundService {
  constructor() {
    const config = {
      baseURL: `${process.env.PRODUCT_URL}`,
    };
    this.axiosCommonService = new AxiosCommonService(config);
  }

  async getProducts() {
    const response = await this.axiosCommonService.get('products');
    return response.data.products;
  }

}

module.exports = PrescriptionOutboundService;
