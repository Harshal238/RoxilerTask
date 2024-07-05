const axios = require('axios');
const Transaction = require('../transaction.modal');
const httpStatus = require("http-status");
const {sendResponse} = require('../../../utils/responseHanlder');
const services = require('../services/index'); 

const seedDatabase = async (req, res) => {
  try {
    const result = await services.seedDatabaseService();

    if(result.code === 200){
      sendResponse(res, httpStatus.OK, result, null);
    }

  } catch (error) {
    sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, error.message);
  }
};

module.exports = seedDatabase;
