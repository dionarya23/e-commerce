class ResponseHandler {
  formatApiResponse(h, responseService) {
    const { status, ...response } = responseService;
    return h.response(response).code(status);
  }
}

module.exports = ResponseHandler;
