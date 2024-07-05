const axios = require('axios');
const httpStatus = require("http-status");
const { sendResponse } = require('../../../utils/responseHanlder');
const services = require('../services/index'); 

const getAllTransactionController = async (req, res) => {
    const { page, limit, search, month } = req.query;
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    if(!month){
        sendResponse(res, httpStatus.BAD_REQUEST, null, "Month Is Required.");
        return;
    }

    let searchCriteria = {};
    if (search) {
        searchCriteria = search.trim(); 
    }

    const result = await services.getAllTransactionService(pageNum, limitNum, searchCriteria, month);

    if (result.code === 200) {
        sendResponse(res, httpStatus.OK, result.data, null);
    } else {
        sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, result.message);
    }
};

module.exports = getAllTransactionController;
