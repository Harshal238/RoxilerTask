const express = require('express');
const barChartService = require('../services/index');
const { sendResponse } = require('../../../utils/responseHanlder');
const httpStatus = require('http-status');



const getBarChartDataController = async (req, res) => {
    const {month}  = req.query;
    console.log(month);

    if (!month) {
        return sendResponse(res, httpStatus.BAD_REQUEST, null, 'month is required');
    }

    try {
        const result = await barChartService.getBarChartDataService(month);
        if(result.code===200){
            return sendResponse(res, httpStatus.OK, result, null);
        }else{
            return sendResponse(res, httpStatus.BAD_REQUEST, null, result);
        }
    } catch (error) {
        return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, result);
    }
};

module.exports =  getBarChartDataController;
   