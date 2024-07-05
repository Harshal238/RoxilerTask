const httpStatus = require('http-status');
const { sendResponse } = require('../../../utils/responseHanlder');
const getCombinedDataService = require('../services/index');

const getAllApiDataController = async (req, res) => {
    try {
        const month  = req.body.month;
        if(!month){
            return sendResponse(res, HTTPRequest.BAD_REQUEST, 'Month Is Required')
        }
        const result = await getCombinedDataService.getAllApiDataService(month);
        if(result.code ===200){
            return sendResponse(res, httpStatus.OK, result, null);
        }else{
            return sendResponse(res, httpStatus.BAD_REQUEST, null, result);
        }
    } catch (error) {
        return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null);
    }
};

module.exports = getAllApiDataController;
