const express = require('express');
const statisticsService = require('../services/index');
const { sendResponse } = require('../../../utils/responseHanlder');
const httpStatus = require('http-status');



const getStatisticsController = async (req, res) => {
    const {month}  = req.query;
    console.log("month",month);

    if (!month) {
        return sendResponse(res, httpStatus.BAD_REQUEST, null, 'month is required');
    }

    try {
        const statistics = await statisticsService.getStatisticsService(month);
        if(statistics.code ===200){
            return sendResponse(res, httpStatus.OK, statistics, null);
        }else{
            return sendResponse(res, httpStatus.BAD_REQUEST, null, statistics);
        }
    } catch (error) {
        return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, statistics);
    }
};

module.exports =  getStatisticsController;
   