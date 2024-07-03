const { 
  OK,
  CREATED
} = require('http-status-codes');

class ResponseHandler {
  static responseOK(h, responseService) {
    return h.response(responseService).code(OK);
  }

  static responseCreated(h, responseService) {
    return h.response(responseService).code(CREATED);
  }
}

module.exports = ResponseHandler;
